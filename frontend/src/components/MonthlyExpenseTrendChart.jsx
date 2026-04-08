import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartBarIcon } from "@heroicons/react/24/outline";

function MonthlyExpenseTrendChart({ expenses = [] }) {
  const RANGE_OPTIONS = [3, 6, 8, 12];
  const [trendMonths, setTrendMonths] = useState(6);

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

 const allMonthRows = useMemo(() => {
  const currentYear = new Date().getFullYear();

  const monthLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthRows = monthLabels.map((label, index) => ({
    monthKey: `${currentYear}-${String(index + 1).padStart(2, "0")}`,
    month: label,
  }));

  const currentYearExpenses = expenses.filter((expense) => {
    const dateObj = new Date(expense.date);
    if (Number.isNaN(dateObj.getTime())) return false;
    return dateObj.getFullYear() === currentYear;
  });

  currentYearExpenses.forEach((expense) => {
    const amount = Number(expense.amount || 0);
    const category = expense.category || "Other";
    const dateObj = new Date(expense.date);

    const monthIndex = dateObj.getMonth();
    const row = monthRows[monthIndex];

    if (!row[category]) {
      row[category] = 0;
    }

    row[category] += amount;
  });

  return monthRows;
}, [expenses]);

  const { visibleTrendData, visibleCategories, highestMonth, largestExpense } =
    useMemo(() => {
      const visibleCount = Math.min(trendMonths, allMonthRows.length);

        const currentMonthIndex = new Date().getMonth(); // 0 = Jan, 11 = Dec
        const halfWindow = Math.floor(visibleCount / 2);

        let startIndex = currentMonthIndex - halfWindow;
        let endIndex = startIndex + visibleCount;

        // prevent going below January
        if (startIndex < 0) {
        startIndex = 0;
        endIndex = visibleCount;
        }

        // prevent going beyond December
        if (endIndex > allMonthRows.length) {
        endIndex = allMonthRows.length;
        startIndex = endIndex - visibleCount;
        }

        const visibleRows = allMonthRows.slice(startIndex, endIndex);

      const visibleCategorySet = new Set();

      visibleRows.forEach((row) => {
        Object.keys(row).forEach((key) => {
          if (key !== "month" && key !== "monthKey" && Number(row[key]) > 0) {
            visibleCategorySet.add(key);
          }
        });
      });

      const categories = Array.from(visibleCategorySet);

      const cleanedRows = visibleRows.map((row) => {
        const cleanRow = {
          month: row.month,
          monthKey: row.monthKey,
        };

        categories.forEach((category) => {
          cleanRow[category] = Number(row[category] || 0);
        });

        return cleanRow;
      });

      const highestMonthValue =
        cleanedRows.length > 0
          ? cleanedRows
              .map((row) => {
                const total = categories.reduce(
                  (sum, category) => sum + Number(row[category] || 0),
                  0
                );

                return {
                  month: row.month,
                  amount: total,
                };
              })
              .sort((a, b) => b.amount - a.amount)[0]
          : null;

      const expensesInRange = expenses.filter((expense) => {
        const dateObj = new Date(expense.date);
        if (Number.isNaN(dateObj.getTime())) return false;

        const monthKey = `${dateObj.getFullYear()}-${String(
          dateObj.getMonth() + 1
        ).padStart(2, "0")}`;

        return visibleRows.some((row) => row.monthKey === monthKey);
      });

      const largestExpenseValue =
        expensesInRange.length > 0
          ? [...expensesInRange].sort(
              (a, b) => Number(b.amount || 0) - Number(a.amount || 0)
            )[0]
          : null;

      return {
        visibleTrendData: cleanedRows,
        visibleCategories: categories,
        highestMonth: highestMonthValue,
        largestExpense: largestExpenseValue,
      };
    }, [expenses, allMonthRows, trendMonths]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;

    return (
      <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-lg dark:border-white/10 dark:bg-gray-900">
        <p className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
          {label}
        </p>

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
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-gray-100 p-3 dark:bg-white/5">
            <ChartBarIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Monthly Expense Trend
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Category trends by selected month range
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {RANGE_OPTIONS.map((range) => (
            <button
                key={range}
                onClick={() => setTrendMonths(range)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                trendMonths === range
                    ? "bg-brand-600 text-white"
                    : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 dark:border-white/10 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-white/5"
                }`}
            >
                {range}M
            </button>
            ))}
        </div>
      </div>

      <div className="h-[340px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={visibleTrendData}
            margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
          >
            <defs>
              {visibleCategories.map((category, index) => {
                const color =
                  categoryColorMap[category] || COLORS[index % COLORS.length];

                return (
                  <linearGradient
                    key={category}
                    id={`fill-${category}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor={color} stopOpacity={0.28} />
                    <stop offset="95%" stopColor={color} stopOpacity={0.04} />
                  </linearGradient>
                );
              })}
            </defs>

            <CartesianGrid
              strokeDasharray="4 4"
              stroke="rgba(156,163,175,0.25)"
            />

            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: "#6B7280" }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fontSize: 12, fill: "#6B7280" }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip content={<CustomTooltip />} />

            <Legend
              verticalAlign="bottom"
              height={30}
              wrapperStyle={{
                fontSize: "12px",
              }}
            />

            {visibleCategories.map((category, index) => {
              const color =
                categoryColorMap[category] || COLORS[index % COLORS.length];

              return (
                <Area
                  key={category}
                  type="monotone"
                  dataKey={category}
                  stroke={color}
                  fill={`url(#fill-${category})`}
                  strokeWidth={3}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              );
            })}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default MonthlyExpenseTrendChart;