'use client';

import Container from "@/components/container/Container";
import NavbarWrapper from "@/components/navigation/NavbarWrapper";
import ProfilePicture from "@/components/profilePicture/ProfilePicture";
import UserLink from "@/components/userLink/UserLink";
import WideButton from "@/components/wideButton/WideButton";
import { useLink } from "@/hooks/links/useLink";
import { useAuthentication } from "@/hooks/user/useAuthentication";
import Link from "@/lib/link/Link";
import { useEffect, useState } from "react";
import { FaPlus, FaGhost } from "react-icons/fa6";


// TODO: this is where user configures their links
const Dashboard = () => {
    const [links, setLinks] = useState<Link[]>([]);
    const { user, loading } = useAuthentication();
    const { getLinks } = useLink();

    // load links from database
    useEffect(() => {
        (async() => {
            if(user && user.id) {
                setLinks(await getLinks(user.id))
            }
        })()
    }, [user, getLinks]);

    return (
        <>
            <NavbarWrapper>
                <Container>
                    <div className="flex flex-col items-center gap-2">
                        <ProfilePicture 
                            profilePicture={user?.profilePicture! || '/img/avatar.svg'} 
                            width={100}
                        />

                        <div className="font-bold text-xl tracking-wide">
                            {user?.name ? 
                                <h1>{user?.name}</h1> :
                                <h1 className="bg-gray text-gray">Desconhecido</h1>}
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
                                onClick={() => alert("Create Link")}
                            />
                        </div>
                    </div>

                    {/* Links section */}
                    <div className="mt-16">
                        <div className="flex items-center justify-center">
                            <div className="border-t border-border flex-grow"></div>
                            <span className="px-4 text-subtitle">Meus Links</span>
                            <div className="border-t border-border flex-grow"></div>
                        </div>

                        <div className="mt-6">
                            {links.map((link) => (
                                <UserLink
                                    key={link.id}
                                    id={link.id}
                                    href={link.url}
                                    title={link.title}
                                    imageUrl={link.imageUrl}
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