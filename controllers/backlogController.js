import Backlog from "../models/Backlog.js";
import Task from "../models/Task.js";

const getBacklog = async (_, res) => {
  try {
    let backlog = await Backlog.findOne();

    if (!backlog) {
      backlog = await Backlog.create({ tasks: [] });
    }

    if (backlog.tasks > 0) {
      backlog = await backlog.populate("tasks");
    }

    res.status(200).json(backlog);
  } catch (error) {
    res.status(500).json({
      error: "Error del servidor",
    });
  }
};

const createBacklog = async (_, res) => {
  try {
    const backlogExistente = await Backlog.findOne();

    if (backlogExistente) {
      return res.status(400).json({
        error: "Ya existe un backlog en el sistema",
      });
    }

    const backlog = await Backlog.create({ tasks: [] });

    res.status(201).json(backlog);
  } catch (error) {
    res.status(500).json({
      error: "Error de conexion",
    });
  }
};

const addTaskToBacklog = async (req, res) => {
  try {
    const { taskId } = req.params;

    let backlog = await Backlog.findOne();

    if (!backlog) {
      backlog = await Backlog.create({ tasks: [] });
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({
        error: "Tarea no encontrada",
      });
    }

    if (backlog.tasks.includes(taskId)) {
      return res.status(400).json({
        error: "La tarea ya está en el backlog",
      });
    }

    backlog.tasks.push(taskId);
    await backlog.save();

    res.status(200).json({
      success: true,
      data: backlog,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error de conexion",
    });
  }
};

export { getBacklog, createBacklog, addTaskToBacklog };
