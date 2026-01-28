import { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext();

// Allowed languages
const LANGS = ["EN", "UR", "BOTH"];

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    // Load saved language from localStorage (default EN)
    return localStorage.getItem("aks_lang") || "EN";
  });

  // Save language globally
  useEffect(() => {
    if (LANGS.includes(lang)) {
      localStorage.setItem("aks_lang", lang);
      document.documentElement.lang = lang === "UR" ? "ur" : "en";
      document.documentElement.dir = lang === "UR" ? "rtl" : "ltr";
    }
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

// ✅ Main hook (recommended)
export function useLang() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLang must be used inside LanguageProvider");
  }
  return context;
}

// ✅ Backward compatibility (so old code doesn't break)
export function useLanguage() {
  return useLang();
}
