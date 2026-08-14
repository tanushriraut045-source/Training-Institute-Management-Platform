const pool = require("../config/db");

// Get all payments
const getPayments = async (req, res) => {
  try {
    const [payments] = await pool.query(`
      SELECT
        p.id,
        p.student_id,
        s.name AS student_name,
        p.course_id,
        c.course_name,
        p.amount,
        p.payment_date,
        p.payment_method,
        p.status,
        p.transaction_id,
        p.created_at
      FROM payments p
      INNER JOIN students s ON p.student_id = s.id
      INNER JOIN courses c ON p.course_id = c.id
      ORDER BY p.id DESC
    `);

    res.json(payments);
  } catch (error) {
    console.error("Get payments error:", error.message);
    res.status(500).json({
      message: "Failed to fetch payments",
    });
  }
};

// Get single payment
const getPaymentById = async (req, res) => {
  try {
    const [payments] = await pool.query(
      `
      SELECT
        p.id,
        p.student_id,
        s.name AS student_name,
        p.course_id,
        c.course_name,
        p.amount,
        p.payment_date,
        p.payment_method,
        p.status,
        p.transaction_id,
        p.created_at
      FROM payments p
      INNER JOIN students s ON p.student_id = s.id
      INNER JOIN courses c ON p.course_id = c.id
      WHERE p.id = ?
    `,
      [req.params.id],
    );

    if (payments.length === 0) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }

    res.json(payments[0]);
  } catch (error) {
    console.error("Get payment error:", error.message);
    res.status(500).json({
      message: "Failed to fetch payment",
    });
  }
};

// Create payment
const createPayment = async (req, res) => {
  try {
    const {
      student_id,
      course_id,
      amount,
      payment_date,
      payment_method,
      status,
      transaction_id,
    } = req.body;

    if (!student_id || !course_id || !amount || !payment_date) {
      return res.status(400).json({
        message: "Student, course, amount and payment date are required",
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
      `INSERT INTO payments
       (
         student_id,
         course_id,
         amount,
         payment_date,
         payment_method,
         status,
         transaction_id
       )
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        student_id,
        course_id,
        amount,
        payment_date,
        payment_method || "cash",
        status || "paid",
        transaction_id || null,
      ],
    );

    const [newPayment] = await pool.query(
      `
      SELECT
        p.id,
        p.student_id,
        s.name AS student_name,
        p.course_id,
        c.course_name,
        p.amount,
        p.payment_date,
        p.payment_method,
        p.status,
        p.transaction_id,
        p.created_at
      FROM payments p
      INNER JOIN students s ON p.student_id = s.id
      INNER JOIN courses c ON p.course_id = c.id
      WHERE p.id = ?
    `,
      [result.insertId],
    );

    res.status(201).json(newPayment[0]);
  } catch (error) {
    console.error("Create payment error:", error.message);

    res.status(500).json({
      message: "Failed to create payment",
    });
  }
};

// Update payment
const updatePayment = async (req, res) => {
  try {
    const {
      student_id,
      course_id,
      amount,
      payment_date,
      payment_method,
      status,
      transaction_id,
    } = req.body;

    if (!student_id || !course_id || !amount || !payment_date) {
      return res.status(400).json({
        message: "Student, course, amount and payment date are required",
      });
    }

    const [result] = await pool.query(
      `UPDATE payments
       SET student_id = ?,
           course_id = ?,
           amount = ?,
           payment_date = ?,
           payment_method = ?,
           status = ?,
           transaction_id = ?
       WHERE id = ?`,
      [
        student_id,
        course_id,
        amount,
        payment_date,
        payment_method || "cash",
        status || "paid",
        transaction_id || null,
        req.params.id,
      ],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }

    res.json({
      message: "Payment updated successfully",
    });
  } catch (error) {
    console.error("Update payment error:", error.message);

    res.status(500).json({
      message: "Failed to update payment",
    });
  }
};

// Delete payment
const deletePayment = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM payments WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }

    res.json({
      message: "Payment deleted successfully",
    });
  } catch (error) {
    console.error("Delete payment error:", error.message);

    res.status(500).json({
      message: "Failed to delete payment",
    });
  }
};

module.exports = {
  getPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
};
