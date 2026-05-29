
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');
const studentDashboardRoutes = require('./routes/studentDashboardRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');





const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174"
];


// Middleware
app.use(cors({
  origin: allowedOrigins
}));
app.use(express.json());



app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/student', studentDashboardRoutes);
app.use('/api/dashboard', dashboardRoutes);


const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // Ensure DB connects before starting the server
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};



startServer();

