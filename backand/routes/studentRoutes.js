const express = require("express");
const router = express.Router();

const studentController = require("../controllers/studentController");
const { authMiddleware } = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

//  All routes admin only
router.post("/create", authMiddleware, isAdmin, studentController.createStudent);
router.get("/", authMiddleware, isAdmin, studentController.getAllStudents);
router.put("/:id", authMiddleware, isAdmin, studentController.updateStudent);
router.delete("/:id", authMiddleware, isAdmin, studentController.deleteStudent);

module.exports = router;

