import { useEffect, useMemo, useState } from "react";
import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  ArrowPathIcon,
  KeyIcon,
  PowerIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import {
  getUsers,
  updateUserByAdmin,
  toggleUserStatus,
  resetUserPassword,
} from "../services/api";
import EditUserModal from "../components/EditUserModal";
import Pagination from "../components/Pagination";
import ConfirmActionModal from "../components/ConfirmActionModal";

function AdminUsersPage({ setToast, refreshKey  }) {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmAction, setConfirmAction] = useState(null);

  const usersPerPage = 8;

  useEffect(() => {
    fetchUsers();
  }, [refreshKey]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, roleFilter, statusFilter]);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        user.name?.toLowerCase().includes(search) ||
        user.email?.toLowerCase().includes(search) ||
        String(user.id).includes(search);

      const matchesRole = roleFilter === "" || user.role === roleFilter;

      const matchesStatus =
        statusFilter === "" ||
        (statusFilter === "active" && user.is_active) ||
        (statusFilter === "disabled" && !user.is_active);

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchTerm, roleFilter, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredUsers.length / usersPerPage)
  );

  const startIndex = (currentPage - 1) * usersPerPage;

  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + usersPerPage
  );

  const handleUpdateUser = async (userId, data) => {
    try {
      const updatedUser = await updateUserByAdmin(userId, data);

      setUsers((prev) =>
        prev.map((user) => (user.id === userId ? updatedUser : user))
      );

      setEditingUser(null);
      setToast?.({ type: "success", message: "User updated successfully" });
    } catch (error) {
      setToast?.({ type: "error", message: "Failed to update user" });
    }
  };

  const handleToggleStatus = async (userId) => {
    try {
      const updatedUser = await toggleUserStatus(userId);

      setUsers((prev) =>
        prev.map((user) => (user.id === userId ? updatedUser : user))
      );

      setToast?.({ type: "success", message: "User status updated" });
    } catch (error) {
      setToast?.({ type: "error", message: "Failed to update status" });
    }
  };

  const handleResetPassword = async (userId) => {
    try {
      const res = await resetUserPassword(userId);

      setToast?.({
        type: "success",
        message: res.message || "Password reset successfully",
      });
    } catch (error) {
      setToast?.({ type: "error", message: "Failed to reset password" });
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-gray-900">
      <div className="flex flex-col gap-4 border-b border-gray-200 p-6 dark:border-white/10 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            All Users{" "} 
            <span className="font-normal text-gray-400">({filteredUsers.length})</span>
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Search, filter, and manage registered user accounts.
          </p>
        </div>

        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-11 py-3 text-sm outline-none focus:border-brand-500 dark:border-white/10 dark:bg-gray-950 dark:text-white lg:w-72"
            />
          </div>

         <div className="relative">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 pr-10 text-sm outline-none focus:border-brand-500 dark:border-white/10 dark:bg-gray-950 dark:text-white"
          >
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>
            <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 pr-10 text-sm outline-none focus:border-brand-500 dark:border-white/10 dark:bg-gray-950 dark:text-white"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="disabled">Disabled</option>
          </select>
          <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>
          <button
            onClick={fetchUsers}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold hover:bg-gray-50 dark:border-white/10 dark:text-white dark:hover:bg-white/5"
          >
            <ArrowPathIcon className="h-5 w-5" />
            Refresh
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px] text-left">
          <thead className="bg-gray-50 dark:bg-white/5">
            <tr className="text-sm text-gray-500 dark:text-gray-400">
              <th className="px-6 py-4 font-semibold">User</th>
              <th className="px-6 py-4 font-semibold">Email</th>
              <th className="px-6 py-4 font-semibold">Role</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedUsers.map((user) => (
              <tr
                key={user.id}
                className="border-t border-gray-100 text-sm dark:border-white/10"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 font-bold text-brand-600 dark:bg-white/10 dark:text-white">
                      {user.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {user.name}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">{user.email}</td>

                <td className="px-6 py-4">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-indigo-500/10 dark:text-indigo-300">
                    {user.role}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      user.is_active
                        ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-300"
                        : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-300"
                    }`}
                  >
                    {user.is_active ? "Active" : "Disabled"}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingUser(user)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-blue-600 hover:bg-blue-50 dark:border-white/10 dark:text-blue-300 dark:hover:bg-blue-500/10"
                      title="Edit user"
                    >
                      <PencilSquareIcon className="h-5 w-5" />
                    </button>

                    <button
                        onClick={() =>
                            setConfirmAction({
                            type: "reset",
                            user,
                            })
                        }
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-orange-600 hover:bg-orange-50 dark:border-white/10 dark:text-orange-300 dark:hover:bg-orange-500/10"
                        title="Reset password"
                        >
                        <KeyIcon className="h-5 w-5" />
                    </button>

                    <button
                        onClick={() =>
                            setConfirmAction({
                            type: "status",
                            user,
                            })
                        }
                        className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 ${
                            user.is_active
                            ? "text-red-600 hover:bg-red-50 dark:border-white/10 dark:text-red-300 dark:hover:bg-red-500/10"
                            : "text-green-600 hover:bg-green-50 dark:border-white/10 dark:text-green-300 dark:hover:bg-green-500/10"
                        }`}
                        title={user.is_active ? "Deactivate user" : "Activate user"}
                        >
                        <PowerIcon className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />

      <EditUserModal
        isOpen={!!editingUser}
        user={editingUser}
        onClose={() => setEditingUser(null)}
        onUpdate={handleUpdateUser}
      />
      <ConfirmActionModal
            isOpen={!!confirmAction}
            title={
                confirmAction?.type === "reset"
                ? "Reset Password"
                : confirmAction?.user?.is_active
                ? "Deactivate User"
                : "Activate User"
            }
            message={
                confirmAction?.type === "reset"
                ? `Are you sure you want to reset the password for ${confirmAction?.user?.name}? A temporary password will be generated.`
                : confirmAction?.user?.is_active
                ? `Are you sure you want to deactivate ${confirmAction?.user?.name}? They will no longer be able to access the system.`
                : `Are you sure you want to activate ${confirmAction?.user?.name}? They will be able to access the system again.`
            }
            confirmText={
                confirmAction?.type === "reset"
                ? "Reset Password"
                : confirmAction?.user?.is_active
                ? "Deactivate"
                : "Activate"
            }
            confirmTone={
                confirmAction?.type === "reset"
                ? "primary"
                : confirmAction?.user?.is_active
                ? "danger"
                : "primary"
            }
            onClose={() => setConfirmAction(null)}
            onConfirm={async () => {
                if (confirmAction?.type === "reset") {
                await handleResetPassword(confirmAction.user.id);
                }

                if (confirmAction?.type === "status") {
                await handleToggleStatus(confirmAction.user.id);
                }

                setConfirmAction(null);
            }}
            />
    </div>
  );
}

export default AdminUsersPage;