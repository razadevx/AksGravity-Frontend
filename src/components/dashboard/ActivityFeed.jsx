import { motion } from "framer-motion";
import { useLang } from "../../i18n/LanguageContext";
import { translate as tr } from "../../i18n/translate";

export default function ActivityFeed() {
  const { lang } = useLang();

  const activities = [
    { key: "workerAdded" },
    { key: "cashExpense" },
    { key: "batchProduced" },
    { key: "stockUpdated" },
  ];

  return (
    // ✅ Keep layout LTR even in Urdu
    <div dir="ltr">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-2xl shadow-sm p-6 border border-gray-300 hover:border-purple-200 transition"
      >
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          🕒 {tr("activity.title", lang)}
        </h3>

        <ul className="space-y-4 text-sm">
          {activities.map((a, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="w-2 h-2 mt-2 bg-purple-500 rounded-full"></span>
              <span className="text-gray-600">
                {tr(`activity.${a.key}`, lang)}
              </span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
