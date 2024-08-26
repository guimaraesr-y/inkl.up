import Link from "./Link";

export interface CreateLinkDto extends Omit<Link, 'id'> {}

export interface UpdateLinkDto extends Partial<Link> {
    id: string
}