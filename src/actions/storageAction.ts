'use server';

import { HandleStorageService } from "@/lib/storage/StorageService";

export const uploadFile = async (file: File) => {
    const storageService = new HandleStorageService();
    const downloadURL = await storageService.uploadFile(file);
    return downloadURL || undefined;
};

export const deleteFile = async (downloadURL: string) => {
    const storageService = new HandleStorageService();
    await storageService.deleteFile(downloadURL);
};
