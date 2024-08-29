import Link from "./Link";

export interface CreateLinkDto extends Omit<Link, 'id' | 'imageUrl'> {
    imageUrl?: string
    image?: File
}

export interface UpdateLinkDto extends Partial<Link> {
    id: string
}