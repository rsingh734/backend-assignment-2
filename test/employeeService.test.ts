import * as employeeService from '../src/api/v1/services/employeeServices';
import { getDocumentById } from '../src/api/v1/repositories/firestoreRepository';

// Mock the firestore repository
jest.mock('../src/api/v1/repositories/firestoreRepository');

describe('Employee Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getEmployeeById', () => {
    test('should return employee when found', async () => {
      const mockEmployee = {
        id: '1',
        name: 'John Doe',
        position: 'Manager',
        department: 'Management',
        email: 'john@company.com',
        phone: '604-555-0123',
        branchId: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      (getDocumentById as jest.Mock).mockResolvedValue(mockEmployee);

      const result = await employeeService.getEmployeeById('1');
      
      expect(result).toEqual(mockEmployee);
      expect(getDocumentById).toHaveBeenCalledWith('employees', '1');
    });

    test('should return null when employee not found', async () => {
      (getDocumentById as jest.Mock).mockResolvedValue(null);

      const result = await employeeService.getEmployeeById('999');
      
      expect(result).toBeNull();
      expect(getDocumentById).toHaveBeenCalledWith('employees', '999');
    });
  });
});