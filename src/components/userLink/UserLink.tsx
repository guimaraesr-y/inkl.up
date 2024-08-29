'use client';

import Image from "next/image"
import Link from "next/link"
import { MouseEvent, useState } from "react"
import { FaPencil, FaTrash } from "react-icons/fa6"
import Modal from "../modal/Modal";
import { UpdateLinkDto } from "@/lib/link/interfaces";

interface UserLinkProps {
    id: string
    href: string
    title: string
    imageUrl?: string
    editMode?: boolean
    onDelete?: (id: string) => Promise<any>
    onUpdate?: (link: UpdateLinkDto) => Promise<any>
    loading?: boolean
}

const UserLink = ({ 
    id, 
    href, 
    title,
    imageUrl,
    onDelete,
    onUpdate,
    loading,
    editMode = false 
}: UserLinkProps) => {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [message, setMessage] = useState('');

    const handleDelete = async (e: MouseEvent<any>) => {
        setMessage('');
        e.stopPropagation();
        e.preventDefault();

        setOpenDeleteModal(true);
    }

    const confirmedDelete = async (id: string) => {
        if (!onDelete) return;

        onDelete(id)
            .then(() => setMessage("Link deletado com sucesso!"))
            .catch(() => setMessage("Ocorreu um erro ao deletar o link"))
            .finally(() => setInterval(() => {
                setOpenDeleteModal(false);
                setMessage('');
            }, 1000));
    }

    const handleUpdate = async (e: MouseEvent<any>) => {
        if(!onUpdate) return;

        e.stopPropagation();
        e.preventDefault();
        
        // TODO: implement
    }

    return (
        <>
            <Link href={editMode ? "#" : href} className="group w-full flex flex-col items-center gap-2 p-4 border border-border rounded-lg hover:bg-primary">
                {/* Image div */}
                {imageUrl !== undefined && (
                    <div className="w-full h-auto">
                        <Image 
                            src={imageUrl} 
                            width={0} 
                            height={0} 
                            sizes="100vw" 
                            alt={title} 
                            className="w-full" 
                        />
                    </div>
                )}

                {/* Text div */}
                <div className="w-full text-center relative">
                    <span className="font-semibold">{title}</span>
                    {editMode && (
                        <div className="flex gap-4 opacity-0 group-hover:opacity-100 absolute top-[50%] right-2 translate-y-[-50%] transition">
                            <FaTrash onClick={handleDelete} className="text-red-500 hover:text-red-700" />
                            <FaPencil onClick={handleUpdate} className="text-blue-500 hover:text-blue-700" />
                        </div>
                    )}
                </div>
            </Link>

            {openDeleteModal && (
                <Modal
                    isOpen={openDeleteModal}
                    onClose={() => setOpenDeleteModal(false)}
                    title="Deseja deletar o link?"
                >
                    <p className="text-center">Você tem certeza que deseja deletar &quot;{title}&quot;?<br/>(Essa ação não pode ser desfeita.)</p>

                    {message && <p className="text-center text-red-500">{message}</p>}
                    {loading && <p className="text-center">Aguarde...</p>}

                    <div className="flex justify-center gap-4 mt-4">
                        <button
                            onClick={() => setOpenDeleteModal(false)}
                            className="border-2 border-primary text-primary py-2 px-4 rounded-lg"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={() => confirmedDelete(id)}
                            className="bg-red-500 text-white py-2 px-4 rounded-lg"
                        >
                            Deletar
                        </button>
                    </div>
                </Modal>
            )}
        </>
    )
}

export default UserLink;