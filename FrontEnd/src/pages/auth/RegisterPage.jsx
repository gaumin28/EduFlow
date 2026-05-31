import { useState } from "react";

function getStrength(password) {
  let strength = 0;
  if (password.length > 5) strength += 25;
  if (password.length > 8) strength += 25;
  if (/[A-Z]/.test(password)) strength += 25;
  if (/[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)) strength += 25;
  return strength;
}

function StrengthBar({ strength }) {
  if (strength === 0)
    return (
      <p className="font-label-sm text-label-sm text-on-surface-variant">
        At least 8 characters recommended.
      </p>
    );
  if (strength <= 50)
    return (
      <p className="font-label-sm text-label-sm text-error">Weak password</p>
    );
  if (strength <= 75)
    return (
      <p className="font-label-sm text-label-sm text-secondary">
        Good password
      </p>
    );
  return (
    <p className="font-label-sm text-label-sm text-primary">Strong password</p>
  );
}

function strengthBarColor(strength) {
  if (strength === 0) return "";
  if (strength <= 50) return "bg-error";
  if (strength <= 75) return "bg-secondary";
  return "bg-primary";
}

/* Floating label input */
function FloatingInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  required,
  children,
}) {
  return (
    <div className="relative">
      <input
        className="peer w-full px-4 py-4 rounded-lg border border-outline-variant bg-surface-container-lowest focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-md text-on-surface placeholder-transparent"
        id={id}
        placeholder=" "
        required={required}
        type={type}
        value={value}
        onChange={onChange}
      />
      <label
        className="absolute left-4 top-4 font-label-md text-label-md text-on-surface-variant transition-all duration-200 pointer-events-none
          peer-focus:-top-2 peer-focus:left-3 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-white peer-focus:px-1
          peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:left-3 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:bg-white peer-not-placeholder-shown:px-1"
        htmlFor={id}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [terms, setTerms] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | loading | success

  const strength = getStrength(password);

  function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setStatus("loading");
    setTimeout(() => setStatus("success"), 1500);
  }

  const btnContent = () => {
    if (status === "loading")
      return (
        <span className="flex items-center justify-center gap-2">
          <span className="material-symbols-outlined animate-spin text-sm">
            sync
          </span>
          Processing...
        </span>
      );
    if (status === "success") return "Success! Redirecting...";
    return "Create Account";
  };

  return (
    <div className="bg-background mesh-gradient min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full h-16 flex items-center justify-between px-margin-desktop bg-surface/70 backdrop-blur-xl border-b border-outline-variant/30 sticky top-0 z-50">
        <div className="flex items-center gap-stack-sm">
          <span
            className="material-symbols-outlined text-primary text-3xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            school
          </span>
          <span className="font-display text-headline-md font-bold text-primary">
            EduFlow
          </span>
        </div>
        <div className="hidden md:flex gap-stack-md">
          <a
            className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
            href="#"
          >
            Browse Courses
          </a>
          <a
            className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
            href="#"
          >
            Mentors
          </a>
        </div>
      </header>

      {/* Main */}
      <main className="grow flex items-center justify-center py-stack-lg px-margin-mobile">
        <div className="w-full max-w-250 grid md:grid-cols-2 bg-surface-container-lowest rounded-xl shadow-xl overflow-hidden border border-outline-variant/20">
          {/* Branding Side */}
          <div className="hidden md:flex flex-col justify-between p-stack-lg bg-primary-container text-on-primary-container relative overflow-hidden">
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <svg
                height="100%"
                width="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern
                    height="40"
                    id="grid"
                    patternUnits="userSpaceOnUse"
                    width="40"
                  >
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  </pattern>
                </defs>
                <rect fill="url(#grid)" height="100%" width="100%" />
              </svg>
            </div>

            <div className="relative z-10">
              <span className="font-label-md text-label-md px-3 py-1 bg-on-primary-container/10 rounded-full inline-block mb-stack-md">
                Welcome back to EduFlow
              </span>
              <h1 className="font-display text-display leading-tight mb-stack-md">
                Master Your Future, One Course at a Time.
              </h1>
              <p className="font-body-lg text-body-lg opacity-90 max-w-sm">
                Join 50k+ students learning high-demand skills from industry
                experts.
              </p>
            </div>

            <div className="relative z-10 space-y-stack-md">
              {[
                {
                  icon: "verified",
                  title: "Verified Instructors",
                  desc: "Learn only from the best in the field.",
                },
                {
                  icon: "history_edu",
                  title: "Lifetime Access",
                  desc: "Your courses never expire.",
                },
              ].map(({ icon, title, desc }) => (
                <div
                  key={title}
                  className="flex items-center gap-stack-md p-stack-md bg-white/5 rounded-lg border border-white/10 glass-card"
                >
                  <span className="material-symbols-outlined text-on-primary-container bg-primary/20 p-2 rounded-lg">
                    {icon}
                  </span>
                  <div>
                    <p className="font-label-md text-label-md">{title}</p>
                    <p className="font-body-sm text-body-sm opacity-80">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative image */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 opacity-20">
              <img
                alt="Learning icons"
                className="w-full h-full object-contain"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuACmv2zNVs_yjW0QtBZGX-iumAkUlI5unRqBHEDT7m236vfZDwzQxi4a9ojOh3CFZcLuaai4rdT8PiCHKtel_4VT-lMgl72DV3Z0donBD9wl2d_2IQuXz0vyI-InAy4jurTDQhfmruMWRbWdi1O4ncvzoYvSDTg6f-Ok5W9Cgsezp7Q0wSXme0X7t1iYHASUgbPhANBUCrvj11nvafz_csj3hmHDZlw4-b2S8pwOBKHxGR1S5NNEuqUHtZB8ypNVas4TGqCMU3haaY"
              />
            </div>
          </div>

          {/* Form Side */}
          <div className="p-stack-lg md:p-12 flex flex-col justify-center">
            <div className="mb-stack-lg">
              <h2 className="font-display text-headline-lg text-on-surface mb-2">
                Create an account
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Enter your details to start your journey.
              </p>
            </div>

            <form className="space-y-stack-md" onSubmit={handleSubmit}>
              {/* Full Name */}
              <FloatingInput
                id="fullName"
                label="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />

              {/* Email */}
              <FloatingInput
                id="email"
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              {/* Password + strength */}
              <div className="space-y-2">
                <FloatingInput
                  id="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                >
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
                    onClick={() => setShowPassword((v) => !v)}
                    type="button"
                  >
                    <span className="material-symbols-outlined">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </FloatingInput>

                <div className="flex gap-1 h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${strengthBarColor(strength)}`}
                    style={{ width: `${strength}%` }}
                  />
                </div>
                <StrengthBar strength={strength} />
              </div>

              {/* Confirm Password */}
              <FloatingInput
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              {/* Terms */}
              <div className="flex items-start gap-3 py-2">
                <div className="flex items-center h-5">
                  <input
                    className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary/30 transition-all cursor-pointer"
                    id="terms"
                    required
                    type="checkbox"
                    checked={terms}
                    onChange={(e) => setTerms(e.target.checked)}
                  />
                </div>
                <label
                  className="font-body-sm text-body-sm text-on-surface-variant"
                  htmlFor="terms"
                >
                  I agree to the{" "}
                  <a
                    className="text-primary font-medium hover:underline"
                    href="#"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    className="text-primary font-medium hover:underline"
                    href="#"
                  >
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>

              {/* CTA */}
              <button
                className={`w-full py-4 px-6 text-white font-label-md text-label-md rounded-lg shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-all duration-200 ${
                  status === "success"
                    ? "bg-secondary"
                    : "bg-linear-to-r from-primary to-tertiary"
                }`}
                disabled={status === "loading" || status === "success"}
                type="submit"
              >
                {btnContent()}
              </button>

              {/* Divider */}
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-outline-variant/30" />
                </div>
                <div className="relative flex justify-center text-label-sm uppercase">
                  <span className="bg-surface-container-lowest px-2 text-on-surface-variant">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Social Signup */}
              <div className="grid grid-cols-2 gap-stack-md">
                <button
                  className="flex items-center justify-center gap-2 py-3 px-4 border border-outline-variant rounded-lg hover:bg-surface-container transition-colors"
                  type="button"
                >
                  <img
                    alt="Google"
                    className="w-5 h-5"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPoa7BCijulPaSxdEeLmJ9jXdo5mG_F5iWcCqKRAy2cxEHakIJqsjQnLbO5uJfkrsIrbUHnmofuZmXyaVPxRhZcV_jCKeeOX0KY7FnxaTBwNhG0Kj1BhiJ0nf6uaMJx_Y3Pn78A1U4839OxmqTQy4qK_igPL2V2Zd2hXFXZiRWABYANQwC6ugzAr0aFktFm50IVDcXqXwPDZ8X61Wf2MfEiTgbKiesd1t8_GD4sm13hFvhka9eOIM70B-aS-K-seUQt3W2n4I11n4"
                  />
                  <span className="font-label-md text-label-md">Google</span>
                </button>
                <button
                  className="flex items-center justify-center gap-2 py-3 px-4 border border-outline-variant rounded-lg hover:bg-surface-container transition-colors"
                  type="button"
                >
                  <img
                    alt="Apple"
                    className="w-5 h-5"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaQO_YVZVpYhng1CQYb5SzaJMbnOmNZB7Hdz_e06Gza1WwSPWn9FLA-HlD6HFSeSnGk5fRatId4pJ6pzCZLFOuHvo0MmPraH2GpFWw6lyZ3DuyXlTanYdY8Q4NAt-wCBl4czrH3yYtJOraQWbtka_bGrgsKAIru_4LhN8VZeBAxZEt1V0200UteUoViw93o5FdPx8NW0Xu8CUFkYpQ1aWaO1qaIhWfACmwRH5JYfcYhEwtQqmUiLcCXq4rbLaWbtLsXBZE611_wNM"
                  />
                  <span className="font-label-md text-label-md">Apple</span>
                </button>
              </div>

              <div className="text-center pt-stack-md">
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Already have an account?{" "}
                  <a
                    className="text-primary font-bold hover:underline"
                    href="#"
                  >
                    Login
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-stack-md border-t border-outline-variant/10 text-center">
        <p className="font-label-sm text-label-sm text-outline">
          © 2024 EduFlow Learning Inc. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
