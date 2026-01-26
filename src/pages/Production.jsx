import Navbar from "../components/Navbar";

export default function Production() {
  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Production</h2>

        <div className="bg-white rounded-xl shadow p-4">
          <p>Production records will appear here.</p>
        </div>
      </div>
    </div>
  );
}
