const pool = require('../config/db');

// Assign multiple students to an assignment
const assignStudents = async (assignment_id, student_ids) => {
  const values = student_ids.map((sid) => `('${assignment_id}', '${sid}')`).join(',');
  const result = await pool.query(
    `INSERT INTO student_assignments (assignment_id, student_id)
     VALUES ${values}
     ON CONFLICT (assignment_id, student_id) DO NOTHING
     RETURNING *`
  );
  return result.rows;
};

// Get all students assigned to an assignment
const getAssignedStudents = async (assignment_id) => {
  const result = await pool.query(
    `SELECT sa.id, sa.status, sa.marks, sa.submitted_at,
            s.id as student_id, s.full_name, s.roll_no, s.class
     FROM student_assignments sa
     JOIN students s ON sa.student_id = s.id
     WHERE sa.assignment_id = $1
     ORDER BY s.full_name`,
    [assignment_id]
  );
  return result.rows;
};

// Remove a student from assignment
const removeStudent = async (assignment_id, student_id) => {
  const result = await pool.query(
    `DELETE FROM student_assignments
     WHERE assignment_id = $1 AND student_id = $2
     RETURNING *`,
    [assignment_id, student_id]
  );
  return result.rows[0];
};

// Student submits assignment
const submitAssignment = async (assignment_id, student_id, submission_text) => {
  const result = await pool.query(
    `UPDATE student_assignments
     SET status = 'submitted', submission_text = $1, submitted_at = NOW()
     WHERE assignment_id = $2 AND student_id = $3
     RETURNING *`,
    [submission_text || null, assignment_id, student_id]
  );
  return result.rows[0];
};

module.exports = { assignStudents, getAssignedStudents, removeStudent, submitAssignment };
