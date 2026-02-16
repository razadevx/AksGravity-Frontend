import React from "react";

const SummaryCard = ({ label, value }) => {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "14px",
        padding: "20px",
        boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
      }}
    >
      <div style={{ fontSize: "14px", color: "#777" }}>{label}</div>
      <div style={{ fontSize: "22px", fontWeight: 600, marginTop: "8px" }}>
        {value}
      </div>
    </div>
  );
};

export default SummaryCard;
