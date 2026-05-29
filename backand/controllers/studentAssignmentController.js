const studentAssignmentModel = require('../models/studentAssignmentModel');
const studentModel = require('../models/studentModel');

// POST /api/assignments/:id/assign
exports.assignStudents = async (req, res) => {
  try {
    const { student_ids } = req.body;
    const assignment_id = req.params.id;
    if (!student_ids || !student_ids.length) {
      return res.status(400).json({ message: 'student_ids array is required' });
    }
    const rows = await studentAssignmentModel.assignStudents(assignment_id, student_ids);
    res.status(201).json({ message: 'Students assigned successfully', assigned: rows.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/assignments/:id/students
exports.getAssignedStudents = async (req, res) => {
  try {
    const students = await studentAssignmentModel.getAssignedStudents(req.params.id);
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/assignments/:id/students/:studentId
exports.removeStudent = async (req, res) => {
  try {
    const removed = await studentAssignmentModel.removeStudent(req.params.id, req.params.studentId);
    if (!removed) return res.status(404).json({ message: 'Record not found' });
    res.json({ message: 'Student removed from assignment' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/assignments/:id/submit  (student submits)
exports.submitAssignment = async (req, res) => {
  try {
    const student = await studentModel.getStudentByUserId(req.user.id);
    if (!student) return res.status(404).json({ message: 'Student profile not found' });

    const { submission_text } = req.body;
    const result = await studentAssignmentModel.submitAssignment(
      req.params.id, student.id, submission_text
    );
    if (!result) return res.status(404).json({ message: 'Assignment not assigned to you' });
    res.json({ message: 'Assignment submitted successfully', data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
