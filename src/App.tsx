import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// ⬅️ ATUALIZAÇÃO: Usaremos AuthPage que contém a lógica Login/Signup
import AuthPage from './pages/authpage'; 
import Dashboard from './pages/homepage'; 
import Adicionar, { TransactionForm } from './pages/adicionar'; 
import Dupla from './pages/dupla'; 
import Perfil from './pages/perfil';

// ⬅️ NOVO: Importe o componente da Sidebar
import Sidebar from './components/ui/sidebar'; 

interface Transaction extends TransactionForm {
    id: string;
    amount: number;
}

// ----------------------------------------------------
// NOVO: Componente de Layout Autenticado (Com Sidebar)
// ----------------------------------------------------

// Este componente envolve todas as páginas autenticadas com a Sidebar.
interface AuthenticatedLayoutProps {
    children: React.ReactNode;
    handleLogout: () => void;
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({ children, handleLogout }) => {
    return (
        <div className="app-layout">
            <Sidebar handleLogout={handleLogout} /> 
            <main className="content">
                {children}
            </main>
        </div>
    );
};

// ----------------------------------------------------
// Componente Principal App
// ----------------------------------------------------

function App() {
    // ⬅️ ATUALIZAÇÃO: Verifica a autenticação via localStorage
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem('finhero-token')
    );
    
    // Estado de transações mantido
    const [transactions, setTransactions] = useState<Transaction[]>([]); 

    // Efeito para re-verificar o localStorage (caso de re-renderização)
    useEffect(() => {
        const token = localStorage.getItem('finhero-token');
        if (token && !isAuthenticated) {
            setIsAuthenticated(true);
        }
    }, [isAuthenticated]);

    // Manipulador de login/cadastro (seta o estado após sucesso no AuthPage)
    const handleAuthSuccess = () => {
        setIsAuthenticated(true);
    };
    
    // Manipulador de Logout (limpa o estado e o localStorage)
    const handleLogout = () => {
        localStorage.removeItem('finhero-token');
        localStorage.removeItem('finhero-user');
        setIsAuthenticated(false);
    };

    // Manipulador de Adicionar Transação (mantido do seu original)
    const handleAddTransaction = (newTransactionData: Omit<Transaction, 'id'>) => {
        const newTransaction: Transaction = {
            ...newTransactionData,
            id: Date.now().toString(),
            amount: newTransactionData.amount, 
        };
        setTransactions(prev => [newTransaction, ...prev]); 
    };

    // Função auxiliar para renderizar o layout autenticado
    const renderAuthenticatedPage = (Element: React.FC<any>) => (
        <AuthenticatedLayout handleLogout={handleLogout}>
            <Element 
                // Passando props específicas conforme necessário
                transactions={transactions} 
                onLogout={handleLogout} 
                onAddTransaction={handleAddTransaction} 
            />
        </AuthenticatedLayout>
    );

    return (
        <Router>
            <Routes>
                
                {/* 1. Rota de Autenticação Única (Login/Cadastro) */}
                <Route 
                    path="/" 
                    element={isAuthenticated 
                        ? <Navigate to="/home" replace /> 
                        : <AuthPage 
                            onLoginSuccess={handleAuthSuccess} 
                            onSignupSuccess={handleAuthSuccess} 
                          />
                    } 
                />

                {/* 2. Rotas Protegidas (Usam AuthenticatedLayout) */}
                
                <Route 
                    path="/home" 
                    element={isAuthenticated ? 
                        renderAuthenticatedPage(Dashboard) : 
                        <Navigate to="/" replace />
                    } 
                />

                <Route 
                    path="/adicionar" 
                    element={isAuthenticated ? 
                        renderAuthenticatedPage(Adicionar) : 
                        <Navigate to="/" replace />
                    } 
                />
                
                <Route 
                    path="/dupla" 
                    element={isAuthenticated ? 
                        renderAuthenticatedPage(Dupla) : 
                        <Navigate to="/" replace />
                    } 
                />

                <Route 
                    path="/perfil" 
                    element={isAuthenticated ? 
                        renderAuthenticatedPage(Perfil) : 
                        <Navigate to="/" replace />
                    } 
                />
                
                {/* Redireciona rotas antigas (/login, /signup) para a rota única / */}
                <Route path="/login" element={<Navigate to="/" replace />} />
                <Route path="/signup" element={<Navigate to="/" replace />} />

                {/* Catch-all para 404 */}
                <Route path="*" element={<h1>404: Página não encontrada</h1>} />

            </Routes>
        </Router>
    );
}

export default App;