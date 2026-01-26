import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // TEMP: simulate login
    localStorage.setItem("token", "aks-demo-token");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Branding */}
      <div className="hidden md:flex w-1/2 aks-gradient text-white flex-col justify-center p-12">
        <h1 className="text-4xl font-bold">AKS DigiRec</h1>
        <p className="mt-4 text-lg">
          Smart Business Solutions for Ceramics Industry
        </p>
      </div>

      {/* Right Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md p-8">
          <h2 className="text-2xl font-bold mb-6">Login to your account</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-800">
              Login
            </button>
          </form>

          <p className="mt-4 text-sm">
            Don’t have an account?{" "}
            <Link to="/register" className="text-purple-700 font-semibold">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
