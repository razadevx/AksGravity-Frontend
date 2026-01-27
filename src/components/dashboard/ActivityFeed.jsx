export default function ActivityFeed() {
  const activities = [
    "Worker Ali added to Production Section",
    "Cash expense recorded: Rs. 5,000",
    "New batch produced: Batch #102",
    "Stock updated: Clay +200kg",
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <h3 className="font-semibold mb-4">Recent Activities</h3>
      <ul className="space-y-3 text-sm text-gray-600">
        {activities.map((a, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
            {a}
          </li>
        ))}
      </ul>
    </div>
  );
}
