import React, { HTMLInputTypeAttribute } from 'react';

export interface FormInputProps {
    label: string;
    id: string;
    type?: HTMLInputTypeAttribute;
    placeholder?: string;
    value: string | boolean;
    disabled?: boolean;
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
    options?: { value: string; label: string }[];
}

const Input = ({ label, id, type = 'text', placeholder, value, disabled = false, onChange, options }: FormInputProps) => {
    if (type === 'checkbox') {
        return (
            <div className="mb-6 flex items-center">
                <input
                    id={id}
                    type="checkbox"
                    checked={value as boolean}
                    onChange={onChange}
                    disabled={disabled}
                    className="mr-2"
                />
                <label htmlFor={id} className="text-subtitle">
                    {label}
                </label>
            </div>
        );
    }

    if (type === 'select') {
        return (
            <div className="mb-6">
                <label htmlFor={id} className="block text-subtitle mb-2">
                    {label}
                </label>
                <select
                    id={id}
                    value={value as string}
                    onChange={onChange}
                    disabled={disabled}
                    className="w-full px-4 py-2 bg-back border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                    {options?.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        );
    }

    return (
        <div className="mb-6">
            <label htmlFor={id} className="block text-subtitle mb-2">
                {label}
            </label>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                value={value as string}
                onChange={onChange}
                disabled={disabled}
                className="w-full px-4 py-2 bg-back border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
        </div>
    );
};

export default Input;

