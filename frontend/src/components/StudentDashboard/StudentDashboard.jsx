import React, { useState, useEffect } from 'react';
import { BookOpen, ClipboardList, CheckCircle, Clock } from 'lucide-react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';
const getAuthHeader = () => ({ headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });

const StudentDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    axios.get(`${API_BASE}/student/dashboard`, getAuthHeader())
      .then(res => setData(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex items-center justify-center min-h-screen"><div className="w-8 h-8 border-4 border-[#C83733] border-t-transparent rounded-full animate-spin" /></div>;

  const stats = data?.stats || {};
  const assignments = data?.recentAssignments || [];
  const student = data?.student || {};

  const statusColor = (s) => s === 'completed' ? 'border-green-500' : s === 'submitted' ? 'border-blue-500' : 'border-orange-500';

  return (
    <div className="p-4 md:p-8 w-full bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 bg-white p-6 rounded-xl shadow-sm gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Welcome, {student.full_name || user.full_name || 'Student'} 👋</h2>
          <p className="text-sm text-gray-500 font-medium">Class {student.class || '—'} | Roll: {student.roll_no || '—'}</p>
        </div>
        <div className="bg-red-50 p-3 rounded-lg border border-red-100">
          <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest">Academic Session</p>
          <p className="text-sm font-bold text-gray-700">2025-2026</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {[
          { label: 'Total Tasks', value: stats.total || 0, color: 'border-blue-500', bg: 'bg-blue-50', icon: <ClipboardList className="text-blue-500" size={28} /> },
          { label: 'Completed', value: stats.completed || 0, color: 'border-green-500', bg: 'bg-green-50', icon: <CheckCircle className="text-green-500" size={28} /> },
          { label: 'Pending', value: stats.pending || 0, color: 'border-orange-500', bg: 'bg-orange-50', icon: <Clock className="text-orange-500" size={28} /> },
        ].map((s, i) => (
          <div key={i} className={`bg-white p-6 rounded-xl shadow-sm border-b-4 ${s.color} hover:-translate-y-1 transition-transform`}>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">{s.label}</p>
                <h3 className="text-3xl font-black text-gray-800">{String(s.value).padStart(2, '0')}</h3>
              </div>
              <div className={`p-3 ${s.bg} rounded-lg`}>{s.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Assignments */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="text-red-600" size={20} />
          <h3 className="text-xl font-bold text-gray-800">Recent Assignments</h3>
        </div>

        {assignments.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center text-gray-400 border border-gray-100">No assignments assigned yet.</div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {assignments.map((item, i) => (
              <div key={i} className={`bg-white p-6 rounded-xl shadow-sm border-l-8 ${statusColor(item.status)} hover:shadow-md transition-shadow`}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-lg font-bold text-gray-800">{item.title}</h4>
                    <p className="text-sm text-blue-600 font-semibold italic">Prof. {item.teacher_name || '—'}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase ${item.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                    {item.status}
                  </span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg mb-3">
                  <p className="text-gray-600 text-sm">{item.description || 'No description'}</p>
                </div>
                <div className="flex items-center text-[11px] text-gray-400 font-bold uppercase">
                  <Clock size={13} className="mr-1" />
                  Due: {item.due_date ? new Date(item.due_date).toLocaleDateString('en-IN') : '—'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
