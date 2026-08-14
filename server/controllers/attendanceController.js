const pool = require("../config/db");

// Get all attendance records
const getAttendance = async (req, res) => {
  try {
    const [attendance] = await pool.query(`
      SELECT
        a.id,
        a.student_id,
        s.name AS student_name,
        a.course_id,
        c.course_name,
        a.attendance_date,
        a.status,
        a.created_at
      FROM attendance a
      INNER JOIN students s ON a.student_id = s.id
      INNER JOIN courses c ON a.course_id = c.id
      ORDER BY a.attendance_date DESC, a.id DESC
    `);

    res.json(attendance);
  } catch (error) {
    console.error("Get attendance error:", error.message);
    res.status(500).json({
      message: "Failed to fetch attendance",
    });
  }
};

// Get single attendance record
const getAttendanceById = async (req, res) => {
  try {
    const [attendance] = await pool.query(
      `
      SELECT
        a.id,
        a.student_id,
        s.name AS student_name,
        a.course_id,
        c.course_name,
        a.attendance_date,
        a.status,
        a.created_at
      FROM attendance a
      INNER JOIN students s ON a.student_id = s.id
      INNER JOIN courses c ON a.course_id = c.id
      WHERE a.id = ?
    `,
      [req.params.id],
    );

    if (attendance.length === 0) {
      return res.status(404).json({
        message: "Attendance record not found",
      });
    }

    res.json(attendance[0]);
  } catch (error) {
    console.error("Get attendance error:", error.message);
    res.status(500).json({
      message: "Failed to fetch attendance",
    });
  }
};

// Mark attendance
const createAttendance = async (req, res) => {
  try {
    const { student_id, course_id, attendance_date, status } = req.body;

    if (!student_id || !course_id || !attendance_date) {
      return res.status(400).json({
        message: "Student, course and attendance date are required",
      });
    }

    // Check student
    const [student] = await pool.query("SELECT id FROM students WHERE id = ?", [
      student_id,
    ]);

    if (student.length === 0) {
      return res.status(400).json({
        message: "Student not found",
      });
    }

    // Check course
    const [course] = await pool.query("SELECT id FROM courses WHERE id = ?", [
      course_id,
    ]);

    if (course.length === 0) {
      return res.status(400).json({
        message: "Course not found",
      });
    }

    const [result] = await pool.query(
      `INSERT INTO attendance
       (student_id, course_id, attendance_date, status)
       VALUES (?, ?, ?, ?)`,
      [student_id, course_id, attendance_date, status || "present"],
    );

    const [newAttendance] = await pool.query(
      `
      SELECT
        a.id,
        a.student_id,
        s.name AS student_name,
        a.course_id,
        c.course_name,
        a.attendance_date,
        a.status,
        a.created_at
      FROM attendance a
      INNER JOIN students s ON a.student_id = s.id
      INNER JOIN courses c ON a.course_id = c.id
      WHERE a.id = ?
    `,
      [result.insertId],
    );

    res.status(201).json(newAttendance[0]);
  } catch (error) {
    console.error("Create attendance error:", error.message);

    // Duplicate attendance for same student/course/date
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        message: "Attendance already marked for this student on this date",
      });
    }

    res.status(500).json({
      message: "Failed to create attendance",
    });
  }
};

// Update attendance
const updateAttendance = async (req, res) => {
  try {
    const { student_id, course_id, attendance_date, status } = req.body;

    if (!student_id || !course_id || !attendance_date) {
      return res.status(400).json({
        message: "Student, course and attendance date are required",
      });
    }

    const [result] = await pool.query(
      `UPDATE attendance
       SET student_id = ?,
           course_id = ?,
           attendance_date = ?,
           status = ?
       WHERE id = ?`,
      [
        student_id,
        course_id,
        attendance_date,
        status || "present",
        req.params.id,
      ],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Attendance record not found",
      });
    }

    res.json({
      message: "Attendance updated successfully",
    });
  } catch (error) {
    console.error("Update attendance error:", error.message);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        message: "Attendance already marked for this student on this date",
      });
    }

    res.status(500).json({
      message: "Failed to update attendance",
    });
  }
};

// Delete attendance
const deleteAttendance = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM attendance WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Attendance record not found",
      });
    }

    res.json({
      message: "Attendance deleted successfully",
    });
  } catch (error) {
    console.error("Delete attendance error:", error.message);

    res.status(500).json({
      message: "Failed to delete attendance",
    });
  }
};

module.exports = {
  getAttendance,
  getAttendanceById,
  createAttendance,
  updateAttendance,
  deleteAttendance,
};
