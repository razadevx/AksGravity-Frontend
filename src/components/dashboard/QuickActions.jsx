import { motion } from "framer-motion";
import { useLang } from "../../i18n/LanguageContext";
import { translate as tr } from "../../i18n/translate";

export default function QuickActions() {
  const { lang } = useLang();

  const actions = [
    { key: "addWorker", icon: "👷" },
    { key: "newProduction", icon: "🏭" },
    { key: "addExpense", icon: "💸" },
    { key: "addStock", icon: "📦" },
    { key: "createReport", icon: "📊" },
  ];

  return (
    // ✅ Keep layout LTR even in Urdu
    <div dir="ltr">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-2xl shadow-sm p-6 border border-gray-300 hover:border-purple-200 transition"
      >
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          ⚡ {tr("actions.title", lang)}
        </h3>

        <div className="grid grid-cols-2 gap-3">
          {actions.map((a) => (
            <button
              key={a.key}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border bg-gray-50 hover:bg-purple-600 hover:text-white transition font-medium text-sm"
            >
              <span>{a.icon}</span>
              {tr(`actions.${a.key}`, lang)}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
