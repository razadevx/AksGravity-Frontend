import { useNavigate, NavLink } from "react-router-dom";
import { useLanguage } from "../../i18n/LanguageContext";
import Text from "../../i18n/Text";

export default function MainHeader() {
  const { lang, setLang } = useLanguage();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navItems = [
    { to: "/dashboard", key: "dashboard" },

    // 🔐 Admin-only (Workers module)
    isAdmin && { to: "/workers", key: "workers" },

    // Admin master data (future-safe)
    isAdmin && { to: "/master-data", key: "masterData" },

    // Shared
    { to: "/production", key: "production" },
    { to: "/cash-register", key: "cashRegister" },
  ].filter(Boolean);

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center gap-6">

        {/* ================= LOGO ================= */}
        <div className="flex items-center gap-3 min-w-[220px]">
          <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
            AKS
          </div>
          <div className="leading-tight">
            <h1 className="font-bold text-lg whitespace-nowrap">
              <Text tKey="header.title" />
            </h1>
            <p className="text-xs text-gray-500 max-w-[240px] leading-tight">
              <Text tKey="header.subtitle" />
            </p>
          </div>
        </div>

        {/* ================= NAVIGATION ================= */}
        <div className="hidden md:flex gap-6 text-sm font-medium text-gray-600 flex-wrap">
          {navItems.map((item) => (
            <NavLink
              key={item.key}
              to={item.to}
              end={item.to !== "/workers" ? true : false} 
              className={({ isActive }) =>
                `nav-item hover:text-purple-600 transition text-center leading-tight ${
                  isActive ? "text-purple-600 font-semibold" : ""
                }`
              }
            >
              <Text tKey={`nav.${item.key}`} />
            </NavLink>
          ))}
        </div>

        {/* ================= RIGHT ================= */}
        <div className="flex items-center gap-4">

          {/* Language Toggle */}
          <div className="flex bg-gray-100 rounded-full overflow-hidden text-xs border border-gray-200 shrink-0">
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

          {/* User Info */}
          <div className="text-sm text-gray-600 whitespace-nowrap">
            {user?.adminName || user?.email || "User"}
          </div>

          {/* Logout */}
          <button
            onClick={logout}
            className="text-xs px-3 py-1 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition whitespace-nowrap"
          >
            <Text tKey="nav.logout" />
          </button>
        </div>
      </div>
    </div>
  );
}
