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

export const getEmployeesByBranch = (req: Request, res: Response): void => {
  try {
    const { branchId } = req.params;
    
     if (!branchId || branchId.trim() === "") {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Branch ID parameter is required",
      });
      return;
    }

    const employees = employeeService.getEmployeesByBranch(branchId);
    
    res.status(HTTP_STATUS.OK).json({
      message: `Employees for branch ${branchId} retrieved successfully`,
      data: employees,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to retrieve employees by branch",
    });
  }
};

export const getEmployeesByDepartment = (req: Request, res: Response): void => {
  try {
    const { department } = req.params;
    
    if (!department || department.trim() === "") {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Department parameter is required",
      });
      return;
    }

    const employees = employeeService.getEmployeesByDepartment(department);
    
    res.status(HTTP_STATUS.OK).json({
      message: `Employees in department ${department} retrieved successfully`,
      data: employees,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to retrieve employees by department",
    });
  }
};