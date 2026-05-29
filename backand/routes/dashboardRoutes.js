
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');

// Route definition
router.get('/', authMiddleware, isAdmin, dashboardController.getDashboard);

module.exports = router;
