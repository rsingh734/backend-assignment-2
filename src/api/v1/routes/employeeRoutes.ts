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

router.get("/employees", getAllEmployees);
router.get("/employees/:id", getEmployeeById);
router.post("/employees", validateRequest(createEmployeeSchema), createEmployee);
router.put("/employees/:id", validateRequest(updateEmployeeSchema), updateEmployee);
router.delete("/employees/:id", deleteEmployee);
router.get("/branches/:branchId/employees", getEmployeesByBranch);
router.get("/departments/:department/employees", getEmployeesByDepartment);

export default router;