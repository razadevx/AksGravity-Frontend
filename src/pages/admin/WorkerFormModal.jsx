import { useState } from "react";
import api from "../../services/api";

export default function WorkerFormModal({
  worker,
  categories,
  onClose,
  onSaved,
}) {
  const [form, setForm] = useState({
    name: worker?.name || "",
    categoryId: worker?.categoryId?._id || "",
    dailyWage: worker?.dailyWage || "",
  });

  const submit = async () => {
    if (worker) {
      await api.put(`/workers/${worker._id}`, form);
    } else {
      await api.post("/workers", form);
    }
    onSaved();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6">
        <h2 className="text-lg font-semibold mb-4">
          {worker ? "Edit Worker" : "Add Worker"}
        </h2>

        <div className="space-y-4">
          <input
            placeholder="Worker name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="w-full border px-3 py-2 rounded-lg"
          />

          <select
            value={form.categoryId}
            onChange={(e) =>
              setForm({ ...form, categoryId: e.target.value })
            }
            className="w-full border px-3 py-2 rounded-lg"
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Daily wage"
            value={form.dailyWage}
            onChange={(e) =>
              setForm({ ...form, dailyWage: e.target.value })
            }
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>

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
