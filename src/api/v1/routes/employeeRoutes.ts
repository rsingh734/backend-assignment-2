// src/api/v1/routes/employeeRoutes.ts
import express, { Router } from "express";
import {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeesByBranch,      
  getEmployeesByDepartment, 
} from "../controllers/employeeController";

import { validateRequest } from "../middleware/validationMiddleware";
import { createEmployeeSchema, updateEmployeeSchema } from "../validation/employeeValidators";

const router: Router = express.Router();

/**
 * @openapi
 * /api/v1/employees:
 *   get:
 *     summary: Retrieve a list of employees
 *     tags: [Employees]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of employees to return
 *     responses:
 *       '200':
 *         description: A list of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Employee'
 *                 total:
 *                   type: integer
 *       '500':
 *         $ref: '#/components/schemas/Error'
 */
router.get("/employees", getAllEmployees);

/**
 * @openapi
 * /api/v1/employees/{id}:
 *   get:
 *     summary: Get an employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Employee found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       '404':
 *         $ref: '#/components/schemas/Error'
 */
router.get("/employees/:id", getEmployeeById);

/**
 * @openapi
 * /api/v1/employees:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmployeeCreate'
 *     responses:
 *       '201':
 *         description: Employee created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       '400':
 *         $ref: '#/components/schemas/Error'
 */
router.post("/employees", validateRequest(createEmployeeSchema), createEmployee);

/**
 * @openapi
 * /api/v1/employees/{id}:
 *   put:
 *     summary: Update an employee
 *     tags: [Employees]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmployeeUpdate'
 *     responses:
 *       '200':
 *         description: Employee updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       '400':
 *         $ref: '#/components/schemas/Error'
 *       '404':
 *         $ref: '#/components/schemas/Error'
 */
router.put("/employees/:id", validateRequest(updateEmployeeSchema), updateEmployee);

/**
 * @openapi
 * /api/v1/employees/{id}:
 *   delete:
 *     summary: Delete an employee
 *     tags: [Employees]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Deleted successfully
 *       '404':
 *         $ref: '#/components/schemas/Error'
 */
router.delete("/employees/:id", deleteEmployee);

/**
 * @openapi
 * /api/v1/branches/{branchId}/employees:
 *   get:
 *     summary: Get employees for a specific branch
 *     tags: [Employees]
 *     parameters:
 *       - name: branchId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Employees in branch
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 */
router.get("/branches/:branchId/employees", getEmployeesByBranch);

/**
 * @openapi
 * /api/v1/departments/{department}/employees:
 *   get:
 *     summary: Get employees in a specific department
 *     tags: [Employees]
 *     parameters:
 *       - name: department
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Employees in department
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 */
router.get("/departments/:department/employees", getEmployeesByDepartment);

export default router;