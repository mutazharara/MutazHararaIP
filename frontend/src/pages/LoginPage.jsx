import { useMemo, useState } from "react";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { loginUser } from "../services/api";
import AccountInactiveModal from "../components/AccountInactiveModal";

function LoginPage({ setUser, setToast, goToRegister }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showInactiveModal, setShowInactiveModal] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);

  const isFormValid = useMemo(() => {
    return form.email.trim() !== "" && form.password.trim() !== "";
  }, [form]);

  const validateForm = () => {
    const newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsLoading(true);

      const res = await loginUser(form);

      localStorage.setItem("token", res.access_token);
      localStorage.setItem("user", JSON.stringify(res.user));

      setUser(res.user);

      setToast({
        type: "success",
        message: "Login successful",
      });
    } catch (error) {
        if (error.response?.status === 403) {
            setShowInactiveModal(true);
            return;
            }
      
      setLoginFailed(true);

        setErrors({
        email: " ",
        password: "Incorrect email or password",
        });

        setTimeout(() => {
        setLoginFailed(false);
        }, 600);

        setToast({
        type: "error",
        message:
            error.response?.data?.detail ||
            "Invalid email or password",
        });
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    `w-full rounded-xl border border-gray-200 bg-white px-11 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 dark:border-white/10 dark:bg-gray-950 dark:text-white ${
loginFailed
? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
: "border-gray-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10"
}`;
    
    const shakeStyle = `
    @keyframes loginShake{
    0%{transform:translateX(0)}
    20%{transform:translateX(-8px)}
    40%{transform:translateX(8px)}
    60%{transform:translateX(-6px)}
    80%{transform:translateX(6px)}
    100%{transform:translateX(0)}
    }
    `;

  return (
    <>
    <style>{shakeStyle}</style>
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
      <div className={`w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-gray-900
        ${
    loginFailed
    ? "border-red-400 ring-4 ring-red-100"
    : "border-gray-200"
    }
    `}
    style={{
    animation: loginFailed
    ? "loginShake .55s ease"
    : ""
    }
        }>
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
            Mamo Family
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Login to manage your family expenses and reports.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </label>

            <div className="relative">
              <EnvelopeIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={form.email}
                placeholder="Enter your email"
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });
                  if (errors.email) {
                    setErrors({ ...errors, email: "" });
                  }
                }}
                className={inputClass}
              />
            </div>

            {errors.email && (
              <p className="mt-2 text-xs font-medium text-red-500">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>

            <div className="relative">
              <LockClosedIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                value={form.password}
                placeholder="Enter your password"
                onChange={(e) => {
                  setForm({ ...form, password: e.target.value });
                  if (errors.password) {
                    setErrors({ ...errors, password: "" });
                  }
                }}
                className={inputClass}
              />
            </div>

            {errors.password && (
              <p className="mt-2 text-xs font-medium text-red-500">
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className={`w-full rounded-xl py-3 text-sm font-semibold text-white transition ${
              isFormValid && !isLoading
                ? "bg-brand-600 hover:bg-brand-700"
                : "cursor-not-allowed bg-brand-300 opacity-60"
            }`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Don’t have an account?{" "}
          <button
            onClick={goToRegister}
            className="font-semibold text-brand-600 hover:text-brand-700"
          >
            Register
          </button>
        </p>
      </div>
      <AccountInactiveModal
            isOpen={showInactiveModal}
            onClose={() => setShowInactiveModal(false)}
            />
    </div>
    </>
  );
}

export default LoginPage;