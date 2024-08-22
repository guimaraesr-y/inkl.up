"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { app } from "@/lib/firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import { useUser } from "@/hooks/user/useUser";
import User from "@/lib/user/User";

export default function Login() {
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

    const [error, setError] = useState("");
    const router = useRouter();

    async function authenticate() {
        setError("");

        try {
            const result = await signInWithPopup(auth, provider);
            const idToken = await result.user.getIdToken();

            if(!(await getUser(result.user.uid))) {
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

            router.push("/");
        } catch (e) {
            setError((e as Error).message);
            console.error(e)
        }
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-8">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Faça Login!
                    </h1>
                    <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
                    
                    {error && (
                            <div
                                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                                role="alert"
                            >
                                <span className="block sm:inline">{error}</span>
                            </div>
                    )}

                    <button
                        type="submit"
                        className="w-full flex items-center gap-4 text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-primary-800"
                        onClick={() => authenticate()}
                    >
                        <Image src="/icons/google.png" alt="Google Logo" width={28} height={28} />
                        Login com o Google
                    </button>
                </div>
            </div>
        </main>
    );
}