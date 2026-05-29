const dashboardModel = require('../models/dashboardModel');

exports.getDashboard = async (req, res) => {
  try {
    const [stats, recentStudents, recentAssignments] = await Promise.all([
      dashboardModel.getDashboardStats(),
      dashboardModel.getRecentStudents(),
      dashboardModel.getRecentAssignments(),
    ]);
    res.json({ stats, recentStudents, recentAssignments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

