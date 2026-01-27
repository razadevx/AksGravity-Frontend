export default function ProductionSummary() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <h3 className="font-semibold mb-4">Production Overview</h3>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Today Production</p>
          <p className="font-bold">0 Units</p>
        </div>
        <div>
          <p className="text-gray-500">Monthly Production</p>
          <p className="font-bold">0 Units</p>
        </div>
        <div>
          <p className="text-gray-500">Defective Items</p>
          <p className="font-bold">0</p>
        </div>
        <div>
          <p className="text-gray-500">Finished Goods</p>
          <p className="font-bold">0</p>
        </div>
      </div>
    </div>
  );
}
