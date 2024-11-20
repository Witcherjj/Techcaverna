import api from './axios-config';

// Função de login
export const loginUser = async (username, password) => {
    try {
        const response = await api.post('/login', { username, password });
        const { access_token } = response.data;

        // Salva o token no localStorage
        localStorage.setItem('token', access_token);

        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || 'Erro ao fazer login';
        throw new Error(message);
    }
};

// Função de registro
export const registerUser = async (username, password, confirmPassword) => {
    try {
        const response = await api.post('/register', {
            username,
            password,
            confirm_password: confirmPassword,
        });

        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || 'Erro ao registrar';
        throw new Error(message);
    }
};

// Função de logout
export const logoutUser = () => {
    // Remove o token do localStorage
    localStorage.removeItem('token');
};
