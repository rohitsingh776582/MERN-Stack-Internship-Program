import React, { useState, useEffect } from 'react';
import { ClipboardList, Clock, CheckCircle2, AlertCircle, Plus, Pencil, Trash2, X, Search, UserPlus, Users, User, BookOpen } from 'lucide-react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';
const ASSIGNMENTS_URL = `${API_BASE}/assignments`;
const TEACHERS_URL = `${API_BASE}/teachers`;
const STUDENTS_URL = `${API_BASE}/students`;

const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
});

const initialForm = { title: '', description: '', subject: '', due_date: '', status: 'pending', teacher_id: '' };

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [allStudents, setAllStudents] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const [assignModal, setAssignModal] = useState(false);
  const [assigningTo, setAssigningTo] = useState(null);
  const [assignedStudents, setAssignedStudents] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [assignLoading, setAssignLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  const fetchAssignments = async () => {
    try {
      const res = await axios.get(`${ASSIGNMENTS_URL}/`, getAuthHeader());
      setAssignments(Array.isArray(res.data) ? res.data : []);
    } catch (err) { console.error(err); }
  };

  const fetchTeachers = async () => {
    try {
      const res = await axios.get(`${TEACHERS_URL}/`, getAuthHeader());
      setTeachers(Array.isArray(res.data) ? res.data : []);
    } catch (err) { console.error(err); }
  };

  const fetchAllStudents = async () => {
    try {
      const res = await axios.get(`${STUDENTS_URL}/`, getAuthHeader());
      setAllStudents(Array.isArray(res.data) ? res.data : []);
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    fetchAssignments();
    fetchTeachers();
    fetchAllStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.teacher_id) { alert('Please select a teacher'); return; }
    setLoading(true);
    try {
      if (isEditMode) {
        await axios.put(`${ASSIGNMENTS_URL}/${currentId}`, formData, getAuthHeader());
      } else {
        await axios.post(`${ASSIGNMENTS_URL}/create`, formData, getAuthHeader());
      }
      closeModal();
      fetchAssignments();
    } catch (err) {
      alert(err.response?.data?.message || err.response?.data?.error || 'Action failed');
    } finally { setLoading(false); }
  };

  const handleDelete = async (a) => {
    if (!window.confirm(`Delete "${a.title}"?`)) return;
    try {
      await axios.delete(`${ASSIGNMENTS_URL}/${a.id}`, getAuthHeader());
      fetchAssignments();
    } catch (err) { alert(err.response?.data?.message || 'Delete failed'); }
  };

  const openEditModal = (a) => {
    setIsEditMode(true);
    setCurrentId(a.id);
    setFormData({
      title: a.title || '', description: a.description || '',
      subject: a.subject || '',
      due_date: a.due_date ? a.due_date.split('T')[0] : '',
      status: a.status || 'pending', teacher_id: a.teacher_id || '',
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false); setIsEditMode(false);
    setCurrentId(null); setFormData(initialForm);
  };

  const openAssignModal = async (a) => {
    setAssigningTo(a);
    setSelectedIds([]);
    try {
      const res = await axios.get(`${ASSIGNMENTS_URL}/${a.id}/students`, getAuthHeader());
      setAssignedStudents(Array.isArray(res.data) ? res.data : []);
    } catch (err) { setAssignedStudents([]); }
    setAssignModal(true);
  };

  const toggleStudent = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleAssign = async () => {
    if (!selectedIds.length) { alert('Koi student select nahi kiya'); return; }
    setAssignLoading(true);
    try {
      await axios.post(
        `${ASSIGNMENTS_URL}/${assigningTo.id}/assign`,
        { student_ids: selectedIds },
        getAuthHeader()
      );
      const res = await axios.get(`${ASSIGNMENTS_URL}/${assigningTo.id}/students`, getAuthHeader());
      setAssignedStudents(Array.isArray(res.data) ? res.data : []);
      setSelectedIds([]);
      alert('Students assigned successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Assign failed');
    } finally { setAssignLoading(false); }
  };

  const handleRemoveStudent = async (studentId) => {
    if (!window.confirm('Remove this student?')) return;
    try {
      await axios.delete(`${ASSIGNMENTS_URL}/${assigningTo.id}/students/${studentId}`, getAuthHeader());
      setAssignedStudents(prev => prev.filter(s => s.student_id !== studentId));
    } catch (err) { alert('Remove failed'); }
  };

  const assignedIds = new Set(assignedStudents.map(s => s.student_id));

  const filtered = assignments.filter(a =>
    a.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.teacher_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">

      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
        <div className="w-full lg:w-auto">
          <h2 className="text-2xl md:text-3xl font-black text-gray-800 flex items-center gap-3">
            <ClipboardList className="text-[#C83733]" size={32} /> Assignments
          </h2>
          <p className="text-gray-500 text-sm mt-1">Manage and assign tasks to your students.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              className="w-full border-none bg-white shadow-sm pl-10 p-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-red-400/50 transition-all"
              placeholder="Search title, subject, teacher..."
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <button onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 bg-[#C83733] text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-red-700 shadow-lg shadow-red-200 transition-all">
            <Plus size={18} /> Add New
          </button>
        </div>
      </div>

      {/* Mobile Card View (Visible on < 1024px) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-4 mb-6">
        {filtered.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-white rounded-2xl border-2 border-dashed border-gray-200 text-gray-400">
            No assignments found.
          </div>
        ) : filtered.map((a, i) => (
          <div key={a.id || i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4 relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-1.5 h-full ${a.status === 'completed' ? 'bg-green-500' : 'bg-orange-500'}`} />
            <div className="flex justify-between items-start">
              <div className="max-w-[70%]">
                <h3 className="font-bold text-gray-800 text-lg leading-tight truncate">{a.title}</h3>
                <span className="text-[#C83733] text-xs font-bold uppercase tracking-wider">{a.subject}</span>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1 ${
                a.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
              }`}>
                {a.status}
              </span>
            </div>
            <div className="space-y-2 border-t border-gray-50 pt-3 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <User size={14} className="text-gray-400" />
                <span className="font-medium truncate">{a.teacher_name || 'No Teacher Assigned'}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <Clock size={14} className="text-gray-400" />
                <span>Due: {a.due_date ? new Date(a.due_date).toLocaleDateString('en-IN') : '—'}</span>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <button onClick={() => openAssignModal(a)} className="flex-1 flex items-center justify-center gap-2 bg-green-50 text-green-700 py-2.5 rounded-xl font-bold text-xs hover:bg-green-100 transition">
                <UserPlus size={14} /> Assign
              </button>
              <button onClick={() => openEditModal(a)} className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100">
                <Pencil size={16} />
              </button>
              <button onClick={() => handleDelete(a)} className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-100">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View (Visible on > 1024px) */}
      <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
              <tr>
                <th className="px-8 py-5">Assignment Detail</th>
                <th className="px-6 py-5">Subject</th>
                <th className="px-6 py-5">Teacher</th>
                <th className="px-6 py-5">Due Date</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((a, i) => (
                <tr key={a.id || i} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-8 py-5">
                    <p className="font-bold text-gray-800 group-hover:text-[#C83733] transition-colors">{a.title}</p>
                    <p className="text-xs text-gray-400 line-clamp-1">{a.description || 'No description'}</p>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-md">{a.subject}</span>
                  </td>
                  <td className="px-6 py-5 text-sm font-medium text-gray-700">{a.teacher_name || '—'}</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock size={14} className="text-[#C83733]" />
                      {a.due_date ? new Date(a.due_date).toLocaleDateString('en-IN') : '—'}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`flex items-center gap-1.5 w-fit px-3 py-1.5 rounded-full text-[10px] font-black uppercase ${
                      a.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {a.status === 'completed' ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                      {a.status}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex justify-end gap-3">
                      <button onClick={() => openAssignModal(a)} title="Assign Students" className="p-2 text-green-600 hover:bg-green-50 rounded-xl transition"><UserPlus size={18} /></button>
                      <button onClick={() => openEditModal(a)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-xl transition"><Pencil size={18} /></button>
                      <button onClick={() => handleDelete(a)} className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- Create / Edit Modal --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="bg-[#C83733] p-5 flex justify-between items-center text-white shrink-0">
              <span className="font-bold text-lg">{isEditMode ? 'Edit Assignment' : 'New Assignment'}</span>
              <button onClick={closeModal} className="hover:bg-white/20 p-1 rounded-full"><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
              <div className="space-y-4">
                <input required placeholder="Title" className="w-full border-gray-200 border p-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-red-400/50" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                <input required placeholder="Subject" className="w-full border-gray-200 border p-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-red-400/50" value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} />
                <div>
                  <label className="text-xs font-bold text-gray-400 ml-1 uppercase">Teacher *</label>
                  <select required className="w-full border-gray-200 border p-3 rounded-xl text-sm mt-1 outline-none bg-white" value={formData.teacher_id} onChange={e => setFormData({ ...formData, teacher_id: e.target.value })}>
                    <option value="">Select Teacher</option>
                    {teachers.map(t => <option key={t.id} value={t.id}>{t.full_name} — {t.subject}</option>)}
                  </select>
                </div>
                <textarea placeholder="Description" rows={3} className="w-full border-gray-200 border p-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-red-400/50 resize-none" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-400 ml-1 uppercase">Due Date</label>
                    <input type="date" className="w-full border-gray-200 border p-3 rounded-xl text-sm mt-1 outline-none" value={formData.due_date} onChange={e => setFormData({ ...formData, due_date: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 ml-1 uppercase">Status</label>
                    <select className="w-full border-gray-200 border p-3 rounded-xl text-sm mt-1 outline-none bg-white" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 pt-4 shrink-0">
                <button type="button" onClick={closeModal} className="flex-1 py-3 bg-gray-100 rounded-xl font-bold text-sm text-gray-600">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-[#C83733] text-white rounded-xl font-bold text-sm shadow-lg shadow-red-100">
                  {loading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- Assign Students Modal --- */}
      {assignModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="bg-[#C83733] p-5 flex justify-between items-center text-white shrink-0">
              <span className="font-bold flex items-center gap-2 truncate"><Users size={20}/> Assign: {assigningTo?.title}</span>
              <button onClick={() => setAssignModal(false)}><X size={24} /></button>
            </div>
            <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
              <div className="flex-1 p-5 overflow-y-auto border-r border-gray-100">
                <p className="text-[11px] font-black text-gray-400 uppercase mb-4 tracking-widest">Select Students</p>
                {allStudents.map(s => {
                  const alreadyAssigned = assignedIds.has(s.id);
                  return (
                    <label key={s.id} className={`flex items-center gap-4 p-3 rounded-2xl mb-2 cursor-pointer transition ${alreadyAssigned ? 'bg-green-50/50 opacity-60' : 'hover:bg-gray-50 border border-transparent hover:border-gray-100'}`}>
                      <input type="checkbox" className="w-5 h-5 accent-[#C83733] rounded" disabled={alreadyAssigned} checked={selectedIds.includes(s.id) || alreadyAssigned} onChange={() => !alreadyAssigned && toggleStudent(s.id)} />
                      <div className="flex-1">
                        <p className="text-sm font-bold text-gray-800">{s.full_name}</p>
                        <p className="text-[10px] font-medium text-gray-400 uppercase tracking-tighter">Roll: {s.roll_no} • Class {s.class}</p>
                      </div>
                      {alreadyAssigned && <CheckCircle2 size={16} className="text-green-500" />}
                    </label>
                  );
                })}
              </div>
              <div className="w-full md:w-64 p-5 bg-gray-50 overflow-y-auto border-t md:border-t-0">
                <p className="text-[11px] font-black text-gray-400 uppercase mb-4 tracking-widest">Currently Assigned ({assignedStudents.length})</p>
                {assignedStudents.map(s => (
                  <div key={s.student_id} className="flex items-center justify-between bg-white rounded-xl px-4 py-3 mb-2 shadow-sm border border-gray-100">
                    <div className="max-w-[80%]">
                      <p className="text-xs font-bold text-gray-800 truncate">{s.full_name}</p>
                      <p className="text-[9px] text-gray-400 font-bold uppercase">{s.roll_no}</p>
                    </div>
                    <button onClick={() => handleRemoveStudent(s.student_id)} className="text-red-400 hover:text-red-600 transition p-1"><X size={16} /></button>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-5 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 shrink-0 bg-white">
              <p className="text-sm font-bold text-gray-500">{selectedIds.length} Selected</p>
              <div className="flex gap-3 w-full sm:w-auto">
                <button onClick={() => setAssignModal(false)} className="flex-1 sm:px-6 py-3 bg-gray-100 rounded-xl font-bold text-sm text-gray-600">Close</button>
                <button onClick={handleAssign} disabled={assignLoading || !selectedIds.length} className="flex-[2] sm:px-6 py-3 bg-[#C83733] text-white rounded-xl font-bold text-sm shadow-lg shadow-red-100 disabled:opacity-50">
                  {assignLoading ? 'Processing...' : 'Assign Selected'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assignments;