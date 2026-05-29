import React, { useEffect, useState } from 'react';
import { User, Mail, Book, Phone, Calendar, MapPin, Camera } from 'lucide-react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';
const getAuthHeader = () => ({ headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });

const Profile = () => {
  const [student, setStudent] = useState(null);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    axios.get(`${API_BASE}/student/profile`, getAuthHeader())
      .then(res => setStudent(res.data))
      .catch(() => setStudent(null));
  }, []);

  const name = student?.full_name || user?.full_name || 'Student';
  const email = student?.email || user?.email || '—';

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`} alt="Profile"
                className="rounded-full border-4 border-red-50 bg-red-50 w-full h-full" />
              <button className="absolute bottom-1 right-1 bg-[#C83733] p-2 rounded-full text-white hover:bg-red-700 transition shadow-lg">
                <Camera size={16} />
              </button>
            </div>
            <h3 className="text-xl font-bold text-gray-800">{name}</h3>
            <p className="text-gray-500 text-sm font-medium">Roll No: {student?.roll_no || '—'}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <span className="bg-green-100 text-green-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase">{student?.status || 'Active'}</span>
              <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase">Class {student?.class || '—'}</span>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 md:p-8">
            <h4 className="text-lg font-bold text-gray-800 mb-6 border-b border-gray-50 pb-4">Personal Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoItem icon={<User size={18} />} label="Full Name" value={name} />
              <InfoItem icon={<Mail size={18} />} label="Email" value={email} />
              <InfoItem icon={<Book size={18} />} label="Class" value={student?.class || '—'} />
              <InfoItem icon={<MapPin size={18} />} label="Roll No" value={student?.roll_no || '—'} />
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#C83733] to-red-500 rounded-2xl p-6 text-white shadow-lg">
            <h4 className="font-bold mb-4">Academic Session 2025-2026</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div><p className="text-red-100 text-xs uppercase">Status</p><p className="text-lg font-bold capitalize">{student?.status || 'Active'}</p></div>
              <div className="border-x border-white/20"><p className="text-red-100 text-xs uppercase">Class</p><p className="text-lg font-bold">{student?.class || '—'}</p></div>
              <div><p className="text-red-100 text-xs uppercase">Roll</p><p className="text-lg font-bold">{student?.roll_no || '—'}</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-4">
    <div className="p-2 bg-gray-50 rounded-lg text-gray-400">{icon}</div>
    <div>
      <p className="text-xs text-gray-400 font-medium uppercase tracking-tighter">{label}</p>
      <p className="text-sm font-semibold text-gray-700">{value}</p>
    </div>
  </div>
);

export default Profile;
