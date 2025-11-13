import { createBranchSchema, updateBranchSchema } from '../src/api/v1/validation/branchValidators';

describe('Validation Schemas', () => {    
    describe('Branch Validation - Create Schema', () => {
        test('should validate correct branch data', () => {
        const validBranch = {
            name: 'Vancouver Branch',
            address: '123 Main St, Vancouver, BC',
            phone: '604-555-0123'
        };

        const { error } = createBranchSchema.validate(validBranch);
        expect(error).toBeUndefined();
        });

        test('should reject invalid branch data', () => {
        const invalidBranch = {
            name: 'A', // Too short
            address: '123', // Too short
            // phone missing - required field
        };

        const { error } = createBranchSchema.validate(invalidBranch);
        expect(error).toBeDefined();
        });
    });

    describe('Branch Validation - Update Schema', () => {
        test('should validate correct branch update data', () => {
        const validUpdate = {
            name: 'Updated Branch Name',
            phone: '604-555-9999'
        };

        const { error } = updateBranchSchema.validate(validUpdate);
        expect(error).toBeUndefined();
        });

        test('should reject empty branch update data', () => {
        const emptyUpdate = {};

        const { error } = updateBranchSchema.validate(emptyUpdate);
        expect(error).toBeDefined();
        });
    });
});