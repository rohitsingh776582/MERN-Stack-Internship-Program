const studentDashboardModel = require('../models/studentDashboardModel');
const studentModel = require('../models/studentModel');

// GET /api/student/dashboard
exports.getDashboard = async (req, res) => {
  try {
    const student = await studentModel.getStudentByUserId(req.user.id);
    if (!student) return res.status(404).json({ message: 'Student profile not found' });

    const stats = await studentDashboardModel.getDashboardStats(student.id);
    const recentAssignments = await studentDashboardModel.getMyAssignments(student.id);

    res.json({ student, stats, recentAssignments: recentAssignments.slice(0, 5) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/student/assignments
exports.getMyAssignments = async (req, res) => {
  try {
    const student = await studentModel.getStudentByUserId(req.user.id);
    if (!student) return res.status(404).json({ message: 'Student profile not found' });

    const assignments = await studentDashboardModel.getMyAssignments(student.id);
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/student/subjects
exports.getMySubjects = async (req, res) => {
  try {
    const student = await studentModel.getStudentByUserId(req.user.id);
    if (!student) return res.status(404).json({ message: 'Student profile not found' });

    const subjects = await studentDashboardModel.getMySubjects(student.id);
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/student/profile
exports.getProfile = async (req, res) => {
  try {
    const student = await studentModel.getStudentByUserId(req.user.id);
    if (!student) return res.status(404).json({ message: 'Student profile not found' });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
