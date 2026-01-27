import { motion } from "framer-motion";

export default function QuickActions() {
  const actions = [
    { name: "Add Worker", icon: "👷" },
    { name: "New Production", icon: "🏭" },
    { name: "Add Expense", icon: "💸" },
    { name: "Add Stock", icon: "📦" },
    { name: "Create Report", icon: "📊" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl shadow-sm p-6 border border-gray-300 hover:border-purple-200 transition"
    >
      <h3 className="font-semibold text-lg mb-4">⚡ Quick Actions</h3>

      <div className="grid grid-cols-2 gap-3">
        {actions.map((a) => (
          <button
            key={a.name}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border bg-gray-50 hover:bg-purple-600 hover:text-white transition font-medium text-sm"
          >
            <span>{a.icon}</span>
            {a.name}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
