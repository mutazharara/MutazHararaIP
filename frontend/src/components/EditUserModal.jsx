import { useEffect, useMemo, useState } from "react";
import {
  EnvelopeIcon,
  ShieldCheckIcon,
  UserCircleIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

function EditUserModal({ isOpen, onClose, user, onUpdate }) {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
    is_active: true,
  });

  useEffect(() => {
    if (user && isOpen) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "user",
        is_active: Boolean(user.is_active),
      });
      setErrors({});
    }
  }, [user, isOpen]);

  const hasChanges = useMemo(() => {
    if (!user) return false;

    return (
      formData.name !== (user.name || "") ||
      formData.email !== (user.email || "") ||
      formData.role !== (user.role || "user") ||
      formData.is_active !== Boolean(user.is_active)
    );
  }, [formData, user]);

  const isFormValid = useMemo(() => {
    return formData.name.trim() !== "" && formData.email.trim() !== "";
  }, [formData]);

  if (!isOpen) return null;

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-11 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 dark:border-white/10 dark:bg-gray-950 dark:text-white";

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (!hasChanges) return;

    onUpdate(user.id, formData);
  };

  const canSubmit = hasChanges && isFormValid;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-gray-900">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Edit User
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Update account details, permissions, and account status.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Full Name
            </label>

            <div className="relative">
              <UserCircleIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="name"
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleChange}
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
                name="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            {errors.email && (
              <p className="mt-2 text-xs font-medium text-red-500">
                {errors.email}
              </p>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                User Role
              </label>

              <div className="relative">
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 pr-10 text-sm text-gray-900 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 dark:border-white/10 dark:bg-gray-950 dark:text-white"
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              </div>

            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Account Status
              </label>

              <label className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-gray-950">
                <span className="font-medium text-gray-700 dark:text-white">
                  Active account
                </span>

                <input
                  type="checkbox"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleChange}
                  className="h-5 w-5 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                />
              </label>
            </div>
          </div>

          {!hasChanges && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Make a change to enable the update button.
            </p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-white/10 dark:text-white dark:hover:bg-white/5"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!canSubmit}
              className={`rounded-xl px-4 py-2.5 text-sm font-medium text-white transition ${
                canSubmit
                  ? "bg-brand-600 hover:bg-brand-700"
                  : "cursor-not-allowed bg-brand-300 opacity-60"
              }`}
            >
              Update User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUserModal;