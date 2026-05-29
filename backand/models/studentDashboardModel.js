const pool = require('../config/db');


const getMyAssignments = async (student_id) => {
  const result = await pool.query(
    `SELECT sa.id, sa.status, sa.marks, sa.submitted_at,
            a.id as assignment_id, a.title, a.description, a.subject, a.due_date,
            t.full_name as teacher_name
     FROM student_assignments sa
     JOIN assignments a ON sa.assignment_id = a.id
     LEFT JOIN teachers t ON a.teacher_id = t.id
     WHERE sa.student_id = $1
     ORDER BY a.due_date ASC`,
    [student_id]
  );
  return result.rows;
};


const getMySubjects = async (student_id) => {
  const result = await pool.query(
    `SELECT DISTINCT t.id, t.full_name, t.subject, t.emp_id, t.credits, t.classes
     FROM student_assignments sa
     JOIN assignments a ON sa.assignment_id = a.id
     JOIN teachers t ON a.teacher_id = t.id
     WHERE sa.student_id = $1`,
    [student_id]
  );
  return result.rows;
};

// Dashboard stats
const getDashboardStats = async (student_id) => {
  const result = await pool.query(
    `SELECT
       COUNT(*) as total,
       COUNT(*) FILTER (WHERE sa.status = 'completed') as completed,
       COUNT(*) FILTER (WHERE sa.status = 'pending') as pending,
       COUNT(*) FILTER (WHERE sa.status = 'submitted') as submitted
     FROM student_assignments sa
     WHERE sa.student_id = $1`,
    [student_id]
  );
  return result.rows[0];
};

module.exports = { getMyAssignments, getMySubjects, getDashboardStats };
