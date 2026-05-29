const pool = require("../config/db");

//  CREATE 
const createTeacher = async (data) => {
  const { emp_id, full_name, subject, email, status, classes, credits, description } = data;

  const result = await pool.query(
    `INSERT INTO teachers (emp_id, full_name, subject, email, status, classes, credits, description)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *`,
    [emp_id, full_name, subject, email, status || "active", classes, credits, description]
  );

  return result.rows[0];
};

//  GET ALL
const getAllTeachers = async () => {
  const result = await pool.query(
    `SELECT 
      id,
      emp_id, 
      full_name, 
      subject, 
      email, 
      status 
     FROM teachers 
     ORDER BY created_at DESC`
  );
  return result.rows;
};

//  GET BY ID
const getTeacherById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM teachers WHERE id = $1`,
    [id]
  );
  return result.rows[0];
};

//UPDATE
const updateTeacher = async (id, data) => {
  const { emp_id, full_name, subject, email, status, classes, credits, description } = data;

  const result = await pool.query(
    `UPDATE teachers
     SET emp_id=$1, full_name=$2, subject=$3, email=$4,
         status=$5, classes=$6, credits=$7, description=$8
     WHERE id=$9
     RETURNING *`,
    [emp_id, full_name, subject, email, status, classes, credits, description, id]
  );

  return result.rows[0];
};

const getAllTeachersDetails = async () => {
  const result = await pool.query(
    `SELECT id, emp_id, full_name, subject, classes, description, credits
     FROM teachers
     ORDER BY created_at DESC`
  );

  return result.rows;
};
const deleteTeacher = async (id) => {
  const result = await pool.query(
    `DELETE FROM teachers WHERE id = $1 RETURNING *`,
    [id]
  );
  return result.rows[0];
};

module.exports = {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
  getAllTeachersDetails,
};