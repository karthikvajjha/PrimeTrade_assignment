const Task = require("./task.model")

const createTask = async (userId, data) => {
  const task = await Task.create({
    title: data.title,
    description: data.description || "",
    completed: false,
    user: userId,
  })
  return task
}

const getTasks = async (userId) => {
  return await Task.find({ user: userId }).sort({ createdAt: -1 })
}

const getTaskById = async (taskId, userId) => {
  return await Task.findOne({ _id: taskId, user: userId })
}

const updateTask = async (taskId, userId, data) => {
  return await Task.findOneAndUpdate(
    { _id: taskId, user: userId },
    data,
    { new: true }
  )
}

const deleteTask = async (taskId, userId) => {
  return await Task.findOneAndDelete({ _id: taskId, user: userId })
}

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
}
