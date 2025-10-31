// src/App.tsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importa os componentes de Página
import Login from './pages/login.tsx'; 
import Signup from './pages/signup.tsx';
import Dashboard from './pages/homepage.tsx'; 
// ⬅️ Importa o componente Adicionar E a interface necessária
import Adicionar, { TransactionForm } from './pages/adicionar.tsx'; 
import Dupla from './pages/dupla.tsx'; 
import Perfil from './pages/perfil.tsx';

// 1. Interface de transação completa (usada no state do App)
// Adiciona o 'id' e garante que 'amount' é number.
interface Transaction extends TransactionForm {
    id: string;
    amount: number;
}


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    // 2. Estado Central das Transações
    const [transactions, setTransactions] = useState<Transaction[]>([]); 

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };
    
    const handleSignupSuccess = () => {
        setIsLoggedIn(true); 
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    // 3. Função para adicionar uma transação (chamada pelo Adicionar.tsx)
    const handleAddTransaction = (newTransactionData: Omit<Transaction, 'id'>) => {
        const newTransaction: Transaction = {
            ...newTransactionData,
            id: Date.now().toString(), // ID único simples (para simulação)
            amount: newTransactionData.amount, 
        };
        // Adiciona a nova transação no início da lista (as mais recentes primeiro)
        setTransactions(prev => [newTransaction, ...prev]); 
    };

    return (
        <Router>
            <Routes>
                
                {/* Rota para a Home/Dashboard */}
                <Route 
                    path="/home" 
                    // 4. PASSA A LISTA DE TRANSAÇÕES para a Home
                    element={isLoggedIn ? <Dashboard onLogout={handleLogout} transactions={transactions} /> : <Navigate to="/login" replace />} 
                />

                {/* Rota para Adicionar Transação */}
                <Route 
                    path="/adicionar" 
                    // 5. PASSA A FUNÇÃO DE ADICIONAR para o Adicionar
                    element={isLoggedIn ? <Adicionar onAddTransaction={handleAddTransaction} /> : <Navigate to="/login" replace />} 
                />
                
                {/* Rota para a página Dupla */}
                <Route 
                    path="/dupla" 
                    element={isLoggedIn ? <Dupla /> : <Navigate to="/login" replace />} 
                />

                <Route 
                    path="/perfil" 
                    element={isLoggedIn ? <Perfil /> : <Navigate to="/login" replace />} 
                />
             
             <Route 
             path="/login" 
             element={isLoggedIn ? <Navigate to="/home" replace /> : <Login onLogin={handleLoginSuccess} />} 
             />
             <Route 
             path="/signup" 
            element={isLoggedIn ? <Navigate to="/home" replace /> : <Signup onSignupSuccess={handleSignupSuccess} />} 
             />
            <Route 
            path="/" 
             element={<Navigate to={isLoggedIn ? "/home" : "/login"} replace />} 
             />
 
            </Routes>
        </Router>
    );
}

export default App;