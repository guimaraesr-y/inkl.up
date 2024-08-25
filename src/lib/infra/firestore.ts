import { db } from "./firebase";
import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, setDoc, query, where, Query, DocumentData, orderBy, startAfter, limit, WhereFilterOp } from "firebase/firestore";

export default class FirestoreService {
    async getCollection(collectionName: string) {
        const snapshot = await getDocs(collection(db, collectionName));
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    };

    async getDocument(collectionName: string, id: string): Promise<any> {
        const docRef = doc(db, collectionName, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            return null;
        }
    };

    async getDocumentsByField(collectionName: string, fieldName: string, value: any): Promise<any> {
        const q = query(collection(db, collectionName), where(fieldName, "==", value));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    async getDocumentsByMultipleFields(collectionName: string, criteria: Array<{ field: string, operator: WhereFilterOp, value: any }>) {
        let q: Query<DocumentData> = collection(db, collectionName);
        criteria.forEach(criterion => {
            q = query(q, where(criterion.field, criterion.operator, criterion.value));
        });
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    async addDocument(collectionName: string, data: any) {
        const docRef = await addDoc(collection(db, collectionName), data);
        return docRef.id;
    };

    async setDocument(collectionName: string, id: string, data: any) {
        const docRef = doc(db, collectionName, id);
        await setDoc(docRef, data);
        return docRef.id
    };

    async updateDocument(collectionName: string, id: string, data: any) {
        const docRef = doc(db, collectionName, id);
        await updateDoc(docRef, data);
    };

    async deleteDocument(collectionName: string, id: string) {
        const docRef = doc(db, collectionName, id);
        await deleteDoc(docRef);
    };
}
