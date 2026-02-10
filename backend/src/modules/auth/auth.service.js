const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../users/user.model")

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  )
}

const registerUser = async (data) => {
  const existingUser = await User.findOne({ email: data.email })
  if (existingUser) {
    throw new Error("Email already registered")
  }

  const hashedPassword = await bcrypt.hash(data.password, 10)

  const user = await User.create({
    username: data.username,
    email: data.email,
    password: hashedPassword,
  })

  const token = generateToken(user)

  return {
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    token,
  }
}

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password")
  if (!user) {
    throw new Error("Invalid credentials")
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new Error("Invalid credentials")
  }

  const token = generateToken(user)

  return {
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    token,
  }
}

module.exports = {
  registerUser,
  loginUser,
}
