const taskService = require("./task.service")

const createTask = async (req, res, next) => {
  try {
    const task = await taskService.createTask(req.user.id, req.body)
    res.status(201).json(task)
  } catch (error) {
    next(error)
  }
}

const getTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.getTasks(req.user.id)
    res.json(tasks)
  } catch (error) {
    next(error)
  }
}

const getTaskById = async (req, res, next) => {
  try {
    const task = await taskService.getTaskById(req.params.id, req.user.id)
    if (!task) return res.status(404).json({ message: "Task not found" })
    res.json(task)
  } catch (error) {
    next(error)
  }
}

const updateTask = async (req, res, next) => {
  try {
    const task = await taskService.updateTask(
      req.params.id,
      req.user.id,
      req.body
    )
    if (!task) return res.status(404).json({ message: "Task not found" })
    res.json(task)
  } catch (error) {
    next(error)
  }
}

const deleteTask = async (req, res, next) => {
  try {
    const task = await taskService.deleteTask(req.params.id, req.user.id)
    if (!task) return res.status(404).json({ message: "Task not found" })
    res.json({ message: "Task deleted" })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
}
