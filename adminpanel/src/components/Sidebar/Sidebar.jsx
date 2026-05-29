import React from "react";
import { NavLink, useNavigate } from "react-router-dom"; // useNavigate import karein
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  ClipboardList,
  User,
  Settings,
  LogOut,
  X,
  School,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin" },
  { name: "Students", icon: <Users size={20} />, path: "/admin/students" },
  { name: "Teachers", icon: <GraduationCap size={20} />, path: "/admin/teachers" },
  { name: "Subjects", icon: <BookOpen size={20} />, path: "/admin/subjects" },
  { name: "Assignments", icon: <ClipboardList size={20} />, path: "/admin/assignments" },
  { name: "Profile", icon: <User size={20} />, path: "/admin/profile" },
  { name: "Settings", icon: <Settings size={20} />, path: "/admin/settings" },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate(); 

  const handleLogout = () => {

    localStorage.removeItem("adminToken");
    localStorage.removeItem("userRole");
    navigate("/admin-login"); 
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`
        fixed top-0 left-0 h-full bg-[#C83733] text-white w-64 z-[60]
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
      >
        {/* Logo */}
        <div className="p-5 flex items-center justify-between border-b border-red-800">
          <div className="flex items-center gap-3">
            <div className="bg-white p-1.5 rounded-lg">
              <School size={22} className="text-[#C83733]" />
            </div>
            <span className="font-bold text-lg tracking-tight">Admin Panel</span>
          </div>
          <button
            onClick={toggleSidebar}
            className="md:hidden p-1 hover:bg-red-700 rounded"
          >
            <X size={22} />
          </button>
        </div>

        {/* Role Badge */}
        <div className="mx-4 mt-4 mb-2 bg-red-800/50 rounded-lg px-3 py-2 text-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-red-200">
            Administrator
          </p>
        </div>

        {/* Nav Links */}
        <nav className="mt-2 px-4 space-y-1">
          {menuItems.map((item, i) => (
            <NavLink
              key={i}
              to={item.path}
              end={item.path === "/admin"}
              onClick={window.innerWidth < 768 ? toggleSidebar : undefined}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 text-sm
                ${
                  isActive
                    ? "bg-white text-[#C83733] shadow-lg font-bold"
                    : "text-red-100 hover:bg-red-700 hover:text-white"
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout Section */}
        <div className="absolute bottom-0 w-full p-4 border-t border-red-800 bg-red-700/40">
          <button
            onClick={handleLogout} 
            className="flex items-center gap-4 px-4 py-3 w-full text-red-100 hover:text-white hover:bg-red-800 rounded-xl transition-all active:scale-95"
          >
            <LogOut size={20} />
            <span className="text-sm font-semibold uppercase tracking-wider">
              Logout
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;