import Navbar from "../components/Navbar";

export default function MasterData() {
  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Master Data</h2>

        <div className="bg-white rounded-xl shadow p-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th>Name</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td>Raw Material</td>
                <td>Inventory</td>
                <td>Active</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
