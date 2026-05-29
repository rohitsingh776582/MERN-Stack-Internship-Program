import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    adminSecret: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.adminSecret !== "ADMIN123") {
      alert("Invalid Admin Secret Key!");
      return;
    }

    try {
      // .env se Base URL uthaya ja raha hai
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      
      const response = await axios.post(`${baseUrl}/users/register`, {
        full_name: formData.fullName,
        email: formData.email,
        password: formData.password,
        admin_secret_code: formData.adminSecret
      });

      if (response.status === 200 || response.status === 201) {
        alert("Admin Registered Successfully!");
        
        if(response.data.token) {
            localStorage.setItem("adminToken", response.data.token);
        }

        navigate("/admin");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert(error.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div 
      className="h-screen w-full flex items-center justify-center bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `url('https://www.chitkara.edu.in/wp-content/themes/chitkara/images/2026/about/campus-infrastructure-banner-new-desk.webp')`,
      }}
    >
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative z-10 w-full max-w-[360px] mx-4 bg-white shadow-2xl rounded-sm border-t-4 border-red-600 flex flex-col justify-between overflow-hidden">
        
        <div className="pt-5 pb-2 text-center">
          <img 
            src="https://img.freepik.com/free-psd/gradient-abstract-logo_23-2150689652.jpg" 
            alt="Logo" 
            className="h-10 mx-auto mb-1"
          />
          <h2 className="text-[10px] font-bold text-gray-800 uppercase tracking-widest leading-tight">
            School Management
          </h2>
          <p className="text-[8px] text-gray-400 font-bold uppercase tracking-tighter">
            Registration Portal
          </p>
        </div>

        <div className="px-6 pb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3 text-center lg:text-left">Create Account</h3>
          
          <form className="space-y-2.5" onSubmit={handleSubmit}>
            <div>
              <label className="text-[11px] text-gray-500 font-medium mb-0.5 block text-left">Full Name</label>
              <input
                type="text"
                name="fullName"
                required
                placeholder="Enter your name"
                className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded focus:border-blue-400 focus:outline-none placeholder:text-gray-300"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="text-[11px] text-gray-500 font-medium mb-0.5 block text-left">Email</label>
              <input
                type="email"
                name="email"
                required
                placeholder="example@mail.com"
                className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded focus:border-blue-400 focus:outline-none placeholder:text-gray-300"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="text-[11px] text-gray-500 font-medium mb-0.5 block text-left">Password</label>
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded focus:border-blue-400 focus:outline-none placeholder:text-gray-300"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="text-[11px] text-red-500 font-bold mb-0.5 block text-left">Admin Secret Code</label>
              <input
                type="password"
                name="adminSecret"
                required
                placeholder="Required for Admin access"
                className="w-full px-3 py-1.5 text-sm border border-red-100 bg-red-50/30 rounded focus:border-red-400 focus:outline-none transition-all"
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input type="checkbox" id="terms" required className="h-3 w-3" />
              <label htmlFor="terms" className="text-[10px] text-gray-500">
                I agree to terms & conditions
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-[#C83733] text-white py-2 text-sm font-bold hover:bg-red-700 transition-all shadow-md mt-2"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-[11px] text-gray-500">
              Already have an account?{" "}
              <Link to="/admin-login" className="text-blue-600 font-bold hover:underline">
                Sign In
              </Link>
            </p>
            <div className="mt-3 pt-3 border-t border-gray-50 text-center">
               <p className="text-[9px] text-gray-400 font-bold">Support Code : 900003</p>
               <p className="text-[10px] text-gray-400 mt-1 font-semibold uppercase tracking-wider">
                 School Admin Portal • Secure Access
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;