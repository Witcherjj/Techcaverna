import React, { useState } from 'react';
import { loginUser } from '../api/auth'; // Verifique se o caminho está correto

const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação simples antes da requisição
    if (!username || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const user = await loginUser(username, password); // Chama a função de login
      console.log('Usuário logado:', user);

      setError('');
      setSuccess('Login realizado com sucesso!');
      
      // Aqui você pode redirecionar o usuário, ex.:
      // window.location.href = '/dashboard'; ou utilizar uma lib de navegação como react-router
    } catch (err) {
      setSuccess('');
      setError(err.message || 'Erro ao fazer login');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default LoginComponent;
