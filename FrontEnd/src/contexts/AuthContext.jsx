/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import {
  login as loginApi,
} from "../services/authService";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

function decodeJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((char) => `%${(`00${char.charCodeAt(0).toString(16)}`).slice(-2)}`)
        .join(""),
    );
    return JSON.parse(json);
  } catch {
    return {};
  }
}

function normalizeUser(user, token) {
  const decoded = token ? decodeJwt(token) : {};
  const source = user || {};
  const role = source.role || decoded.role || decoded.roles?.[0] || "customer";

  return {
    ...source,
    _id: source._id || source.id || decoded._id || decoded.id || decoded.userId || decoded.sub,
    email: source.email || decoded.email || "",
    username:
      source.username ||
      source.fullName ||
      source.name ||
      decoded.username ||
      decoded.name ||
      decoded.email ||
      "User",
    role: String(role).toLowerCase(),
  };
}

function readStoredUser() {
  const token = localStorage.getItem("accessToken");
  const stored = localStorage.getItem("user");
  if (!token) return null;

  try {
    return stored ? normalizeUser(JSON.parse(stored), token) : normalizeUser(null, token);
  } catch {
    return normalizeUser(null, token);
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await loginApi(email, password);
      const payload = data?.data || data;
      const token = payload.accessToken || payload.token || payload.access_token;

      if (!token) throw new Error("Login response does not include an access token");

      const nextUser = normalizeUser(payload.user, token);
      localStorage.setItem("accessToken", token);
      localStorage.setItem("user", JSON.stringify(nextUser));
      setUser(nextUser);
      return nextUser;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
