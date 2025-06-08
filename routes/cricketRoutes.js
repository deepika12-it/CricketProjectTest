const express = require('express');
const router = express.Router();
const db = require("../database");

// GET ALL PLAYERS - /cricket1/
router.get("/", (req, res) => {
  db.query("SELECT * FROM cricket1", (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({
        error: "Failed to fetch players",
        details: err.message
      });
    }
    res.json({
      success: true,
      count: result.length,
      data: result
    });
  });
});

// CREATE NEW PLAYER - POST /cricket1/
router.post("/", (req, res) => {
  const { name, age, country, role, runs, wickets, team } = req.body;

  if (!name || !age || !country || !role || !runs || !wickets || !team) {
    return res.status(400).json({
      error: "Missing required fields",
      required: ["name", "age", "country", "role", "runs", "wickets", "team"]
    });
  }

  const sql = "INSERT INTO cricket1 (name, age, country, role, runs, wickets, team) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [name, age, country, role, runs, wickets, team], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({
        error: "Failed to create player",
        details: err.message
      });
    }

    res.status(201).json({
      success: true,
      message: "Player created successfully",
      player: {
        id: result.insertId,
        name,
        age,
        country,
        role,
        runs,
        wickets,
        team
      }
    });
  });
});

// GET PLAYER BY ID - GET /cricket1/:id
router.get("/:id", (req, res) => {
  const playerId = req.params.id;

  db.query("SELECT * FROM cricket1 WHERE id = ?", [playerId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({
        error: "Failed to fetch player",
        details: err.message
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        error: "Player not found",
        message: `No player found with ID: ${playerId}`
      });
    }

    res.json({
      success: true,
      data: result[0]
    });
  });
});

// UPDATE PLAYER - PUT /cricket1/:id
router.put("/:id", (req, res) => {
  const { name, age, country, role, runs, wickets, team } = req.body;
  const playerId = req.params.id;

  if (!name || !age || !country || !role || !runs || !wickets || !team) {
    return res.status(400).json({
      error: "Missing required fields",
      required: ["name", "age", "country", "role", "runs", "wickets", "team"]
    });
  }

  const sql = "UPDATE cricket1 SET name = ?, age = ?, country = ?, role = ?, runs = ?, wickets = ?, team = ? WHERE id = ?";
  db.query(sql, [name, age, country, role, runs, wickets, team, playerId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({
        error: "Failed to update player",
        details: err.message
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Player not found",
        message: `No player found with ID: ${playerId}`
      });
    }

    res.json({
      success: true,
      message: "Player updated successfully",
      player: {
        id: playerId,
        name,
        age,
        country,
        role,
        runs,
        wickets,
        team
      }
    });
  });
});

// DELETE PLAYER - DELETE /cricket1/:id
router.delete("/:id", (req, res) => {
  const playerId = req.params.id;

  db.query("DELETE FROM cricket1 WHERE id = ?", [playerId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({
        error: "Failed to delete player",
        details: err.message
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Player not found",
        message: `No player found with ID: ${playerId}`
      });
    }

    res.json({
      success: true,
      message: "Player deleted successfully",
      deletedId: playerId
    });
  });
});

module.exports = router;
