import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

import Pagination from "./Pagination";

function ExpenseTable({
  expenses = [],
  onDelete,
  onEdit,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  exportToCSV,
  currentPage,
  totalPages,
  setCurrentPage,
  categories = [],
}) {
  

  const getCategoryBadgeStyle = (category) => {
    switch (category) {
      case "Food":
        return "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-300";
      case "Transport":
        return "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300";
      case "Shopping":
        return "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-300";
      case "Bills":
        return "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-300";
      case "Entertainment":
        return "bg-pink-100 text-pink-700 dark:bg-pink-500/10 dark:text-pink-300";
      case "Health":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300";
      case "Education":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-300";
      case "Housing":
        return "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-300";
      case "Subscriptions":
        return "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300";
      case "Travel":
        return "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-300";
    }
  };

  const getStatus = (date) => {
    const expenseDate = new Date(date);
    const now = new Date();

    if (expenseDate.getMonth() === now.getMonth() && expenseDate.getFullYear() === now.getFullYear()) {
      return {
        label: "Recent",
        className: "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-300",
      };
    }

    if (expenseDate > now) {
      return {
        label: "Upcoming",
        className: "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-300",
      };
    }

    return {
      label: "Recorded",
      className: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300",
    };
  };

  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-gray-900">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-5 dark:border-white/10">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Recent Transactions
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Your most recent expense records
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            {/* Search */}
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-2 dark:border-white/10 dark:bg-gray-900">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-2 pr-10 text-sm text-gray-700 outline-none dark:border-white/10 dark:bg-gray-900 dark:text-white"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>

            {/* Export */}
            <button
              onClick={exportToCSV}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-white/10 dark:bg-gray-900 dark:text-white dark:hover:bg-white/5"
            >
              <ArrowDownTrayIcon className="h-5 w-5" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1050px]">
          <thead className="bg-gray-50 dark:bg-white/5">
            <tr className="text-left text-sm text-gray-500 dark:text-gray-400">
              <th className="px-6 py-4 font-medium">Title</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Description</th>
              <th className="px-6 py-4 font-medium">Amount</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {expenses.length > 0 ? (
              expenses.map((expense) => {
                const status = getStatus(expense.date);

                return (
                  <tr
                    key={expense.id}
                    className="border-t border-gray-100 text-sm hover:bg-gray-50 dark:border-white/5 dark:hover:bg-white/5"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {expense.title}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getCategoryBadgeStyle(
                          expense.category
                        )}`}
                      >
                        {expense.category}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                      {expense.description}
                    </td>

                    <td className="px-6 py-4 font-semibold text-brand-600 dark:text-brand-400">
                      ${Number(expense.amount).toFixed(2)}
                    </td>

                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                      {expense.date}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => onEdit(expense)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-blue-600 hover:bg-blue-50 dark:border-white/10 dark:text-blue-300 dark:hover:bg-blue-500/10"
                        >
                          <PencilSquareIcon className="h-5 w-5" />
                        </button>

                        <button
                          onClick={() => onDelete(expense.id)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-red-600 hover:bg-red-50 dark:border-white/10 dark:text-red-300 dark:hover:bg-red-500/10"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-10 text-center text-sm text-gray-500 dark:text-gray-400"
                >
                  No expenses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default ExpenseTable;