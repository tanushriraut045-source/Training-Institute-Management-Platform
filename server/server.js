const express = require("express");
const cors = require("cors");
const pool = require("./config/db");
require("dotenv").config();

const studentRoutes = require("./routes/studentRoutes");
const trainerRoutes = require("./routes/trainerRoutes");
const courseRoutes = require("./routes/courseRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Student routes
app.use("/api/students", studentRoutes);

// Trainer routes
app.use("/api/trainers", trainerRoutes);

// Course routes
app.use("/api/courses", courseRoutes);

// Enrollment routes
app.use("/api/enrollments", enrollmentRoutes);

// Payment routes
app.use("/api/payments", paymentRoutes);

// Attendance routes
app.use("/api/attendance", attendanceRoutes);

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Training Institute Management Platform API is running",
  });
});

// Auth Route
app.use("/api/auth", authRoutes);

// Database health check
app.get("/api/health", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 AS database_connected");

    res.json({
      server: "connected",
      database: rows[0].database_connected === 1 ? "connected" : "error",
    });
  } catch (error) {
    console.error("Database connection error:", error.message);

    res.status(500).json({
      server: "connected",
      database: "error",
      message: error.message,
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
