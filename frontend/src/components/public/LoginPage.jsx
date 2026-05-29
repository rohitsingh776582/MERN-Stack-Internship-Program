import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // ENV se Base URL fetch karna
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // API Call for Login
      const res = await axios.post(`${API_BASE}/users/login`, {
        email: loginData.email,
        password: loginData.password
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/dashboard");
      }
    } catch (err) {
      // Error handling (Backend se aane wala message dikhana)
      const errorMsg = err.response?.data?.message || "Invalid Email or Password!";
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center lg:justify-end bg-cover bg-center px-4 lg:pr-20"
      style={{
        backgroundImage:
          "url('https://as1.ftcdn.net/v2/jpg/03/93/32/30/1000_F_393323046_mo4niGwmjAWqMDMqj5CCqdaQDPit19xd.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/20 lg:hidden"></div>

      <div className="relative bg-white p-6 md:p-8 rounded-sm shadow-2xl w-full max-w-sm border-t-4 border-red-600">
        <div className="text-center mb-6">
          <img
            src="https://img.freepik.com/free-psd/gradient-abstract-logo_23-2150689652.jpg?semt=ais_hybrid&w=740&q=80"
            alt="Play school"
            className="mx-auto h-14 md:h-16 mb-2"
          />
          <h2 className="text-xs font-bold tracking-widest text-gray-800 uppercase">Play school</h2>
          <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">school</p>
        </div>

        <h3 className="text-lg font-medium text-gray-700 mb-4">Sign In</h3>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="admin@gmail.com"
              className="w-full px-3 py-2 border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] md:text-xs text-gray-600">
            <div className="flex items-center">
              <input type="checkbox" className="mr-1 md:mr-2" id="remember" />
              <label htmlFor="remember">Remember Me</label>
            </div>
            <span className="text-blue-600 cursor-pointer hover:underline">Forgot password?</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C83733] text-white py-2.5 font-semibold hover:bg-red-700 transition duration-200 shadow-md disabled:bg-gray-400"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center text-xs space-y-3">
          <hr className="border-gray-100" />
          <div className="flex justify-center space-x-3 grayscale opacity-60">
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Play Store" className="h-7" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-7" />
          </div>
          <p className="text-[10px] font-bold text-gray-400">Mobile App Code : 900003</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

