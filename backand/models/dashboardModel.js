const pool = require('../config/db');

const getDashboardStats = async () => {
  const result = await pool.query(`
    SELECT
      (SELECT COUNT(*) FROM students) as total_students,
      (SELECT COUNT(*) FROM teachers) as total_teachers,
      (SELECT COUNT(*) FROM assignments) as total_assignments,
      (SELECT COUNT(*) FROM students WHERE status = 'active') as active_students
  `);
  return result.rows[0];
};

const getRecentStudents = async () => {
  const result = await pool.query(
    `SELECT roll_no, full_name, class, status
     FROM students
     ORDER BY created_at DESC
     LIMIT 5`
  );
  return result.rows;
};

const getRecentAssignments = async () => {
  const result = await pool.query(
    `SELECT a.title, a.subject, a.due_date, a.status, t.full_name as teacher_name
     FROM assignments a
     LEFT JOIN teachers t ON a.teacher_id = t.id
     ORDER BY a.created_at DESC
     LIMIT 5`
  );
  return result.rows;
};

module.exports = { getDashboardStats, getRecentStudents, getRecentAssignments };
