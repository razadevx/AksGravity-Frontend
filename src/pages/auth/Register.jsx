import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create AKS DigiRec Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-3">
          <input name="company" placeholder="Company Name" className="w-full border px-4 py-2 rounded-lg" onChange={handleChange} />
          <input name="name" placeholder="Admin Name" className="w-full border px-4 py-2 rounded-lg" onChange={handleChange} />
          <input name="email" placeholder="Email" className="w-full border px-4 py-2 rounded-lg" onChange={handleChange} />
          <input name="password" type="password" placeholder="Password" className="w-full border px-4 py-2 rounded-lg" onChange={handleChange} />

          <button className="w-full bg-indigo-700 text-white py-2 rounded-lg">
            Register
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-700 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
