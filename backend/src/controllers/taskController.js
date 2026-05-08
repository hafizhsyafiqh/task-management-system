const Task = require("../models/Task");

// CREATE TASK
const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      status,
      deadline,
    } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    const task = await Task.create({
      title,
      description,
      status: status || "pending",
      deadline,
      user: req.user.id,
    });

    res.status(201).json(task);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

// GET TASKS
const getTasks = async (req, res) => {

  try {

    const filter = {
      user: req.user.id,
    };

    // FILTER STATUS
    if (
      req.query.status &&
      req.query.status !== "all"
    ) {
      filter.status = req.query.status;
    }

    const tasks = await Task.find(filter).sort({
      createdAt: -1,
    });

    res.json(tasks);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE TASK
const updateTask = async (req, res) => {

  try {

    const {
      title,
      description,
      status,
      deadline,
    } = req.body;

    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      {
        title,
        description,
        status,
        deadline,
      },
      {
        new: true,
      }
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json(task);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE TASK
const deleteTask = async (req, res) => {

  try {

    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json({
      message: "Task deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};