import { useTranslation } from "react-i18next";

export default function LanguageToggle() {
  const { i18n } = useTranslation();

  return (
    <div className="flex bg-white/20 rounded-full overflow-hidden text-xs">
      <button
        onClick={() => i18n.changeLanguage("en")}
        className={`px-3 py-1 ${i18n.language === "en" ? "bg-white text-purple-700" : ""}`}
      >
        EN
      </button>
      <button
        onClick={() => i18n.changeLanguage("ur")}
        className={`px-3 py-1 ${i18n.language === "ur" ? "bg-white text-purple-700" : ""}`}
      >
        UR
      </button>
    </div>
  );
}
