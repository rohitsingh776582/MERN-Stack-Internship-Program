import React, { useState, useEffect } from 'react';
import { Bell, Search, UserCircle, LogOut, Menu, Loader2 } from 'lucide-react';
import axios from 'axios';

const Navbar = ({ toggleSidebar }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ENV se API URL fetch karna
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const res = await axios.get(`${API_BASE}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
      } catch (err) {
        console.error("Navbar Profile Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [API_BASE]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/login"; // Ya jo bhi aapka login route ho
  };

  return (
    <nav className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40 shadow-sm">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg text-gray-600"
        >
          <Menu size={24} />
        </button>
        <div className="hidden sm:flex items-center bg-gray-50 border border-gray-200 rounded-full px-4 py-1.5 w-64 lg:w-80 focus-within:ring-2 focus-within:ring-red-100 transition-all">
          <Search size={16} className="text-gray-400 mr-2 shrink-0" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none outline-none text-sm w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-5">
        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-600 rounded-full border-2 border-white" />
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
          <div className="hidden md:block text-right">
            {loading ? (
              <div className="flex justify-end"><Loader2 size={14} className="animate-spin text-gray-300" /></div>
            ) : (
              <>
                <p className="text-sm font-bold text-gray-800 truncate max-w-[150px]">
                  {user?.full_name || "Guest User"}
                </p>
                <p className="text-[10px] font-bold text-[#C83733] uppercase tracking-wider">
                  {user?.role || "User"}
                </p>
              </>
            )}
          </div>
          
          <div className="bg-red-50 p-1 rounded-full border border-red-100 cursor-pointer group relative">
            {/* Initial Letter Avatar (Optional but looks good) */}
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-[#C83733] font-bold text-sm">
               {user?.full_name ? user.full_name.charAt(0).toUpperCase() : <UserCircle size={24} />}
            </div>
          </div>

          <button 
            onClick={handleLogout}
            className="hidden sm:block p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" 
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;