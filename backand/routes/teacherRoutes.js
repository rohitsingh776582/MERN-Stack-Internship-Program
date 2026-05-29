
const express = require("express");
const router = express.Router();

const teacherController = require("../controllers/teacherController");
const { authMiddleware } = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");


router.post("/create", authMiddleware, isAdmin, teacherController.createTeacher);
router.get("/details", authMiddleware, isAdmin, teacherController.getAllTeacherDetails);
router.get("/", authMiddleware, isAdmin, teacherController.getAllTeachers);
router.get("/:id", authMiddleware, isAdmin, teacherController.getTeacherById);
router.put("/:id", authMiddleware, isAdmin, teacherController.updateTeacher);
router.delete("/:id", authMiddleware, isAdmin, teacherController.deleteTeacher);

module.exports = router;