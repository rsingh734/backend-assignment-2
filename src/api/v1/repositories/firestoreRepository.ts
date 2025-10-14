import { db } from "../../../../config/firebaseConfig";

export const createDocument = async <T>(
  collection: string,
  data: Omit<T, "id">
): Promise<T> => {
  try {
    const docRef = await db.collection(collection).add({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    const doc = await docRef.get();
    return {
      id: docRef.id,
      ...doc.data(),
    } as T;
  } catch (error) {
    throw new Error(`Failed to create document in ${collection}: ${error}`);
  }
};

export const getDocuments = async <T>(collection: string): Promise<T[]> => {
  try {
    const snapshot = await db.collection(collection).get();
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as T[];
  } catch (error) {
    throw new Error(`Failed to get documents from ${collection}: ${error}`);
  }
};

export const getDocumentById = async <T>(
  collection: string,
  id: string
): Promise<T | null> => {
  try {
    const doc = await db.collection(collection).doc(id).get();
    
    if (!doc.exists) {
      return null;
    }
    
    return {
      id: doc.id,
      ...doc.data(),
    } as T;
  } catch (error) {
    throw new Error(`Failed to get document from ${collection}: ${error}`);
  }
};

export const updateDocument = async <T>(
  collection: string,
  id: string,
  data: Partial<T>
): Promise<T | null> => {
  try {
    const docRef = db.collection(collection).doc(id);
    
    await docRef.update({
      ...data,
      updatedAt: new Date(),
    });
    
    const updatedDoc = await docRef.get();
    
    if (!updatedDoc.exists) {
      return null;
    }
    
    return {
      id: updatedDoc.id,
      ...updatedDoc.data(),
    } as T;
  } catch (error) {
    throw new Error(`Failed to update document in ${collection}: ${error}`);
  }
};

export const deleteDocument = async (
  collection: string,
  id: string
): Promise<boolean> => {
  try {
    const docRef = db.collection(collection).doc(id);
    const doc = await docRef.get();
    
    if (!doc.exists) {
      return false;
    }
    
    await docRef.delete();
    return true;
  } catch (error) {
    throw new Error(`Failed to delete document from ${collection}: ${error}`);
  }
};