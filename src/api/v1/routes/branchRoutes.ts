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

/**
 * @openapi
 * /api/v1/branches:
 *   get:
 *     summary: Retrieve all branches
 *     tags: [Branches]
 *     responses:
 *       '200':
 *         description: A list of branches
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Branch'
 *                 total:
 *                   type: integer
 *       '500':
 *         $ref: '#/components/schemas/Error'
 */
router.get("/branches", getAllBranches);

/**
 * @openapi
 * /api/v1/branches/{id}:
 *   get:
 *     summary: Get a branch by ID
 *     tags: [Branches]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Branch unique ID
 *     responses:
 *       '200':
 *         description: Branch found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Branch'
 *       '404':
 *         $ref: '#/components/schemas/Error'
 */
router.get("/branches/:id", getBranchById);

/**
 * @openapi
 * /api/v1/branches:
 *   post:
 *     summary: Create a new branch
 *     tags: [Branches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BranchCreate'
 *     responses:
 *       '201':
 *         description: Branch created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Branch'
 *       '400':
 *         $ref: '#/components/schemas/Error'
 */
router.post("/branches", validateRequest(createBranchSchema), createBranch);

/**
 * @openapi
 * /api/v1/branches/{id}:
 *   put:
 *     summary: Update an existing branch
 *     tags: [Branches]
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
 *             $ref: '#/components/schemas/BranchUpdate'
 *     responses:
 *       '200':
 *         description: Branch updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Branch'
 *       '400':
 *         $ref: '#/components/schemas/Error'
 *       '404':
 *         $ref: '#/components/schemas/Error'
 */
router.put("/branches/:id", validateRequest(updateBranchSchema), updateBranch);

/**
 * @openapi
 * /api/v1/branches/{id}:
 *   delete:
 *     summary: Delete a branch
 *     tags: [Branches]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Branch deleted successfully (no content)
 *       '404':
 *         $ref: '#/components/schemas/Error'
 */
router.delete("/branches/:id", deleteBranch);

export default router;