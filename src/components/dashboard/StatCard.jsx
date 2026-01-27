import { motion } from "framer-motion";

export default function StatCard({ title, value, icon, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.03 }}
      className="relative bg-white rounded-2xl shadow-sm p-6 border border-gray-300 hover:border-purple-200 transition overflow-hidden group"
      
    >
      {/* Glow Effect */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition ${color} blur-2xl`} />

      <div className="relative flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-3xl font-bold mt-1 tracking-tight">
            {value}
          </h3>
        </div>

        <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white text-xl ${color} shadow-lg`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
}
