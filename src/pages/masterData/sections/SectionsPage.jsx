import { useEffect, useState } from "react";
import axios from "../../../services/axios";
import AddSectionModal from "./AddSectionModal";

const SectionsPage = () => {
  const [sections, setSections] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchSections = async () => {
    const res = await axios.get("/api/master/sections");
    setSections(res.data);
  };

  useEffect(() => {
    fetchSections();
  }, []);

  return (
    <div>
      <div style={header}>
        <h2>Production Sections</h2>
        <button style={addBtn} onClick={() => setShowModal(true)}>
          + Add Section
        </button>
      </div>

      <table style={table}>
        <thead>
          <tr>
            <th>Group</th>
            <th>Main Section</th>
            <th>Sub Section</th>
            <th>Code</th>
            <th>Non Material</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {sections.map((s) => (
            <tr key={s._id}>
              <td>{s.sectionGroup}</td>
              <td>{s.mainSection}</td>
              <td>{s.subSectionName}</td>
              <td>{s.code}</td>
              <td>{s.nonMaterial ? "Yes" : "No"}</td>
              <td>{s.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <AddSectionModal
          onClose={() => setShowModal(false)}
          refresh={fetchSections}
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

export default SectionsPage;
