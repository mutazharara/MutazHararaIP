import { useEffect, useMemo, useState } from "react";
import {
  CalendarDaysIcon,
  CurrencyDollarIcon,
  TagIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

function AddExpenseModal({
  isOpen,
  onClose,
  onAdd,
  onUpdate,
  editingExpense,
  voiceExpenseData,
  categories = [],
}) {
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    amount: "",
    date: "",
    description: "",
  });

  useEffect(() => {
    if (editingExpense) {
      setFormData({
        title: editingExpense.title || "",
        category: editingExpense.category || "",
        amount: editingExpense.amount || "",
        date: editingExpense.date || "",
        description: editingExpense.description || "",
      });
    } else if (voiceExpenseData) {
    setFormData({
      title: voiceExpenseData.title || "",
      category: voiceExpenseData.category || "",
      amount: voiceExpenseData.amount || "",
      date: voiceExpenseData.date || "",
      description: voiceExpenseData.description || "",
    });
  }else {
      setFormData({
        title: "",
        category: "",
        amount: "",
        date: "",
        description: "",
      });
    }

    setErrors({});
  }, [editingExpense, voiceExpenseData, isOpen]);

  const isFormValid = useMemo(() => {
    return (
      formData.title.trim() &&
      formData.category &&
      Number(formData.amount) > 0 &&
      formData.date
    );
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.amount || Number(formData.amount) <= 0)
      newErrors.amount = "Amount must be greater than 0";
    if (!formData.date) newErrors.date = "Date is required";
    if (formData.description.length > 120)
      newErrors.description = "Description must be under 120 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload = {
      title: formData.title.trim(),
      category: formData.category,
      amount: Number(formData.amount),
      date: formData.date,
      description: formData.description.trim(),
    };

    if (editingExpense) {
      onUpdate({
        ...payload,
        id: editingExpense.id,
      });
    } else {
      onAdd(payload);
    }

    handleClose();
  };

  if (!isOpen) return null;

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-11 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 dark:border-white/10 dark:bg-gray-950 dark:text-white";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-gray-900">
        <div className="mb-6 border-b border-gray-100 pb-5 dark:border-white/10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {editingExpense ? "Edit Expense" : "Add New Expense"}
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Enter the expense details below. Required fields are marked clearly.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Expense Title
            </label>

            <div className="relative">
              <DocumentTextIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="title"
                placeholder="e.g. Grocery shopping"
                value={formData.title}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            {errors.title && (
              <p className="mt-2 text-xs font-medium text-red-500">
                {errors.title}
              </p>
            )}
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Category
              </label>

              <div className="relative">
                <TagIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {errors.category && (
                <p className="mt-2 text-xs font-medium text-red-500">
                  {errors.category}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Amount
              </label>

              <div className="relative">
                <CurrencyDollarIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  name="amount"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              {errors.amount && (
                <p className="mt-2 text-xs font-medium text-red-500">
                  {errors.amount}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Expense Date
            </label>

            <div className="relative">
              <CalendarDaysIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            {errors.date && (
              <p className="mt-2 text-xs font-medium text-red-500">
                {errors.date}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
              <span className="ml-1 text-xs text-gray-400">(optional)</span>
            </label>

            <textarea
              name="description"
              placeholder="Add a short note about this expense..."
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 dark:border-white/10 dark:bg-gray-950 dark:text-white"
            />

            <div className="mt-2 flex items-center justify-between">
              {errors.description ? (
                <p className="text-xs font-medium text-red-500">
                  {errors.description}
                </p>
              ) : (
                <p className="text-xs text-gray-400">
                  Keep it short and clear.
                </p>
              )}

              <p className="text-xs text-gray-400">
                {formData.description.length}/120
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-100 pt-5 dark:border-white/10">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-white/10 dark:text-white dark:hover:bg-white/5"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!isFormValid}
              className={`rounded-xl px-5 py-3 text-sm font-semibold text-white transition ${
                isFormValid
                  ? "bg-brand-600 hover:bg-brand-700"
                  : "cursor-not-allowed bg-brand-300 opacity-60"
              }`}
            >
              {editingExpense ? "Update Expense" : "Add Expense"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddExpenseModal;