import React, { useState } from 'react';
import Input, { FormInputProps } from './Input';

export type Field = Omit<FormInputProps, 'value' | 'onChange'>;

export type FormProps = {
    fields: Field[];
    buttonText?: string;
    title?: string;
    onSubmit: (formData: FormData) => void;
};

const Form = ({ fields, buttonText, title, onSubmit }: FormProps): React.ReactElement => {
    const [formData, setFormData] = useState(
        fields.reduce((acc, field) => ({
            ...acc,
            [field.id]: field.type === 'checkbox' ? false : field.type === 'select' ? field.options![0].value : ''
        }), {} as { [key: string]: string | boolean | File })
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { id, type, value } = e.target;
        const checked = 'checked' in e.target ? (e.target as HTMLInputElement).checked : false;

        if (type === 'file') {
            console.log(e.target.files);
            setFormData({
                ...formData,
                [id]: e.target.files ? e.target.files[0] : '',
            });
            return;
        }

        setFormData({
            ...formData,
            [id]: type === 'checkbox' ? checked : value,
        });

        console.log()
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = new FormData();

        Object.keys(formData).forEach((key) => {
            const value = formData[key];
            if (typeof value === 'string' || value instanceof Blob) {
                data.append(key, value);
            } else if (typeof value === 'boolean') {
                data.append(key, value.toString());
            } else {
                console.error(`Unsupported value type for key ${key}: ${typeof value}`);
            }
        });

        if (onSubmit) {
            onSubmit(data);
        }
    };


    return (
        <form onSubmit={handleSubmit} className="bg-secondary p-8 rounded-lg shadow-lg max-w-md w-full mx-auto">
            {title !== undefined && <h2 className="text-2xl text-text font-semibold mb-6">{title}</h2>}
            {fields.map((field) => (
                <Input
                    key={field.id}
                    {...field}
                    value={formData[field.id]}
                    onChange={handleChange}
                />
            ))}
            <button
                type="submit"
                className="bg-primary text-white py-2 px-4 rounded w-full hover:bg-opacity-90"
            >
                {buttonText || 'Enviar'}
            </button>
        </form>
    );
};

export default Form;


