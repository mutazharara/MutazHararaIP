import {
  ChartPieIcon,
  Cog6ToothIcon,
  HomeIcon,
  MoonIcon,
  SunIcon,
  WalletIcon,
  UserCircleIcon,
  UsersIcon,
  ClockIcon,
  ChevronRightIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

function Sidebar({
  darkMode,
  toggleDarkMode,
  activeSection,
  setActiveSection,
  user,
  onLogout,
}) {
  const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: HomeIcon },
    { key: "expenses", label: "Expenses", icon: WalletIcon },
    { key: "reports", label: "Reports", icon: ChartPieIcon },
    { key: "settings", label: "Settings", icon: Cog6ToothIcon },
  ];

  const adminItems = [
    { key: "admin-users", label: "Users", icon: UsersIcon },
    { key: "activity", label: "Activity", icon: ClockIcon },
  ];

  const finalMenuItems =
    user?.role === "admin" ? [...menuItems, ...adminItems] : menuItems;

  const itemClass =
    "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition";
  const inactiveClass =
    "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white";
  const activeClass =
    "bg-brand-50 text-brand-700 dark:bg-white/10 dark:text-white";

  return (
    <aside className="sticky top-0 flex h-screen w-72 shrink-0 flex-col overflow-y-auto border-r border-gray-200 bg-white px-5 py-6 dark:border-white/10 dark:bg-gray-900">
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

      <nav className="mt-8 flex-1 space-y-2">
        {finalMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.key;

          return (
            <button
              key={item.key}
              onClick={() => setActiveSection(item.key)}
              className={`${itemClass} ${isActive ? activeClass : inactiveClass}`}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </button>
          );
        })}
      </nav>
      {user && (
        <button
          onClick={() => setActiveSection("profile")}
          className="my-2 w-full rounded-2xl p-2 text-left transition hover:border-brand-200 hover:bg-brand-50 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
        >

          <div className="flex items-center gap-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700 dark:bg-white/10 dark:text-white">
              {user.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                {user.name}
              </p>
              <p className="mt-1 truncate text-xs text-gray-500 dark:text-gray-400">
                {user.email}
              </p>
            </div>

            <ChevronRightIcon className="h-4 w-4 text-gray-400" />
          </div>
        </button>
      )}

      <button
        onClick={onLogout}
        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-500/10"
      >
        <ArrowRightOnRectangleIcon className="h-5 w-5" />
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;