class Link {
    id: string;
    userId: string;
    url: string;
    title: string;
    imageUrl: string;
    tags: string[];
    createdAt: Date;

    constructor(
        id: string,
        userId: string,
        url: string,
        title: string,
        imageUrl: string,
        tags: string[],
        createdAt: Date
    ) {
        this.id = id;
        this.userId = userId;
        this.url = url;
        this.title = title;
        this.imageUrl = imageUrl;
        this.tags = tags;
        this.createdAt = createdAt;
    }
}

export default Link;