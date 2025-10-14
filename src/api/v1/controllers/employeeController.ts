import { Request, Response, NextFunction } from "express";
import * as employeeService from "../services/employeeServices";
import { successResponse, errorResponse } from "../models/responsemodel";
import { Employee } from "../models/employeeModel";
import { createEmployeeSchema, updateEmployeeSchema } from "../validation/employeeValidators";


export const getAllEmployees = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const employees = employeeService.getAllEmployees();
        res.status(200).json(successResponse(employees, "Employees retrieved successfully"));
    } catch (error: unknown) {
        next(error);
    }
};

export const getEmployeeById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const employee = employeeService.getEmployeeById(id);
        
        if (employee) {
            res.status(200).json(successResponse(employee, "Employee found"));
        } else {
            res.status(404).json(errorResponse("NOT_FOUND", "Employee not found"));
        }
    } catch (error: unknown) {
        next(error);
    }
};

export const createEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { error } = createEmployeeSchema.validate(req.body, { abortEarly: false });
  
        if (error) {
            res.status(400).json(errorResponse(
                "VALIDATION_ERROR", 
                "Validation failed",
                error.details.map(d => d.message).join(", ")
            ));
            return;
        }
        
        const employeeData: Employee = req.body;
        const newEmployee = employeeService.createEmployee(employeeData);
        res.status(201).json(successResponse(newEmployee, "Employee created successfully"));
    } catch (error: unknown) {
        next(error);
    }
};

export const updateEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { error } = updateEmployeeSchema.validate(req.body, { abortEarly: false });
  
        if (error) {
            res.status(400).json(errorResponse(
                "VALIDATION_ERROR", 
                "Validation failed",
                error.details.map(d => d.message).join(", ")
            ));
            return;
        }
           
        const { id } = req.params;
        const updatedEmployee = employeeService.updateEmployee(id, req.body);
        
        if (updatedEmployee) {
            res.status(200).json(successResponse(updatedEmployee, "Employee updated successfully"));
        } else {
            res.status(404).json(errorResponse("NOT_FOUND", "Employee not found"));
        }
    } catch (error: unknown) {
        next(error);
    }
};

export const deleteEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const result = employeeService.deleteEmployee(id);
        
        if (result) {
            res.status(200).json(successResponse({}, "Employee deleted successfully"));
        } else {
            res.status(404).json(errorResponse("NOT_FOUND", "Employee not found"));
        }
    } catch (error: unknown) {
        next(error);
    }
};

export const getEmployeesByBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { branchId } = req.params;
        
        if (!branchId || branchId.trim() === "") {
            res.status(400).json(errorResponse("BAD_REQUEST", "Branch ID parameter is required"));
            return;
        }

        const employees = employeeService.getEmployeesByBranch(branchId);
        res.status(200).json(successResponse(employees, `Employees for branch ${branchId} retrieved successfully`));
    } catch (error: unknown) {
        next(error);
    }
};

export const getEmployeesByDepartment = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { department } = req.params;
        
        if (!department || department.trim() === "") {
            res.status(400).json(errorResponse("BAD_REQUEST", "Department parameter is required"));
            return;
        }

        const employees = employeeService.getEmployeesByDepartment(department);
        res.status(200).json(successResponse(employees, `Employees in department ${department} retrieved successfully`));
    } catch (error: unknown) {
        next(error);
    }
};