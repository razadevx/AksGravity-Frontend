import { NavLink, Outlet } from "react-router-dom";

const MasterDataLayout = () => {
  return (
    <div style={page}>
      <div style={header}>
        <div>
          <h1 style={{ margin: 0 }}>📦 Master Data</h1>
          <p style={{ color: "#666", marginTop: "4px" }}>
            Manage all static and reference information
          </p>
        </div>
      </div>

      <div style={tabs}>
        {tab("Sections", "sections")}
        {tab("Raw Materials", "materials")}
        {tab("Suppliers", "suppliers")}
        {tab("Workers", "workers")}
        {tab("Customers", "customers")}
        {tab("Finished Goods", "finished-goods")}
      </div>

      <div style={{ marginTop: "30px" }}>
        <Outlet />
      </div>
    </div>
  );
};

const tab = (label, path) => (
  <NavLink
    to={path}
    style={({ isActive }) => ({
      padding: "10px 18px",
      borderRadius: "8px",
      textDecoration: "none",
      fontWeight: 500,
      background: isActive ? "#6C63FF" : "#f3f3f3",
      color: isActive ? "#fff" : "#333",
    })}
  >
    {label}
  </NavLink>
);

const page = {
  padding: "30px",
  maxWidth: "1200px",
  margin: "auto",
};

const header = {
  marginBottom: "25px",
};

const tabs = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
};

export default MasterDataLayout;
