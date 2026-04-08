import {
  BanknotesIcon,
  CalendarDaysIcon,
  TagIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  tone = "default",
}) {
    const tones = {
    default:
        "bg-white border-gray-200 text-gray-900 dark:bg-gray-900 dark:border-white/10 dark:text-white",

    brand:
        "bg-white border-gray-200 text-brand-600 dark:bg-gray-900 dark:border-white/10 dark:text-brand-400",

    success:
        "bg-white border-gray-200 text-blue-600 dark:bg-gray-900 dark:border-white/10 dark:text-blue-400",

    danger:
        "bg-white border-gray-200 text-blue-600 dark:bg-gray-900 dark:border-white/10 dark:text-blue-400",
    };

  return (
    <div
      className={`rounded-2xl border p-5 shadow-sm hover:shadow-md transition ${tones[tone]}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </p>

          <p className="mt-3 text-2xl font-bold">
            {value}
          </p>

          {subtitle && (
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>

        <div className="rounded-xl bg-gray-100 p-3 dark:bg-white/5">
          <Icon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        </div>
      </div>
    </div>
  );
}

function SummaryCards({
  totalExpenses = 0,
  monthlyExpenses = 0,
  topCategory = { name: "No data", amount: 0 },
  totalTransactions = 0,
}) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        title="Total Expenses"
        value={`$${totalExpenses.toFixed(2)}`}
        icon={CurrencyDollarIcon}
        tone="danger"
      />

      <MetricCard
        title="Monthly Expenses"
        value={`$${monthlyExpenses.toFixed(2)}`}
        icon={CalendarDaysIcon}
      />

      <MetricCard
        title="Top Category"
        value={topCategory.name}
        subtitle={`$${Number(topCategory.amount).toFixed(2)}`}
        icon={TagIcon}
        tone="brand"
      />

      <MetricCard
        title="Total Transactions"
        value={totalTransactions}
        icon={BanknotesIcon}
      />
    </div>
  );
}

export default SummaryCards;