import React, { useState, useEffect } from 'react';
import { Bell, Search, UserCircle, LogOut, Menu } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const res = await axios.get(`${API_BASE}/student/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        
        setStudent(res.data);
        console.log("Fetched Student Data:", res.data);
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
    };

    fetchProfile();
  }, [API_BASE]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40 shadow-sm">
      
      {/* Left: Mobile Menu & Search */}
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar} 
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
        >
          <Menu size={24} />
        </button>
        
        <div className="hidden sm:flex items-center bg-gray-50 border border-gray-200 rounded-full px-4 py-1.5 w-64 lg:w-96 focus-within:ring-2 focus-within:ring-red-100 transition-all">
          <Search size={16} className="text-gray-400 mr-2" />
          <input 
            type="text" 
            placeholder="Search student records..." 
            className="bg-transparent border-none outline-none text-sm w-full"
          />
        </div>
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center gap-2 md:gap-6">
        
        {/* Notifications */}
        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-600 rounded-full border-2 border-white"></span>
        </button>

        {/* Profile Section */}
        <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
          <div className="hidden md:block text-right">
            {/* JSON Keys mapping: full_name, roll_no, class */}
            <p className="text-sm font-bold text-gray-800 capitalize">
              {student ? student.full_name : 'Loading...'}
            </p>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">
              {student ? `${student.class} | ${student.roll_no}` : 'Fetching Details...'}
            </p>
          </div>

          {/* Profile Link */}
          <Link 
            to="profile" 
            className="bg-red-50 p-1 rounded-full border border-red-100 cursor-pointer hover:bg-red-100 transition-all shadow-sm active:scale-95"
            title="View Profile"
          >
          
            {student?.profile_pic ? (
              <img 
                src={student.profile_pic} 
                alt="Profile" 
                className="w-7 h-7 rounded-full object-cover"
              />
            ) : (
              <UserCircle size={28} className="text-[#C83733]" />
            )}
          </Link>
          
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