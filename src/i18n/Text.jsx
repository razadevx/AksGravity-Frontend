import { useLanguage } from "./LanguageContext";
import { translate as tr } from "./translate";

export default function Text({ tKey, className = "", urClass = "" }) {
  const { lang } = useLanguage();

  if (lang === "EN") {
    return <span className={className}>{tr(tKey, "EN")}</span>;
  }

  if (lang === "UR") {
    return <span className={className}>{tr(tKey, "UR")}</span>;
  }

  // BOTH mode (English + Urdu)
  return (
    <span className={`inline-flex flex-col leading-tight ${className}`}>
      <span>{tr(tKey, "EN")}</span>
      <span className={`text-xs opacity-70 ${urClass}`}>
        {tr(tKey, "UR")}
      </span>
    </span>
  );
}
