import MainHeader from "../components/layout/MainHeader";

export default function Workers() {
  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Workers</h2>

        <div className="bg-white rounded-xl shadow p-4">
          <p>No workers added yet.</p>
        </div>
      </div>
    </div>
  );
}
