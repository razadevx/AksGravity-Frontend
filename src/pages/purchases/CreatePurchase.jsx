import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addPurchase, getPurchases } from "../../store/slices/purchaseSlice";
import axios from "../../services/axios";

const CreatePurchase = ({ onClose }) => {
  const dispatch = useDispatch();

  const [suppliers, setSuppliers] = useState([]);
  const [materials, setMaterials] = useState([]);

  const [supplierId, setSupplierId] = useState("");
  const [items, setItems] = useState([
    { materialId: "", qty: "", rate: "" },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const sup = await axios.get("/api/master/suppliers");
      const mat = await axios.get("/api/master/raw-materials");

      setSuppliers(sup.data);
      setMaterials(mat.data);
    };

    fetchData();
  }, []);

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const addItemRow = () => {
    setItems([...items, { materialId: "", qty: "", rate: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(
      addPurchase({
        supplierId,
        items: items.map((i) => ({
          materialId: i.materialId,
          qty: Number(i.qty),
          rate: Number(i.rate),
        })),
      })
    );

    dispatch(getPurchases());
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          width: "600px",
          borderRadius: "12px",
          padding: "30px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Create Purchase</h3>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Supplier:</label>
            <select
              value={supplierId}
              onChange={(e) => setSupplierId(e.target.value)}
              required
            >
              <option value="">Select Supplier</option>
              {suppliers.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.supplierName}
                </option>
              ))}
            </select>
          </div>

          <hr />

          {items.map((item, index) => (
            <div key={index} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <select
                value={item.materialId}
                onChange={(e) =>
                  handleItemChange(index, "materialId", e.target.value)
                }
                required
                style={{ flex: 1 }}
              >
                <option value="">Select Material</option>
                {materials.map((m) => (
                  <option key={m._id} value={m._id}>
                    {m.materialName}
                  </option>
                ))}
              </select>

              <input
                type="number"
                placeholder="Qty"
                value={item.qty}
                onChange={(e) =>
                  handleItemChange(index, "qty", e.target.value)
                }
                required
                style={{ width: 80 }}
              />

              <input
                type="number"
                placeholder="Rate"
                value={item.rate}
                onChange={(e) =>
                  handleItemChange(index, "rate", e.target.value)
                }
                required
                style={{ width: 100 }}
              />
            </div>
          ))}

          <div style={{ marginBottom: 12 }}>
            <button type="button" onClick={addItemRow}>
              + Add Item
            </button>
          </div>

          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <button type="submit" style={{ background: "#6C4DF6", color: "#fff", border: "none", padding: "8px 14px", borderRadius: 6 }}>
              Save
            </button>
            <button type="button" onClick={onClose} style={{ padding: "8px 14px", borderRadius: 6 }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePurchase;
