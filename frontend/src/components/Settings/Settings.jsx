
import React, { useState } from 'react';
import { Bell, Lock, Eye, Globe, Trash2, ShieldCheck, Moon } from 'lucide-react';

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="p-4 md:p-8 animate-fadeIn max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Settings</h2>
      <p className="text-gray-500 mb-8 text-sm">Manage your account preferences and security settings.</p>

      <div className="space-y-6">
        
        {/* Account Security Section */}
        <section className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
            <Lock size={18} className="text-[#C83733]" />
            <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wider">Security</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-800">Change Password</p>
                <p className="text-xs text-gray-500">Update your login password regularly for safety.</p>
              </div>
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all">
                Update
              </button>
            </div>
            <hr className="border-gray-50" />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-800">Two-Factor Authentication</p>
                <p className="text-xs text-gray-500">Add an extra layer of security to your account.</p>
              </div>
              <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-1 rounded">OFF</span>
            </div>
          </div>
        </section>

        {/* Preferences Section */}
        <section className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
            <Bell size={18} className="text-[#C83733]" />
            <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wider">Preferences</h3>
          </div>
          <div className="p-6 space-y-6">
            {/* Toggle Notification */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell size={20} className="text-gray-400" />
                <p className="font-medium text-gray-700">Push Notifications</p>
              </div>
              <button 
                onClick={() => setNotifications(!notifications)}
                className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ${notifications ? 'bg-green-500' : 'bg-gray-300'}`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${notifications ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>

            {/* Dark Mode */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Moon size={20} className="text-gray-400" />
                <p className="font-medium text-gray-700">Dark Mode</p>
              </div>
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ${darkMode ? 'bg-indigo-600' : 'bg-gray-300'}`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${darkMode ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe size={20} className="text-gray-400" />
                <p className="font-medium text-gray-700">Language</p>
              </div>
              <select className="bg-gray-50 border border-gray-200 text-sm rounded-lg p-1 outline-none">
                <option>English</option>
                <option>Hindi</option>
                <option>Punjabi</option>
              </select>
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="bg-red-50 border border-red-100 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4 text-red-700">
            <Trash2 size={20} />
            <h3 className="font-bold">Danger Zone</h3>
          </div>
          <p className="text-sm text-red-600 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-700 transition-all shadow-sm">
            Delete Account
          </button>
        </section>

      </div>
    </div>
  );
};

export default Settings;