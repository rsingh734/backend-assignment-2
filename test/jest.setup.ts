// test/jest.setup.ts

// Apply the mock at the top
jest.mock("../../config/firebaseConfig", () => ({
  db,
  auth
}));

// Mock data storage
let mockData: { [collection: string]: { [id: string]: any } } = {
  branches: {
    '1': {
      id: '1',
      name: "Vancouver Branch",
      address: "1300 Burrard St, Vancouver, BC, V6Z 2C7",
      phone: "604-456-0022",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  },
  employees: {
    '1': {
      id: '1',
      name: "Test Employee",
      email: "test@example.com",
      phone: "555-123-9999",
      position: "Test Position",
      department: "Test Department",
      branchId: "1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  }
};

// Create mock functions for Firestore operations
const mockDoc = (collectionName: string, id: string) => ({
  get: () => {
    const data = mockData[collectionName]?.[id];
    return Promise.resolve({
      exists: !!data,
      data: () => data || null
    });
  },
  set: (data: any) => {
    if (!mockData[collectionName]) mockData[collectionName] = {};
    mockData[collectionName][id] = { ...data, id, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    return Promise.resolve();
  },
  update: (data: any) => {
    if (mockData[collectionName]?.[id]) {
      mockData[collectionName][id] = { ...mockData[collectionName][id], ...data, updatedAt: new Date().toISOString() };
      return Promise.resolve();
    }
    throw new Error('Document does not exist');
  },
  delete: () => {
    if (mockData[collectionName]?.[id]) {
      delete mockData[collectionName][id];
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }
});

const mockCollection = jest.fn((collectionName: string) => ({
  doc: (id: string) => mockDoc(collectionName, id),
  add: (data: any) => {
    const id = 'mock-new-id';
    if (!mockData[collectionName]) mockData[collectionName] = {};
    mockData[collectionName][id] = { ...data, id, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    return Promise.resolve({
      id,
      get: () => Promise.resolve({
        exists: true,
        data: () => mockData[collectionName][id]
      })
    });
  },
  get: () => {
    const docs = Object.values(mockData[collectionName] || {}).map(item => ({
      id: item.id,
      data: () => item
    }));
    return Promise.resolve({
      empty: docs.length === 0,
      docs
    });
  }
}));

// Main db mock object
const db = {
  collection: mockCollection
};

const auth = {};

// Export the mocks for potential use in individual tests
export { db, auth, mockCollection, mockDoc };

// Reset mocks and data between tests
afterEach(() => {
  jest.clearAllMocks();
  // Reset mock data to initial state
  mockData = {
    branches: {
      '1': {
        id: '1',
        name: "Vancouver Branch",
        address: "1300 Burrard St, Vancouver, BC, V6Z 2C7",
        phone: "604-456-0022",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    },
    employees: {
      '1': {
        id: '1',
        name: "Test Employee",
        email: "test@example.com",
        phone: "555-123-9999",
        position: "Test Position",
        department: "Test Department",
        branchId: "1",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    }
  };
});