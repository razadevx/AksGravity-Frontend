export default function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
