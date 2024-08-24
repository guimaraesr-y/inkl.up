import Image from "next/image"

interface ProfilePictureProps {
    profilePicture: string
    className?: string
    width?: number
}

const ProfilePicture = ({ profilePicture, className, width = 100 }: ProfilePictureProps) => {
    return (
        <div className="rounded-full overflow-hidden relative">
            <Image 
                src={profilePicture!} 
                alt="Profile picture" 
                width={width} 
                height={width} 
                className={`rounded-full p-[2px] ${className}`} 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 z-[-1] animate-spin"></div>
        </div>
    )
}

export default ProfilePicture;