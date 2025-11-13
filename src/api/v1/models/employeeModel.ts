export interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  branchId: string;
}

export interface CreateEmployeeRequest {
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  branchId: string;
}

export interface UpdateEmployeeRequest {
  name?: string;
  position?: string;
  department?: string;
  email?: string;
  phone?: string;
  branchId?: string;
}