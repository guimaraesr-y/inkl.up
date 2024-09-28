"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { app } from "@/lib/infra/firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useUser } from "@/hooks/user/useUser";
import { FaGoogle } from "react-icons/fa6";
import { useAuthentication } from "@/hooks/user/useAuthentication";

export default function GoogleLoginButton() {
    const [error, setError] = useState("");
    const router = useRouter();

    const { user } = useAuthentication();
    const { getUser, createUser } = useUser();

    console.log(app.name)
    const auth = getAuth();
    auth.useDeviceLanguage();
    
    const provider = new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');

    provider.setCustomParameters({
        'login_hint': 'user@example.com',
    });

    async function authenticate() {
        setError("");

        if(user) {
            router.push("/dashboard");
            return;
        }

        try {
            const result = await signInWithPopup(auth, provider);
            const idToken = await result.user.getIdToken();

            if (!(await getUser(result.user.uid))) {
                await createUser({
                    id: result.user.uid,
                    name: result.user.displayName || 'Desconhecido',
                    email: result.user.email || 'Desconhecido',
                    profilePicture: result.user.photoURL || undefined,
                });
            }

            await fetch("/api/login", {
                headers: {
                    Authorization: `Bearer ${idToken}`,
                },
            });

            router.push("/dashboard");
        } catch (e) {
            setError((e as Error).message);
            console.error(e)
        }
    }

    return (
        <button
            onClick={authenticate}
            className="flex items-center justify-center gap-3 bg-gradient-to-r from-white via-blue-100 to-white text-blue-600 font-semibold py-3 px-6 rounded-md shadow-lg hover:shadow-xl hover:bg-gradient-to-r hover:from-gray-200 hover:to-blue-200 transition-all duration-300 ease-in-out"
        >
            <FaGoogle className='w-5 h-5' />
            Entre com Google
        </button>
    );
}
