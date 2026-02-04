import { NavLink, Outlet } from "react-router-dom";
import MainHeader from "../../components/layout/MainHeader";

export default function WorkersLayout() {
  return (
    <>
      {/* Top Header */}
      <MainHeader />

      {/* Page Body */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <h1 className="text-2xl font-bold mb-6">Workers</h1>

        {/* Sub Navigation */}
        <div className="flex gap-6 border-b mb-6">
          {[
            { to: "", label: "Overview" },
            { to: "attendance", label: "Attendance" },
            { to: "list", label: "Workers List" },
            { to: "categories", label: "Categories" },
            { to: "summary", label: "Monthly Summary" },
          ].map((tab) => (
            <NavLink
              key={tab.label}
              to={tab.to}
              end
              className={({ isActive }) =>
                `pb-3 text-sm font-medium transition ${
                  isActive
                    ? "border-b-2 border-purple-600 text-purple-600"
                    : "text-gray-500 hover:text-gray-800"
                }`
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </div>

        {/* Nested Pages Render Here */}
        <Outlet />
      </div>
    </>
  );
}
