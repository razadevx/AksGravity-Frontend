import React from "react";

const PageContainer = ({ title, children, action }) => {
  return (
    <div style={{ padding: "30px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <h2 style={{ fontSize: "26px", fontWeight: 600 }}>{title}</h2>
        {action}
      </div>

      {children}
    </div>
  );
};

export default PageContainer;
