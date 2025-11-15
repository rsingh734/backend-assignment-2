import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       required:
 *         - name
 *         - position
 *         - department
 *         - email
 *         - phone
 *         - branchId
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the employee
 *           example: "emp_abc123"
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 100
 *           example: "Jane Doe"
 *         position:
 *           type: string
 *           example: "Software Engineer"
 *         department:
 *           type: string
 *           example: "Engineering"
 *         email:
 *           type: string
 *           format: email
 *           example: "jane@example.com"
 *         phone:
 *           type: string
 *           example: "+1-555-555-5555"
 *         branchId:
 *           type: string
 *           example: "branch_abc123"
 *     EmployeeCreate:
 *       type: object
 *       required: [name, position, department, email, phone, branchId]
 *       properties:
 *         name:
 *           $ref: '#/components/schemas/Employee/properties/name'
 *         position:
 *           $ref: '#/components/schemas/Employee/properties/position'
 *         department:
 *           $ref: '#/components/schemas/Employee/properties/department'
 *         email:
 *           $ref: '#/components/schemas/Employee/properties/email'
 *         phone:
 *           $ref: '#/components/schemas/Employee/properties/phone'
 *         branchId:
 *           $ref: '#/components/schemas/Employee/properties/branchId'
 *     EmployeeUpdate:
 *       type: object
 *       properties:
 *         name:
 *           $ref: '#/components/schemas/Employee/properties/name'
 *         position:
 *           $ref: '#/components/schemas/Employee/properties/position'
 *         department:
 *           $ref: '#/components/schemas/Employee/properties/department'
 *         email:
 *           $ref: '#/components/schemas/Employee/properties/email'
 *         phone:
 *           $ref: '#/components/schemas/Employee/properties/phone'
 *         branchId:
 *           $ref: '#/components/schemas/Employee/properties/branchId'
 *     Error:
 *       type: object
 *       required: [error, message]
 *       properties:
 *         error:
 *           type: string
 *           example: "NOT_FOUND"
 *         message:
 *           type: string
 *           example: "Resource not found"
 */
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