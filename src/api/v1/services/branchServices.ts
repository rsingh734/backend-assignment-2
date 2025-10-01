// src/api/v1/services/branchService.ts
import { Branch, branches } from "../../../data/branches";

export const getAllBranches = (): Branch[] => {
  return structuredClone(branches);
};

export const getBranchById = (id: string): Branch | undefined => {
  return branches.find(branch => branch.id === id);
};

export const createBranch = (branchData: Omit<Branch, "id">): Branch => {
  const newBranch: Branch = {
    id: (branches.length + 1).toString(),
    ...branchData,
  };
  branches.push(newBranch);
  return newBranch;
};

export const updateBranch = (
  id: string,
  branchData: Partial<Omit<Branch, "id">>
): Branch | undefined => {
  const index = branches.findIndex(branch => branch.id === id);
  if (index === -1) return undefined;

  branches[index] = { ...branches[index], ...branchData };
  return branches[index];
};

export const deleteBranch = (id: string): boolean => {
  const index = branches.findIndex(branch => branch.id === id);
  if (index === -1) return false;

  branches.splice(index, 1);
  return true;
};