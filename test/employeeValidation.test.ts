import { createEmployeeSchema, updateEmployeeSchema } from '../src/api/v1/validation/employeeValidators';

describe('Validation Schemas', () => {
  describe('Employee Validation - Create Schema', () => {
    test('should validate correct employee data', () => {
      const validEmployee = {
        name: 'John Doe',
        position: 'Manager',
        department: 'Management',
        email: 'john.doe@company.com',
        phone: '604-555-0123',
        branchId: '1'
      };

      const { error } = createEmployeeSchema.validate(validEmployee);
      expect(error).toBeUndefined();
    });

    test('should reject invalid employee data', () => {
      const invalidEmployee = {
        name: 'J', // Too short
        position: '', // Empty
        department: 'IT',
        email: 'invalid-email', // Invalid email
        phone: '123', // Too short
        // branchId missing - required field
      };

      const { error } = createEmployeeSchema.validate(invalidEmployee);
      expect(error).toBeDefined();
    });
  });

  describe('Employee Validation - Update Schema', () => {
    test('should validate correct update data', () => {
      const validUpdate = {
        name: 'John Smith',
        email: 'john.smith@company.com'
      };

      const { error } = updateEmployeeSchema.validate(validUpdate);
      expect(error).toBeUndefined();
    });

    test('should reject empty update data', () => {
      const emptyUpdate = {};

      const { error } = updateEmployeeSchema.validate(emptyUpdate);
      expect(error).toBeDefined();
    });
  });
});