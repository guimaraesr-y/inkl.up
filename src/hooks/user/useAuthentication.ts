import { useState, useEffect } from "react";
import { getUserById } from "../../actions/userActions";
import User from "@/lib/user/User";
import { getTokens } from "next-firebase-auth-edge";
import { clientConfig, serverConfig } from "@/config";
import { cookies } from "next/headers";
import { getAuthenticatedUser } from "@/actions/authenticationActions";

export const useAuthentication = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        getAuthenticatedUser()
            .then(user => {
                setUser(user);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [])

    return {
        user,
        loading,
    };
};
