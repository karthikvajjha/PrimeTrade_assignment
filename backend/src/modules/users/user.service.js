const User = require("./user.model")

const getUserById = async (id) => {
  return await User.findById(id)
}

const getAllUsers = async () => {
  return await User.find().sort({ createdAt: -1 })
}

const updateUserRole = async (id, role) => {
  return await User.findByIdAndUpdate(id, { role }, { new: true })
}

const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id)
}

module.exports = {
  getUserById,
  getAllUsers,
  updateUserRole,
  deleteUser,
}
