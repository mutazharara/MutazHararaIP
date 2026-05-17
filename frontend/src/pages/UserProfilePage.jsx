import { useMemo, useState } from "react";
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { updateProfile, changePassword } from "../services/api";

function UserProfilePage({ user, setUser, setToast }) {
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const [passwordForm, setPasswordForm] = useState({
    current_password: "",
    new_password: "",
  });

  const [profileErrors, setProfileErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({});
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);

  const isProfileValid = useMemo(() => {
    return profileForm.name.trim() !== "" && profileForm.email.trim() !== "";
  }, [profileForm]);

  const isPasswordValid = useMemo(() => {
    return (
      passwordForm.current_password.trim() !== "" &&
      passwordForm.new_password.trim() !== ""
    );
  }, [passwordForm]);

  const validateProfile = () => {
    const errors = {};

    if (!profileForm.name.trim()) {
      errors.name = "Name is required";
    }

    if (!profileForm.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(profileForm.email)) {
      errors.email = "Enter a valid email address";
    }

    setProfileErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePassword = () => {
    const errors = {};

    if (!passwordForm.current_password.trim()) {
      errors.current_password = "Current password is required";
    }

    if (!passwordForm.new_password.trim()) {
      errors.new_password = "New password is required";
    } else if (passwordForm.new_password.length < 6) {
      errors.new_password = "New password must be at least 6 characters";
    }

    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpdateProfile = async () => {
    if (!validateProfile()) return;

    try {
      setIsProfileLoading(true);

      const updatedUser = await updateProfile(profileForm);

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

      setToast({
        type: "success",
        message: "Profile updated successfully",
      });
    } catch (error) {
      setToast({
        type: "error",
        message: error.response?.data?.detail || "Failed to update profile",
      });
    } finally {
      setIsProfileLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!validatePassword()) return;

    try {
      setIsPasswordLoading(true);

      await changePassword(passwordForm);

      setPasswordForm({
        current_password: "",
        new_password: "",
      });

      setPasswordErrors({});

      setToast({
        type: "success",
        message: "Password updated successfully",
      });
    } catch (error) {
      setToast({
        type: "error",
        message: error.response?.data?.detail || "Failed to change password",
      });
    } finally {
      setIsPasswordLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-11 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 dark:border-white/10 dark:bg-gray-950 dark:text-white";

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-gray-900">
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-xl font-bold text-brand-700 dark:bg-white/10 dark:text-white">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Profile & Security
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage your profile information and keep your account secure.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-gray-900">
          <div className="mb-6 flex items-start gap-3">
            <div className="rounded-xl bg-gray-100 p-3 dark:bg-white/5">
                <UserCircleIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Profile Details
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Update your personal information.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name
              </label>

              <div className="relative">
                <UserCircleIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => {
                    setProfileForm({ ...profileForm, name: e.target.value });
                    if (profileErrors.name) {
                      setProfileErrors({ ...profileErrors, name: "" });
                    }
                  }}
                  placeholder="Enter your name"
                  className={inputClass}
                />
              </div>

              {profileErrors.name && (
                <p className="mt-2 text-xs font-medium text-red-500">
                  {profileErrors.name}
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
                  value={profileForm.email}
                  onChange={(e) => {
                    setProfileForm({ ...profileForm, email: e.target.value });
                    if (profileErrors.email) {
                      setProfileErrors({ ...profileErrors, email: "" });
                    }
                  }}
                  placeholder="Enter your email"
                  className={inputClass}
                />
              </div>

              {profileErrors.email && (
                <p className="mt-2 text-xs font-medium text-red-500">
                  {profileErrors.email}
                </p>
              )}

              <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                Your email is used for account notifications and recovery.
              </p>
            </div>

            <button
              onClick={handleUpdateProfile}
              disabled={!isProfileValid || isProfileLoading}
              className={`w-full rounded-xl py-3 text-sm font-semibold text-white transition ${
                isProfileValid && !isProfileLoading
                  ? "bg-brand-600 hover:bg-brand-700"
                  : "cursor-not-allowed bg-brand-300 opacity-60"
              }`}
            >
              {isProfileLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-gray-900">
          <div className="mb-6 flex items-start gap-3">

            <div className="rounded-xl bg-gray-100 p-3 dark:bg-white/5">
                <LockClosedIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Change Password
              </h3>
              <p className=" text-sm text-gray-500 dark:text-gray-400">
                Update your password to keep your account secure.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Current Password
              </label>

              <div className="relative">
                <LockClosedIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                <input
                  type="password"
                  value={passwordForm.current_password}
                  onChange={(e) => {
                    setPasswordForm({
                      ...passwordForm,
                      current_password: e.target.value,
                    });
                    if (passwordErrors.current_password) {
                      setPasswordErrors({
                        ...passwordErrors,
                        current_password: "",
                      });
                    }
                  }}
                  placeholder="Enter current password"
                  className={inputClass}
                />
              </div>

              {passwordErrors.current_password && (
                <p className="mt-2 text-xs font-medium text-red-500">
                  {passwordErrors.current_password}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                New Password
              </label>

              <div className="relative">
                <LockClosedIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                <input
                  type="password"
                  value={passwordForm.new_password}
                  onChange={(e) => {
                    setPasswordForm({
                      ...passwordForm,
                      new_password: e.target.value,
                    });
                    if (passwordErrors.new_password) {
                      setPasswordErrors({
                        ...passwordErrors,
                        new_password: "",
                      });
                    }
                  }}
                  placeholder="Enter new password"
                  className={inputClass}
                />
              </div>

              {passwordErrors.new_password && (
                <p className="mt-2 text-xs font-medium text-red-500">
                  {passwordErrors.new_password}
                </p>
              )}

              <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                Password must be at least 6 characters.
              </p>
            </div>

            <button
              onClick={handleChangePassword}
              disabled={!isPasswordValid || isPasswordLoading}
              className={`w-full rounded-xl py-3 text-sm font-semibold text-white transition ${
                isPasswordValid && !isPasswordLoading
                  ? "bg-brand-600 hover:bg-brand-700"
                  : "cursor-not-allowed bg-brand-300 opacity-60"
              }`}
            >
              {isPasswordLoading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfilePage;