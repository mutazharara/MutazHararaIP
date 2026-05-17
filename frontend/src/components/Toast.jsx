import { useEffect } from "react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      onClose();
    }, 3500);

    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type === "success";

  return (
    <div className="fixed top-6 right-6 z-[9999] animate-[slideIn_.3s_ease]">
      <div
        className={`relative flex w-[360px] items-start gap-4 overflow-hidden rounded-2xl border p-4 shadow-2xl backdrop-blur-xl ${
          isSuccess
            ? "border-green-200 bg-green-50/95 dark:border-green-500/20 dark:bg-green-500/10"
            : "border-red-200 bg-red-50/95 dark:border-red-500/20 dark:bg-red-500/10"
        }`}
      >
        {/* Icon */}
        <div
          className={`mt-0.5 flex h-11 w-11 items-center justify-center rounded-xl ${
            isSuccess
              ? "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-300"
              : "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-300"
          }`}
        >
          {isSuccess ? (
            <CheckCircleIcon className="h-6 w-6" />
          ) : (
            <ExclamationCircleIcon className="h-6 w-6" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          <h4
            className={`text-sm font-semibold ${
              isSuccess
                ? "text-green-800 dark:text-green-200"
                : "text-red-800 dark:text-red-200"
            }`}
          >
            {isSuccess ? "Success" : "Something went wrong"}
          </h4>

          <p
            className={`mt-1 text-sm leading-relaxed ${
              isSuccess
                ? "text-green-700 dark:text-green-300"
                : "text-red-700 dark:text-red-300"
            }`}
          >
            {toast.message}
          </p>
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="text-gray-400 transition hover:text-gray-600 dark:hover:text-white"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>

        {/* Progress bar */}
        <div
          className={`absolute bottom-0 left-0 h-1 animate-[toastProgress_3.5s_linear] ${
            isSuccess ? "bg-green-500" : "bg-red-500"
          }`}
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
}

export default Toast;