import { motion } from "framer-motion";
import { useLang } from "../../i18n/LanguageContext";
import { translate as tr } from "../../i18n/translate";

export default function ProductionSummary() {
  const { lang } = useLang();

  const stats = [
    { key: "todayProduction", value: "0 Units" },
    { key: "monthlyProduction", value: "0 Units" },
    { key: "defectiveItems", value: "0" },
    { key: "finishedGoods", value: "0" },
  ];

  return (
    // ✅ Keep layout LTR even in Urdu
    <div dir="ltr">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-2xl shadow-sm p-6 border border-gray-300 hover:border-purple-200 transition"
      >
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          🏭 {tr("production.title", lang)}
        </h3>

        <div className="grid grid-cols-2 gap-5">
          {stats.map((s) => (
            <div
              key={s.key}
              className="p-4 rounded-xl bg-gray-50 hover:bg-purple-50 border border-gray-300 hover:border-purple-200 transition"
            >
              <p className="text-xs text-gray-500">
                {tr(`production.${s.key}`, lang)}
              </p>
              <p className="font-bold text-lg">{s.value}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
