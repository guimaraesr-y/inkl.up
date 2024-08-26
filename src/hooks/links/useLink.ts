// hooks/useUser.ts
import Link from "@/lib/link/Link";
import * as linkAction from "@/actions/linkAction";
import { useState, useCallback } from "react";
import { CreateLinkDto, UpdateLinkDto } from "@/lib/link/interfaces";

export function useLink() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createLink = useCallback(async (link: CreateLinkDto) => {
        setLoading(true);
        setError(null);
        
        try {
            const linkId = await linkAction.createLink(link);
            setLoading(false);
            return linkId;
        } catch (e) {
            setError("Failed to create link");
            setLoading(false);
            throw e;
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

    const updateLink = useCallback(async (link: UpdateLinkDto) => {
        setLoading(true);
        setError(null);
        
        try {
            await linkAction.updateLink(link);
            setLoading(false);
        } catch (e) {
            setError("Failed to update link");
            setLoading(false);
            throw e;
        }
    }, [setLoading, setError]);

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

    return { 
        createLink, 
        getLinks, 
        getLinkById,
        updateLink, 
        deleteLink,
        loading, 
        error 
    };
}


