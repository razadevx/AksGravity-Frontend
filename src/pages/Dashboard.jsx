import Navbar from "../components/Navbar";

// Small reusable card component
function Stat({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-2xl font-bold text-purple-700">{value}</p>
    </div>
  );
}

// Main Dashboard Component
export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard - Today's Overview</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Stat title="Cash in Hand" value="Rs. 0" />
          <Stat title="Bank Balance" value="Rs. 0" />
          <Stat title="Receivables" value="Rs. 0" />
          <Stat title="Payables" value="Rs. 0" />
          <Stat title="Stock Value" value="Rs. 0" />
          <Stat title="Finished Items" value="0" />
        </div>
      </div>
    </div>
  );
}
