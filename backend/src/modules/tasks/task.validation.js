const Joi = require("joi")

const createTaskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow("").optional(),
})

const updateTaskSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().allow("").optional(),
  completed: Joi.boolean().optional(),
})

module.exports = {
  createTaskSchema,
  updateTaskSchema,
}
