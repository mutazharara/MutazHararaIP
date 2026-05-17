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
  setCurrentPage,
  categories = [],
}) {
  // Expenses page pagination only
  const expensesPerPage = 9;

  const startIndex = (currentPage - 1) * expensesPerPage;

  const paginatedExpenses = expenses.slice(
    startIndex,
    startIndex + expensesPerPage
  );

  const totalPages = Math.ceil(
    expenses.length / expensesPerPage
  );

  return (
    <div className="space-y-6">

      <ExpenseTable
        expenses={paginatedExpenses}
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
        categories={categories}
      />
    </div>
  );
}

export default ExpensesPage;