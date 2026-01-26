import Navbar from "../components/Navbar";

export default function CashRegister() {
  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Cash Register</h2>

        <div className="bg-white rounded-xl shadow p-4">
          <p>No cash entries yet.</p>
        </div>
      </div>
    </div>
  );
}
