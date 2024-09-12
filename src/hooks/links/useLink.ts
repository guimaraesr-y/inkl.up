// hooks/useUser.ts
import Link from "@/lib/link/Link";
import * as linkAction from "@/actions/linkAction";
import { useState, useCallback } from "react";
import { UpdateLinkDto } from "@/lib/link/interfaces";
import AppError from "@/errors/AppError";

export function useLink() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createLink = useCallback(async (formData: FormData) => {
        setLoading(true);
        setError(null);
        
        try {
            const linkId = await linkAction.createLink(formData);
            setLoading(false);
            return linkId;
        } catch (e: any) {
            if(e instanceof AppError) {
                setError(e.message);
                setLoading(false);
            } else {
                setError("Erro inesperado ao criar link.");
                setLoading(false);
            }
        }
    }, [setLoading, setError]);

    const getLinks = useCallback(async (userId: string): Promise<Link[] | []> => {
        setLoading(true);
        setError(null);
        
        try {
            const links = await linkAction.getLinks(userId);
            setLoading(false);
            return links;
        } catch (e) {
            setError("Failed to fetch link");
            setLoading(false);
            return [];
        }
    }, [setLoading, setError]);

    const getLinkById = useCallback(async (linkId: string): Promise<Link | null> => {
        setLoading(true);
        setError(null);
        
        try {
            const link = await linkAction.getLinkById(linkId);
            setLoading(false);
            return link;
        } catch (e) {
            setError("Failed to fetch link");
            setLoading(false);
            return null;
        }
    }, [setLoading, setError]);

    const updateLink = useCallback(async (formData: FormData): Promise<Link> => {
        setLoading(true);
        setError(null);
        
        try {
            const link = await linkAction.updateLink(formData);
            setLoading(false);
            return link;
        } catch (e: any) {
            if(e instanceof AppError) {
                setError(e.message);
                setLoading(false);
            } else {
                setError("Erro inesperado ao criar link.");
                setLoading(false);
            }
            throw e;
        }
    }, [setLoading, setError]);

    const updateLinkByModel = useCallback(async (link: UpdateLinkDto) => {
        const formData = new FormData();

        for (const [key, value] of Object.entries(link)) {
            formData.append(key, value);
        }

        return updateLink(formData);
    }, [updateLink])

    const deleteLink = useCallback(async (linkId: string) => {
        setLoading(true);
        setError(null);
        
        try {
            await linkAction.deleteLink(linkId);
            setLoading(false);
        } catch (e) {
            setError("Failed to delete link");
            setLoading(false);
            throw e;
        }
    }, [setLoading, setError]);

    const moveLink = useCallback(async (links: Link[], oldIndex: number, newIndex: number) => {
        return linkAction.moveLink(links, oldIndex, newIndex);
    }, []);

    return { 
        createLink, 
        getLinks, 
        getLinkById,
        updateLink, 
        updateLinkByModel,
        deleteLink,
        moveLink,
        loading, 
        error 
    };
}
