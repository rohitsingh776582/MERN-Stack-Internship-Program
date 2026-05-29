
const assignmentModel = require("../models/assignmentModel");

//  Create Assignment (Teacher)
exports.createAssignment = async (req, res) => {
  try {
    const { title, description, subject, due_date, teacher_id } = req.body;

    console.log('Create assignment body:', req.body); // debug

    if (!teacher_id) {
      return res.status(400).json({ message: 'teacher_id is required' });
    }

    const assignment = await assignmentModel.createAssignment({
      title,
      description,
      subject,
      due_date,
      teacher_id
    });

    res.status(201).json({ message: 'Assignment created', assignment });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Get All Assignments
exports.getAllAssignments = async (req, res) => {
  try {
    const assignments = await assignmentModel.getAllAssignments();

    res.json(assignments);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Single Assignment
exports.getAssignmentById = async (req, res) => {
  try {
    const assignment = await assignmentModel.getAssignmentById(req.params.id);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.json(assignment);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//  UPDATE
exports.updateAssignment = async (req, res) => {
  try {
    const assignment = await assignmentModel.updateAssignment(
      req.params.id,
      req.body
    );

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.json({
      message: "Assignment updated",
      assignment
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  DELETE
exports.deleteAssignment = async (req, res) => {
  try {
    const assignment = await assignmentModel.deleteAssignment(req.params.id);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.json({
      message: "Assignment deleted"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


