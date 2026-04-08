import { useMemo, useState } from "react";
import {
  ExclamationTriangleIcon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

function SettingsPage({  categories = [],
  setCategories,
  expenses = [],
  setExpenses,
  setToast,
}) {
  const [newCategory, setNewCategory] = useState("");
  const [newCategoryError, setNewCategoryError] = useState("");

  const [editingIndex, setEditingIndex] = useState(null);
  const [editingValue, setEditingValue] = useState("");
  const [editingError, setEditingError] = useState("");

  const cardClass =
    "rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-gray-900";

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-brand-400 dark:border-white/10 dark:bg-gray-950 dark:text-white";

  const usedCategoriesMap = useMemo(() => {
    const usage = {};

    expenses.forEach((expense) => {
      const category = (expense.category || "Other").trim();
      if (!category) return;

      usage[category] = (usage[category] || 0) + 1;
    });

    return usage;
  }, [expenses]);

  const validateNewCategory = () => {
    const trimmed = newCategory.trim();

    if (!trimmed) {
      setNewCategoryError("Category name is required.");
      return false;
    }

    if (trimmed.length < 2) {
      setNewCategoryError("Category name must be at least 2 characters.");
      return false;
    }

    const exists = categories.some(
      (category) => category.toLowerCase() === trimmed.toLowerCase()
    );

    if (exists) {
      setNewCategoryError("This category already exists.");
      return false;
    }

    setNewCategoryError("");
    return true;
  };

  const addCategory = () => {
    if (!validateNewCategory()) return;

    const trimmed = newCategory.trim();
    setCategories([...categories, trimmed]);

    setToast({
    type: "success",
    message: `"${trimmed}" category added successfully`,
    });

    setNewCategory("");
    setNewCategoryError("");
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingValue(categories[index]);
    setEditingError("");
  };

  const validateEditCategory = () => {
    const trimmed = editingValue.trim();

    if (!trimmed) {
      setEditingError("Category name is required.");
      return false;
    }

    if (trimmed.length < 2) {
      setEditingError("Category name must be at least 2 characters.");
      return false;
    }

    const exists = categories.some(
      (category, index) =>
        index !== editingIndex &&
        category.toLowerCase() === trimmed.toLowerCase()
    );

    if (exists) {
      setEditingError("This category already exists.");
      return false;
    }

    setEditingError("");
    return true;
  };

 const saveEdit = () => {
  if (!validateEditCategory()) return;

  const oldCategory = categories[editingIndex];
  const newCategory = editingValue.trim();

  // Update category list
  const updatedCategories = [...categories];
  updatedCategories[editingIndex] = newCategory;
  setCategories(updatedCategories);

  // Update expenses that use this category
  const updatedExpenses = expenses.map((expense) =>
    expense.category === oldCategory
      ? { ...expense, category: newCategory }
      : expense
  );

  setExpenses(updatedExpenses);

  setToast({
    type: "success",
    message: `"${oldCategory}" renamed to "${newCategory}"`,
  });

  setEditingIndex(null);
  setEditingValue("");
  setEditingError("");
};

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditingValue("");
    setEditingError("");
  };

  const deleteCategory = (indexToDelete) => {
    const categoryToDelete = categories[indexToDelete];
    const usageCount = usedCategoriesMap[categoryToDelete] || 0;

    if (usageCount > 0) {
      alert(
        `You cannot delete "${categoryToDelete}" because it is used in ${usageCount} expense(s).`
      );
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${categoryToDelete}"?`
    );

    if (!confirmed) return;

    setCategories(categories.filter((_, index) => index !== indexToDelete));

    setToast({
    type: "success",
    message: `"${categoryToDelete}" deleted successfully`,
    });
  };

  return (
    <div className="space-y-6">

      <div className={cardClass}>

        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Add New Category
        </h2>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Enter category name"
              value={newCategory}
              onChange={(e) => {
                setNewCategory(e.target.value);
                if (newCategoryError) setNewCategoryError("");
              }}
              className={inputClass}
            />

            {newCategoryError && (
              <p className="mt-2 text-sm text-red-500">
                {newCategoryError}
              </p>
            )}
          </div>

          <button
            onClick={addCategory}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-700"
          >
            <PlusIcon className="h-5 w-5" />
            Add Category
          </button>
        </div>
      </div>

      <div className={cardClass}>
        <div className="flex items-start gap-3 rounded-xl border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-500/20 dark:bg-yellow-500/10">
          <ExclamationTriangleIcon className="mt-0.5 h-5 w-5 text-yellow-600 dark:text-yellow-300" />
          <div>
            <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
              Protected categories
            </p>
            <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
              Categories that are already used in expenses cannot be deleted unless
              those expenses are updated or removed first.
            </p>
          </div>
        </div>

        <h2 className="mt-5 text-lg font-semibold text-gray-900 dark:text-white">
          Existing Categories
        </h2>

        <div className="mt-4 space-y-3">
          {categories.length > 0 ? (
            categories.map((category, index) => {
              const usageCount = usedCategoriesMap[category] || 0;
              const isUsed = usageCount > 0;

              return (
                <div
                  key={index}
                  className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-white/10 dark:bg-white/5"
                >
                  {editingIndex === index ? (
                    <div className="flex flex-col gap-3">
                      <input
                        type="text"
                        value={editingValue}
                        onChange={(e) => {
                          setEditingValue(e.target.value);
                          if (editingError) setEditingError("");
                        }}
                        className={inputClass}
                      />

                      {editingError && (
                        <p className="text-sm text-red-500">{editingError}</p>
                      )}

                      <div className="flex gap-2">
                        <button
                          onClick={saveEdit}
                          className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
                        >
                          Save
                        </button>

                        <button
                          onClick={cancelEdit}
                          className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-white/10 dark:text-white dark:hover:bg-white/5"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {category}
                        </span>

                        <div className="mt-1 flex flex-wrap items-center gap-2">
                          {isUsed ? (
                            <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                              Used in {usageCount} expense{usageCount > 1 ? "s" : ""}
                            </span>
                          ) : (
                            <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 dark:bg-white/10 dark:text-gray-300">
                              Not used
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => startEditing(index)}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-blue-600 hover:bg-blue-50 dark:border-white/10 dark:text-blue-300 dark:hover:bg-blue-500/10"
                        >
                          <PencilSquareIcon className="h-5 w-5" />
                        </button>

                        <button
                          onClick={() => deleteCategory(index)}
                          disabled={isUsed}
                          className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border ${
                            isUsed
                              ? "cursor-not-allowed border-gray-200 text-gray-400 dark:border-white/10 dark:text-gray-500"
                              : "border-gray-200 text-red-600 hover:bg-red-50 dark:border-white/10 dark:text-red-300 dark:hover:bg-red-500/10"
                          }`}
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No categories added yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;