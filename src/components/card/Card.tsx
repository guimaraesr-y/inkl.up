'use client';

interface CardProps {
    title: string;
    description: string;
    actionText?: string
    action?: () => void;
    secondaryActionText?: string
    secondaryAction?: () => void;
    className?: string;
}

const Card = ({ title, description, actionText, action, secondaryActionText, secondaryAction, className }: CardProps ) => {
    return (
        <div className="bg-secondary border border-border rounded-lg p-6 max-w-md shadow-lg">
            <h2 className="text-text text-2xl font-semibold mb-4">
                {title}
            </h2>
            <p className="text-subtitle mb-4">
                {description}
            </p>
            <div className="flex space-x-4">
                {(action && actionText) && (
                    <button className="bg-primary text-white py-2 px-4 rounded hover:bg-opacity-90" onClick={action}>
                        {actionText}
                    </button>
                )}

                {(secondaryAction && secondaryActionText) && (
                    <button className="bg-transparent border border-primary text-primary py-2 px-4 rounded hover:bg-primary hover:bg-opacity-20" onClick={secondaryAction}>
                        {secondaryActionText}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Card;