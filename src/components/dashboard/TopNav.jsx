import { Link } from "react-router-dom";

export default function TopNav() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
            AKS
          </div>
          <div>
            <h1 className="font-bold text-gray-800">AKS DigiRec</h1>
            <p className="text-xs text-gray-500">Ceramics ERP System</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
          <Link to="/dashboard" className="hover:text-purple-600">Dashboard</Link>
          <Link to="/master-data" className="hover:text-purple-600">Master Data</Link>
          <Link to="/workers" className="hover:text-purple-600">Workers</Link>
          <Link to="/production" className="hover:text-purple-600">Production</Link>
          <Link to="/cash-register" className="hover:text-purple-600">Cash Register</Link>
        </nav>

        {/* User */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">
            {user?.adminName || "Admin"}
          </span>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
            className="text-xs px-3 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
