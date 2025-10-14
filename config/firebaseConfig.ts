import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import serviceAccount from '../serviceAccountKey.json';

let db: any;

// For non-test environments, try to initialize with service account
if (process.env.NODE_ENV !== 'test') {
  try {
    // Initialize Firebase Admin
    initializeApp({
      credential: cert(serviceAccount as ServiceAccount),
    });

    // Initialize Firestore
    db = getFirestore();

    // Optional: Add error handling
    db.settings({
      ignoreUndefinedProperties: true,
    });
  } catch (error) {
    console.log('Firebase initialization failed');
    // Create empty mock objects as fallback
    db = {} as any;
  }
} else {
  // For test environment, use proper mock objects
  const mockCollection = jest.fn((collectionName: string) => {
    const mockDoc = jest.fn((id: string) => ({
      get: jest.fn(() => Promise.resolve({
        exists: id !== '999',
        data: () => ({
          id,
          ...(collectionName === 'branches' ? {
            name: "Vancouver Branch",
            address: "1300 Burrard St, Vancouver, BC, V6Z 2C7",
            phone: "604-456-0022"
          } : {
            name: "Test Employee",
            email: "test@example.com",
            phone: "555-123-9999",
            position: "Test Position",
            department: "Test Department",
            branchId: "1"
          })
        })
      })),
      set: jest.fn(() => Promise.resolve()),
      update: jest.fn(() => Promise.resolve()),
      delete: jest.fn(() => Promise.resolve())
    }));

    const mockAdd = jest.fn((data: any) => Promise.resolve({
      id: 'mock-new-id',
      get: () => Promise.resolve({
        exists: true,
        data: () => ({ id: 'mock-new-id', ...data })
      })
    }));

    const mockGet = jest.fn(() => Promise.resolve({
      empty: false,
      docs: [{
        id: '1',
        data: () => ({
          id: '1',
          ...(collectionName === 'branches' ? {
            name: "Vancouver Branch",
            address: "1300 Burrard St, Vancouver, BC, V6Z 2C7",
            phone: "604-456-0022"
          } : {
            name: "Test Employee",
            email: "test@example.com",
            phone: "555-123-9999",
            position: "Test Position",
            department: "Test Department",
            branchId: "1"
          })
        })
      }]
    }));

    return {
      doc: mockDoc,
      add: mockAdd,
      get: mockGet
    };
  });

  db = {
    collection: mockCollection
  };
}

export { db };
