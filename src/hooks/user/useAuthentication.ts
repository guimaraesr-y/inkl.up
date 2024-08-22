import { useState, useEffect } from "react";
import { getUserById } from "../../actions/userActions";
import User from "@/lib/user/User";
import { getTokens } from "next-firebase-auth-edge";
import { clientConfig, serverConfig } from "@/config";
import { cookies } from "next/headers";

export const useAuthentication = (id: string) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        getTokens(cookies(), {
            apiKey: clientConfig.apiKey,
            cookieName: serverConfig.cookieName,
            cookieSignatureKeys: serverConfig.cookieSignatureKeys,
            serviceAccount: serverConfig.serviceAccount,
        })
            .then(async (tokens) => {
                if (tokens) {
                    setUser(await getUserById(tokens.decodedToken.uid));
                }
            })
            .catch((error) => {
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
