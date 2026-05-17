import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import SummaryCards from "../components/SummaryCards";
import ExpenseTable from "../components/ExpenseTable";
import AddExpenseModal from "../components/AddExpenseModal";
import ExpenseCharts from "../components/ExpenseCharts";
import Pagination from "../components/Pagination";
import api from "../services/api";
import Toast from "../components/Toast";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import ExpensesPage from "../pages/ExpensesPage";
import SettingsPage from "../pages/SettingsPage";
import ReportsPage from "../pages/ReportsPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import UserProfilePage from "./UserProfilePage";
import AdminUsersPage from "./AdminUsersPage";
import UserActivityPage from "./UserActivityPage";
import AddUserModal from "../components/AddUserModal";
import VoiceExpenseButton from "../components/VoiceExpenseButton";


function DashboardPage() {
  const [user, setUser] = useState(() => {
  const savedUser = localStorage.getItem("user");
  return savedUser ? JSON.parse(savedUser) : null;
  });
  const [authPage, setAuthPage] = useState("login");
  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  setUser(null);
  setActiveSection("dashboard");
  setToast({ type: "success", message: "Logged out successfully" });
  };

  const [editingExpense, setEditingExpense] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [activeSection, setActiveSection] = useState("dashboard");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  const [usersRefreshKey, setUsersRefreshKey] = useState(0);

  const [voiceExpenseData, setVoiceExpenseData] = useState(null);

  const expensesPerPage = 5;
  const budgetLimit = 5000;
  
  const [darkMode, setDarkMode] = useState(() => {
  return localStorage.getItem("theme") === "dark";
});

const [categories, setCategories] = useState(() => {
  const savedCategories = localStorage.getItem("categories");

  if (savedCategories) {
    return JSON.parse(savedCategories);
  }

  return [
    "Food",
    "Transport",
    "Shopping",
    "Bills",
    "Entertainment",
    "Health",
    "Education",
    "Housing",
    "Subscriptions",
    "Travel",
    "Other",
  ];
});

const getPageMeta = () => {
  switch (activeSection) {
    case "dashboard":
      return {
        title: "Dashboard",
        breadcrumbs: ["Home", "Dashboard"],
      };

    case "expenses":
      return {
        title: "Expenses",
        breadcrumbs: ["Home", "Expenses"],
      };

    case "reports":
      return {
        title: "Reports",
        breadcrumbs: ["Home", "Reports"],
      };

    case "settings":
      return {
        title: "Settings",
        breadcrumbs: ["Home", "Settings"],
      };

    case "profile":
      return {
        title: "Profile",
        breadcrumbs: ["Home", "Profile"],
      };

    case "activity":
      return {
        title: "Activity",
        breadcrumbs: ["Home", "Activity"],
      };

    default:
      return {
        title: "Users",
        breadcrumbs: ["Home", "Users"],
      };
  }
};

  const { title, breadcrumbs } = getPageMeta();

  const fetchExpenses = async () => {
    try {
      const res = await api.get("/expenses/");
      setExpenses(res.data);
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
    }
  };

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);


  useEffect(() => {
    if (user) {
      fetchExpenses();
    }
  }, [user]);


useEffect(() => {
  localStorage.setItem("theme", darkMode ? "dark" : "light");
  if (darkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}, [darkMode]);

  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");

    if (savedExpenses) {
      return JSON.parse(savedExpenses);
    }

    return [
      {
        id: 1,
        title: "Grocery Store",
        category: "Food",
        amount: 85.5,
        date: "2025-05-28",
        description: "Weekly groceries",
      },
      {
        id: 2,
        title: "Gas Station",
        category: "Transport",
        amount: 45.2,
        date: "2025-06-15",
        description: "Fuel refill",
      },
      {
        id: 3,
        title: "Netflix",
        category: "Subscriptions",
        amount: 19.99,
        date: "2025-06-20",
        description: "Monthly subscription",
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, sortOption]);

  const addExpense = async (newExpense) => {
    try {
      await api.post("/expenses/", {
        title: newExpense.title,
        category: newExpense.category,
        amount: Number(newExpense.amount),
        date: newExpense.date,
        description: newExpense.description,
      });

      await fetchExpenses();

      setCurrentPage(1);

      setToast({
        type: "success",
        message: "Expense added successfully",
      });
    } catch (error) {
      console.error(error);

      setToast({
        type: "error",
        message: "Failed to add expense",
      });
    }
  };

    const deleteExpense = async (id) => {
    try {
        await api.delete(`/expenses/${id}`);
        setExpenses((prev) => prev.filter((expense) => expense.id !== id));
        setToast({ type: "success", message: "Expense deleted successfully" });
    } catch (error) {
        console.error(error);
        setToast({ type: "error", message: "Failed to delete expense" });
    }
    };

    const updateExpense = async (updatedExpense) => {
      try {
        await api.put(`/expenses/${updatedExpense.id}`, {
          title: updatedExpense.title,
          category: updatedExpense.category,
          amount: Number(updatedExpense.amount),
          date: updatedExpense.date,
          description: updatedExpense.description,
        });

        await fetchExpenses();

        setToast({
          type: "success",
          message: "Expense updated successfully",
        });
      } catch (error) {
        console.error(error);

        setToast({
          type: "error",
          message: "Failed to update expense",
        });
      }
    };

  const editExpense = (expense) => {
    setEditingExpense(expense);
    setIsModalOpen(true);
  };

  const filteredExpenses = useMemo(() => {
    let result = expenses.filter((expense) => {
      const title = String(expense.title || "").toLowerCase();
      const description = String(expense.description || "").toLowerCase();
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        title.includes(search) || description.includes(search);

      const matchesCategory =
        selectedCategory === "" || expense.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    if (sortOption === "amount-low-high") {
      result = [...result].sort((a, b) => Number(a.amount) - Number(b.amount));
    }

    if (sortOption === "amount-high-low") {
      result = [...result].sort((a, b) => Number(b.amount) - Number(a.amount));
    }

    if (sortOption === "date-newest") {
      result = [...result].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
    }

    if (sortOption === "date-oldest") {
      result = [...result].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
    }

    return result;
  }, [expenses, searchTerm, selectedCategory, sortOption]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredExpenses.length / expensesPerPage)
  );

  const startIndex = (currentPage - 1) * expensesPerPage;
  const paginatedExpenses = filteredExpenses.slice(
    startIndex,
    startIndex + expensesPerPage
  );

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount || 0),
    0
  );

  const totalTransactions = expenses.length;

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyExpenses = expenses
    .filter((expense) => {
      const expenseDate = new Date(expense.date);
      return (
        expenseDate.getMonth() === currentMonth &&
        expenseDate.getFullYear() === currentYear
      );
    })
    .reduce((sum, expense) => sum + Number(expense.amount || 0), 0);

  const budgetRemaining = budgetLimit - totalExpenses;

  const exportToCSV = () => {
    const headers = ["Title", "Category", "Amount", "Date", "Description"];

    const rows = filteredExpenses.map((expense) => [
      expense.title,
      expense.category,
      expense.amount,
      expense.date,
      expense.description,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((item) => `"${item ?? ""}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const categoryTotals = expenses.reduce((acc, expense) => {
  const category = expense.category || "Other";
  const amount = Number(expense.amount || 0);

  if (!acc[category]) {
    acc[category] = 0;
  }

  acc[category] += amount;

  return acc;
}, {});

const topCategoryEntry = Object.entries(categoryTotals).sort(
  (a, b) => b[1] - a[1]
)[0];

const topCategory = topCategoryEntry
  ? {
      name: topCategoryEntry[0],
      amount: topCategoryEntry[1],
    }
  : {
      name: "No data",
      amount: 0,
    };

  const recentExpenses = [...expenses]
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .slice(0, 5);

  if (!user) {
  return (
    <>
      {authPage === "login" ? (
        <LoginPage
          setUser={setUser}
          setToast={setToast}
          goToRegister={() => setAuthPage("register")}
        />
      ) : (
        <RegisterPage
          setToast={setToast}
          goToLogin={() => setAuthPage("login")}
        />
      )}

      <Toast toast={toast} onClose={() => setToast(null)} />
    </>
  );
}


 
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-950">
      <Sidebar
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode((prev) => !prev)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        user={user}
        onLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col">
        <div className="p-6">
          <VoiceExpenseButton
   setExpenseData={setVoiceExpenseData}
   setIsModalOpen={setIsModalOpen}
   setToast={setToast}
/>

          <Topbar
            title={title}
            breadcrumbs={breadcrumbs}
            buttonLabel={
              activeSection === "admin-users"
                ? "Add User"
                : "Add Expense"
            }
            onAddExpense={() => {
              if (activeSection === "admin-users") {
                setIsAddUserOpen(true);
              } else {
                setIsModalOpen(true);
              }
            }}
          />

                    {activeSection === "dashboard" && (
            <>
                <SummaryCards
                totalExpenses={totalExpenses}
                monthlyExpenses={monthlyExpenses}
                topCategory={topCategory}
                totalTransactions={totalTransactions}
                />

                <ExpenseCharts expenses={expenses} />

                <ExpenseTable
                expenses={paginatedExpenses}
                onDelete={(id) => setDeleteTarget(id)}
                onEdit={editExpense}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                exportToCSV={exportToCSV}
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                categories={categories}
                />
            </>
            )}


            {activeSection === "profile" && (
              <UserProfilePage
                user={user}
                setUser={setUser}
                setToast={setToast}
              />
            )}

            {activeSection === "activity" && (
              <UserActivityPage />
            )}

            {activeSection === "admin-users" && user?.role === "admin" && (
              <AdminUsersPage setToast={setToast} refreshKey={usersRefreshKey} />
            )}

                {activeSection === "expenses" && (
                 <ExpensesPage
                    expenses={filteredExpenses}
                    onDelete={(id) => setDeleteTarget(id)}
                    onEdit={editExpense}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    exportToCSV={exportToCSV}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    categories={categories}
                  />
                )}

                {activeSection === "reports" && (
                    <ReportsPage expenses={expenses} />
                )}

                 {activeSection === "settings" && (
                    <SettingsPage
                        categories={categories}
                        setCategories={setCategories}
                        expenses={expenses}
                        setExpenses={setExpenses}
                        setToast={setToast}
                    />
                    )}

            <DeleteConfirmModal
            isOpen={!!deleteTarget}
            onClose={() => setDeleteTarget(null)}
            onConfirm={async () => {
                await deleteExpense(deleteTarget);
                setDeleteTarget(null);
            }}
            />

        </div>

        <AddExpenseModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingExpense(null);
            setVoiceExpenseData(null);
          }}
          onAdd={addExpense}
          onUpdate={updateExpense}
          editingExpense={editingExpense}
          voiceExpenseData={voiceExpenseData}
          categories={categories}
        />

        <AddUserModal
          isOpen={isAddUserOpen}
          onClose={() => setIsAddUserOpen(false)}
          setToast={setToast}
          onUserAdded={() => setUsersRefreshKey((prev) => prev + 1)}
        />

        <Toast toast={toast} onClose={() => setToast(null)} />
      </div>
    </div>


  );
}

export default DashboardPage;