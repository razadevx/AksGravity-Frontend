import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";

export default function Register() {
  const navigate = useNavigate();
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="companyName" placeholder="Company Name" onChange={handleChange}
            className="w-full border p-2 rounded" />

          <input name="adminName" placeholder="Admin Name" onChange={handleChange}
            className="w-full border p-2 rounded" />

          <input name="email" type="email" placeholder="Email" onChange={handleChange}
            className="w-full border p-2 rounded" />

          <input name="password" type="password" placeholder="Password" onChange={handleChange}
            className="w-full border p-2 rounded" />

          <button disabled={loading}
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Already have an account? <Link to="/login" className="text-purple-600">Login</Link>
        </p>
      </div>
    </div>
  );
}
