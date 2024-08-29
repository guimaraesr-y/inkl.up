import { FireStorageService } from "../infra/storage";

export class HandleStorageService {

    private readonly storageService: FireStorageService;

    constructor(storageService: FireStorageService = new FireStorageService()) {
        this.storageService = storageService;
    }

    public async uploadFile(file: File) {
        if (!file) return null;

        const newFile = await this.renameFile(file);
        const downloadURL = await this.storageService.uploadFile(newFile!);

        return downloadURL;
    }

    public async deleteFile(downloadURL: string) {
        if (!downloadURL) return null;
        await this.storageService.deleteFile(downloadURL);
    }


    private getUUID() {
        const hash = crypto.randomUUID();
        return hash;
    }

    private async renameFile(file: File) {
        if (!file) return null;

        const newFileName = this.getUUID();
        const newFile = new File([file], newFileName, { type: file.type });

        return newFile;
    }

}

