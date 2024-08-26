'use server';

import { CreateLinkDto, UpdateLinkDto } from '@/lib/link/interfaces';
import Link from '@/lib/link/Link';
import { LinkService } from '@/lib/link/LinkService';

const linkService = new LinkService();


export const getLinks = async (linkId: string) => {
    return await linkService.getLinks(linkId);
};

export const getLinkById = async (id: string) => {
    return await linkService.getLinkById(id);
};

export const createLink = async (link: CreateLinkDto) => {
    const id = await linkService.createLink(link);
    return id;
};

export const updateLink = async (link: UpdateLinkDto) => {
    await linkService.updateLink(link);
};

export const deleteLink = async (id: string) => {
    await linkService.deleteLink(id);
}