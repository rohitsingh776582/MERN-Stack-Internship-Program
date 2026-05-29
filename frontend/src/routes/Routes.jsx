
import React, { useState } from 'react';
import { useRoutes, Navigate, Outlet } from 'react-router-dom';

// Pages
import LoginPage from '../components/public/LoginPage';
import StudentDashboard from '../components/StudentDashboard/StudentDashboard';
import MySubjects from '../components/MySubjects/MySubjects';
import Assignments from '../components/Assignments/Assignments';

// Layout Components
import Sidebar from '../components/Sidebar/Sidebar';
import Navbar from '../components/navbar/Navbar';
import Profile from '../components/Profile/Profile';
import Settings from '../components/Settings/Settings';

// Dashboard Layout Wrapper
const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(prev => !prev);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content Area */}
      <div className="flex-1 md:ml-64 flex flex-col">
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

function AppRoutes() {
  const routes = useRoutes([
    // Public Routes
    { path: "/", element: <Navigate to="/login" /> },
    { path: "/login", element: <LoginPage /> },
    

    // Protected Dashboard Routes
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { path: "", element: <StudentDashboard /> },       // /dashboard
        { path: "subjects", element: <MySubjects /> },     // /dashboard/subjects
        { path: "assignments", element: <Assignments /> }, // /dashboard/assignments
        {path: "profile", element:<Profile/>},
        {path: "settings", element:<Settings></Settings>}
      ]
    },

    // 404 Redirect
    { path: "*", element: <Navigate to="/login" /> }
  ]);

  return routes;
}

export default AppRoutes;

