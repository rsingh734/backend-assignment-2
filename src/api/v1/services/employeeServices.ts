// src/api/v1/services/employeeService.ts
import { Employee, employees } from "../../../data/employees";

export const getAllEmployees = (): Employee[] => {
  return structuredClone(employees);
};

export const getEmployeeById = (id: string): Employee | undefined => {
  return employees.find(employee => employee.id === id);
};

export const createEmployee = (employeeData: Omit<Employee, "id">): Employee => {
  const newEmployee: Employee = {
    id: (employees.length + 1).toString(),
    ...employeeData,
  };
  employees.push(newEmployee);
  return newEmployee;
};

export const updateEmployee = (
  id: string,
  employeeData: Partial<Omit<Employee, "id">>
): Employee | undefined => {
  const index = employees.findIndex(employee => employee.id === id);
  if (index === -1) return undefined;

  employees[index] = { ...employees[index], ...employeeData };
  return employees[index];
};

export const deleteEmployee = (id: string): boolean => {
  const index = employees.findIndex(employee => employee.id === id);
  if (index === -1) return false;

  employees.splice(index, 1);
  return true;
};