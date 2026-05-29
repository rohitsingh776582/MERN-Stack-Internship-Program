const studentModel = require("../models/studentModel");
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

//  CREATE
exports.createStudent = async (req, res) => {
  try {
    const { full_name, className, email, password, status } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    // 1. Auto generate roll number
    const roll_no = await studentModel.generateRollNo();

    // 2. users table mein entry — taaki student login kar sake
    await userModel.createUser({
      full_name,
      email,
      password: hashedPassword,
      role: "user",
      admin_secret_code: null
    });

    // 3. students table mein entry
    const student = await studentModel.createStudent({
      roll_no,
      full_name,
      className,
      email,
      password: hashedPassword,
      status,
      created_by: req.user.id
    });

    res.status(201).json({
      message: "Student created",
      student: { ...student, roll_no }
    });

  } catch (error) {
    if (error.code === "23505") {
      if (error.constraint?.includes("roll_no")) return res.status(400).json({ message: "Roll number already exists" });
      if (error.constraint?.includes("email"))   return res.status(400).json({ message: "Email already exists in users or students" });
    }
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

//  GET ALL
exports.getAllStudents = async (req, res) => {
  try {
    const students = await studentModel.getAllStudents();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  UPDATE
exports.updateStudent = async (req, res) => {
  try {
    const student = await studentModel.updateStudent(req.params.id, req.body);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student updated", student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  DELETE
exports.deleteStudent = async (req, res) => {
  try {
    // students table se delete karo (users table mein email match karke bhi delete)
    await studentModel.deleteStudentWithUser(req.params.id);
    res.json({ message: "Student deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
