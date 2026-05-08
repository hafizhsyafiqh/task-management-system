const express = require("express");

const router = express.Router();

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const authMiddleware = require("../middleware/authMiddleware");

// CREATE
router.post("/", authMiddleware, createTask);

// GET
router.get("/", authMiddleware, getTasks);

// UPDATE
router.put("/:id", authMiddleware, updateTask);

// DELETE
router.delete("/:id", authMiddleware, deleteTask);

module.exports = router;