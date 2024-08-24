'use client';

import Card from "@/components/card/Card";
import Container from "@/components/container/Container";
import NavbarWrapper from "@/components/navigation/NavbarWrapper";
import ProfilePicture from "@/components/profilePicture/ProfilePicture";
import WideButton from "@/components/wideButton/WideButton";
import { useAuthentication } from "@/hooks/user/useAuthentication";
import { FaPlus } from "react-icons/fa6";

// TODO: this is where user configures their links
const Dashboard = () => {
    const { user, loading } = useAuthentication();

    return (
        <>
            <NavbarWrapper>
                <Container>
                    <div className="flex flex-col items-center gap-2">
                        <ProfilePicture 
                            profilePicture={user?.profilePicture!} 
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
                                onClick={() => alert("Create Link")}
                            />
                        </div>
                    </div>
                </Container>
            </NavbarWrapper>
        </>
    )
}

export default Dashboard;