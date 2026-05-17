import { useEffect, useMemo, useState } from "react";
import {
  ArrowPathIcon,
  MagnifyingGlassIcon,
  ArrowRightOnRectangleIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  TrashIcon,
  UserPlusIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

import { getAllActivities, getUsers } from "../services/api";

function UserActivityPage() {
  const [activities, setActivities] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAction, setFilterAction] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [activityData, usersData] = await Promise.all([
        getAllActivities(),
        getUsers(),
      ]);

      setActivities(activityData);
      setUsers(usersData);
    } catch (error) {
      console.error(error);
    }
  };

  const getUserById = (userId) => {
    return users.find((user) => user.id === userId);
  };

  const getActionMeta = (action) => {
    switch (action) {
      case "CREATE_EXPENSE":
        return {
          label: "created expense",
          icon: PlusCircleIcon,
          color: "text-green-600 bg-green-50",
        };

      case "UPDATE_EXPENSE":
        return {
          label: "updated expense",
          icon: PencilSquareIcon,
          color: "text-blue-600 bg-blue-50",
        };

      case "DELETE_EXPENSE":
        return {
          label: "deleted expense",
          icon: TrashIcon,
          color: "text-red-600 bg-red-50",
        };

      case "LOGIN":
        return {
          label: "logged in",
          icon: ArrowRightOnRectangleIcon,
          color: "text-purple-600 bg-purple-50",
        };

      case "REGISTER":
        return {
          label: "registered account",
          icon: UserPlusIcon,
          color: "text-orange-600 bg-orange-50",
        };

      default:
        return {
          label: action.toLowerCase(),
          icon: ArrowRightOnRectangleIcon,
          color: "text-gray-600 bg-gray-100",
        };
    }
  };

  const filteredActivities = useMemo(() => {
    return activities.filter((activity) => {
      const user = getUserById(activity.user_id);

      const search = searchTerm.toLowerCase();

      const matchesSearch =
        activity.description?.toLowerCase().includes(search) ||
        activity.action?.toLowerCase().includes(search) ||
        user?.name?.toLowerCase().includes(search) ||
        String(activity.user_id).includes(search);

      const matchesFilter =
        filterAction === "" || activity.action === filterAction;

      return matchesSearch && matchesFilter;
    });
  }, [activities, users, searchTerm, filterAction]);

  const groupedActivities = useMemo(() => {
    return filteredActivities.reduce((groups, activity) => {
      const date = new Date(activity.created_at);

      const dateKey = date.toLocaleDateString("en-AU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }

      groups[dateKey].push(activity);

      return groups;
    }, {});
  }, [filteredActivities]);

  const actionTypes = [...new Set(activities.map((a) => a.action))];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-gray-900">
      {/* Header */}
      <div className="border-b border-gray-200 p-6 dark:border-white/10">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              User Activity
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Monitor user actions, logins, and expense activity.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            {/* Search */}
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                placeholder="Search activity..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-11 py-3 text-sm outline-none focus:border-brand-500 dark:border-white/10 dark:bg-gray-950 dark:text-white sm:w-72"
              />
            </div>

            <div className="relative">
                {/* Filter */}
                <select
                value={filterAction}
                onChange={(e) => setFilterAction(e.target.value)}
                className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 pr-10 text-sm text-gray-700 outline-none focus:border-brand-500 dark:border-white/10 dark:bg-gray-950 dark:text-white"
                >
                <option value="">All Actions</option>

                {actionTypes.map((action) => (
                    <option key={action} value={action}>
                    {action.replaceAll("_", " ")}
                    </option>
                ))}
                </select>
                <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>

            {/* Refresh */}
            <button
              onClick={fetchData}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-white/10 dark:bg-gray-950 dark:text-white dark:hover:bg-white/5"
            >
              <ArrowPathIcon className="h-5 w-5" />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="p-6">
        {Object.keys(groupedActivities).length > 0 ? (
          <div className="space-y-8">
            {Object.entries(groupedActivities).map(
              ([date, dayActivities]) => (
                <div key={date}>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="h-px flex-1 bg-gray-200 dark:bg-white/10" />

                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      {date}
                    </p>

                    <div className="h-px flex-1 bg-gray-200 dark:bg-white/10" />
                  </div>

                  <div className="space-y-1">
                    {dayActivities.map((activity) => {
                      const user = getUserById(activity.user_id);

                      const meta = getActionMeta(activity.action);

                      const Icon = meta.icon;

                      return (
                        <div
                          key={activity.id}
                          className="group flex items-start gap-4 rounded-xl px-3 py-4 transition hover:bg-gray-50 dark:hover:bg-white/5"
                        >
                          {/* Avatar */}
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-sm font-bold text-brand-600 dark:bg-white/10 dark:text-white">
                            {user?.name?.charAt(0)?.toUpperCase() || "U"}
                          </div>

                          {/* Content */}
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2 text-sm">
                              <span className="font-semibold text-gray-900 dark:text-white">
                                {user?.name || "Unknown User"}
                              </span>
                              <div className="shrink-0 text-xs text-gray-400">
                              •
                              </div>
                               {/* Time */}
                                <div className="shrink-0 text-xs text-gray-400">
                                    {new Date(activity.created_at).toLocaleTimeString(
                                    [],
                                    {
                                        hour: "numeric",
                                        minute: "2-digit",
                                    }
                                    )}
                                </div>

                              
                            </div>

                            <div className="flex flex-wrap items-center gap-1 mt-1">
                                 
                                <span
                                className={`inline-flex items-center gap-1 rounded-full py-1 text-xs text-gray-500 dark:text-gray-400`}>
                                <Icon className="h-3.5 w-3.5" />

                                {activity.action.replaceAll("_", " ")} -
                              </span>
                                
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {activity.description}
                                </p>
                            </div>
                           
                          </div>

                         
                        </div>
                      );
                    })}
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No activity found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserActivityPage;