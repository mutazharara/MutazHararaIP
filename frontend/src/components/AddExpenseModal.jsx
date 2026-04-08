import { useEffect, useState } from "react";

function AddExpenseModal({
  isOpen,
  onClose,
  onAdd,
  onUpdate,
  editingExpense,
  categories = [],
}){

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
        id: editingExpense.id,
        title: editingExpense.title || "",
        category: editingExpense.category || "",
        amount: editingExpense.amount || "",
        date: editingExpense.date || "",
        description: editingExpense.description || "",
      });
    } else {
      setFormData({
        title: "",
        category: "",
        amount: "",
        date: "",
        description: "",
      });
    }
  }, [editingExpense, isOpen]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

    const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (editingExpense) {
        onUpdate({
        ...formData,
        id: editingExpense.id,
        });
    } else {
        onAdd(formData);
    }

    onClose();
    };

  if (!isOpen) return null;

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-brand-400 dark:border-white/10 dark:bg-gray-900 dark:text-white";



    {errors.title && (
    <p className="mt-1 text-xs text-red-500">{errors.title}</p>
    )}

const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
        newErrors.title = "Title is required";
    }

    if (!formData.category) {
        newErrors.category = "Category is required";
    }

    if (!formData.amount || Number(formData.amount) <= 0) {
        newErrors.amount = "Amount must be greater than 0";
    }

    if (!formData.date) {
        newErrors.date = "Date is required";
    }

    if (formData.description.length > 120) {
        newErrors.description = "Description must be under 120 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
    };

    

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-gray-900">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {editingExpense ? "Edit Expense" : "Add New Expense"}
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Fill in the details below to save the expense.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Expense title"
            value={formData.title}
            onChange={handleChange}
            className={inputClass}
            required
          />

          <div className="grid gap-4 md:grid-cols-2">
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={inputClass}
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={inputClass}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className={inputClass}
          />

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-white/10 dark:text-white dark:hover:bg-white/5"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-700"
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