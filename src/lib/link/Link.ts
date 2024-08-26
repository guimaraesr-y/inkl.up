class Link {
    id: string;
    userId: string;
    url: string;
    title: string;
    imageUrl: string;

    constructor(
        id: string,
        userId: string,
        url: string,
        title: string,
        imageUrl: string,
    ) {
        this.id = id;
        this.userId = userId;
        this.url = url;
        this.title = title;
        this.imageUrl = imageUrl;
    }
}

export default Link;