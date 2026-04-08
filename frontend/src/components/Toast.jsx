import { useEffect } from "react";

function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      onClose();
    }, 2500);

    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const tone =
    toast.type === "success"
      ? "bg-green-500"
      : "bg-red-500";

  return (
    <div className={`fixed top-5 right-5 z-[100] rounded-xl px-4 py-3 text-white shadow-lg ${tone}`}>
      {toast.message}
    </div>
  );
}

export default Toast;