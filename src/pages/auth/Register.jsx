import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    companyName: "",
    name: "",
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
      await api.post("/auth/register", form);
      navigate("/login"); // ✅ redirect after register
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-2">
          Create AKS DigiRec Account
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Start managing your business digitally
        </p>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="name"
            placeholder="Admin Name"
            className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
