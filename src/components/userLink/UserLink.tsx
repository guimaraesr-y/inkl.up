interface UserLinkProps {
    id: string
    href: string
    title: string
    imageUrl: string
}

const UserLink = ({ id, href, title, imageUrl }: UserLinkProps) => {
    return (
        <a href={href} className="flex items-center gap-2">
            <img src={imageUrl} alt={title} className="w-10 h-10 rounded-full" />
            <span className="text-lg font-semibold">{title}</span>
        </a>
    )
}

export default UserLink;