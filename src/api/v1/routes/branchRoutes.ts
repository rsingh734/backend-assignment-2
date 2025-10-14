import express, { Router } from "express";
import {
  getAllBranches,
  getBranchById,
  createBranch,
  updateBranch,
  deleteBranch,
} from "../controllers/branchController";

const router: Router = express.Router();

import { validateRequest } from "../middleware/validationMiddleware";
import { createBranchSchema, updateBranchSchema } from "../validation/branchValidators";

router.get("/branches", getAllBranches);
router.get("/branches/:id", getBranchById);
router.post("/branches", validateRequest(createBranchSchema), createBranch);
router.put("/branches/:id", validateRequest(updateBranchSchema), updateBranch);
router.delete("/branches/:id", deleteBranch);

export default router;