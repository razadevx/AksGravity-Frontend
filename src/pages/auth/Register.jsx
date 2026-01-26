import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function Register() {
  const [form, setForm] = useState({
    companyName: "",
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      alert("Account created successfully!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-900">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create AKS DigiRec Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            name="companyName"
            placeholder="Company Name"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleChange}
            required
          />

          <input
            name="name"
            placeholder="Admin Name"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleChange}
            required
          />

          <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
            Register
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
