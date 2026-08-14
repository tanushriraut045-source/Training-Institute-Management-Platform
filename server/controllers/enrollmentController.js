const pool = require("../config/db");

// Get all enrollments
const getEnrollments = async (req, res) => {
  try {
    const [enrollments] = await pool.query(`
      SELECT
        e.id,
        e.student_id,
        s.name AS student_name,
        e.course_id,
        c.course_name,
        e.enrollment_date,
        e.status,
        e.created_at
      FROM enrollments e
      INNER JOIN students s ON e.student_id = s.id
      INNER JOIN courses c ON e.course_id = c.id
      ORDER BY e.id DESC
    `);

    res.json(enrollments);
  } catch (error) {
    console.error("Get enrollments error:", error.message);
    res.status(500).json({
      message: "Failed to fetch enrollments",
    });
  }
};

// Get single enrollment
const getEnrollmentById = async (req, res) => {
  try {
    const [enrollments] = await pool.query(
      `
      SELECT
        e.id,
        e.student_id,
        s.name AS student_name,
        e.course_id,
        c.course_name,
        e.enrollment_date,
        e.status,
        e.created_at
      FROM enrollments e
      INNER JOIN students s ON e.student_id = s.id
      INNER JOIN courses c ON e.course_id = c.id
      WHERE e.id = ?
    `,
      [req.params.id],
    );

    if (enrollments.length === 0) {
      return res.status(404).json({
        message: "Enrollment not found",
      });
    }

    res.json(enrollments[0]);
  } catch (error) {
    console.error("Get enrollment error:", error.message);
    res.status(500).json({
      message: "Failed to fetch enrollment",
    });
  }
};

// Create enrollment
const createEnrollment = async (req, res) => {
  try {
    const { student_id, course_id, enrollment_date, status } = req.body;

    if (!student_id || !course_id || !enrollment_date) {
      return res.status(400).json({
        message: "Student, course and enrollment date are required",
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
      `INSERT INTO enrollments
       (student_id, course_id, enrollment_date, status)
       VALUES (?, ?, ?, ?)`,
      [student_id, course_id, enrollment_date, status || "active"],
    );

    const [newEnrollment] = await pool.query(
      `
      SELECT
        e.id,
        e.student_id,
        s.name AS student_name,
        e.course_id,
        c.course_name,
        e.enrollment_date,
        e.status,
        e.created_at
      FROM enrollments e
      INNER JOIN students s ON e.student_id = s.id
      INNER JOIN courses c ON e.course_id = c.id
      WHERE e.id = ?
    `,
      [result.insertId],
    );

    res.status(201).json(newEnrollment[0]);
  } catch (error) {
    console.error("Create enrollment error:", error.message);

    res.status(500).json({
      message: "Failed to create enrollment",
    });
  }
};

// Update enrollment
const updateEnrollment = async (req, res) => {
  try {
    const { student_id, course_id, enrollment_date, status } = req.body;

    if (!student_id || !course_id || !enrollment_date) {
      return res.status(400).json({
        message: "Student, course and enrollment date are required",
      });
    }

    const [result] = await pool.query(
      `UPDATE enrollments
       SET student_id = ?,
           course_id = ?,
           enrollment_date = ?,
           status = ?
       WHERE id = ?`,
      [
        student_id,
        course_id,
        enrollment_date,
        status || "active",
        req.params.id,
      ],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Enrollment not found",
      });
    }

    res.json({
      message: "Enrollment updated successfully",
    });
  } catch (error) {
    console.error("Update enrollment error:", error.message);

    res.status(500).json({
      message: "Failed to update enrollment",
    });
  }
};

// Delete enrollment
const deleteEnrollment = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM enrollments WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Enrollment not found",
      });
    }

    res.json({
      message: "Enrollment deleted successfully",
    });
  } catch (error) {
    console.error("Delete enrollment error:", error.message);

    res.status(500).json({
      message: "Enrollment deleted successfully",
    });
  }
};

module.exports = {
  getEnrollments,
  getEnrollmentById,
  createEnrollment,
  updateEnrollment,
  deleteEnrollment,
};
