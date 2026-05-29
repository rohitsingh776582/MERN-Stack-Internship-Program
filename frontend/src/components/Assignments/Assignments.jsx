import React, { useState, useEffect } from 'react';
import { ClipboardList, CheckCircle2, Clock, AlertCircle, Search, Send, X } from 'lucide-react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';
const getAuthHeader = () => ({ headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });

const Assignments = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  // Submit modal
  const [submitModal, setSubmitModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [submissionText, setSubmissionText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchAssignments = () => {
    setLoading(true);
    axios.get(`${API_BASE}/student/assignments`, getAuthHeader())
      .then(res => setTasks(Array.isArray(res.data) ? res.data : []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchAssignments(); }, []);

  const openSubmitModal = (task) => {
    setSelectedTask(task);
    setSubmissionText('');
    setSubmitModal(true);
  };

  const handleSubmit = async () => {
    if (!selectedTask) return;
    setSubmitting(true);
    try {
      await axios.post(
        `${API_BASE}/assignments/${selectedTask.assignment_id}/submit`,
        { submission_text: submissionText },
        getAuthHeader()
      );
      setSubmitModal(false);
      fetchAssignments(); // refresh — status ab submitted dikhega
    } catch (err) {
      alert(err.response?.data?.message || 'Submit failed');
    } finally {
      setSubmitting(false);
    }
  };

  const filtered = tasks.filter(t => {
    const matchFilter = filter === 'all' || t.status === filter;
    const matchSearch =
      t.title?.toLowerCase().includes(search.toLowerCase()) ||
      t.subject?.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const statusStyle = (s) =>
    s === 'completed'  ? 'bg-green-100 text-green-700' :
    s === 'submitted'  ? 'bg-blue-100 text-blue-700'   :
                         'bg-orange-100 text-orange-700';

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-8 h-8 border-4 border-[#C83733] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="p-4 md:p-8 w-full bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-800 flex items-center gap-3">
            <ClipboardList className="text-[#C83733]" size={32} /> Assignments
          </h2>
          <p className="text-gray-500 mt-1">Track and submit your school tasks on time.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input type="text" placeholder="Search assignments..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 text-sm"
            onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
        {[['all','All Tasks'],['pending','Pending'],['submitted','Submitted'],['completed','Completed']].map(([val, label]) => (
          <button key={val} onClick={() => setFilter(val)}
            className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all
              ${filter === val ? 'bg-[#C83733] text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>
            {label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Assignment</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Subject</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Due Date</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Marks</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-10 text-center text-gray-400 text-sm">No assignments found.</td></tr>
              ) : filtered.map((task, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-800">{task.title}</div>
                    <div className="text-xs text-gray-400">By {task.teacher_name || '—'}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-medium">{task.subject}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock size={13} className="mr-1 text-gray-400" />
                      {task.due_date ? new Date(task.due_date).toLocaleDateString('en-IN') : '—'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1 w-fit px-3 py-1 rounded-full text-[10px] font-black uppercase ${statusStyle(task.status)}`}>
                      {task.status === 'completed' ? <CheckCircle2 size={11} /> : <AlertCircle size={11} />}
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-700">
                    {task.marks ?? '—'}
                  </td>
                  <td className="px-6 py-4">
                    {task.status === 'pending' ? (
                      <button onClick={() => openSubmitModal(task)}
                        className="flex items-center gap-1 text-xs font-bold text-white bg-[#C83733] hover:bg-red-700 px-3 py-1.5 rounded-lg transition">
                        <Send size={12} /> Submit
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400 font-semibold capitalize">{task.status}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Submit Modal */}
      {submitModal && selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-[#C83733] p-4 flex justify-between items-center text-white font-bold">
              <span className="flex items-center gap-2"><Send size={16} /> Submit Assignment</span>
              <button onClick={() => setSubmitModal(false)}><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="font-bold text-gray-800">{selectedTask.title}</p>
                <p className="text-sm text-gray-500">{selectedTask.subject} • By {selectedTask.teacher_name}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600 mb-1 block">
                  Submission Note <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Write your submission note or answer here..."
                  className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-red-100 resize-none"
                  value={submissionText}
                  onChange={e => setSubmissionText(e.target.value)}
                />
              </div>
              <div className="flex gap-3">
                <button onClick={() => setSubmitModal(false)}
                  className="flex-1 py-2.5 bg-gray-100 rounded-xl font-bold text-sm hover:bg-gray-200 transition">
                  Cancel
                </button>
                <button onClick={handleSubmit} disabled={submitting}
                  className="flex-1 py-2.5 bg-[#C83733] text-white rounded-xl font-bold text-sm hover:bg-red-700 transition disabled:opacity-50 flex items-center justify-center gap-2">
                  <Send size={14} />
                  {submitting ? 'Submitting...' : 'Submit Now'}
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
