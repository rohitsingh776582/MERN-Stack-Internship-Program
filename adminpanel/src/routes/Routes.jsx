import React, { useState } from 'react';
import { useRoutes, Navigate, Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import Dashboard from '../components/Dashboard/Dashboard';
import Students from '../components/Students/Students';
import Teachers from '../components/Teachers/Teachers';
import Subjects from '../components/Subjects/Subjects';
import Assignments from '../components/Assignments/Assignments';
import Profile from '../components/Profile/Profile';
import Settings from '../components/Settings/Settings';
import LoginPage from '../public/LoginPage';
import AdminSignup from '../public/AdminSignup';

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(prev => !prev);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
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
    { path: '/', element: <Navigate to="/login" /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/admin-signup', element:<AdminSignup/>},
    {
      path: '/admin',
      element: <AdminLayout />,
      children: [
        { path: '', element: <Dashboard /> },
        { path: 'students', element: <Students /> },
        { path: 'teachers', element: <Teachers /> },
        { path: 'subjects', element: <Subjects /> },
        { path: 'assignments', element: <Assignments /> },
        { path: 'profile', element: <Profile /> },
        { path: 'settings', element: <Settings /> },
      ],
    },
    { path: '*', element: <Navigate to="/login" /> },
  ]);

  return routes;
}

export default AppRoutes;
