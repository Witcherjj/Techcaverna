import axios from 'axios';

const api = axios.create({
    baseURL: 'https://techcaverna.shop/api', // URL base completa apontando para o backend via Nginx
    timeout: 5000, // Timeout de 5 segundos
    headers: {
        'Content-Type': 'application/json', // Garantir o envio de JSON
        Accept: 'application/json', // Aceitar apenas JSON nas respostas
    },
});

// Interceptor para adicionar o token JWT em todas as requisições, caso exista
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Recupera o token armazenado
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Adiciona o token ao header Authorization
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
