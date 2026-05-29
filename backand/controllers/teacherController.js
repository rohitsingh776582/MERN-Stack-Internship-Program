const teacherModel = require("../models/teacherModel");

exports.createTeacher = async (req, res) => {
  try {
    const { emp_id, full_name, subject, email, status, classes, credits, description } = req.body;
    const teacher = await teacherModel.createTeacher({ emp_id, full_name, subject, email, status, classes, credits, description });
    res.status(201).json({ message: "Teacher created", teacher });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).json({ message: "Emp ID or Email already exists" });
    }
    res.status(500).json({ error: error.message });
  }
};

exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await teacherModel.getAllTeachers();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTeacherById = async (req, res) => {
  try {
    const teacher = await teacherModel.getTeacherById(req.params.id);
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTeacher = async (req, res) => {
  try {
    const teacher = await teacherModel.updateTeacher(req.params.id, req.body);
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });
    res.json({ message: "Teacher updated successfully", teacher });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).json({ message: "Emp ID or Email already exists" });
    }
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTeacher = async (req, res) => {
  try {
    const teacher = await teacherModel.deleteTeacher(req.params.id);
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });
    res.json({ message: "Teacher deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllTeacherDetails = async (req, res) => {
  try {
    const teachers = await teacherModel.getAllTeachersDetails();
    if (!teachers.length) return res.status(404).json({ message: "No teachers found" });
    const formattedData = teachers.map((teacher) => ({
      id: teacher.id,
      emp_id: teacher.emp_id,
      subject: teacher.subject,
      teacher_name: teacher.full_name,
      classes: teacher.classes,
      credits: teacher.credits,
      description: teacher.description,
    }));
    res.json(formattedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

