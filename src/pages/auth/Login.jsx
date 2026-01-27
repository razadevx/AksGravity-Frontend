import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import { translate as tr } from "../../i18n/translate";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [lang, setLang] = useState("EN"); // EN | UR | BOTH

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 text-white flex flex-col">

      {/* ================= TOP BAR ================= */}
      <div className="flex justify-between items-center px-6 py-3 bg-black/30 backdrop-blur-md">
        
        {/* Left: Logo + Company Info */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-purple-700 font-bold">
            AKS
          </div>
          <div>
            <h1 className="text-lg font-bold">{tr("header.title", lang)}</h1>
            <p className="text-xs opacity-80">
              {tr("header.subtitle", lang)}
            </p>
          </div>
        </div>

        {/* Right: Contact + Language */}
        <div className="flex items-center gap-4 text-sm">
          <span>📱 +92 300 6238557</span>
          <span>✉️ aksdigirec@gmail.com</span>

          {/* Language Toggle */}
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

      {/* ================= MAIN SECTION ================= */}
      <div className="flex flex-1">

        {/* LEFT SECTION */}
        <div className="hidden md:flex w-1/2 p-10 flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">
            Digital records for your ceramics factory,
            <br /> from clay to cash.
          </h2>

          <ul className="space-y-3 text-sm opacity-90 mb-6">
            <li>✔ {tr("features.f1", lang)}</li>
            <li>✔ {tr("features.f2", lang)}</li>
            <li>✔ {tr("features.f3", lang)}</li>
          </ul>

          <div className="bg-black/30 rounded-xl p-4 w-full max-w-lg shadow-lg">
            <p className="text-xs opacity-70">AKS DigiRec Demo Preview</p>
            <div className="mt-3 bg-black/50 rounded-lg h-40 flex items-center justify-center text-sm opacity-60">
              ▶ Demo Video / Image Here
            </div>
          </div>
        </div>

        {/* RIGHT SECTION - LOGIN FORM */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white text-gray-800">
          <div className="w-full max-w-md p-8">

            <h2 className="text-2xl font-bold mb-2">
              {tr("login.title", lang)}
            </h2>

            <p className="text-sm text-gray-500 mb-6">
              {tr("login.subtitle", lang)}
            </p>

            {error && <p className="text-red-500 mb-3">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">

              <div>
                <label className="text-sm font-medium">
                  {tr("login.email", lang)}
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder={tr("login.emailPlaceholder", lang)}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  {tr("login.password", lang)}
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder={tr("login.passwordPlaceholder", lang)}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>

              <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition">
                {tr("login.button", lang)}
              </button>
            </form>

            <p className="mt-4 text-sm text-center">
              {tr("login.registerText", lang)}{" "}
              <Link to="/register" className="text-purple-600 font-semibold">
                {tr("login.register", lang)}
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}
