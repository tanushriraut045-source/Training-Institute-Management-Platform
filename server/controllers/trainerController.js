const pool = require("../config/db");

// Get all trainers
const getTrainers = async (req, res) => {
  try {
    const [trainers] = await pool.query(
      "SELECT * FROM trainers ORDER BY id DESC",
    );

    res.json(trainers);
  } catch (error) {
    console.error("Get trainers error:", error.message);
    res.status(500).json({ message: "Failed to fetch trainers" });
  }
};

// Get single trainer
const getTrainerById = async (req, res) => {
  try {
    const [trainers] = await pool.query("SELECT * FROM trainers WHERE id = ?", [
      req.params.id,
    ]);

    if (trainers.length === 0) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    res.json(trainers[0]);
  } catch (error) {
    console.error("Get trainer error:", error.message);
    res.status(500).json({ message: "Failed to fetch trainer" });
  }
};

// Add trainer
const createTrainer = async (req, res) => {
  try {
    const { name, email, phone, specialization } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Name is required",
      });
    }

    const [result] = await pool.query(
      `INSERT INTO trainers
       (name, email, phone, specialization)
       VALUES (?, ?, ?, ?)`,
      [name, email || null, phone || null, specialization || null],
    );

    const [newTrainer] = await pool.query(
      "SELECT * FROM trainers WHERE id = ?",
      [result.insertId],
    );

    res.status(201).json(newTrainer[0]);
  } catch (error) {
    console.error("Create trainer error:", error.message);
    res.status(500).json({
      message: "Failed to create trainer",
    });
  }
};

// Update trainer
const updateTrainer = async (req, res) => {
  try {
    const { name, email, phone, specialization } = req.body;

    const [result] = await pool.query(
      `UPDATE trainers
       SET name = ?, email = ?, phone = ?, specialization = ?
       WHERE id = ?`,
      [
        name,
        email || null,
        phone || null,
        specialization || null,
        req.params.id,
      ],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Trainer not found",
      });
    }

    res.json({
      message: "Trainer updated successfully",
    });
  } catch (error) {
    console.error("Update trainer error:", error.message);
    res.status(500).json({
      message: "Failed to update trainer",
    });
  }
};

// Delete trainer
const deleteTrainer = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM trainers WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Trainer not found",
      });
    }

    res.json({
      message: "Trainer deleted successfully",
    });
  } catch (error) {
    console.error("Delete trainer error:", error.message);
    res.status(500).json({
      message: "Failed to delete trainer",
    });
  }
};

module.exports = {
  getTrainers,
  getTrainerById,
  createTrainer,
  updateTrainer,
  deleteTrainer,
};
