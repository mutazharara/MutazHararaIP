function ConfirmActionModal({
  isOpen,
  title,
  message,
  confirmText,
  confirmTone = "danger",
  onClose,
  onConfirm,
}) {
  if (!isOpen) return null;

  const confirmClass =
    confirmTone === "danger"
      ? "bg-red-600 hover:bg-red-700"
      : "bg-brand-600 hover:bg-brand-700";

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {title}
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
          {message}
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-white/10 dark:text-white dark:hover:bg-white/5"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className={`rounded-xl px-5 py-2.5 text-sm font-semibold text-white ${confirmClass}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmActionModal;