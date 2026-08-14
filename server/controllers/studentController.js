const pool = require("../config/db");

// Get all students
const getStudents = async (req, res) => {
  try {
    const [students] = await pool.query(
      "SELECT * FROM students ORDER BY id DESC",
    );

    res.json(students);
  } catch (error) {
    console.error("Get students error:", error.message);
    res.status(500).json({ message: "Failed to fetch students" });
  }
};

// Get single student
const getStudentById = async (req, res) => {
  try {
    const [students] = await pool.query("SELECT * FROM students WHERE id = ?", [
      req.params.id,
    ]);

    if (students.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(students[0]);
  } catch (error) {
    console.error("Get student error:", error.message);
    res.status(500).json({ message: "Failed to fetch student" });
  }
};

// Add student
const createStudent = async (req, res) => {
  try {
    const { name, email, phone, address, date_of_birth } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const [result] = await pool.query(
      `INSERT INTO students
       (name, email, phone, address, date_of_birth)
       VALUES (?, ?, ?, ?, ?)`,
      [
        name,
        email || null,
        phone || null,
        address || null,
        date_of_birth || null,
      ],
    );

    const [newStudent] = await pool.query(
      "SELECT * FROM students WHERE id = ?",
      [result.insertId],
    );

    res.status(201).json(newStudent[0]);
  } catch (error) {
    console.error("Create student error:", error.message);
    res.status(500).json({ message: "Failed to create student" });
  }
};

// Update student
const updateStudent = async (req, res) => {
  try {
    const { name, email, phone, address, date_of_birth } = req.body;

    const [result] = await pool.query(
      `UPDATE students
       SET name = ?, email = ?, phone = ?, address = ?, date_of_birth = ?
       WHERE id = ?`,
      [
        name,
        email || null,
        phone || null,
        address || null,
        date_of_birth || null,
        req.params.id,
      ],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student updated successfully" });
  } catch (error) {
    console.error("Update student error:", error.message);
    res.status(500).json({ message: "Failed to update student" });
  }
};

// Delete student
const deleteStudent = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM students WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Delete student error:", error.message);
    res.status(500).json({ message: "Failed to delete student" });
  }
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
