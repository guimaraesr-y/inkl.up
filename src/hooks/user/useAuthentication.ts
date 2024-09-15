import { useState, useEffect } from "react";
import User from "@/lib/user/User";
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
