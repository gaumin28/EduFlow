import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && localStorage.getItem("accessToken")) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");

      const protectedPaths = [
        "/admin",
        "/dashboard",
        "/instructor",
        "/security-settings",
      ];

      if (
        protectedPaths.some((path) =>
          window.location.pathname.startsWith(path)
        )
      ) {
        window.location.assign("/login");
      }
    }

    return Promise.reject(err);
  }
);

export default api;
