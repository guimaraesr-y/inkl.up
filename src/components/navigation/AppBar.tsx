import Link from 'next/link';
import { FaPlus, FaBrush, FaRulerCombined } from "react-icons/fa6";

export default function AppBar() {
    return (
        <div className="px-8 fixed bottom-0 left-0 right-0 bg-gray-800/70 backdrop-blur-md text-white shadow-lg z-50">
            <div className="flex justify-between items-center p-4">
                <Link href="/styles" className="flex flex-col items-center justify-center">
                    <FaBrush className="h-6 w-6 mb-1" />
                    <span className="text-sm">Estilos</span>
                </Link>

                <Link href="/dashboard" className="flex flex-col items-center justify-center">
                    <FaPlus className="h-6 w-6 mb-1" />
                    <span className="text-sm">Meus Links</span>
                </Link>

                <Link href="/metrics" className="flex flex-col items-center justify-center">
                    <FaRulerCombined className="h-6 w-6 mb-1" />
                    <span className="text-sm">Métricas</span>
                </Link>
            </div>
        </div>
    );
}
