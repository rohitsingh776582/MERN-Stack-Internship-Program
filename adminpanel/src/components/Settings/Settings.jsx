import React from 'react';
import { Settings as SettingsIcon, Bell, Lock, Palette, Globe } from 'lucide-react';

const sections = [
  { icon: <Bell size={18} />, title: 'Notifications', desc: 'Manage email and push notifications.' },
  { icon: <Lock size={18} />, title: 'Security', desc: 'Change password and 2FA settings.' },
  { icon: <Palette size={18} />, title: 'Appearance', desc: 'Theme and display preferences.' },
  { icon: <Globe size={18} />, title: 'Language', desc: 'Set your preferred language.' },
];

const Settings = () => (
  <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
    <h2 className="text-2xl font-extrabold text-gray-800 mb-6 flex items-center gap-3">
      <SettingsIcon className="text-[#C83733]" size={28} /> Settings
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
      {sections.map((s, i) => (
        <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-start gap-4 hover:shadow-md transition-shadow cursor-pointer">
          <div className="bg-red-50 p-3 rounded-xl text-[#C83733]">{s.icon}</div>
          <div>
            <h3 className="font-bold text-gray-800">{s.title}</h3>
            <p className="text-sm text-gray-500 mt-0.5">{s.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Settings;
