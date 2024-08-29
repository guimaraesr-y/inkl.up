import { ref, uploadBytes, getDownloadURL, deleteObject, StorageReference } from 'firebase/storage';
import { storage } from './firebase';

export class FireStorageService {

    private storageRef: StorageReference;

    constructor() {
        this.storageRef = ref(storage, '/uploads');
    }

    public async uploadFile(file: File) {
        if (!file) return null;

        const snapshot = await uploadBytes(this.storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);

        return downloadURL;
    }

    public async deleteFile(filePath: string) {
        const fileRef = ref(storage, filePath);
        await deleteObject(fileRef);
    }

}

