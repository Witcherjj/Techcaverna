import React, { useState } from 'react';
import api from '../api/axios-config';

const AddProduct = () => {
  // Estados para gerenciar os valores do formulário
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [message, setMessage] = useState('');

  // Função para tratar o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário (GET)
    try {
      // Faz a requisição POST para adicionar o produto
      const response = await api.post('/add-product', {
        name,
        description,
        price: parseFloat(price), // Converte o preço para float
        stock: parseInt(stock, 10), // Converte o estoque para inteiro
      });
      setMessage(response.data.message); // Define a mensagem de sucesso
      // Limpa os campos do formulário
      setName('');
      setDescription('');
      setPrice('');
      setStock('');
    } catch (error) {
      setMessage('Erro ao adicionar produto.'); // Mensagem de erro
      console.error(error); // Log do erro no console
    }
  };

  return (
    <div>
      <h2>Adicionar Produto</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} method="POST">
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Preço"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Estoque"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
};

export default AddProduct;
