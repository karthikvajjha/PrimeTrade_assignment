const express = require("express")
const controller = require("./task.controller")
const authMiddleware = require("../../middleware/auth.middleware")
const validate = require("../../middleware/validate.middleware")
const {
  createTaskSchema,
  updateTaskSchema,
} = require("./task.validation")

const router = express.Router()

router.use(authMiddleware)

router.post("/", validate(createTaskSchema), controller.createTask)
router.get("/", controller.getTasks)
router.get("/:id", controller.getTaskById)
router.put("/:id", validate(updateTaskSchema), controller.updateTask)
router.delete("/:id", controller.deleteTask)

module.exports = router
