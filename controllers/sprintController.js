import Sprint from "../models/Sprint.js";
import Task from '../models/Task.js'
import Backlog from "../models/Backlog.js";

const getAllSprint = async (_, res) => {
  try {
    const sprints = await Sprint.find().populate("tasks");

    res.status(200).json(sprints);
  } catch (error) {
    res.status(500).json({
      error: "Error de conexion",
    });
  }
};

const getSprintById = async (req, res) => {
  try {
    const sprint = await Sprint.findById(req.params.id).populate("tasks");

    if (!sprint) {
      return res.status(404).json({
        error: "Sprint no encontrado",
      });
    }

    res.status(200).json(sprint);
  } catch (error) {
    res.status(500).json({
      error: "Error de conexion",
    });
  }
};

const createSprint = async (req, res) => {
  try {
    const sprint = await Sprint.create(req.body);

    res.status(200).json(sprint);
  } catch (error) {
    res.status(500).json({
      error: "Error de conexion",
    });
  }
};

const updateSprint = async (req, res) => {
  try {
    const sprint = await Sprint.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!sprint) {
      return res.status(404).json({
        error: "Sprint no encontrado",
      });
    }

    res.status(200).json(sprint);
  } catch (error) {
    res.status(500).json({
      error: "Error del servidor",
    });
  }
};

const deleteSprint = async (req, res) => {
  try {
    const sprint = await Sprint.findById(req.params.id);

    if (!sprint) {
      return res.status(404).json({
        error: "Sprint no encontrado",
      });
    }

    if (sprint.tasks.length > 0) {
      const backlog = await Backlog.findOne();
      if (backlog) {
        backlog.tasks = [...backlog.tasks, ...sprint.tasks];
        await backlog.save();
      }
    }

    await sprint.deleteOne()

    res.status(200).json({
      eliminated: true,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error del servidor",
    });
  }
};

const addTaskToSprint = async (req, res) => {
  try {
    const { id: sprintId, taskId } = req.params;

    const sprint = await Sprint.findById(sprintId);
    if (!sprint) {
      return res.status(404).json({
        error: "Sprint no encontrado",
      });
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({
        error: "Tarea no encontrada",
      });
    }

    if (sprint.tasks.includes(taskId)) {
      return res.status(400).json({
        error: "La tarea ya está asignada a este sprint",
      });
    }

    sprint.tareas.push(taskId);
    await sprint.save();

    const backlog = await Backlog.findOne();
    if (backlog) {
      backlog.tasks = backlog.tasks.filter(
        (tareaid) => tareaid.toString() !== taskId
      );
      await backlog.save();
    }

    res.status(200).json(sprint);
  } catch (error) {
    res.status(500).json({
      error: "Error de conexion",
    });
  }
};

export {
  getAllSprint,
  getSprintById,
  createSprint,
  updateSprint,
  addTaskToSprint,
  deleteSprint,
};
