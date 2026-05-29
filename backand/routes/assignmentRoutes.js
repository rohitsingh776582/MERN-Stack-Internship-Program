const express = require("express");
const router = express.Router();

const assignmentController = require("../controllers/assignmentController");
const studentAssignmentController = require("../controllers/studentAssignmentController");
const { authMiddleware } = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

router.post("/create", authMiddleware, isAdmin, assignmentController.createAssignment);
router.get("/", authMiddleware, isAdmin, assignmentController.getAllAssignments);
router.get("/:id", authMiddleware, isAdmin, assignmentController.getAssignmentById);
router.put("/:id", authMiddleware, isAdmin, assignmentController.updateAssignment);
router.delete("/:id", authMiddleware, isAdmin, assignmentController.deleteAssignment);

// Assign students to assignment
router.post('/:id/assign', authMiddleware, isAdmin, studentAssignmentController.assignStudents);
router.get('/:id/students', authMiddleware, isAdmin, studentAssignmentController.getAssignedStudents);
router.delete('/:id/students/:studentId', authMiddleware, isAdmin, studentAssignmentController.removeStudent);

// Student submits assignment (no isAdmin — student access)
router.post('/:id/submit', authMiddleware, studentAssignmentController.submitAssignment);

module.exports = router;
