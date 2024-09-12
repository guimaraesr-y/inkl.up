'use server';

import { CreateLinkDto, UpdateLinkDto } from '@/lib/link/interfaces';
import { LinkService } from '@/lib/link/LinkService';
import { getAuthenticatedUser } from './authenticationActions';
import Unauthorized from '@/errors/Unauthorized';
import { deleteFile, uploadFile } from './storageAction';
import AppError from '@/errors/AppError';
import { HandleStorageService } from '@/lib/storage/StorageService';
import Link from '@/lib/link/Link';

const linkService = new LinkService();
const storageService = new HandleStorageService();

export const getLinks = async (linkId: string) => {
    return linkService.orderLinks(await linkService.getLinks(linkId));
};

export const getLinkById = async (id: string) => {
    return await linkService.getLinkById(id);
};

export const createLink = async (link: FormData) => {
    const user = await getAuthenticatedUser();
    const userId = link.get('userId') as string;

    if(user?.id !== userId) {
        throw new Unauthorized();
    }

    const url = link.get('url') as string;
    const title = link.get('title') as string;
    const image = link.get('image') as File;

    // validate if file is an image
    if (image && !image.type.startsWith('image/')) {
        throw new AppError('O arquivo deve ser uma imagem.', 400);
    }

    const imageUrl = image ? await uploadFile(image) : undefined;
    
    const newLink = await linkService.createLink({
        userId,
        url,
        title,
        imageUrl,
    } as CreateLinkDto);

    return newLink;
};

export const updateLink = async (link: FormData) => {
    const user = await getAuthenticatedUser();
    const userId = link.get('userId') as string;

    if(user?.id !== userId) {
        throw new Unauthorized();
    }

    const id = link.get('id') as string;
    const nextLinkId = link.get('nextLinkId') as string;
    const url = link.get('url') as string;
    const title = link.get('title') as string;
    const image = link.get('image') as File;

    // validate if file is an image
    if (image && !image.type.startsWith('image/')) {
        throw new AppError('O arquivo deve ser uma imagem.', 400);
    }
    
    let imageUrl;

    if (image) {
        const oldLink = await getLinkById(id);

        if (!oldLink) {
            throw new AppError('Link não encontrado', 404);
        }

        if(oldLink.imageUrl) {
            storageService.deleteFile(oldLink.imageUrl);
        }

        imageUrl = await uploadFile(image);
    }

    const newLink: UpdateLinkDto = {
        id,
        userId,
        nextLinkId,
        url,
        title,
        imageUrl,
    };

    await linkService.updateLink(newLink);
    return newLink as Link;
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

    // delete associated image
    deleteFile(link.imageUrl);

    await linkService.deleteLink(id);
}

export const moveLink = async (links: Link[], oldIndex: number, newIndex: number) => {
    return linkService.moveLink(links, oldIndex, newIndex);
}