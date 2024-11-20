import React, { useState } from 'react';
import { registerUser } from '../api/auth';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async () => {
        try {
            const response = await registerUser(username, password, confirmPassword);
            setMessage('Usuário registrado com sucesso!');
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div>
            <h1>Registrar</h1>
            <input
                type="text"
                placeholder="Usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="Confirmar Senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={handleRegister}>Registrar</button>
            <p>{message}</p>
        </div>
    );
};

export default Register;
