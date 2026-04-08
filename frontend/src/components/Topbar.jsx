import { ChevronRightIcon } from "@heroicons/react/24/outline";

function Topbar({
  title,
  breadcrumbs,
  onAddExpense,
}) {
  return (
    <div className="mb-6 flex flex-col gap-4">
      {/* Title + Breadcrumb */}
      <div className="flex items-center justify-between">
        <div>
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center gap-2">
                <span>{crumb}</span>

                {index < breadcrumbs.length - 1 && (
                  <ChevronRightIcon className="h-4 w-4" />
                )}
              </div>
            ))}
          </div>

          {/* Page Title */}
          <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
            {title}
          </h1>
        </div>

        {/* Add Expense Button */}
        {onAddExpense && (
          <button
            onClick={onAddExpense}
            className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            + Add Expense
          </button>
        )}
      </div>
    </div>
  );
}

export default Topbar;