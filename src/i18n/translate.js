import { dictionary } from "./dictionary";

/**
 * translate()
 * @param {string} key - translation key (e.g. "login.title")
 * @param {string} lang - EN | UR | BOTH
 * @returns {string}
 */
export const translate = (key, lang = "EN") => {
  // 🛡️ Safety first — NEVER crash UI
  if (!key || typeof key !== "string") return "";

  const normalizedLang = lang?.toUpperCase() || "EN";
  const keys = key.split(".");

  let value = dictionary;

  for (const k of keys) {
    value = value?.[k];
    if (!value) {
      // Fallback: return key if translation missing
      return key;
    }
  }

  // Value must be an object like { en, ur }
  if (typeof value !== "object") return key;

  // BOTH mode (English + Urdu)
  if (normalizedLang === "BOTH") {
    const en = value.en || "";
    const ur = value.ur || "";
    if (en && ur) return `${en}\n${ur}`; // stacked, layout-safe
    return en || ur || key;
  }

  // EN / UR mode
  const langKey = normalizedLang.toLowerCase();
  return value[langKey] || value.en || key;
};
