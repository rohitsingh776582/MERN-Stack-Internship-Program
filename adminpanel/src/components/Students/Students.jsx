import React, { useState, useEffect } from 'react';
import { Users, Search, Plus, Pencil, Trash2, X, Mail, CheckCircle, MinusCircle } from 'lucide-react';
import axios from 'axios';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [formData, setFormData] = useState({
    full_name: "",
    className: "",
    email: "",
    password: "",
    status: "active"
  });

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const getAuthHeader = () => {
    const token = localStorage.getItem("adminToken");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${baseUrl}/students/`, getAuthHeader());
      setStudents(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => { fetchStudents(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditMode) {
        await axios.put(`${baseUrl}/students/${currentId}`, formData, getAuthHeader());
        alert("Student Updated!");
      } else {
        await axios.post(`${baseUrl}/students/create`, formData, getAuthHeader());
        alert("Student Registered!");
      }
      closeModal();
      fetchStudents();
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed");
    } finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await axios.delete(`${baseUrl}/students/${id}`, getAuthHeader());
        fetchStudents();
      } catch (err) { alert("Delete failed"); }
    }
  };

  const openEditModal = (s) => {
    setIsEditMode(true);
    setCurrentId(s.id || s._id);
    setFormData({
      full_name: s.full_name,
      className: s.className || s.class,
      email: s.email,
      password: "",
      status: s.status || "active"
    });
    setIsModalOpen(true);
  };

  const closeModal = () => { setIsModalOpen(false); setIsEditMode(false); };

  const filteredStudents = students.filter(s => 
    s.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.roll_no?.toString().includes(searchTerm)
  );

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-800 flex items-center gap-2">
            <Users className="text-[#C83733]" size={28} /> Students
          </h2>
          <p className="text-gray-500 text-sm">Manage student status and records.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-red-100 transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button onClick={() => { setIsEditMode(false); setFormData({...formData, status: 'active'}); setIsModalOpen(true); }} className="bg-[#C83733] text-white px-6 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition shadow-lg shadow-red-100">
            <Plus size={20} /> Add New
          </button>
        </div>
      </div>

      {/* Mobile Card List */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {filteredStudents.map((s) => (
          <div key={s.id || s._id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-gray-900 text-lg">{s.full_name}</h4>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${s.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                    {s.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500 font-medium">Roll: {s.roll_no} • Class: {s.className || s.class}</p>
              </div>
              <div className="flex gap-1">
                <button onClick={() => openEditModal(s)} className="p-2 bg-blue-50 text-blue-600 rounded-lg transition-colors"><Pencil size={18} /></button>
                <button onClick={() => handleDelete(s.id || s._id)} className="p-2 bg-red-50 text-red-600 rounded-lg transition-colors"><Trash2 size={18} /></button>
              </div>
            </div>
            <div className="pt-3 border-t border-gray-50 flex items-center gap-2 text-gray-600 text-sm">
              <Mail size={14} className="text-gray-400" />
              <span className="truncate">{s.email}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            <tr>
              <th className="px-6 py-4">Student</th>
              <th className="px-6 py-4">Class</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredStudents.map((s) => (
              <tr key={s.id || s._id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-800">{s.full_name}</span>
                    <span className="text-xs text-[#C83733] font-mono">Roll: {s.roll_no}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-600">{s.className || s.class}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{s.email}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${s.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                    {s.status === 'active' ? <CheckCircle size={12}/> : <MinusCircle size={12}/>}
                    {s.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-3">
                    <button onClick={() => openEditModal(s)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-all"><Pencil size={16} /></button>
                    <button onClick={() => handleDelete(s.id || s._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Responsive Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="bg-[#C83733] p-5 flex justify-between items-center text-white">
              <h3 className="font-bold text-lg">{isEditMode ? "Update Student" : "New Registration"}</h3>
              <button onClick={closeModal} className="hover:rotate-90 transition-transform"><X size={24}/></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Auto Roll No Badge */}
              {!isEditMode && (
                <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 flex items-center gap-3">
                  <div className="bg-[#C83733] text-white text-xs font-black px-2 py-1 rounded-lg">AUTO</div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Roll Number</p>
                    <p className="text-sm font-bold text-[#C83733]">S-{new Date().getFullYear()}-XXX (auto assigned)</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Class</label>
                  <input required type="text" value={formData.className} placeholder="e.g. 10-A" className="w-full border-b-2 border-gray-100 py-2 outline-none focus:border-[#C83733] text-sm"
                    onChange={(e) => setFormData({...formData, className: e.target.value})} />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase">Full Name</label>
                <input required type="text" value={formData.full_name} className="w-full border-b-2 border-gray-100 py-2 outline-none focus:border-[#C83733] text-sm" 
                  onChange={(e) => setFormData({...formData, full_name: e.target.value})} />
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase">Email</label>
                <input required type="email" value={formData.email} className="w-full border-b-2 border-gray-100 py-2 outline-none focus:border-[#C83733] text-sm" 
                  onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>

              {/* Status Toggle (Very Important) */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase">Account Status</label>
                <select 
                  className="w-full border-b-2 border-gray-100 py-2 outline-none focus:border-[#C83733] text-sm bg-transparent"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {!isEditMode && (
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Password</label>
                  <input required type="password" value={formData.password} className="w-full border-b-2 border-gray-100 py-2 outline-none focus:border-[#C83733] text-sm" 
                    onChange={(e) => setFormData({...formData, password: e.target.value})} />
                </div>
              )}

              <div className="flex gap-3 pt-6 pb-4 sm:pb-0">
                <button type="button" onClick={closeModal} className="flex-1 py-3 font-bold text-gray-400 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">Cancel</button>
                <button type="submit" disabled={loading} className="flex-[2] py-3 font-bold bg-[#C83733] text-white rounded-xl shadow-lg hover:bg-red-700 transition-all active:scale-95">
                  {loading ? "Saving..." : isEditMode ? "Update Now" : "Register"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;