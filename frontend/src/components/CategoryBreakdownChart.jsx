import { useMemo } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { ChartPieIcon } from "@heroicons/react/24/outline";

function CategoryBreakdownChart({ expenses = [] }) {
  const COLORS = [
    "#22c55e",
    "#3b82f6",
    "#a855f7",
    "#ef4444",
    "#ec4899",
    "#14b8a6",
    "#eab308",
    "#f97316",
    "#6366f1",
    "#06b6d4",
    "#84cc16",
    "#f43f5e",
  ];

  const categoryColorMap = {
    Food: "#22c55e",
    Transport: "#3b82f6",
    Shopping: "#a855f7",
    Bills: "#ef4444",
    Entertainment: "#ec4899",
    Health: "#14b8a6",
    Education: "#eab308",
    Housing: "#f97316",
    Subscriptions: "#6366f1",
    Travel: "#06b6d4",
    Other: "#6b7280",
  };

  const {
    pieData,
    topCategory,
    currentMonthLabel,
  } = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const currentMonthExpenses = expenses.filter((expense) => {
      const dateObj = new Date(expense.date);
      if (Number.isNaN(dateObj.getTime())) return false;

      return (
        dateObj.getMonth() === currentMonth &&
        dateObj.getFullYear() === currentYear
      );
    });

    const categoryTotalsMap = {};

    currentMonthExpenses.forEach((expense) => {
      const category = expense.category || "Other";
      const amount = Number(expense.amount || 0);

      if (!categoryTotalsMap[category]) {
        categoryTotalsMap[category] = 0;
      }

      categoryTotalsMap[category] += amount;
    });

    const pieDataArray = Object.entries(categoryTotalsMap)
      .filter(([, value]) => value > 0)
      .map(([name, value]) => ({
        name,
        value,
      }))
      .sort((a, b) => b.value - a.value);

    const topCategoryValue = pieDataArray.length > 0 ? pieDataArray[0] : null;

    const totalSpending = pieDataArray.reduce((sum, item) => sum + item.value, 0);

    const avgExpense =
      currentMonthExpenses.length > 0
        ? totalSpending / currentMonthExpenses.length
        : 0;

    const monthLabel = now.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });

    return {
      pieData: pieDataArray,
      topCategory: topCategoryValue,
      totalCurrentMonthSpending: totalSpending,
      currentMonthLabel: monthLabel,
    };
  }, [expenses]);

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;

    return (
      <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-lg dark:border-white/10 dark:bg-gray-900">
        {payload.map((entry, index) => (
          <p
            key={index}
            className="text-sm text-gray-600 dark:text-gray-300"
          >
            {entry.name}:{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              ${Number(entry.value).toFixed(2)}
            </span>
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-gray-900">
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="mb-5 flex items-start gap-3">
                <div className="rounded-xl bg-gray-100 p-3 dark:bg-white/5">
                <ChartPieIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </div>

                <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Category Breakdown
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Current month - ({currentMonthLabel}) spending distribution
                </p>
                </div>
            </div>
            <div className="">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {topCategory
                    ? ` $${topCategory.value.toFixed(2)} `
                    : "No data"} 
                   
                    
                </h3>
                 <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300`}
                      >
                        {topCategory
                    ? `${topCategory.name}`
                    : "No data"} - Top Category
                      </span>
            </div>
        </div>

      <div className="h-[300px]">
        {pieData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={105}
                innerRadius={55}
                paddingAngle={3}
                labelLine={false}
                label={({ name }) => name}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={categoryColorMap[entry.name] || COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="bottom"
                height={36}
                wrapperStyle={{
                  fontSize: "12px",
                  paddingTop: "10px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-500 dark:text-gray-400">
            No category data available for the current month.
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryBreakdownChart;