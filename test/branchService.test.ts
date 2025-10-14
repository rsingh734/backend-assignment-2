import * as branchService from '../src/api/v1/services/branchServices';
import { getDocumentById } from '../src/api/v1/repositories/firestoreRepository';

// Mock the firestore repository
jest.mock('../src/api/v1/repositories/firestoreRepository');

describe('Branch Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getBranchById', () => {
    test('should return branch when found', async () => {
      const mockBranch = {
        id: '1',
        name: 'Vancouver Branch',
        address: '123 Main St, Vancouver, BC',
        phone: '604-555-0123',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      (getDocumentById as jest.Mock).mockResolvedValue(mockBranch);

      const result = await branchService.getBranchById('1');
      
      expect(result).toEqual(mockBranch);
      expect(getDocumentById).toHaveBeenCalledWith('branches', '1');
    });
  });
});