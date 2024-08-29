import { ref, uploadBytes, getDownloadURL, deleteObject, StorageReference } from 'firebase/storage';
import { storage } from './firebase';

export class FireStorageService {

    private getStorageRef(filename: string) {
        return ref(storage, `/uploads/${filename}`);
    }

    public async uploadFile(file: File) {
        if (!file) return null;

        const ref = this.getStorageRef(file.name);
        const snapshot = await uploadBytes(ref, file);
        const downloadURL = await getDownloadURL(snapshot.ref);

        return downloadURL;
    }

    public async deleteFile(filePath: string) {
        const fileRef = ref(storage, filePath);
        await deleteObject(fileRef);
    }

}
