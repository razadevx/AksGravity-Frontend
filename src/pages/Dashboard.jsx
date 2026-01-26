export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Bar */}
      <header className="bg-gradient-to-r from-indigo-800 to-purple-700 text-white px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">AKS DigiRec</h1>
          <p className="text-xs opacity-80">Ceramics Factory Management</p>
        </div>

        <div className="text-right">
          <p className="font-semibold">RazaDevX</p>
          <p className="text-xs opacity-80">Admin</p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow px-6 py-2 flex gap-4 overflow-x-auto">
        {[
          "Dashboard",
          "Master Data",
          "Workers",
          "Cash Register",
          "Bank",
          "Composition",
          "Production",
          "Reports",
        ].map((item) => (
          <button
            key={item}
            className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-100 text-indigo-700"
          >
            {item}
          </button>
        ))}
      </nav>

      {/* Dashboard Cards */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Cash Balance" value="Rs. 0" />
        <Card title="Bank Balance" value="Rs. 0" />
        <Card title="Stock Value" value="Rs. 0" />
        <Card title="Receivables" value="Rs. 0" />
        <Card title="Payables" value="Rs. 0" />
        <Card title="Finished Goods" value="0 Items" />
      </div>

      {/* Alerts */}
      <div className="px-6">
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="font-semibold mb-2">⚠ Alerts & Activities</h3>
          <p className="text-gray-500 text-sm">No active warnings.</p>
        </div>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-2xl font-bold text-indigo-700 mt-1">{value}</p>
    </div>
  );
}
import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <div>
      <Navbar />

      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Stat title="Cash in Hand" value="Rs. 0" />
        <Stat title="Bank Balance" value="Rs. 0" />
        <Stat title="Stock Value" value="Rs. 0" />
        <Stat title="Receivables" value="Rs. 0" />
        <Stat title="Payables" value="Rs. 0" />
        <Stat title="Finished Items" value="0" />
      </div>
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div className="aks-card">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-2xl font-bold text-purple-700">{value}</p>
    </div>
  );
}
