import React, { useEffect, useState } from 'react';
import { Users, GraduationCap, ClipboardList, TrendingUp, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';
const getAuthHeader = () => ({ headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` } });

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentStudents, setRecentStudents] = useState([]);
  const [recentAssignments, setRecentAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE}/dashboard`, getAuthHeader())
      .then(res => {
        setStats(res.data.stats);
        setRecentStudents(res.data.recentStudents);
        setRecentAssignments(res.data.recentAssignments);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const statCards = [
    { label: 'Total Students',  value: stats?.total_students  || 0, icon: <Users size={28} />,        color: 'border-blue-500',   bg: 'bg-blue-50',   text: 'text-blue-500' },
    { label: 'Total Teachers',  value: stats?.total_teachers  || 0, icon: <GraduationCap size={28} />, color: 'border-green-500',  bg: 'bg-green-50',  text: 'text-green-500' },
    { label: 'Assignments',     value: stats?.total_assignments || 0, icon: <ClipboardList size={28} />, color: 'border-orange-500', bg: 'bg-orange-50', text: 'text-orange-500' },
    { label: 'Active Students', value: stats?.active_students || 0, icon: <TrendingUp size={28} />,    color: 'border-purple-500', bg: 'bg-purple-50', text: 'text-purple-500' },
  ];

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-8 h-8 border-4 border-[#C83733] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-extrabold text-gray-800">Welcome, Admin 👋</h2>
        <p className="text-gray-500 text-sm mt-1">Here's what's happening in your school today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((s, i) => (
          <div key={i} className={`bg-white rounded-xl shadow-sm p-6 border-b-4 ${s.color} hover:-translate-y-1 transition-transform`}>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">{s.label}</p>
                <h3 className="text-3xl font-black text-gray-800 mt-1">{s.value}</h3>
              </div>
              <div className={`p-3 ${s.bg} rounded-xl ${s.text}`}>{s.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent Students */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <Users size={18} className="text-[#C83733]" /> Recent Students
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase">
                <tr>
                  <th className="px-6 py-3">Roll No</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Class</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentStudents.length === 0 ? (
                  <tr><td colSpan={4} className="px-6 py-6 text-center text-gray-400 text-sm">No students yet.</td></tr>
                ) : recentStudents.map((s, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-500 font-mono">{s.roll_no}</td>
                    <td className="px-6 py-4 font-semibold text-gray-800">{s.full_name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{s.class}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${s.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Assignments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <ClipboardList size={18} className="text-[#C83733]" /> Recent Assignments
            </h3>
          </div>
          <div className="divide-y divide-gray-50">
            {recentAssignments.length === 0 ? (
              <p className="px-6 py-6 text-center text-gray-400 text-sm">No assignments yet.</p>
            ) : recentAssignments.map((a, i) => (
              <div key={i} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{a.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{a.subject} • {a.teacher_name || '—'}</p>
                  </div>
                  <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-black uppercase ${a.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                    {a.status === 'completed' ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />}
                    {a.status}
                  </span>
                </div>
                {a.due_date && (
                  <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-1.5">
                    <Clock size={11} />
                    Due: {new Date(a.due_date).toLocaleDateString('en-IN')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
