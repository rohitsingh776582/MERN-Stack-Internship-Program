const pool = require("../config/db");

//  CREATE
const createStudent = async (data) => {
  const { roll_no, full_name, className, email, password, status, created_by } = data;

  const result = await pool.query(
    `INSERT INTO students (roll_no, full_name, class, email, password, status, created_by)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [roll_no, full_name, className, email, password, status || "active", created_by]
  );

  return result.rows[0];
};

//  GET ALL
const getAllStudents = async () => {
  const result = await pool.query(`SELECT * FROM students ORDER BY created_at DESC`);
  return result.rows;
};



//  UPDATE
const updateStudent = async (id, data) => {
  const { roll_no, full_name, className, email, status } = data;

  const result = await pool.query(
    `UPDATE students
     SET roll_no=$1, full_name=$2, class=$3, email=$4, status=$5
     WHERE id=$6
     RETURNING *`,
    [roll_no, full_name, className, email, status, id]
  );

  return result.rows[0];
};

//  DELETE
const deleteStudent = async (id) => {
  await pool.query(`DELETE FROM students WHERE id = $1`, [id]);
  return true;
};


const deleteStudentWithUser = async (id) => {
  
  const res = await pool.query(`SELECT email FROM students WHERE id = $1`, [id]);
  if (res.rows[0]) {
    await pool.query(`DELETE FROM users WHERE email = $1`, [res.rows[0].email]);
  }
  await pool.query(`DELETE FROM students WHERE id = $1`, [id]);
  return true;
};

const getStudentByUserId = async (user_id) => {
  const result = await pool.query(
    `SELECT * FROM students WHERE email = (SELECT email FROM users WHERE id = $1)`,
    [user_id]
  );
  return result.rows[0];
};

// Auto generate roll number: S-2026-001
const generateRollNo = async () => {
  const year = new Date().getFullYear();
  const result = await pool.query(
    `SELECT COUNT(*) as total FROM students WHERE roll_no LIKE $1`,
    [`S-${year}-%`]
  );
  const count = parseInt(result.rows[0].total) + 1;
  return `S-${year}-${String(count).padStart(3, '0')}`;
};

module.exports = {
  createStudent,
  getAllStudents,
  updateStudent,
  deleteStudent,
  deleteStudentWithUser,
  getStudentByUserId,
  generateRollNo
};

