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


export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {user?.adminName}</h1>
      <p className="text-gray-500">Company: {user?.companyName}</p>
    </div>
  );
}

