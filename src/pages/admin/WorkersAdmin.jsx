import { useEffect, useState } from "react";
import api from "../../services/api";

export default function WorkersAdmin() {
  const [workers, setWorkers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editingWorker, setEditingWorker] = useState(null);

  const emptyForm = {
    name: "",
    cnic: "",
    phone: "",
    dailyWage: "",
    categoryId: "",
  };

  const [form, setForm] = useState(emptyForm);

  /* ================= LOAD DATA ================= */

  const loadData = async () => {
    try {
      setLoading(true);
      const [workersRes, categoriesRes] = await Promise.all([
        api.get("/workers"),
        api.get("/worker-categories"),
      ]);

      setWorkers(workersRes.data);
      setCategories(categoriesRes.data.filter((c) => c.isActive !== false));
    } catch (err) {
      alert("Failed to load workers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  /* ================= FORM ================= */

  const openAdd = () => {
    setEditingWorker(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (worker) => {
    setEditingWorker(worker);
    setForm({
      name: worker.name,
      cnic: worker.cnic,
      phone: worker.phone,
      dailyWage: worker.dailyWage,
      categoryId: worker.categoryId?._id,
    });
    setShowModal(true);
  };

  const submitForm = async () => {
    try {
      if (
        !form.name ||
        !form.cnic ||
        !form.phone ||
        !form.dailyWage ||
        !form.categoryId
      ) {
        return alert("All fields are required");
      }

      if (editingWorker) {
        await api.put(`/workers/${editingWorker._id}`, form);
      } else {
        await api.post("/workers", form);
      }

      setShowModal(false);
      loadData();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save worker");
    }
  };

  /* ================= TOGGLE STATUS ================= */

  const toggleWorkerStatus = async (worker) => {
    const action = worker.isActive ? "Disable" : "Enable";

    if (!confirm(`${action} this worker?`)) return;

    try {
      await api.put(`/workers/${worker._id}/status`);
      loadData();
    } catch {
      alert("Failed to update worker status");
    }
  };

  /* ================= UI ================= */

  return (
    <>

      <div className="max-w-7xl mx-auto px-0 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Workers (Admin)</h1>

          <button
            onClick={openAdd}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            + Add Worker
          </button>
        </div>

        {loading ? (
          <div className="text-gray-500">Loading...</div>
        ) : (
          <div className="bg-white rounded-xl shadow border overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100 text-sm">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Daily Wage</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {workers.map((w) => (
                  <tr key={w._id} className="border-t">
                    <td className="p-3 font-medium">{w.name}</td>
                    <td className="p-3">{w.categoryId?.name || "-"}</td>
                    <td className="p-3">Rs. {w.dailyWage}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          w.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {w.isActive ? "Active" : "Disabled"}
                      </span>
                    </td>
                    <td className="p-3 space-x-3 text-sm">
                      <button
                        onClick={() => openEdit(w)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => toggleWorkerStatus(w)}
                        className={`hover:underline ${
                          w.isActive ? "text-red-600" : "text-green-600"
                        }`}
                      >
                        {w.isActive ? "Disable" : "Enable"}
                      </button>
                    </td>
                  </tr>
                ))}

                {workers.length === 0 && (
                  <tr>
                    <td colSpan="5" className="p-6 text-center text-gray-500">
                      No workers found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ================= MODAL ================= */}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold">
              {editingWorker ? "Edit Worker" : "Add Worker"}
            </h2>

            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border px-3 py-2 rounded"
            />

            <input
              placeholder="CNIC"
              value={form.cnic}
              onChange={(e) => setForm({ ...form, cnic: e.target.value })}
              className="w-full border px-3 py-2 rounded"
            />

            <input
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full border px-3 py-2 rounded"
            />

            <input
              type="number"
              placeholder="Daily Wage"
              value={form.dailyWage}
              onChange={(e) => setForm({ ...form, dailyWage: e.target.value })}
              className="w-full border px-3 py-2 rounded"
            />

            <select
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={submitForm}
                className="px-4 py-2 bg-purple-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
