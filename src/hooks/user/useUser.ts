// hooks/useUser.ts
import User from "@/lib/user/User";
import * as userActions from "@/actions/userActions";
import { useState } from "react";

export function useUser() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createUser = async (user: User) => {
        setLoading(true);
        setError(null);
        
        try {
            const userId = await userActions.createUser(user);
            setLoading(false);
            return userId;
        } catch (e) {
            setError("Failed to create user");
            setLoading(false);
            throw e;
        }
    };

    const getUser = async (userId: string): Promise<User | null> => {
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
    };

    const updateUser = async (userId: string, user: Partial<User>) => {
        setLoading(true);
        setError(null);
        
        try {
            await userActions.updateUser(userId, user);
            setLoading(false);
        } catch (e) {
            setError("Failed to update user");
            setLoading(false);
            throw e;
        }
    };

    return { createUser, getUser, updateUser, loading, error };
}
