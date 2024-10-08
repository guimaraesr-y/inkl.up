import Container from "@/components/container/Container";
import ProfilePicture from "@/components/profilePicture/ProfilePicture";
import UserLink from "@/components/userLink/UserLink";
import Link from "@/lib/link/Link";
import User from "@/lib/user/User";
import { FaGhost } from "react-icons/fa6";

interface ViewLinksProps {
    user: User;
    links: Link[];
}

const UserLinksView = async ({ user, links }: ViewLinksProps) => {
    return (
        <Container>
            <div className="body min-h-screen">
                <div className="flex flex-col items-center gap-2">
                    <ProfilePicture
                        profilePicture={user?.profilePicture! || '/img/avatar.svg'}
                        width={100}
                    />

                    <div className="font-bold text-xl tracking-wide text-center">
                        <h1>{user?.name}</h1>

                        {user?.username && (
                            <div className="flex items-center justify-center gap-2 text-subtitle font-normal">
                                <div>
                                    @<small>
                                        {user.username}
                                    </small>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Links section */}
                <div className="mt-8">
                    <div className="mt-6 w-full flex flex-col gap-4">
                        {links.map((link) => (
                            <UserLink
                                key={link.id}
                                id={link.id}
                                link={link}
                                editMode={false}
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
            </div>
        </Container>
    )
}

export default UserLinksView;