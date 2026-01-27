export default function QuickActions() {
  const actions = [
    "Add Worker",
    "New Production Entry",
    "Add Expense",
    "Add Stock",
    "Create Report",
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <h3 className="font-semibold mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((a) => (
          <button
            key={a}
            className="text-sm px-3 py-2 border rounded-lg hover:bg-purple-50 hover:border-purple-400 transition"
          >
            {a}
          </button>
        ))}
      </div>
    </div>
  );
}
