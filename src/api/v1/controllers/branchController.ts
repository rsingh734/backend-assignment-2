import { Request, Response, NextFunction } from "express";
import * as branchService from "../services/branchServices";
import { successResponse, errorResponse } from "../models/responsemodel";
import { Branch } from "../models/branchModel";
import { createBranchSchema, updateBranchSchema } from "../validation/branchValidators";

export const getAllBranches = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const branches = branchService.getAllBranches();
        res.status(200).json(successResponse(branches, "Branches retrieved successfully"));
    } catch (error: unknown) {
        next(error);
    }
};

export const getBranchById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const branch = branchService.getBranchById(id);
        
        if (branch) {
            res.status(200).json(successResponse(branch, "Branch found"));
        } else {
            res.status(404).json(errorResponse("NOT_FOUND", "Branch not found"));
        }
    } catch (error: unknown) {
        next(error);
    }
};

export const createBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { error} = createBranchSchema.validate(req.body, { abortEarly: false });
  
        if (error) {
            res.status(400).json(errorResponse(
                "VALIDATION_ERROR", 
                "Validation failed",
                error.details.map(d => d.message).join(", ")
            ));
            return;
        }
        
        const branchData: Branch = req.body;
        const newBranch = branchService.createBranch(branchData);
        res.status(201).json(successResponse(newBranch, "Branch created successfully"));
    } catch (error: unknown) {
        next(error);
    }
};

export const updateBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { error } = updateBranchSchema.validate(req.body, { abortEarly: false });
  
        if (error) {
            res.status(400).json(errorResponse(
                "VALIDATION_ERROR", 
                "Validation failed",
                error.details.map(d => d.message).join(", ")
            ));
            return;
        }
           
        const { id } = req.params;
        const updatedBranch = branchService.updateBranch(id, req.body);
        
        if (updatedBranch) {
            res.status(200).json(successResponse(updatedBranch, "Branch updated successfully"));
        } else {
            res.status(404).json(errorResponse("NOT_FOUND", "Branch not found"));
        }
    } catch (error: unknown) {
        next(error);
    }
};

export const deleteBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const result = branchService.deleteBranch(id);
        
        if (result) {
            res.status(200).json(successResponse({}, "Branch deleted successfully"));
        } else {
            res.status(404).json(errorResponse("NOT_FOUND", "Branch not found"));
        }
    } catch (error: unknown) {
        next(error);
    }
};