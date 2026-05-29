
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register
exports.register = async (req, res) => {
  try {
    const { full_name, email, password, admin_secret_code } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    let role = (admin_secret_code === "ADMIN123") ? "admin" : "user";

    const user = await userModel.createUser({
      full_name,
      email,
      password: hashedPassword,
      role,
      admin_secret_code
    });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1d" }
    );

    res.status(201).json({ message: "User created", token, user });

  } catch (error) {
    // Agar UNIQUE constraint wala error (23505) aaye
    if (error.code === '23505') {
      return res.status(400).json({ message: "Email already registered! Please use a different email address" });
    }
    
    console.error("DETAILED BACKEND ERROR:", error); 
    res.status(500).json({ error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      "secretkey",
      { expiresIn: "8d" }
    );

    res.json({ message: "Login successful", token, user: { id: user.id, role: user.role, full_name: user.full_name, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getProfile = async (req, res) => {
  try {
    const user = await userModel.getUserById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

