import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as branchService from "../services/branchServices";

export const getAllBranches = (req: Request, res: Response): void => {
  try {
    const branches = branchService.getAllBranches();
    res.status(HTTP_STATUS.OK).json({
      message: "Branches retrieved successfully",
      data: branches,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to retrieve branches",
    });
  }
};

export const getBranchById = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const branch = branchService.getBranchById(id);
    
    if (branch) {
      res.status(HTTP_STATUS.OK).json({
        message: "Branch found",
        data: branch,
      });
    } else {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        message: "Branch not found",
      });
    }
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to retrieve branch",
    });
  }
};

export const createBranch = (req: Request, res: Response): void => {
  try {
    const { name, address, phone } = req.body;

    const newBranch = branchService.createBranch({
      name,
      address,
      phone,
    });

    res.status(HTTP_STATUS.CREATED).json({
      message: "Branch created successfully",
      data: newBranch,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to create branch",
    });
  }
};

export const updateBranch = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const { name, address, phone } = req.body;

    const updateData = { name, address, phone };
    const updatedBranch = branchService.updateBranch(id, updateData);
    
    if (updatedBranch) {
      res.status(HTTP_STATUS.OK).json({
        message: "Branch updated successfully",
        data: updatedBranch,
      });
    } else {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        message: "Branch not found",
      });
    }
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to update branch",
    });
  }
};

export const deleteBranch = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const result = branchService.deleteBranch(id);
    
    if (result) {
      res.status(HTTP_STATUS.OK).json({
        message: "Branch deleted successfully",
      });
    } else {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        message: "Branch not found",
      });
    }
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to delete branch",
    });
  }
};