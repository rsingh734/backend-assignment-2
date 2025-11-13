import { 
  createDocument, 
  getDocuments, 
  getDocumentById, 
  updateDocument, 
  deleteDocument 
} from "../repositories/firestoreRepository";
import { Employee } from "../models/employeeModel";

const COLLECTION_NAME = "employees";

export const getAllEmployees = async (): Promise<Employee[]> => {
  try {
    return await getDocuments<Employee>(COLLECTION_NAME);
  } catch (error) {
    throw new Error(`Failed to retrieve employees: ${error}`);
  }
};

export const getEmployeeById = async (id: string): Promise<Employee | null> => {
  try {
    return await getDocumentById<Employee>(COLLECTION_NAME, id);
  } catch (error) {
    throw new Error(`Failed to retrieve employee ${id}: ${error}`);
  }
};

export const createEmployee = async (data: Employee): Promise<Employee> => {
  try {
    return await createDocument<Employee>(COLLECTION_NAME, data);
  } catch (error) {
    throw new Error(`Failed to create employee: ${error}`);
  }
};

export const updateEmployee = async (id: string, data: Partial<Employee>): Promise<Employee | null> => {
  try {
    return await updateDocument<Employee>(COLLECTION_NAME, id, data);
  } catch (error) {
    throw new Error(`Failed to update employee ${id}: ${error}`);
  }
};

export const deleteEmployee = async (id: string): Promise<boolean> => {
  try {
    return await deleteDocument(COLLECTION_NAME, id);
  } catch (error) {
    throw new Error(`Failed to delete employee ${id}: ${error}`);
  }
};

export const getEmployeesByBranch = async (branchId: string): Promise<Employee[]> => {
  try {
    const allEmployees = await getDocuments<Employee>(COLLECTION_NAME);
    return allEmployees.filter(employee => employee.branchId === branchId);
  } catch (error) {
    throw new Error(`Failed to retrieve employees for branch ${branchId}: ${error}`);
  }
};

export const getEmployeesByDepartment = async (department: string): Promise<Employee[]> => {
  try {
    const allEmployees = await getDocuments<Employee>(COLLECTION_NAME);
    return allEmployees.filter(employee => 
      employee.department.toLowerCase() === department.toLowerCase()
    );
  } catch (error) {
    throw new Error(`Failed to retrieve employees for department ${department}: ${error}`);
  }
};