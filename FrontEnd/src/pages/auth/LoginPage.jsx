import { useState, useEffect } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const hero = document.querySelector(".hero-pattern");
      if (!hero) return;
      const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
      const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
      hero.style.backgroundPosition = `${moveX}px ${moveY}px`;
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side: Hero Section */}
      <section className="hidden md:flex md:w-1/2 relative overflow-hidden hero-pattern items-center justify-center p-margin-desktop">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZufuli37g8IzSxrqEszEuUDpYQ5GGRu0pVHz1fOamHDZODrxg2OtibfaG2DFDzDtyQ-4oZVBzimBRjLt_74wrJF7Sj5jrfEy9rmR2eH-Izr-u9SihFWUw6HCg5zLQys_ZZSix0Kwpm-4uuCHaisDv5J91AYjtritQNdYf8fTTCXVDT5jDqgNWIUidjK_yloPWztS3czV0nLf--rrj4UfEwn8ZKTcAHg3nlgkCrB4TzkUd4dNKIJAsLhsdjVshJkCWRS6xmrzTqr8"
            alt="Students collaborating in a modern library"
          />
        </div>
        <div className="relative z-10 text-center max-w-md">
          <div className="inline-flex items-center gap-stack-sm mb-stack-lg px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <span
              className="material-symbols-outlined text-white"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              auto_awesome
            </span>
            <span className="font-label-md text-label-md text-white">
              Join 50k+ active learners
            </span>
          </div>
          <h1 className="font-display text-display text-white mb-stack-md leading-tight">
            Learn from the best.
          </h1>
          <p className="font-body-lg text-body-lg text-white/80">
            Unlock your potential with expert-led courses designed to help you
            master new skills in a distraction-free environment.
          </p>
          <div className="mt-12 grid grid-cols-3 gap-stack-md">
            <div className="p-stack-md rounded-xl bg-white/5 border border-white/10">
              <span className="block font-headline-md text-headline-md text-white">
                1.2k+
              </span>
              <span className="block font-label-sm text-label-sm text-white/60">
                Expert Mentors
              </span>
            </div>
            <div className="p-stack-md rounded-xl bg-white/5 border border-white/10">
              <span className="block font-headline-md text-headline-md text-white">
                4.9/5
              </span>
              <span className="block font-label-sm text-label-sm text-white/60">
                Rating
              </span>
            </div>
            <div className="p-stack-md rounded-xl bg-white/5 border border-white/10">
              <span className="block font-headline-md text-headline-md text-white">
                24/7
              </span>
              <span className="block font-label-sm text-label-sm text-white/60">
                Support
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Right Side: Login Form */}
      <section className="flex-1 flex flex-col justify-center items-center p-margin-mobile md:p-margin-desktop bg-surface">
        {/* Mobile brand logo */}
        <div className="md:hidden w-full flex justify-center mb-stack-lg">
          <span className="font-display text-headline-md font-bold text-primary">
            EduFlow
          </span>
        </div>

        <div className="w-full max-w-110">
          <div className="glass-panel p-stack-lg md:p-10 rounded-3xl shadow-xl">
            <div className="mb-stack-lg">
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-stack-sm">
                Welcome back
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Enter your credentials to access your dashboard.
              </p>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-stack-md mb-stack-lg">
              <button
                type="button"
                className="flex items-center justify-center gap-stack-sm px-stack-md py-3 rounded-xl border border-outline-variant hover:bg-surface-container-low transition-colors duration-200"
              >
                <img
                  alt="Google"
                  className="w-5 h-5"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvbwQM3QVbvWXpPhhXQVON-x8SvQKyOuvS3Q3R_44fSKTRvvyQxfjeJeCxgIUK7TvnBrxvn_abGPV1xgMdPtOt1Hiy-Q-rT6NQCyXt390wm7OrS5AN3jhBbvKu34e9D_Uv1ace5nf8R8DHsU0hRBt6BAxaGX31aCf71A8sCmM1JXyvRtSOopmNsDAKK-KzS89tUyeVzD7RB1dbq0QUMrawZ9LzbVgLta4C4moWpxOQD6nXTOj7u5r7SSVrLQisr-2J-aH0b9yDeFg"
                />
                <span className="font-label-md text-label-md text-on-surface">
                  Google
                </span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-stack-sm px-stack-md py-3 rounded-xl border border-outline-variant hover:bg-surface-container-low transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5 text-[#1877F2]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="font-label-md text-label-md text-on-surface">
                  Facebook
                </span>
              </button>
            </div>

            <div className="relative flex items-center mb-stack-lg">
              <div className="grow border-t border-outline-variant"></div>
              <span className="shrink mx-4 font-label-sm text-label-sm text-outline">
                OR CONTINUE WITH EMAIL
              </span>
              <div className="grow border-t border-outline-variant"></div>
            </div>

            {/* Login Form */}
            <form
              className="space-y-stack-md"
              onSubmit={(e) => e.preventDefault()}
            >
              <div>
                <label
                  className="block font-label-md text-label-md text-on-surface-variant mb-2"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline group-focus-within:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[20px]">
                      mail
                    </span>
                  </div>
                  <input
                    className="block w-full pl-11 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                    id="email"
                    placeholder="alex@example.com"
                    required
                    type="email"
                  />
                </div>
              </div>

              <div>
                <label
                  className="block font-label-md text-label-md text-on-surface-variant mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline group-focus-within:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[20px]">
                      lock
                    </span>
                  </div>
                  <input
                    className="block w-full pl-11 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                    id="password"
                    placeholder="••••••••"
                    required
                    type={showPassword ? "text" : "password"}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-outline hover:text-on-surface transition-colors"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary/30 cursor-pointer"
                    type="checkbox"
                  />
                  <span className="font-label-md text-label-md text-on-surface-variant">
                    Remember me
                  </span>
                </label>
                <a
                  className="font-label-md text-label-md text-primary hover:text-primary-fixed-dim transition-colors"
                  href="#"
                >
                  Forgot password?
                </a>
              </div>

              <button
                className="w-full primary-gradient text-white font-label-md text-label-md py-4 rounded-xl transition-all duration-200 transform active:scale-[0.98] shadow-lg shadow-primary/20"
                type="submit"
              >
                Log In
              </button>
            </form>

            <p className="mt-stack-lg text-center font-body-sm text-body-sm text-on-surface-variant">
              Don&apos;t have an account?{" "}
              <a
                className="text-primary font-bold hover:underline transition-all"
                href="#"
              >
                Register
              </a>
            </p>
          </div>

          {/* Footer Links */}
          <div className="mt-stack-lg flex justify-center gap-stack-md font-label-sm text-label-sm text-outline">
            <a className="hover:text-on-surface transition-colors" href="#">
              Privacy Policy
            </a>
            <span>•</span>
            <a className="hover:text-on-surface transition-colors" href="#">
              Terms of Service
            </a>
            <span>•</span>
            <a className="hover:text-on-surface transition-colors" href="#">
              Help Center
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
