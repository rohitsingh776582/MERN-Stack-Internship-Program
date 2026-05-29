import React, { useState, useEffect } from 'react';
import { Book, User, Award, Clock } from 'lucide-react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';
const getAuthHeader = () => ({ headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });

const subjectIcons = {
  Mathematics: 'https://cdn-icons-png.flaticon.com/512/3841/3841431.png',
  Physics: 'https://cdn-icons-png.flaticon.com/512/3022/3022215.png',
  'Computer Science': 'https://cdn-icons-png.flaticon.com/512/2001/2001556.png',
  English: 'https://cdn-icons-png.flaticon.com/512/3426/3426653.png',
};

const MySubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE}/student/subjects`, getAuthHeader())
      .then(res => setSubjects(Array.isArray(res.data) ? res.data : []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex items-center justify-center min-h-screen"><div className="w-8 h-8 border-4 border-[#C83733] border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="p-4 md:p-8 w-full bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-gray-800 flex items-center gap-3">
          <Book className="text-[#C83733]" size={32} /> My Subjects
        </h2>
        <p className="text-gray-500 mt-2">Your enrolled subjects and teachers.</p>
      </div>

      {subjects.length === 0 ? (
        <div className="bg-white rounded-xl p-10 text-center text-gray-400 border border-gray-100">No subjects found. Assignments need to be assigned first.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {subjects.map((subject, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group">
              <div className="h-2 bg-[#C83733] opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-red-50 p-3 rounded-xl">
                    <img
                      src={subjectIcons[subject.subject] || 'https://cdn-icons-png.flaticon.com/512/2001/2001556.png'}
                      alt={subject.subject}
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                    {subject.emp_id}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-1">{subject.subject}</h3>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <User size={14} className="mr-1 text-gray-400" />
                  <span className="font-medium">{subject.full_name}</span>
                </div>

                <hr className="border-gray-50 my-4" />
                <div className="flex justify-between items-center text-xs text-gray-500 font-semibold">
                  <div className="flex items-center gap-1">
                    <Award size={14} className="text-orange-400" />
                    {subject.credits || '—'} Credits
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} className="text-blue-400" />
                    3 Lectures/Week
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MySubjects;
