import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}) {
  return (
    <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">

      {/* Page Info */}

      <p className="text-sm text-gray-500 dark:text-gray-400">
        Page{" "}
        <span className="font-medium text-gray-900 dark:text-white">
          {currentPage}
        </span>{" "}
        of{" "}
        <span className="font-medium text-gray-900 dark:text-white">
          {totalPages}
        </span>
      </p>

      {/* Pagination Buttons */}

      <div className="flex items-center gap-2">

        {/* Previous Button */}

        <button
          onClick={() =>
            setCurrentPage((prev) =>
              Math.max(prev - 1, 1)
            )
          }
          disabled={currentPage === 1}
          className={`inline-flex items-center justify-center rounded-lg border px-4 py-2 text-sm font-medium transition
          ${
            currentPage === 1
              ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400 dark:border-white/10 dark:bg-white/5 dark:text-gray-500"
              : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-white/10 dark:bg-gray-900 dark:text-white dark:hover:bg-white/5"
          }`}
        >

          <ChevronLeftIcon className="h-4 w-4 mr-1" />


        </button>

        {/* Current Page */}

        <span className="inline-flex h-10 min-w-[40px] items-center justify-center rounded-lg border border-brand-200 bg-brand-50 px-3 text-sm font-semibold text-brand-600 dark:border-white/10 dark:bg-white/10 dark:text-white">
          {currentPage}
        </span>

        {/* Next Button */}

        <button
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, totalPages)
            )
          }
          disabled={currentPage === totalPages}
          className={`inline-flex items-center justify-center rounded-lg border px-4 py-2 text-sm font-medium transition
          ${
            currentPage === totalPages
              ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400 dark:border-white/10 dark:bg-white/5 dark:text-gray-500"
              : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-white/10 dark:bg-gray-900 dark:text-white dark:hover:bg-white/5"
          }`}
        >

          <ChevronRightIcon className="h-4 w-4 ml-1" />

        </button>

      </div>

    </div>
  );
}

export default Pagination;