import { translate as tr } from "../../i18n/translate";
import { useLanguage } from "../../i18n/LanguageContext";

export default function AuthLayout({
  children,
  titleKey,
  subtitleKey,
  title,
  subtitle,
}) {
  const { lang, setLang } = useLanguage();

  // ✅ Resolve title safely
  const resolvedTitle =
    title || (titleKey ? tr(titleKey, lang) : "");

  const resolvedSubtitle =
    subtitle || (subtitleKey ? tr(subtitleKey, lang) : "");

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 text-white flex flex-col"
      dir="ltr" // ✅ Prevent Urdu from flipping layout
    >
      {/* ================= TOP BAR ================= */}
      <div className="flex justify-between items-center px-6 py-3 bg-black/30 backdrop-blur-md">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-purple-700 font-bold">
            AKS
          </div>
          <div>
            <h1 className="text-lg font-bold">
              {tr("header.title", lang)}
            </h1>
            <p className="text-xs opacity-80">
              {tr("header.subtitle", lang)}
            </p>
          </div>
        </div>

        {/* Right: Contact + Language */}
        <div className="flex items-center gap-4 text-sm">
          <span>📱 +92 300 6238557</span>
          <span>✉️ aksdigirec@gmail.com</span>

          <div className="flex bg-white/20 rounded-full overflow-hidden text-xs">
            {["EN", "UR", "BOTH"].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1 transition ${
                  lang === l ? "bg-white text-purple-700 font-semibold" : ""
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ================= MAIN ================= */}
      <div className="flex flex-1">

        {/* LEFT SECTION */}
        <div className="hidden md:flex w-1/2 p-10 flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">
            {tr("features.title", lang)}
          </h2>

          <ul className="space-y-3 text-sm opacity-90 mb-6">
            <li>✔ {tr("features.f1", lang)}</li>
            <li>✔ {tr("features.f2", lang)}</li>
            <li>✔ {tr("features.f3", lang)}</li>
          </ul>

          <div className="bg-black/30 rounded-xl p-4 w-full max-w-lg shadow-lg">
            <p className="text-xs opacity-70">
              {tr("features.preview", lang)}
            </p>
            <div className="mt-3 bg-black/50 rounded-lg h-40 flex items-center justify-center text-sm opacity-60">
              ▶ {tr("features.demo", lang)}
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white text-gray-800">
          <div className="w-full max-w-md p-8">

            {resolvedTitle && (
              <h2 className="text-2xl font-bold mb-2">
                {resolvedTitle}
              </h2>
            )}

            {resolvedSubtitle && (
              <p className="text-sm text-gray-500 mb-6">
                {resolvedSubtitle}
              </p>
            )}

            {children}

          </div>
        </div>
      </div>
    </div>
  );
}
