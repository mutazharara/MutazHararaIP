import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

function AccountInactiveModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="modalShake w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
        </div>

        <h2 className="mt-5 text-2xl font-bold text-gray-900">
          Access Restricted
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-700">
          Your account is currently inactive and access has been temporarily disabled.
          
        </p>

        <button
          onClick={onClose}
          className="mt-5 w-full rounded-xl bg-brand-600 py-3 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Back to Login
        </button>

        <p className="mt-3 text-sm leading-6 text-gray-400">Please contact the administrator for support.</p>
      </div>
    </div>
  );
}

export default AccountInactiveModal;