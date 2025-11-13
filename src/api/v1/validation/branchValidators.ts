import Joi from "joi";

export const createBranchSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  address: Joi.string().min(5).max(200).required(),
  phone: Joi.string().min(10).max(15).required()
});

export const updateBranchSchema = Joi.object({
  name: Joi.string().min(2).max(100).optional(),
  address: Joi.string().min(5).max(200).optional(),
  phone: Joi.string().min(10).max(15).optional()
}).min(1);