const pool = require("../config/db");

// Get all courses with trainer details
const getCourses = async (req, res) => {
  try {
    const [courses] = await pool.query(`
      SELECT
        c.id,
        c.course_name,
        c.description,
        c.duration,
        c.fees,
        c.trainer_id,
        t.name AS trainer_name,
        c.created_at
      FROM courses c
      LEFT JOIN trainers t ON c.trainer_id = t.id
      ORDER BY c.id DESC
    `);

    res.json(courses);
  } catch (error) {
    console.error("Get courses error:", error.message);
    res.status(500).json({
      message: "Failed to fetch courses",
    });
  }
};

// Get single course
const getCourseById = async (req, res) => {
  try {
    const [courses] = await pool.query(
      `
      SELECT
        c.id,
        c.course_name,
        c.description,
        c.duration,
        c.fees,
        c.trainer_id,
        t.name AS trainer_name,
        c.created_at
      FROM courses c
      LEFT JOIN trainers t ON c.trainer_id = t.id
      WHERE c.id = ?
    `,
      [req.params.id],
    );

    if (courses.length === 0) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.json(courses[0]);
  } catch (error) {
    console.error("Get course error:", error.message);
    res.status(500).json({
      message: "Failed to fetch course",
    });
  }
};

// Create course
const createCourse = async (req, res) => {
  try {
    const { course_name, description, duration, fees, trainer_id } = req.body;

    if (!course_name) {
      return res.status(400).json({
        message: "Course name is required",
      });
    }

    if (fees === undefined || fees === null || fees === "") {
      return res.status(400).json({
        message: "Course fees are required",
      });
    }

    if (trainer_id) {
      const [trainer] = await pool.query(
        "SELECT id FROM trainers WHERE id = ?",
        [trainer_id],
      );

      if (trainer.length === 0) {
        return res.status(400).json({
          message: "Trainer not found",
        });
      }
    }

    const [result] = await pool.query(
      `INSERT INTO courses
       (course_name, description, duration, fees, trainer_id)
       VALUES (?, ?, ?, ?, ?)`,
      [
        course_name,
        description || null,
        duration || null,
        fees,
        trainer_id || null,
      ],
    );

    const [newCourse] = await pool.query(
      `
      SELECT
        c.id,
        c.course_name,
        c.description,
        c.duration,
        c.fees,
        c.trainer_id,
        t.name AS trainer_name,
        c.created_at
      FROM courses c
      LEFT JOIN trainers t ON c.trainer_id = t.id
      WHERE c.id = ?
    `,
      [result.insertId],
    );

    res.status(201).json(newCourse[0]);
  } catch (error) {
    console.error("Create course error:", error.message);
    res.status(500).json({
      message: "Failed to create course",
    });
  }
};

// Update course
const updateCourse = async (req, res) => {
  try {
    const { course_name, description, duration, fees, trainer_id } = req.body;

    if (!course_name) {
      return res.status(400).json({
        message: "Course name is required",
      });
    }

    if (fees === undefined || fees === null || fees === "") {
      return res.status(400).json({
        message: "Course fees are required",
      });
    }

    if (trainer_id) {
      const [trainer] = await pool.query(
        "SELECT id FROM trainers WHERE id = ?",
        [trainer_id],
      );

      if (trainer.length === 0) {
        return res.status(400).json({
          message: "Trainer not found",
        });
      }
    }

    const [result] = await pool.query(
      `UPDATE courses
       SET course_name = ?,
           description = ?,
           duration = ?,
           fees = ?,
           trainer_id = ?
       WHERE id = ?`,
      [
        course_name,
        description || null,
        duration || null,
        fees,
        trainer_id || null,
        req.params.id,
      ],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.json({
      message: "Course updated successfully",
    });
  } catch (error) {
    console.error("Update course error:", error.message);
    res.status(500).json({
      message: "Failed to update course",
    });
  }
};

// Delete course
const deleteCourse = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM courses WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.json({
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error("Delete course error:", error.message);
    res.status(500).json({
      message: "Failed to delete course",
    });
  }
};

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
