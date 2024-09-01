// hooks/useUser.ts
import User from "@/lib/user/User";
import * as userActions from "@/actions/userActions";
import { useCallback, useState } from "react";
import { UpdateUserDto } from "@/lib/user/interfaces";

export function useUser() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createUser = useCallback(async (user: User) => {
        setLoading(true);
        setError(null);

        user.username = user.email?.split("@")[0].toLowerCase() || user.id;
        
        try {
            const userId = await userActions.createUser(user);
            setLoading(false);
            return userId;
        } catch (e) {
            setError("Failed to create user");
            setLoading(false);
            throw e;
        }
    }, [setLoading, setError]);

    const getUser = useCallback(async (userId: string): Promise<User | null> => {
        setLoading(true);
        setError(null);
        
        try {
            const user = await userActions.getUserById(userId);
            setLoading(false);
            return user;
        } catch (e) {
            setError("Failed to fetch user");
            setLoading(false);
            return null;
        }
    }, [setLoading, setError]);

    const updateUser = useCallback(async (user: UpdateUserDto) => {
        setLoading(true);
        setError(null);
        
        try {
            await userActions.updateUser(user);
            setLoading(false);
        } catch (e) {
            setError("Failed to update user");
            setLoading(false);
            throw e;
        }
    }, [setLoading, setError]);

    return { createUser, getUser, updateUser, loading, error };
}
