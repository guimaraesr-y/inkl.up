import { text } from "stream/consumers";

interface WideButtonProps {
    text: string;
    onClick: () => void;
    className?: string;
    icon?: React.ReactNode;
}

const WideButton = ({ text, onClick, className, icon }: WideButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center justify-center gap-2 border border-secondary px-4 py-2 text-secondary hover:text-primary hover:border-primary rounded-lg shadow-md transition ${className}`}
        >
            <span>{icon}</span> {text}
        </button>
    )
}

export default WideButton;