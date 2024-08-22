import FirestoreService from "@/lib/firestore";
import User from "./User";

export class UserService {

    private readonly collectionName = "Users";
    private readonly firestoreService: FirestoreService;

    constructor(firestoreService: FirestoreService = new FirestoreService()) {
        this.firestoreService = firestoreService;
    }

    public async getUsers(): Promise<User[]> {
        return await this.firestoreService.getCollection(this.collectionName) as User[];
    }

    public async getUserById(id: string): Promise<User | null> {
        return await this.firestoreService.getDocument(this.collectionName, id) as User | null;
    }

    public async createUser(user: Omit<User, 'id'>): Promise<string> {
        return await this.firestoreService.addDocument(this.collectionName, user);
    }

    public async updateUser(id: string, user: Partial<User>): Promise<void> {
        await this.firestoreService.updateDocument(this.collectionName, id, user);
    }

}

