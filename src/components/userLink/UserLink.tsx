'use client';

import Image from "next/image"
import Link from "next/link"
import { MouseEvent, useState } from "react"
import { FaPencil, FaTrash } from "react-icons/fa6"
import Modal from "../modal/Modal";
import { isMobile } from "react-device-detect";
import Form, { Field } from "../form/Form";
import LinkModel from "@/lib/link/Link";

interface UserLinkProps {
    id: string
    link: LinkModel
    editMode?: boolean
    onDelete?: (id: string) => Promise<any>
    onUpdate?: (link: FormData) => Promise<LinkModel>
    loading?: boolean
}

const UserLink = ({ 
    id, 
    link,
    onDelete,
    onUpdate,
    loading,
    editMode = false 
}: UserLinkProps) => {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

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
            .catch(() => setErrorMessage("Ocorreu um erro ao deletar o link"))
            .finally(() => setTimeout(() => {
                setOpenDeleteModal(false);
                setMessage('');
            }, 1000));
    }

    const handleUpdate = async (formData: FormData) => {
        if(!onUpdate) return;
        formData.set('id', id);
        formData.set('userId', link.userId);

        onUpdate(formData)
            .then(() => setMessage("Link atualizado com sucesso!"))
            .catch(err => setErrorMessage(err.message))
            .finally(() => setTimeout(() => {
                setOpenEditModal(false);
                setMessage('');
            }, 1000));
    }

    const formFields: Field[] = [
        { id: 'title', label: 'Título', type: 'text', value: link.title, required: true },
        { id: 'url', label: 'Url', type: 'url', value: link.url, required: true },
        { id: 'image', label: 'Imagem', type: 'file', accept: 'image/*' },
    ]

    return (
        <>
            {/* Error modal */}
            <Modal title={"Ocorreu um erro!"} isOpen={Boolean(errorMessage)} onClose={() => setErrorMessage('')}>
                <p>{errorMessage}</p>
            </Modal>

            {/* Update Link modal */}
            <Modal isOpen={openEditModal} onClose={() => setOpenEditModal(false)} title="Atualizar link">
                <Form
                    fields={formFields}
                    onSubmit={formData => handleUpdate(formData)}
                    buttonText="Atualizar"
                ></Form>
            </Modal>

            <Link 
                href={editMode ? "#" : link.url} 
                className="group w-full flex flex-col items-center gap-2 p-4 border border-border rounded-lg hover:bg-primary"
                onClick={() => isMobile ? setOpenEditModal(true) : null} 
            >
                {/* Image div */}
                {link.imageUrl !== undefined && (
                    <div className="w-full h-auto">
                        <Image 
                            src={link.imageUrl} 
                            width={0} 
                            height={0} 
                            sizes="100vw" 
                            alt={link.title} 
                            className="w-full" 
                        />
                    </div>
                )}

                {/* Text div */}
                <div className="w-full text-center relative">
                    <span className="font-semibold">{link.title}</span>
                    {(editMode && !isMobile) && (
                        <div className="flex gap-4 opacity-0 group-hover:opacity-100 absolute top-[50%] right-2 translate-y-[-50%] transition">
                            <FaTrash onClick={handleDelete} className="text-red-500 hover:text-red-700" />
                            <FaPencil onClick={() => setOpenEditModal(true)} className="text-blue-500 hover:text-blue-700" />
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
                    <p className="text-center">Você tem certeza que deseja deletar &quot;{link.title}&quot;?<br/>(Essa ação não pode ser desfeita.)</p>

                    {message && <p className="text-center text-red-500">{message}</p>}
                    {loading && <p className="text-center">Aguarde...</p>}

                    <div className="flex justify-center gap-4 mt-4">
                        <button
                            onClick={() => setOpenDeleteModal(false)}
                            className="border-2 border-primary hover:shadow-lg text-primary py-2 px-4 rounded-lg"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={() => confirmedDelete(id)}
                            className="bg-red-500 hover:bg-red-700 hover:shadow-lg text-white py-2 px-4 rounded-lg"
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