import React, { useState, useEffect } from 'react';
import { GraduationCap, Search, Plus, Pencil, Trash2, X, Users } from 'lucide-react';
import axios from 'axios';

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const initialForm = {
    emp_id: "",
    full_name: "",
    subject: "",
    email: "",
    status: "active",
    classes: "",
    credits: "",
    description: "" // State mein hai, ab input bhi add kar diya hai
  };

  const [formData, setFormData] = useState(initialForm);

  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";
  const TEACHERS_URL = `${API_BASE}/teachers`;

  const getAuthHeader = () => {
    const token = localStorage.getItem("adminToken");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const fetchTeachers = async () => {
    try {
      const res = await axios.get(`${TEACHERS_URL}/`, getAuthHeader());
      const data = Array.isArray(res.data) ? res.data : (res.data.teachers || []);
      setTeachers(data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => { fetchTeachers(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const payload = {
      ...formData,
      classes: typeof formData.classes === 'string' 
        ? formData.classes.split(',').map(c => c.trim()) 
        : formData.classes,
      credits: Number(formData.credits)
    };

    try {
      if (isEditMode) {
        if (!currentId) throw new Error("ID missing");
        await axios.put(`${TEACHERS_URL}/${currentId}`, payload, getAuthHeader());
      } else {
        await axios.post(`${TEACHERS_URL}/create`, payload, getAuthHeader());
      }
      closeModal();
      fetchTeachers();
    } catch (err) {
      alert(err.response?.data?.message || "Action failed");
    } finally { setLoading(false); }
  };

  const handleDelete = async (teacher) => {
    const teacherId = teacher.id || teacher._id;
    if (!teacherId) return alert("ID missing");

    if (window.confirm(`Delete ${teacher.full_name}?`)) {
      try {
        await axios.delete(`${TEACHERS_URL}/${teacherId}`, getAuthHeader());
        fetchTeachers();
      } catch (err) { alert("Delete failed"); }
    }
  };

  const openEditModal = (t) => {
    setIsEditMode(true);
    setCurrentId(t.id || t._id);
    setFormData({
      ...t,
      classes: Array.isArray(t.classes) ? t.classes.join(', ') : (t.classes || ""),
      credits: t.credits || "",
      description: t.description || "" // Description mapping
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setCurrentId(null);
    setFormData(initialForm);
  };

  const filteredTeachers = teachers.filter(t => 
    t.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.emp_id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      {/* Top Section: Header & Stats */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-800 flex items-center gap-2">
            <GraduationCap className="text-[#C83733]" size={28} /> Teachers Portal
          </h2>
          {/* Total Teacher Count Display */}
          <div className="flex items-center gap-2 mt-1 text-gray-500 font-semibold text-sm">
            <Users size={16} className="text-[#C83733]" />
            Total Teachers: <span className="text-gray-800">{filteredTeachers.length}</span>
          </div>
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              className="w-full border pl-9 p-2 rounded-lg text-sm outline-none focus:ring-1 focus:ring-red-400" 
              placeholder="Search by name or ID..." 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </div>
          <button onClick={() => setIsModalOpen(true)} className="bg-[#C83733] text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-red-700 transition">
            <Plus size={18}/> Add
          </button>
        </div>
      </div>

      {/* List Container */}
      <div className="space-y-3">
        {filteredTeachers.map((t, index) => (
          <div key={t.id || t._id || index} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm md:flex md:items-center hover:shadow-md transition">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-2">
              <div>
                <p className="text-[10px] text-[#C83733] font-bold uppercase">{t.emp_id}</p>
                <h4 className="font-bold text-gray-800">{t.full_name}</h4>
              </div>
              <p className="text-sm text-gray-600 font-medium self-center">{t.subject}</p>
              <p className="text-sm text-gray-400 truncate self-center">{t.email}</p>
              <div className="self-center">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${t.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                  {t.status}
                </span>
              </div>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0 pt-3 md:pt-0 border-t md:border-none justify-end">
              <button onClick={() => openEditModal(t)} className="p-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition"><Pencil size={18}/></button>
              <button onClick={() => handleDelete(t)} className="p-2 text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition"><Trash2 size={18}/></button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-[#C83733] p-4 flex justify-between text-white font-bold">
              <span>{isEditMode ? "Update Details" : "Register Teacher"}</span>
              <button onClick={closeModal}><X/></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 grid grid-cols-2 gap-4">
              <input required placeholder="Emp ID" className="border p-2 rounded-lg text-sm" value={formData.emp_id} onChange={e => setFormData({...formData, emp_id: e.target.value})} />
              <input required placeholder="Subject" className="border p-2 rounded-lg text-sm" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} />
              <input required placeholder="Full Name" className="col-span-2 border p-2 rounded-lg text-sm" value={formData.full_name} onChange={e => setFormData({...formData, full_name: e.target.value})} />
              <input required type="email" placeholder="Email" className="col-span-2 border p-2 rounded-lg text-sm" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              <input placeholder="Classes (e.g. 9, 10)" className="border p-2 rounded-lg text-sm" value={formData.classes} onChange={e => setFormData({...formData, classes: e.target.value})} />
              <input type="number" placeholder="Credits" className="border p-2 rounded-lg text-sm" value={formData.credits} onChange={e => setFormData({...formData, credits: e.target.value})} />
              
              {/* DESCRIPTION FIELD ADDED HERE */}
              <textarea 
                placeholder="Description" 
                className="col-span-2 border p-2 rounded-lg text-sm h-20 resize-none" 
                value={formData.description} 
                onChange={e => setFormData({...formData, description: e.target.value})} 
              />

              <div className="col-span-2 flex gap-2 mt-4">
                <button type="button" onClick={closeModal} className="flex-1 py-2.5 bg-gray-100 rounded-xl font-bold">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 bg-[#C83733] text-white rounded-xl font-bold">
                  {loading ? "Saving..." : "Save Teacher"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teachers;