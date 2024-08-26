import FirestoreService from "../infra/firestore";
import { CreateLinkDto, UpdateLinkDto } from "./interfaces";
import Link from "./Link";

export class LinkService {

    private readonly collectionName = "Links";
    private readonly firestoreService: FirestoreService;

    constructor(firestoreService: FirestoreService = new FirestoreService()) {
        this.firestoreService = firestoreService;
    }

    async getLinks(userId: string) {
        return await this.firestoreService.getDocumentsByField(this.collectionName, "userId", userId) as Link[] | [];
    }
    
    async getLinkById(id: string) {
        return await this.firestoreService.getDocument(this.collectionName, id) as Link | null;
    }
    
    async createLink(link: CreateLinkDto) {
        const id = await this.firestoreService.addDocument(this.collectionName, link);
        
        return {
            id: id,
            ...link
        } as Link;
    }
    
    updateLink(link: UpdateLinkDto) {
        if(!link.id) {
            throw new Error("Link id is required");
        }

        return this.firestoreService.updateDocument(this.collectionName, link.id, link);
    }

    deleteLink(id: string) {
        return this.firestoreService.deleteDocument(this.collectionName, id);
    }

}
