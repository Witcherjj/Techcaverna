import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importa os módulos necessários do React Router
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa CSS do Bootstrap
import Login from './components/Login'; // Componente de Login
import Register from './components/Register'; // Componente de Registro
import ProductList from './components/ProductList'; // Componente de Lista de Produtos
import AddProduct from './components/AddProduct'; // Novo: Componente para Adicionar Produto

function App() {
    return (
        <Router>
            <div className="App">
                <h1>Techcaverna Shop</h1>
                <Routes>
                    {/* Rota para a página de Login */}
                    <Route path="/login" element={<Login />} />
                    
                    {/* Rota para a página de Registro */}
                    <Route path="/register" element={<Register />} />
                    
                    {/* Rota para a página de Produtos */}
                    <Route path="/products" element={<ProductList />} />

                    {/* Novo: Rota para adicionar produtos */}
                    <Route path="/add-product" element={<AddProduct />} />
                    
                    {/* Página principal */}
                    <Route path="/" element={<h2>Bem-vindo à Techcaverna Shop!</h2>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
