import { useEffect, useState } from "react";
import axios from "../../../services/axios";
import AddMaterialModal from "./AddMaterialModal";

const MaterialsPage = () => {
  const [materials, setMaterials] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchMaterials = async () => {
    const res = await axios.get("/api/master/raw-materials");
    setMaterials(res.data);
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  return (
    <div>
      <div style={header}>
        <h2>Raw Materials</h2>
        <button style={addBtn} onClick={() => setShowModal(true)}>
          + Add Material
        </button>
      </div>

      <table style={table}>
        <thead>
          <tr>
            <th>Code</th>
            <th>Type</th>
            <th>Name</th>
            <th>Unit</th>
            <th>Stock</th>
            <th>Rate</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {materials.map((m) => (
            <tr key={m._id}>
              <td>{m.code}</td>
              <td>{m.materialType}</td>
              <td>{m.materialName}</td>
              <td>{m.unit}</td>
              <td>{m.stock}</td>
              <td>Rs. {m.rate}</td>
              <td>Rs. {m.amount}</td>
              <td>{m.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <AddMaterialModal
          onClose={() => setShowModal(false)}
          refresh={fetchMaterials}
        />
      )}
    </div>
  );
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "20px",
};

const addBtn = {
  background: "#6C63FF",
  color: "#fff",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
};

export default MaterialsPage;
