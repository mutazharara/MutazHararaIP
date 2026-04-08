import CategoryBreakdownChart from "./CategoryBreakdownChart";
import MonthlyExpenseTrendChart from "./MonthlyExpenseTrendChart";

function ExpenseCharts({ expenses = [] }) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
      <CategoryBreakdownChart expenses={expenses} />
      <MonthlyExpenseTrendChart expenses={expenses} />
    </div>
  );
}

export default ExpenseCharts;