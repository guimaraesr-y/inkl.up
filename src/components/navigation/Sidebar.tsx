'use client';

import { app } from "@/lib/infra/firebase";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FaPlus, FaBrush, FaRulerCombined } from "react-icons/fa6";

export default function Sidebar() {
    const router = useRouter();

    async function handleLogout() {
        await signOut(getAuth(app));

        await fetch("/api/logout");

        router.push("/login");
    }

    return (
        <div className="h-screen w-64 bg-gray-800 text-white flex flex-col justify-between shadow-lg">
            <div className="flex flex-col">
                <div className="p-6 text-2xl font-bold tracking-wide text-center border-b border-gray-700">
                    Inkl.Up
                </div>

                <nav className="mt-6 flex flex-col gap-4 px-4">
                    <a
                        href="/dashboard"
                        className="flex items-center px-4 py-2 text-lg font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
                    >
                        <FaPlus className="w-6 h-6 mr-3" />
                        Meus Links
                    </a>

                    <a
                        href="/dasboard/styles"
                        className="flex items-center px-4 py-2 text-lg font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
                    >
                        <FaBrush className="w-6 h-6 mr-3" />
                        Estilos
                    </a>

                    <a
                        href="/dasboard/metrics"
                        className="flex items-center px-4 py-2 text-lg font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
                    >
                        <FaRulerCombined className="w-6 h-6 mr-3" />
                        Métricas
                    </a>
                </nav>
            </div>

            <div className="p-4 border-t border-gray-700">
                <button onClick={handleLogout} className="w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-md text-lg font-medium">
                    Sair
                </button>
            </div>
        </div>
    );
}
