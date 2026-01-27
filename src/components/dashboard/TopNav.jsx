import { useLanguage } from "../../i18n/LanguageContext";

export default function TopNav() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
            AKS
          </div>
          <div>
            <h1 className="font-bold text-lg">AKS DigiRec</h1>
            <p className="text-xs text-gray-500">Ceramics ERP System</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
          <span className="hover:text-purple-600 cursor-pointer">Dashboard</span>
          <span className="hover:text-purple-600 cursor-pointer">Master Data</span>
          <span className="hover:text-purple-600 cursor-pointer">Workers</span>
          <span className="hover:text-purple-600 cursor-pointer">Production</span>
          <span className="hover:text-purple-600 cursor-pointer">Cash Register</span>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">

          {/* Language Toggle */}
          <div className="flex bg-gray-100 rounded-full overflow-hidden text-xs border border-gray-200">
            {["EN", "UR", "BOTH"].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1 transition ${
                  lang === l
                    ? "bg-purple-600 text-white font-semibold"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* User */}
          <div className="text-sm text-gray-600">
            razadevx
          </div>

          <button className="text-xs px-3 py-1 rounded-lg bg-red-50 text-red-600 hover:bg-red-100">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
