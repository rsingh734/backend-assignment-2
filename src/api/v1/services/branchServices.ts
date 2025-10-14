import { 
  createDocument, 
  getDocuments, 
  getDocumentById, 
  updateDocument, 
  deleteDocument 
} from "../repositories/firestoreRepository";
import { Branch } from "../models/branchModel";

const COLLECTION_NAME = "branches";

export const getAllBranches = async (): Promise<Branch[]> => {
  try {
    return await getDocuments<Branch>(COLLECTION_NAME);
  } catch (error) {
    throw new Error(`Failed to retrieve branches: ${error}`);
  }
};

export const getBranchById = async (id: string): Promise<Branch | null> => {
  try {
    return await getDocumentById<Branch>(COLLECTION_NAME, id);
  } catch (error) {
    throw new Error(`Failed to retrieve branch ${id}: ${error}`);
  }
};

export const createBranch = async (data: Branch): Promise<Branch> => {
  try {
    return await createDocument<Branch>(COLLECTION_NAME, data);
  } catch (error) {
    throw new Error(`Failed to create branch: ${error}`);
  }
};

export const updateBranch = async (id: string, data: Partial<Branch>): Promise<Branch | null> => {
  try {
    return await updateDocument<Branch>(COLLECTION_NAME, id, data);
  } catch (error) {
    throw new Error(`Failed to update branch ${id}: ${error}`);
  }
};

export const deleteBranch = async (id: string): Promise<boolean> => {
  try {
    return await deleteDocument(COLLECTION_NAME, id);
  } catch (error) {
    throw new Error(`Failed to delete branch ${id}: ${error}`);
  }
};