import UserLinksView from "@/components/userLinksView/UserLinksView";
import { LinkService } from "@/lib/link/LinkService";
import { UserService } from "@/lib/user/UserService";
import { notFound } from "next/navigation";

interface ViewLinksProps {
    params: {
        username: string;
    };
}

const UserPage = async ({ params }: ViewLinksProps) => {
    const userService = new UserService();
    const linkService = new LinkService();

    const user = await userService.getUserByUsername(params.username);

    if (!user) notFound();

    const links = await linkService.getLinks(user.id);

    return (
        <UserLinksView user={user} links={links} />
    )
}

export default UserPage;