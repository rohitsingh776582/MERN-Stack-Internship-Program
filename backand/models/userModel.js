
const pool = require("../config/db");

const createUser = async (data) => {
  const { full_name, email, password, role, admin_secret_code } = data;

  const result = await pool.query(
    `INSERT INTO users (full_name, email, password, role, admin_secret_code)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [
      full_name,
      email,
      password,
      role || "user",
      admin_secret_code || null
    ]
  );

  return result.rows[0];
};

const getUserByEmail = async (email) => {
  const result = await pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );
  return result.rows[0];
};

const getUserById = async (id) => {
  const result = await pool.query(
    `SELECT id, full_name, email, role, created_at, updated_at 
     FROM users 
     WHERE id = $1`,
    [id]
  );

  return result.rows[0];
};


module.exports = {
  createUser,
  getUserByEmail,
  getUserById
};




