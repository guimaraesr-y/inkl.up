'use client';

import Container from "@/components/container/Container";
import Form, { Field } from "@/components/form/Form";
import Modal from "@/components/modal/Modal";
import NavbarWrapper from "@/components/navigation/NavbarWrapper";
import ProfilePicture from "@/components/profilePicture/ProfilePicture";
import UserLink from "@/components/userLink/UserLink";
import WideButton from "@/components/wideButton/WideButton";
import { useLink } from "@/hooks/links/useLink";
import { useAuthentication } from "@/hooks/user/useAuthentication";
import { UpdateLinkDto } from "@/lib/link/interfaces";
import Link from "@/lib/link/Link";
import { useEffect, useState } from "react";
import { FaPlus, FaGhost } from "react-icons/fa6";


// TODO: this is where user configures their links
const Dashboard = () => {
    const [links, setLinks] = useState<Link[]>([]);
    const [openCreateLink, setOpenCreateLink] = useState(false);
    const [isErrorOpen, setIsErrorOpen] = useState(false);

    const { user } = useAuthentication();
    const { 
        getLinks, 
        createLink, 
        deleteLink, 
        updateLink, 
        loading: linkLoading, 
        error: linkError 
    } = useLink();

    // load links from database
    useEffect(() => {
        (async () => {
            if (user && user.id) {
                setLinks(await getLinks(user.id))
            }
        })()
    }, [user, getLinks]);

    const formFields: Field[] = [
        { id: 'title', label: 'Título', type: 'text', placeholder: 'Digite o título do link', required: true },
        { id: 'url', label: 'URL', type: 'text', placeholder: 'https://www.exemplo.com', required: true },
        { id: 'image', label: 'Imagem', type: 'file', placeholder: '', accept: 'image/*' },
    ];

    const handleCreateLink = async (data: FormData) => {
        data.set('userId', user?.id!);

        const link = await createLink(data);

        if (!link) {
            setOpenCreateLink(false);
            setIsErrorOpen(true);
            return;
        }

        setLinks([...links, link]);
        setOpenCreateLink(false);
    };

    const handleDeleteLink = async (id: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            deleteLink(id)
                .then(res => {
                    setLinks(links.filter(link => link.id !== id));
                    resolve(res);
                })
                .catch(reject)
        })
    };

    const handleUpdateLink = (formData: FormData): Promise<Link> => {
        return new Promise((resolve, reject) => {
            updateLink(formData)
                .then(link => {
                    setLinks(links.map(l => l.id === link.id ? { ...l, ...link } : l));
                    resolve(link);
                })
                .catch(reject)
        })
    };

    return (
        <>
            <Modal title={"Ocorreu um erro!"} isOpen={isErrorOpen} onClose={() => setIsErrorOpen(false)}>
                <p>{linkError}</p>
            </Modal>

            <NavbarWrapper>
                <Container>
                    <div className="flex flex-col items-center gap-2">
                        <ProfilePicture
                            profilePicture={user?.profilePicture! || '/img/avatar.svg'}
                            width={100}
                        />

                        <div className="font-bold text-xl tracking-wide">
                            <h1>{user?.name}</h1>
                        </div>
                    </div>

                    {/* Create links section */}
                    <div className="mt-8">
                        <div className="flex items-center justify-center">
                            <div className="border-t border-border flex-grow"></div>
                            <span className="px-4 text-subtitle">Criar</span>
                            <div className="border-t border-border flex-grow"></div>
                        </div>

                        <div className="mt-4">
                            <WideButton
                                text="Criar Link"
                                icon={<FaPlus />}
                                onClick={() => setOpenCreateLink(true)}
                            />
                            <Modal
                                isOpen={openCreateLink} onClose={() =>
                                    setOpenCreateLink(!openCreateLink)} title="Criar novo link"
                            >
                                <Form
                                    fields={formFields}
                                    onSubmit={handleCreateLink}
                                />
                            </Modal>
                        </div>
                    </div>

                    {/* Links section */}
                    <div className="mt-16">
                        <div className="flex items-center justify-center">
                            <div className="border-t border-border flex-grow"></div>
                            <span className="px-4 text-subtitle">Meus Links</span>
                            <div className="border-t border-border flex-grow"></div>
                        </div>

                        <div className="mt-6 w-full flex flex-col gap-4">
                            {links.reverse().map((link) => (
                                <UserLink
                                    key={link.id}
                                    id={link.id}
                                    link={link}
                                    editMode={true}
                                    onDelete={handleDeleteLink}
                                    onUpdate={handleUpdateLink}
                                    loading={linkLoading}
                                />
                            ))}

                            {links.length === 0 && (
                                <div className="flex flex-col items-center justify-center">
                                    <FaGhost className="w-12 h-12 md:w-24 md:h-24 mb-4" />
                                    <p className="text-xl font-bold text-text">Nenhum link encontrado!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </Container>
            </NavbarWrapper>
        </>
    )
}

export default Dashboard;