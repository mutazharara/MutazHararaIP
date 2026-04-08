import {
  ChartPieIcon,
  Cog6ToothIcon,
  HomeIcon,
  MoonIcon,
  SunIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";

function Sidebar({
  darkMode,
  toggleDarkMode,
  activeSection,
  setActiveSection,
}) {
  const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: HomeIcon },
    { key: "expenses", label: "Expenses", icon: WalletIcon },
    { key: "reports", label: "Reports", icon: ChartPieIcon },
    { key: "settings", label: "Settings", icon: Cog6ToothIcon },
  ];

  const itemClass =
    "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition";
  const inactiveClass =
    "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white";
  const activeClass =
    "bg-brand-50 text-brand-700 dark:bg-white/10 dark:text-white";

  return (
    <aside className="w-72 border-r border-gray-200 bg-white px-5 py-6 dark:border-white/10 dark:bg-gray-900">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
            Finance Dashboard
          </p>
          <h2 className="mt-2 text-2xl font-bold text-brand-600 dark:text-white">
            Mamo Family
          </h2>
        </div>

        <button
          onClick={toggleDarkMode}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-white/10 dark:text-gray-200 dark:hover:bg-white/5"
        >
          {darkMode ? (
            <SunIcon className="h-5 w-5" />
          ) : (
            <MoonIcon className="h-5 w-5" />
          )}
        </button>
      </div>

      <nav className="mt-10 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.key;

          return (
            <button
              key={item.key}
              onClick={() => setActiveSection(item.key)}
              className={`${itemClass} ${
                isActive ? activeClass : inactiveClass
              }`}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50 p-4 dark:border-white/10 dark:bg-white/5">
        <p className="text-sm font-semibold text-brand-700 dark:text-white">
          Assignment 1
        </p>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Mutaz S M Harara - 26249918
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;