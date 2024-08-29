'use server';

import { CreateLinkDto, UpdateLinkDto } from '@/lib/link/interfaces';
import { LinkService } from '@/lib/link/LinkService';
import { getAuthenticatedUser } from './authenticationActions';
import Unauthorized from '@/errors/Unauthorized';
import { uploadFile } from './storageAction';

const linkService = new LinkService();

export const getLinks = async (linkId: string) => {
    return await linkService.getLinks(linkId);
};

export const getLinkById = async (id: string) => {
    return await linkService.getLinkById(id);
};

export const createLink = async (link: FormData) => {
    const user = await getAuthenticatedUser();

    const url = link.get('url') as string;
    const title = link.get('title') as string;
    const image = link.get('image') as File;
    const userId = link.get('userId') as string;

    if(user?.id !== userId) {
        throw new Unauthorized();
    }

    const imageUrl = await uploadFile(image);
    
    const newLink = await linkService.createLink({
        userId,
        url,
        title,
        imageUrl,
    } as CreateLinkDto);

    return newLink;
};

export const updateLink = async (link: UpdateLinkDto) => {
    const user = await getAuthenticatedUser();

    if(user?.id !== link.userId) {
        throw new Unauthorized();
    }

    await linkService.updateLink(link);
};

export const deleteLink = async (id: string) => {
    const user = await getAuthenticatedUser();
    const link = await getLinkById(id);

    if(!link) {
        throw new Unauthorized('Link não encontrado');
    }

    if(user?.id !== link?.userId) {
        throw new Unauthorized();
    }

    await linkService.deleteLink(id);
}