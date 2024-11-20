import React, { useState } from 'react';
import api from '../api/axios-config';

const ProtectedRoute = () => {
    const [message, setMessage] = useState('');

    const fetchProtectedData = async () => {
        try {
            const response = await api.get('/protected-route');
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Erro ao acessar rota protegida');
        }
    };

    return (
        <div>
            <h1>Rota Protegida</h1>
            <button onClick={fetchProtectedData}>Acessar Dados</button>
            <p>{message}</p>
        </div>
    );
};

export default ProtectedRoute;
