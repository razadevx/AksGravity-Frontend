import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import { translate as tr } from "../../i18n/translate";
import { useLanguage } from "../../i18n/LanguageContext";
import AuthLayout from "../../components/auth/AuthLayout";

export default function Login() {
  const navigate = useNavigate();
  const { lang } = useLanguage(); // 🌍 GLOBAL LANGUAGE

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", {
        email: form.email.trim(),
        password: form.password,
      });

      // ✅ BACKEND RETURNS { user, token }
      if (!res.data?.token || !res.data?.user) {
        throw new Error("Invalid server response");
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <AuthLayout
      title={tr("login.title", lang)}
      subtitle={tr("login.subtitle", lang)}
    >
      {error && <p className="text-red-500 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="text-sm font-medium">
            {tr("login.email", lang)}
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            required
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
            value={form.password}
            required
            placeholder={tr("login.passwordPlaceholder", lang)}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
        >
          {tr("login.button", lang)}
        </button>
      </form>

      <p className="mt-4 text-sm text-center">
        {tr("login.registerText", lang)}{" "}
        <Link to="/register" className="text-purple-600 font-semibold">
          {tr("login.register", lang)}
        </Link>
      </p>
    </AuthLayout>
  );
}
