import Task from "../models/Task.js";
import Sprint from '../models/Sprint.js'
import Backlog from "../models/Backlog.js";

const getAllTask = async (_, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (e) {
    res.status(500).json({
      error: "Error de conexion",
    });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        error: "Tarea no encontrada",
      });
    }

    res.status(200).json(task);
  } catch (e) {
    res.status(500).json({
      error: "Error de conexion",
    });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    const backlog = await Backlog.findOne();

    if (backlog) {
      backlog.tareas.push(task._id);
      await backlog.save();
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      error: "Error de conexion",
    });
  }
};

const updateTask = async(req, res) => {
    try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    if (!task) {
      return res.status(404).json({
        error: 'Tarea no encontrada'
      });
    }
    
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      error: 'Error de conexion'
    });
  }
};

const deleteTask = async(req, res) => {
    try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({
        error: 'Tarea no encontrada'
      });
    }
    
    const sprint = await Sprint.findOne({ tareas: req.params.id });
    if (sprint) {
      return res.status(400).json({
        error: 'No se puede eliminar una tarea asignada a un sprint'
      });
    }
    

    const backlog = await Backlog.findOne({ tareas: req.params.id });
    if (backlog) {
      backlog.tareas = backlog.tareas.filter(
        tareaid => tareaid.toString() !== req.params.id
      );
      await backlog.save();
    }
    
    await task.deleteOne();
    
    res.status(200).json({
      eliminated: true,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error de conexion'
    });
  }
};

export { getAllTask, getTaskById, createTask, updateTask, deleteTask };
