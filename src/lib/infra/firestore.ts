import { db } from "./firebase";
import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, setDoc } from "firebase/firestore";

export default class FirestoreService {
    async getCollection(collectionName: string) {
        const snapshot = await getDocs(collection(db, collectionName));
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    };

    async getDocument(collectionName: string, id: string) {
        const docRef = doc(db, collectionName, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            return null;
        }
    };

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
