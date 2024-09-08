import FirestoreService from "@/lib/infra/firestore";
import User from "./User";
import { CreateUserDto, UpdateUserDto } from "./interfaces";

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

    public async getUserByUsername(username: string): Promise<User | null> {
        return (await this.firestoreService.getDocumentsByField(this.collectionName, "username", username))[0] as User | null;
    }

    public async createUser(user: CreateUserDto): Promise<string> {
        return await this.firestoreService.setDocument(this.collectionName, user.id, user);
    }

    public async updateUser(user: UpdateUserDto): Promise<void> {
        await this.firestoreService.updateDocument(this.collectionName, user.id, user);
    }

}

