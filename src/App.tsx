// src/App.tsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// ⬅️ Caminho CORRETO para Login (src/pages/login.tsx)
import Login from './pages/login.tsx'; 
// ⬅️ Caminho CORRETO para Cadastro (src/pages/signup.tsx)
import Signup from './pages/signup.tsx';
// ⬅️ Caminho CORRETO para o seu Dashboard de teste (homepage.tsx ou dashboard.jsx)
// Vamos usar o nome que você usou no App.jsx anterior:
import Dashboard from './pages/homepage.tsx'; // Ou importe de './pages/homepage.tsx' se for o caso

// ... (Restante do código App)

const handleLoginSuccess = () => { /* ... */ }; 
const handleSignupSuccess = () => { /* ... */ }; 

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };
    
    // Assumimos que, após o cadastro, o usuário é logado
    const handleSignupSuccess = () => {
        setIsLoggedIn(true); 
    };

    return (
        <Router>
           

<Routes>
    
    {/* Rota para a Home/Dashboard */}
    <Route 
        path="/home" 
        element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />} 
    />
    
    {/* Rota para o Login */}
    <Route 
        path="/login" 
        element={isLoggedIn ? <Navigate to="/home" replace /> : <Login onLogin={handleLoginSuccess} />} 
    />
    
    {/* ⬅️ ADICIONE ESTA ROTA PARA O CADASTRO (Signup) */}
    <Route 
        path="/signup" 
        // Assumimos que, ao cadastrar, o usuário é levado para a Home
        element={isLoggedIn ? <Navigate to="/home" replace /> : <Signup onSignupSuccess={handleLoginSuccess} />} 
    />
    
    {/* ⬅️ ADICIONE A ROTA PADRÃO (raiz /) para evitar o 404 na URL inicial */}
    <Route 
        path="/" 
        // Se estiver logado, vai para Home, senão, vai para Login
        element={<Navigate to={isLoggedIn ? "/home" : "/login"} replace />} 
    />
    
</Routes>


        </Router>
    );
}

export default App;