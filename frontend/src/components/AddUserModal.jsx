import { useMemo, useState } from "react";
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { registerUser } from "../services/api";

function AddUserModal({ isOpen, onClose, setToast, onUserAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "Temp123456",
  });

  const [errors, setErrors] = useState({});

  const isFormValid = useMemo(() => {
    return (
      formData.name.trim() &&
      /\S+@\S+\.\S+/.test(formData.email) &&
      formData.password.length >= 6
    );
  }, [formData]);

  if (!isOpen) return null;

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-11 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Temporary password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClose = () => {
    setErrors({});
    setFormData({
      name: "",
      email: "",
      password: "Temp123456",
    });
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await registerUser(formData);

      setToast({
        type: "success",
        message: "User added successfully",
      });
      
      onUserAdded?.();
      handleClose();
    } catch (error) {
      setToast({
        type: "error",
        message: error.response?.data?.detail || "Failed to add user",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl">
        <div className="mb-6 border-b border-gray-100 pb-5">
          <h2 className="text-2xl font-bold text-gray-900">Add User</h2>
          <p className="mt-1 text-sm text-gray-500">
            Create a new user account with a temporary password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Full Name
            </label>

            <div className="relative">
              <UserCircleIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
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
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email Address
            </label>

            <div className="relative">
              <EnvelopeIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
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
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Temporary Password
            </label>

            <div className="relative">
              <LockClosedIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Temporary password"
                className={inputClass}
              />
            </div>

            {errors.password ? (
              <p className="mt-2 text-xs font-medium text-red-500">
                {errors.password}
              </p>
            ) : (
              <p className="mt-2 text-xs text-gray-400">
                The user can change this password after logging in.
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!isFormValid}
              className={`rounded-xl px-5 py-3 text-sm font-semibold text-white transition ${
                isFormValid
                  ? "bg-brand-600 hover:bg-brand-700"
                  : "cursor-not-allowed bg-brand-300 opacity-60"
              }`}
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUserModal;