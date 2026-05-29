const pool = require("../config/db");

//  CREATE
const createAssignment = async (data) => {
  const { title, description, subject, teacher_id, due_date } = data;

  try {
    const result = await pool.query(
      `INSERT INTO assignments (title, description, subject, teacher_id, due_date)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [title, description, subject, teacher_id, due_date]
    );

    return result.rows[0];
  } catch (error) {
    if (error.code === '23503') { 
      throw new Error(`Teacher with ID ${teacher_id} not found in the records.`);
    }
    throw error;
  }
};

//  GET ALL with teacher name
const getAllAssignments = async () => {
  const result = await pool.query(
    `SELECT a.*, t.full_name as teacher_name
     FROM assignments a
     LEFT JOIN teachers t ON a.teacher_id = t.id
     ORDER BY a.created_at DESC`
  );
  return result.rows;
};

//  GET BY ID
const getAssignmentById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM assignments WHERE id = $1`,
    [id]
  );
  return result.rows[0];
};

const updateAssignment = async (id, data) => {
  const { title, description, subject, due_date, teacher_id, status } = data;

  const result = await pool.query(
    `UPDATE assignments
     SET title=$1, description=$2, subject=$3, due_date=$4, teacher_id=$5, status=$6
     WHERE id=$7
     RETURNING *`,
    [title, description, subject, due_date, teacher_id, status, id]
  );

  return result.rows[0];
};

//  DELETE
const deleteAssignment = async (id) => {
  const result = await pool.query(
    `DELETE FROM assignments WHERE id=$1 RETURNING *`,
    [id]
  );

  return result.rows[0];
};

module.exports = {
  createAssignment,
  getAllAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment
};