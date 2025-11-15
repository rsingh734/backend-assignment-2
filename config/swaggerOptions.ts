import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Backend Assignment 2 API',
    version: '1.0.0',
    description: 'API documentation for the backend assignment',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
  components: {
    schemas: {
      Branch: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Unique identifier for the branch',
          },
          name: {
            type: 'string',
            description: 'Name of the branch',
          },
          address: {
            type: 'string',
            description: 'Address of the branch',
          },
          phone: {
            type: 'string',
            description: 'Phone number of the branch',
          },
        },
        required: ['id', 'name', 'address', 'phone'],
      },
      BranchCreate: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Name of the branch',
          },
          address: {
            type: 'string',
            description: 'Address of the branch',
          },
          phone: {
            type: 'string',
            description: 'Phone number of the branch',
          },
        },
        required: ['name', 'address', 'phone'],
      },
      BranchUpdate: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Name of the branch',
          },
          address: {
            type: 'string',
            description: 'Address of the branch',
          },
          phone: {
            type: 'string',
            description: 'Phone number of the branch',
          },
        },
      },
      Employee: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Unique identifier for the employee',
          },
          name: {
            type: 'string',
            description: 'Name of the employee',
          },
          position: {
            type: 'string',
            description: 'Position of the employee',
          },
          department: {
            type: 'string',
            description: 'Department of the employee',
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'Email of the employee',
          },
          phone: {
            type: 'string',
            description: 'Phone number of the employee',
          },
          branchId: {
            type: 'string',
            description: 'ID of the branch the employee belongs to',
          },
        },
        required: ['id', 'name', 'position', 'department', 'email', 'phone', 'branchId'],
      },
      EmployeeCreate: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Name of the employee',
          },
          position: {
            type: 'string',
            description: 'Position of the employee',
          },
          department: {
            type: 'string',
            description: 'Department of the employee',
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'Email of the employee',
          },
          phone: {
            type: 'string',
            description: 'Phone number of the employee',
          },
          branchId: {
            type: 'string',
            description: 'ID of the branch the employee belongs to',
          },
        },
        required: ['name', 'position', 'department', 'email', 'phone', 'branchId'],
      },
      EmployeeUpdate: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Name of the employee',
          },
          position: {
            type: 'string',
            description: 'Position of the employee',
          },
          department: {
            type: 'string',
            description: 'Department of the employee',
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'Email of the employee',
          },
          phone: {
            type: 'string',
            description: 'Phone number of the employee',
          },
          branchId: {
            type: 'string',
            description: 'ID of the branch the employee belongs to',
          },
        },
      },
      Error: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            description: 'Status of the response',
          },
          error: {
            type: 'string',
            description: 'Error message',
          },
          message: {
            type: 'string',
            description: 'Additional message',
          },
          code: {
            type: 'string',
            description: 'Error code',
          },
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['src/api/v1/routes/*.ts'], // Paths to files containing OpenAPI definitions
};

export const generateSwaggerSpec = () => swaggerJSDoc(options);
