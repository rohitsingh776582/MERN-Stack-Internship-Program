import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  ClipboardList, 
  User, 
  Settings, 
  LogOut, 
  X 
} from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  // Logout Function
  const handleLogout = () => {
    // 1. LocalStorage se saara sensitive data delete karein
    localStorage.removeItem("adminToken");
    localStorage.removeItem("user");
    localStorage.removeItem("currentUser");

    
    navigate("/login");
  };


  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { name: 'My Subjects', icon: <BookOpen size={20} />, path: '/dashboard/subjects' },
    { name: 'Assignments', icon: <ClipboardList size={20} />, path: '/dashboard/assignments' },
    { name: 'Profile', icon: <User size={20} />, path: '/dashboard/profile' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/dashboard/settings' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 left-0 h-full bg-[#C83733] text-white w-64 z-[60] 
        transition-transform duration-300 ease-in-out border-r border-red-800
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        
        {/* Logo Section */}
        <div className="p-6 flex items-center justify-between border-b border-red-800">
          <div className="flex items-center gap-3">
            <div className="bg-white p-1 rounded-lg">
              <img 
                src="https://img.freepik.com/free-vector/bird-colorful-gradient-design-vector_343694-2506.jpg?semt=ais_hybrid&w=740&q=80" 
                alt="Logo" 
                className="h-8 w-8 object-contain"
              />
            </div>
            <span className="font-bold text-lg tracking-tight italic">School</span>
          </div>
          <button onClick={toggleSidebar} className="md:hidden p-1 hover:bg-red-700 rounded">
            <X size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="mt-6 px-4 space-y-2">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              end={item.path === '/dashboard'}
              onClick={() => window.innerWidth < 768 && toggleSidebar()}
              className={({ isActive }) => `
                flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200
                ${isActive 
                  ? 'bg-white text-[#C83733] shadow-lg font-bold' 
                  : 'hover:bg-red-700 text-red-100 hover:text-white'}
              `}
            >
              {item.icon}
              <span className="text-sm">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        
        <div className="absolute bottom-0 w-full p-4 border-t border-red-800 bg-red-700/50">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 px-4 py-3 w-full text-red-100 hover:text-white hover:bg-red-800 rounded-xl transition-all active:scale-95"
          >
            <LogOut size={20} />
            <span className="text-sm font-semibold uppercase tracking-wider">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;