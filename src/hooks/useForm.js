import { useState } from 'react';

/**
 * useForm implementa la idea de "Fachada" (Facade).
 * Oculta la complejidad de crear múltiples useState, onChange handlers
 * y reinicios para cada formulario (como el de Login o Inventario).
 */
export const useForm = (initialState = {}) => {
    const [values, setValues] = useState(initialState);

    const reset = () => {
        setValues(initialState);
    };

    const handleInputChange = ({ target }) => {
        setValues({
            ...values,
            [target.name]: target.value
        });
    };

    const setFormValues = (newValues) => {
        setValues(newValues);
    }

    return [values, handleInputChange, reset, setFormValues];
};
