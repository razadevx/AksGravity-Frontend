import { useLang } from "../../i18n/LanguageContext";

export default function Navbar() {
  const { lang, changeLang } = useLang();

  return (
    <div className="flex items-center gap-2 bg-gray-100 rounded-full px-2 py-1 text-xs">
      {["EN", "UR", "BOTH"].map((l) => (
        <button
          key={l}
          onClick={() => changeLang(l)}
          className={`px-3 py-1 rounded-full transition ${
            lang === l ? "bg-purple-600 text-white font-semibold" : ""
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
