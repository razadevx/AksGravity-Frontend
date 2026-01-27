import { motion } from "framer-motion";

export default function ActivityFeed() {
  const activities = [
    "Worker Ali added to Production Section",
    "Cash expense recorded: Rs. 5,000",
    "New batch produced: Batch #102",
    "Stock updated: Clay +200kg",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl shadow-sm p-6 border border-gray-300 hover:border-purple-200 transition"
    >
      <h3 className="font-semibold text-lg mb-4">🕒 Recent Activities</h3>

      <ul className="space-y-4 text-sm">
        {activities.map((a, i) => (
          <li key={i} className="flex gap-3 items-start">
            <span className="w-2 h-2 mt-2 bg-purple-500 rounded-full"></span>
            <span className="text-gray-600">{a}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
