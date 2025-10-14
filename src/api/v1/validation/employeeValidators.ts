import Joi from "joi";

export const createEmployeeSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  position: Joi.string().min(2).max(100).required(),
  department: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).max(15).required(),
  branchId: Joi.string().required()
});

export const updateEmployeeSchema = Joi.object({
  name: Joi.string().min(2).max(100).optional(),
  position: Joi.string().min(2).max(100).optional(),
  department: Joi.string().min(2).max(100).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().min(10).max(15).optional(),
  branchId: Joi.string().optional()
}).min(1);