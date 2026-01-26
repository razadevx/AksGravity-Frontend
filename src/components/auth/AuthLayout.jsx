import React from "react";

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
      
      {/* Left Branding Panel */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center items-center text-white px-10">
        <h1 className="text-4xl font-bold mb-4">AKS DigiRec</h1>
        <p className="text-lg opacity-90 mb-6">
          Smart Business Solutions for Ceramics Industry
        </p>

        <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl text-sm leading-relaxed">
          <p>✔ Production Management</p>
          <p>✔ Workers & Payroll</p>
          <p>✔ Inventory & Stock</p>
          <p>✔ Financial Reports</p>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="w-full lg:w-1/2 flex justify-center items-center bg-white">
        <div className="w-full max-w-md p-8">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <p className="text-gray-500 mb-6">{subtitle}</p>

          {children}
        </div>
      </div>
    </div>
  );
}
