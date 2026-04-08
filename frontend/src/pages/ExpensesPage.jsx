import ExpenseTable from "../components/ExpenseTable";

function ExpensesPage({
  expenses,
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
}) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-gray-900">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Expenses
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          View, search, filter, edit, and manage all expense records.
        </p>
      </div>

      <ExpenseTable
        expenses={expenses}
        onDelete={onDelete}
        onEdit={onEdit}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        exportToCSV={exportToCSV}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default ExpensesPage;