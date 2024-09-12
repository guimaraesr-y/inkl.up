import FirestoreService from "../infra/firestore";
import arrayMoveImmutable from "array-move";
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
        if(!link.imageUrl) {
            delete link.imageUrl;
        }

        // find last inserted user link 
        const lastLink = await this.firestoreService.getDocumentsByMultipleFields(this.collectionName, [
            { field: "userId", operator: "==", value: link.userId },
            { field: "nextLinkId", operator: "==", value: "undefined" }
        ])
        
        const id = await this.firestoreService.addDocument(this.collectionName, link);

        this.updateLink({
            id: lastLink[0].id,
            nextLinkId: id
        })
        
        return {
            id: id,
            ...link
        } as Link;
    }
    
    updateLink(link: UpdateLinkDto) {
        if(!link.id) {
            throw new Error("Link id is required");
        }

        if(!link.imageUrl) {
            delete link.imageUrl;
        }

        return this.firestoreService.updateDocument(this.collectionName, link.id, link);
    }

    async deleteLink(id: string) {
        const link = await this.getLinkById(id);
        const linkBefore = await this.firestoreService.getDocumentsByField(this.collectionName, "nextLinkId", id) as Link[];
        
        // remove link from queue
        if(linkBefore.length > 0) {
            linkBefore[0].nextLinkId = link?.nextLinkId || 'undefined';
            this.updateLink(linkBefore[0]);
        }

        return this.firestoreService.deleteDocument(this.collectionName, id);
    }

    moveLink(links: Link[], oldIndex: number, newIndex: number) {
        const lastBefore = links[oldIndex - 1];
        const lastAfter = links[oldIndex + 1];
            
        // remove the moved link from the queue
        if(lastBefore) {
            lastBefore.nextLinkId = lastAfter?.id || 'undefined';
            this.updateLink(lastBefore);
        }

        // move link to new position
        const arr = arrayMoveImmutable(links, oldIndex, newIndex);

        const current = arr[newIndex];
        const before = arr[newIndex - 1];
        const after = arr[newIndex + 1];

        if (before) {
            before.nextLinkId = current.id;
            this.updateLink(before);
        }

        current.nextLinkId = after?.id || 'undefined';
        this.updateLink(current);

        return arr;
    }

    orderLinks(links: Link[]) {
        const orderedLinks: Link[] = [];

        const firstLink = links.find(link => 
            !links.some(p => p.nextLinkId === link.id)
        );

        if(!firstLink) {
            return links;
        }

        let currentLink: Link | undefined = firstLink;

        while(currentLink) {
            orderedLinks.push(currentLink);
            currentLink = links.find(link => link.id === currentLink!.nextLinkId);
        }

        return orderedLinks;
    }

}
