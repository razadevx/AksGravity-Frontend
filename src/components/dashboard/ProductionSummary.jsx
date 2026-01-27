import { motion } from "framer-motion";

export default function ProductionSummary() {
  const stats = [
    { label: "Today Production", value: "0 Units" },
    { label: "Monthly Production", value: "0 Units" },
    { label: "Defective Items", value: "0" },
    { label: "Finished Goods", value: "0" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl shadow-sm p-6 border border-gray-300 hover:border-purple-200 transition"
    >
      <h3 className="font-semibold text-lg mb-4">🏭 Production Overview</h3>

      <div className="grid grid-cols-2 gap-5">
        {stats.map((s) => (
          <div key={s.label} className="p-4 rounded-xl bg-gray-50 hover:bg-purple-50 border border-gray-300 hover:border-purple-200 transition transition">
            <p className="text-xs text-gray-500">{s.label}</p>
            <p className="font-bold text-lg">{s.value}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
