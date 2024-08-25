'use server';

import Link from '@/lib/link/Link';
import { LinkService } from '@/lib/link/LinkService';

const linkService = new LinkService();


export const getLinks = async (linkId: string) => {
    return await linkService.getLinks(linkId);
};

export const getLinkById = async (id: string) => {
    return await linkService.getLinkById(id);
};

export const createLink = async (link: Link) => {
    const id = await linkService.createLink(link);
    return id;
};

export const updateLink = async (id: string, link: Partial<Link>) => {
    await linkService.updateLink(id, link);
};
