import { useState } from "react";
import api from "../../services/api";

export default function WorkerCategoryModal({
  category,
  onClose,
  onSaved,
}) {
  const [name, setName] = useState(category?.name || "");

  const submit = async () => {
    if (!name.trim()) return alert("Category name required");

    if (category) {
      await api.put(`/worker-categories/${category._id}`, { name });
    } else {
      await api.post("/worker-categories", { name });
    }

    onSaved();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-sm p-6">
        <h2 className="text-lg font-semibold mb-4">
          {category ? "Edit Category" : "Add Category"}
        </h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category name"
          className="w-full border px-3 py-2 rounded-lg"
        />

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-black"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
