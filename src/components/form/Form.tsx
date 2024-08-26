import React, { useState } from 'react';
import Input, { FormInputProps } from './Input';

export type Field = Omit<FormInputProps, 'value' | 'onChange'>;

export type FormProps = {
    fields: Field[];
    title?: string;
    onSubmit: (formData: { [key: string]: string | boolean }) => void;
};

/**
 * Form component that takes a list of fields and a title, and a callback function for when the form is submitted.
 * It will render a form with the provided fields, and when the form is submitted, it will call the callback function with the form values.
 * @param {FormProps} props
 * @returns {React.ReactElement}
 * @example
 * const fields = [
 *     { label: 'Name', id: 'name', type: 'text', placeholder: 'Enter your name' },
 *     { label: 'Email', id: 'email', type: 'email', placeholder: 'Enter your email' },
 *     { label: 'Message', id: 'message', type: 'textarea', placeholder: 'Enter your message' },
 *     {
 *         id: 'role',
 *         label: 'Role',
 *         type: 'select',
 *         options: [
 *             { label: 'User', value: 'user' },
 *             { label: 'Admin', value: 'admin' },
 *             { label: 'Super Admin', value: 'superadmin' },
 *         ],
 *     },
 *     { id: 'subscribe', label: 'Subscribe to newsletter', type: 'checkbox' },
 * ];
 * 
 * const onSubmit = (formData) => {
 *     console.log(formData);
 * }
 * 
 * <Form
 *      fields={fields}
 *      title="Contact Us"
 *      onSubmit={onSubmit}
 * />
 */
const Form = ({ fields, title, onSubmit }: FormProps): React.ReactElement => {
    const [formData, setFormData] = useState(
        fields.reduce((acc, field) => ({
            ...acc,
            [field.id]: field.type === 'checkbox' ? false : field.type === 'select' ? field.options![0].value : ''
        }), {} as { [key: string]: string | boolean })
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { id, type, value } = e.target;
        const checked = 'checked' in e.target ? (e.target as HTMLInputElement).checked : false;
        setFormData({
            ...formData,
            [id]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(formData);
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
                Submit
            </button>
        </form>
    );
};

export default Form;


