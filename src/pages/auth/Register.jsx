import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import { translate as tr } from "../../i18n/translate";
import { useLanguage } from "../../i18n/LanguageContext";
import AuthLayout from "../../components/auth/AuthLayout";

export default function Register() {
  const navigate = useNavigate();
  const { lang } = useLanguage(); // ✅ GLOBAL LANGUAGE

  const [form, setForm] = useState({
    companyName: "",
    adminName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/register", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      titleKey="register.title" 
      subtitleKey="register.subtitle"
    >
      {error && <p className="text-red-500 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="text-sm font-medium">
            {tr("register.companyName", lang)}
          </label>
          <input
            name="companyName"
            placeholder={tr("register.companyName", lang)}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            {tr("register.adminName", lang)}
          </label>
          <input
            name="adminName"
            placeholder={tr("register.adminName", lang)}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            {tr("register.email", lang)}
          </label>
          <input
            name="email"
            type="email"
            placeholder={tr("register.email", lang)}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            {tr("register.password", lang)}
          </label>
          <input
            name="password"
            type="password"
            placeholder={tr("register.password", lang)}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
          />
        </div>

        <button
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
        >
          {loading ? tr("register.loading", lang) : tr("register.button", lang)}
        </button>
      </form>

      <p className="mt-4 text-sm text-center">
        {tr("register.haveAccount", lang)}{" "}
        <Link to="/login" className="text-purple-600 font-semibold">
          {tr("register.login", lang)}
        </Link>
      </p>
    </AuthLayout>
  );
}
