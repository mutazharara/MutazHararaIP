import ExpenseCharts from "../components/ExpenseCharts";
import ReportsInsights from "../components/ReportsInsights";

function ReportsPage({ expenses = [] }) {
  return (
    <div className="space-y-6">

      <ReportsInsights expenses={expenses} />

      <ExpenseCharts expenses={expenses} />
    </div>
  );
}

export default ReportsPage;