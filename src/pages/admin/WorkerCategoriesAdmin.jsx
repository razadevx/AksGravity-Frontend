import { useEffect, useState } from "react";
import api from "../../services/api";
import MainHeader from "../../components/layout/MainHeader";

export default function WorkerCategoriesAdmin() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  // 🔹 LOAD FROM DB
  const loadCategories = async () => {
    try {
      setLoading(true);
      const res = await api.get("/worker-categories");
      setCategories(res.data || []);
    } catch (err) {
      console.error("Failed to load categories", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 ADD or UPDATE (REAL DB)
  const saveCategory = async () => {
    if (!name.trim()) {
      alert("Category name is required");
      return;
    }

    try {
      if (editingId) {
        // UPDATE
        await api.put(`/worker-categories/${editingId}`, {
          name,
        });
      } else {
        // CREATE
        await api.post("/worker-categories", {
          name,
        });
      }

      setName("");
      setEditingId(null);
      loadCategories();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save category");
    }
  };

  // 🔹 ENABLE / DISABLE (REAL DB)
  const toggleStatus = async (cat) => {
    try {
      await api.patch(`/worker-categories/${cat._id}`, {
        isActive: !cat.isActive,
      });
      loadCategories();
    } catch (err) {
      alert("Failed to update category status");
    }
  };

  // 🔹 START EDIT
  const startEdit = (cat) => {
    setEditingId(cat._id);
    setName(cat.name);
  };

  return (
    <>
      <MainHeader />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-6">
          Worker Categories (Admin)
        </h1>

        {/* ADD / EDIT FORM */}
        <div className="bg-white border rounded-lg p-4 mb-6 shadow-sm">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 border px-3 py-2 rounded"
            />

            <button
              onClick={saveCategory}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              {editingId ? "Update" : "Add"}
            </button>

            {editingId && (
              <button
                onClick={() => {
                  setEditingId(null);
                  setName("");
                }}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* LIST */}
        <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
          {loading ? (
            <div className="p-4 text-gray-500">Loading…</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-100 text-sm">
                <tr>
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {categories.length === 0 ? (
                  <tr>
                    <td
                      colSpan="3"
                      className="p-4 text-center text-gray-500"
                    >
                      No categories found
                    </td>
                  </tr>
                ) : (
                  categories.map((cat) => (
                    <tr key={cat._id} className="border-t">
                      <td className="p-3 font-medium">{cat.name}</td>

                      <td className="p-3 text-center">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            cat.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {cat.isActive ? "Active" : "Disabled"}
                        </span>
                      </td>

                      <td className="p-3 text-center space-x-3">
                        <button
                          onClick={() => startEdit(cat)}
                          className="text-blue-600 text-sm"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => toggleStatus(cat)}
                          className="text-red-600 text-sm"
                        >
                          {cat.isActive ? "Disable" : "Enable"}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
