'use client';

import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-secondary text-text rounded-lg shadow-lg max-w-lg w-full p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-subtitle hover:text-text"
                >
                    &times;
                </button>
                <h2 className="text-2xl font-semibold mb-4">{title}</h2>
                <div>{children}</div>
            </div>
        </div>
    );
};

export default Modal;
