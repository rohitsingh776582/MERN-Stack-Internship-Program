
import React, { useState } from "react";
import { School, Lock, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; 

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
    
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      
      const response = await axios.post(`${baseUrl}/users/login`, {
        email: form.email,
        password: form.password,
      });

      if (response.status === 200) {
        // Token aur User Data save karna
        localStorage.setItem("adminToken", response.data.token);
        
        // Agar aap user ka naam ya role save karna chahte hain
        if (response.data.user) {
          localStorage.setItem("userRole", response.data.user.role);
        }

        alert("Login Successful!");
        navigate("/admin");
      }
    } catch (error) {
      console.error("Login Error:", error);
      const errorMsg = error.response?.data?.message || "Invalid Email or Password!";
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600')",
      }}
    >
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 border-t-4 border-[#C83733]">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex bg-red-50 p-3 rounded-2xl mb-3">
            <School size={36} className="text-[#C83733]" />
          </div>
          <h1 className="text-xl font-extrabold text-gray-800 uppercase tracking-widest">
            Admin Panel
          </h1>
          <p className="text-xs text-gray-400 mt-1 font-semibold uppercase tracking-wider">
            School Management System
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div className="relative">
            <Mail
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="email"
              placeholder="Admin Email"
              required
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-100"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              value={form.email}
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-100"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              value={form.password}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#C83733] text-white py-2.5 rounded-lg font-bold transition shadow-md ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:bg-red-700"
            }`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
         
          <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider border-t pt-4">
            Secure Access Portal
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;