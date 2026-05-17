import {
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

function Pagination({ currentPage, totalPages, setCurrentPage }) {
  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4 dark:border-white/10">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Showing page {currentPage} of {totalPages}
      </p>

      <div className="flex items-center gap-2">
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.max(prev - 1, 1))
          }
          disabled={currentPage === 1}            
          className={`inline-flex items-center h-10 justify-center rounded-lg border px-3 py-2 text-sm font-medium transition ${
              currentPage === 1
                ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400 dark:border-white/10 dark:bg-white/5 dark:text-gray-500"
                : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-white/10 dark:bg-gray-900 dark:text-white dark:hover:bg-white/5"
            }`}>
          <ArrowLeftIcon className="h-4 w-4" />
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-semibold transition ${
              currentPage === page
                ? "bg-brand-600 text-white"
                : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, totalPages)
            )
          }
          disabled={currentPage === totalPages}
          className={`inline-flex items-center h-10 justify-center rounded-lg border px-3 py-2 text-sm font-medium transition ${
              currentPage === totalPages
                ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400 dark:border-white/10 dark:bg-white/5 dark:text-gray-500"
                : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-white/10 dark:bg-gray-900 dark:text-white dark:hover:bg-white/5"
            }`}>
          <ArrowRightIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default Pagination;