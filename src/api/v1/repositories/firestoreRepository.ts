import { db } from "../../../../config/firebaseConfig";

export const createDocument = async <T>(collectionName: string, data: Omit<T, 'id'>): Promise<T> => {
  try {
    if (!db) {
      throw new Error('Firestore database not initialized');
    }

    const docRef = await db.collection(collectionName).add({
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    const doc = await docRef.get();
    return {
      id: docRef.id,
      ...(doc.data() as any),
    } as T;
  } catch (error) {
    throw new Error(`Failed to create document: ${error}`);
  }
};

export const getDocuments = async <T>(collectionName: string): Promise<T[]> => {
  try {
    if (!db) {
      throw new Error('Firestore database not initialized');
    }

    const snapshot = await db.collection(collectionName).get();
    return snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    })) as T[];
  } catch (error) {
    throw new Error(`Failed to get documents: ${error}`);
  }
};

export const getDocumentById = async <T>(collectionName: string, id: string): Promise<T | null> => {
  try {
    if (!db) {
      throw new Error('Firestore database not initialized');
    }

    const doc = await db.collection(collectionName).doc(id).get();
    if (!doc.exists) {
      return null;
    }
    return {
      id: doc.id,
      ...(doc.data() as any),
    } as T;
  } catch (error) {
    throw new Error(`Failed to get document: ${error}`);
  }
};

export const updateDocument = async <T>(collectionName: string, id: string, data: Partial<T>): Promise<T | null> => {
  try {
    if (!db) {
      throw new Error('Firestore database not initialized');
    }

    const docRef = db.collection(collectionName).doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return null;
    }

    await docRef.update({
      ...data,
      updatedAt: new Date().toISOString(),
    });

    const updatedDoc = await docRef.get();
    return {
      id: updatedDoc.id,
      ...(updatedDoc.data() as any),
    } as T;
  } catch (error) {
    throw new Error(`Failed to update document: ${error}`);
  }
};

export const deleteDocument = async (collectionName: string, id: string): Promise<boolean> => {
  try {
    if (!db) {
      throw new Error('Firestore database not initialized');
    }
    
    const docRef = db.collection(collectionName).doc(id);
    const doc = await docRef.get();
    
    if (!doc.exists) {
      return false;
    }
    
    await docRef.delete();
    return true;
  } catch (error) {
    throw new Error(`Failed to delete document: ${error}`);
  }
};