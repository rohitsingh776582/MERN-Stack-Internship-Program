import React, { useState, useEffect } from 'react';
import { BookOpen, Loader2, User, GraduationCap, Info } from 'lucide-react';
import axios from 'axios';

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";
  const DETAILS_URL = `${API_BASE}/teachers/details`;

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const res = await axios.get(DETAILS_URL, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Data path validation
      const data = Array.isArray(res.data) ? res.data : (res.data.teachers || res.data.subjects || []);
      setSubjects(data);
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Failed to load subjects data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="animate-spin text-[#C83733] mx-auto mb-2" size={48} />
          <p className="text-gray-500 font-medium">Loading Subjects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 flex items-center gap-3">
            <BookOpen className="text-[#C83733]" size={32} /> Subjects Dashboard
          </h2>
          <p className="text-gray-500 mt-2">
            Managing <span className="text-[#C83733] font-bold">{subjects.length}</span> active course assignments.
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-2xl mb-6 border border-red-100 flex items-center gap-3">
          <Info size={20} /> {error}
        </div>
      )}

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {subjects.length > 0 ? (
          subjects.map((s, index) => (
            <div 
              key={s.id || s.emp_id || index} 
              className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Card Header: Subject Name */}
              <div className="p-6 pb-4">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-red-100 text-[#C83733] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                    {s.emp_id || 'ID-NA'}
                  </span>
                  <div className="bg-gray-100 text-gray-600 text-[11px] font-bold px-3 py-1 rounded-full">
                    {s.credits || 0} Credits
                  </div>
                </div>
                
                <h3 className="text-xl font-extrabold text-gray-800 mb-1 group-hover:text-[#C83733] transition-colors">
                  {s.subject || "Untitled Subject"}
                </h3>
                
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <User size={16} className="text-gray-400" />
                  <p className="text-sm font-semibold">
                    Prof. {s.teacher_name || "Assigned Teacher"}
                  </p>
                </div>

                {/* Description */}
                <div className="bg-gray-50 rounded-2xl p-3 mb-4">
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                    {s.description || "No description provided for this subject."}
                  </p>
                </div>

                {/* Classes Badges */}
                <div className="flex items-center gap-2 mt-2">
                  <GraduationCap size={16} className="text-[#C83733]" />
                  <div className="flex flex-wrap gap-1">
                    {Array.isArray(s.classes) ? s.classes.map((cls, i) => (
                      <span key={i} className="text-[10px] bg-white border border-gray-200 px-2 py-0.5 rounded-md font-bold text-gray-700">
                        Class {cls}
                      </span>
                    )) : <span className="text-[10px] text-gray-400">No classes</span>}
                  </div>
                </div>
              </div>

              {/* Bottom Decorative Element */}
              <div className="h-1.5 bg-[#C83733] w-0 group-hover:w-full transition-all duration-500" />
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
             <BookOpen size={48} className="text-gray-200 mb-4" />
             <p className="text-gray-400 font-medium">No subjects found in the database.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Subjects;