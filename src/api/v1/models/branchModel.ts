export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
}

export interface CreateBranchRequest {
  name: string;
  address: string;
  phone: string;
}

export interface UpdateBranchRequest {
  name?: string;
  address?: string;
  phone?: string;
}