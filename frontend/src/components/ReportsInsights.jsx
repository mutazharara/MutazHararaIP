function ReportsInsights({ expenses = [] }) {
  const currentYear = new Date().getFullYear();
  const now = new Date();
  const currentMonth = now.getMonth();

  const currentYearExpenses = expenses.filter((expense) => {
    const dateObj = new Date(expense.date);
    return !Number.isNaN(dateObj.getTime()) && dateObj.getFullYear() === currentYear;
  });

  const totalThisYear = currentYearExpenses.reduce(
    (sum, expense) => sum + Number(expense.amount || 0),
    0
  );

  const averageExpense =
    currentYearExpenses.length > 0
      ? totalThisYear / currentYearExpenses.length
      : 0;

  const categoryTotals = currentYearExpenses.reduce((acc, expense) => {
    const category = expense.category || "Other";
    acc[category] = (acc[category] || 0) + Number(expense.amount || 0);
    return acc;
  }, {});

  const topCategoryEntry = Object.entries(categoryTotals).sort(
    (a, b) => b[1] - a[1]
  )[0];

  const topCategory = topCategoryEntry
    ? { name: topCategoryEntry[0], amount: topCategoryEntry[1] }
    : { name: "No data", amount: 0 };

  const largestExpense =
    currentYearExpenses.length > 0
      ? [...currentYearExpenses].sort(
          (a, b) => Number(b.amount || 0) - Number(a.amount || 0)
        )[0]
      : null;

  const monthTotals = currentYearExpenses.reduce((acc, expense) => {
    const dateObj = new Date(expense.date);
    const month = dateObj.toLocaleString("en-US", { month: "long" });
    acc[month] = (acc[month] || 0) + Number(expense.amount || 0);
    return acc;
  }, {});

  const mostActiveMonthEntry = Object.entries(monthTotals).sort(
    (a, b) => b[1] - a[1]
  )[0];

  const mostActiveMonth = mostActiveMonthEntry
    ? { name: mostActiveMonthEntry[0], amount: mostActiveMonthEntry[1] }
    : { name: "No data", amount: 0 };

  const categoriesUsed = Object.keys(categoryTotals).length;

  const currentMonthTotal = currentYearExpenses
    .filter((expense) => {
      const dateObj = new Date(expense.date);
      return dateObj.getMonth() === currentMonth;
    })
    .reduce((sum, expense) => sum + Number(expense.amount || 0), 0);

  const previousMonthTotal = currentYearExpenses
    .filter((expense) => {
      const dateObj = new Date(expense.date);
      return dateObj.getMonth() === currentMonth - 1;
    })
    .reduce((sum, expense) => sum + Number(expense.amount || 0), 0);

  let spendingTrend = "Stable";
  let spendingTrendSubvalue = "No major change";

  if (currentMonthTotal > previousMonthTotal) {
    const increase = currentMonthTotal - previousMonthTotal;
    spendingTrend = "Increasing";
    spendingTrendSubvalue = `+$${increase.toFixed(2)} vs last month`;
  } else if (currentMonthTotal < previousMonthTotal) {
    const decrease = previousMonthTotal - currentMonthTotal;
    spendingTrend = "Decreasing";
    spendingTrendSubvalue = `-$${decrease.toFixed(2)} vs last month`;
  }

  const insightCards = [
    {
      title: "Top Category",
      value: topCategory.name,
      subvalue: `$${Number(topCategory.amount).toFixed(2)}`,
    },
    {
      title: "Largest Expense",
      value: largestExpense ? largestExpense.title : "No data",
      subvalue: largestExpense
        ? `$${Number(largestExpense.amount).toFixed(2)}`
        : "$0.00",
    },
    {
      title: "Average Expense",
      value: `$${averageExpense.toFixed(2)}`,
      subvalue: `${currentYearExpenses.length} transactions`,
    },
    {
      title: "Most Active Month",
      value: mostActiveMonth.name,
      subvalue: `$${Number(mostActiveMonth.amount).toFixed(2)}`,
    },
    {
      title: "Total This Year",
      value: `$${totalThisYear.toFixed(2)}`,
      subvalue: `${currentYear}`,
    },
    {
      title: "Spending Trend",
      value: spendingTrend,
      subvalue: spendingTrendSubvalue,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {insightCards.map((card) => (
        <div
          key={card.title}
          className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-gray-900"
        >
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {card.title}
          </p>

          <p className="mt-3 text-xl font-bold text-gray-900 dark:text-white">
            {card.value}
          </p>

          <p className="mt-1 text-sm text-brand-600 dark:text-brand-400">
            {card.subvalue}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ReportsInsights;