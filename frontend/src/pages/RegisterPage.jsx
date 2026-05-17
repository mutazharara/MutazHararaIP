import { useMemo, useState } from "react";
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { registerUser } from "../services/api";

function RegisterPage({ setToast, goToLogin }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const isFormValid = useMemo(() => {
    return (
      form.name.trim() !== "" &&
      form.email.trim() !== "" &&
      form.password.trim() !== ""
    );
  }, [form]);

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

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

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsLoading(true);

      const res = await registerUser(form);

      if (res.message) {
        setToast({
          type: "success",
          message: "Registered successfully. Please login.",
        });

        goToLogin();
      }
    } catch (error) {
      setToast({
        type: "error",
        message:
          error.response?.data?.detail ||
          "Registration failed. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-11 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 dark:border-white/10 dark:bg-gray-950 dark:text-white";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
      <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-gray-900">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
            Mamo Family
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            Create account
          </h1>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Register to start tracking your family expenses.
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Full Name
            </label>

            <div className="relative">
              <UserIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                value={form.name}
                placeholder="Enter your full name"
                onChange={(e) => {
                  setForm({ ...form, name: e.target.value });

                  if (errors.name) {
                    setErrors({ ...errors, name: "" });
                  }
                }}
                className={inputClass}
              />
            </div>

            {errors.name && (
              <p className="mt-2 text-xs font-medium text-red-500">
                {errors.name}
              </p>
            )}
          </div>

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
                placeholder="Create a password"
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
            {isLoading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <button
            onClick={goToLogin}
            className="font-semibold text-brand-600 hover:text-brand-700"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;