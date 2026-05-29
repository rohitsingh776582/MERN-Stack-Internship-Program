const express = require('express');
const router = express.Router();
const studentDashboardController = require('../controllers/studentDashboardController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/dashboard', authMiddleware, studentDashboardController.getDashboard);
router.get('/assignments', authMiddleware, studentDashboardController.getMyAssignments);
router.get('/subjects', authMiddleware, studentDashboardController.getMySubjects);
router.get('/profile', authMiddleware, studentDashboardController.getProfile);

module.exports = router;
