import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     Branch:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - phone
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the branch
 *           example: "branch_abc123"
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 100
 *           example: "Main Branch"
 *         address:
 *           type: string
 *           minLength: 5
 *           maxLength: 200
 *           example: "123 Main St, City"
 *         phone:
 *           type: string
 *           minLength: 10
 *           maxLength: 15
 *           example: "+1-555-555-5555"
 *     BranchCreate:
 *       type: object
 *       required: [name, address, phone]
 *       properties:
 *         name:
 *           $ref: '#/components/schemas/Branch/properties/name'
 *         address:
 *           $ref: '#/components/schemas/Branch/properties/address'
 *         phone:
 *           $ref: '#/components/schemas/Branch/properties/phone'
 *     BranchUpdate:
 *       type: object
 *       properties:
 *         name:
 *           $ref: '#/components/schemas/Branch/properties/name'
 *         address:
 *           $ref: '#/components/schemas/Branch/properties/address'
 *         phone:
 *           $ref: '#/components/schemas/Branch/properties/phone'
 */
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