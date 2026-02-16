import { useEffect, useState } from "react";
import axios from "../../../services/axios";
import AddSupplierModal from "./AddSupplierModal";

const SuppliersPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchSuppliers = async () => {
    const res = await axios.get("/api/master/suppliers");
    setSuppliers(res.data);
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  return (
    <div>
      <div style={header}>
        <h2>Suppliers</h2>
        <button style={addBtn} onClick={() => setShowModal(true)}>
          + Add Supplier
        </button>
      </div>

      <table style={table}>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Balance</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((s) => (
            <tr key={s._id}>
              <td>{s.code}</td>
              <td>{s.supplierName}</td>
              <td>{s.contactPerson}</td>
              <td>Rs. {s.currentBalance}</td>
              <td>{s.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <AddSupplierModal
          onClose={() => setShowModal(false)}
          refresh={fetchSuppliers}
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

export default SuppliersPage;
