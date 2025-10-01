// src/api/v1/controllers/employeeController.ts
import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as employeeService from "../services/employeeServices";

export const getAllEmployees = (req: Request, res: Response): void => {
  try {
    const employees = employeeService.getAllEmployees();
    res.status(HTTP_STATUS.OK).json({
      message: "Employees retrieved successfully",
      data: employees,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to retrieve employees",
    });
  }
};

export const getEmployeeById = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const employee = employeeService.getEmployeeById(id);
    
    if (employee) {
      res.status(HTTP_STATUS.OK).json({
        message: "Employee found",
        data: employee,
      });
    } else {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        message: "Employee not found",
      });
    }
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to retrieve employee",
    });
  }
};

export const createEmployee = (req: Request, res: Response): void => {
  try {
    const { name, position, department, email, phone, branchId } = req.body;

    if (!name || !position || !department || !email || !phone || !branchId) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "All fields are required: name, position, department, email, phone, branchId",
      });
      return;
    }

    const newEmployee = employeeService.createEmployee({
      name,
      position,
      department,
      email,
      phone,
      branchId,
    });

    res.status(HTTP_STATUS.CREATED).json({
      message: "Employee created successfully",
      data: newEmployee,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to create employee",
    });
  }
};

export const updateEmployee = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedEmployee = employeeService.updateEmployee(id, updateData);
    
    if (updatedEmployee) {
      res.status(HTTP_STATUS.OK).json({
        message: "Employee updated successfully",
        data: updatedEmployee,
      });
    } else {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        message: "Employee not found",
      });
    }
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to update employee",
    });
  }
};

export const deleteEmployee = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const result = employeeService.deleteEmployee(id);
    
    if (result) {
      res.status(HTTP_STATUS.OK).json({
        message: "Employee deleted successfully",
      });
    } else {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        message: "Employee not found",
      });
    }
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to delete employee",
    });
  }
};