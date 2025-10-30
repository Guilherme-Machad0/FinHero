// src/pages/homepage.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import '../app.css'
// Usamos <Link> do React Router para navegação

// 💡 Dica: Para sair da sessão, o link "Sair" deve chamar uma função que mude
// o estado 'isLoggedIn' para false no App.tsx e redirecione para '/login'.
interface HomepageProps {
    onLogout?: () => void; // Prop opcional para lidar com o logout
}

// O componente Dashboard/Homepage
const Homepage: React.FC<HomepageProps> = ({ onLogout }) => {
    
    // Você pode usar o React Router para gerenciar o estado 'active' do menu.
    // Por enquanto, o 'Home' está marcado como ativo de forma estática.
    
    // 💡 Estrutura: Traduzimos o HTML para JSX, usando 'className'
    return (
        <div className="dashboard-container">

            {/* --- 1. SIDEBAR (Barra Lateral) --- */}
            <aside className="sidebar">
                <div className="logo">FinHero</div>
                <nav className="main-nav">
                    <ul>
                        <li><Link to="/home" className="active">Home</Link></li>
                        <li><Link to="/perfil">Perfil</Link></li>
                        <li><Link to="/adicionar">Adicionar</Link></li>
                        <li>
                            <a 
                                href="#" // Mantemos o '#' para evitar recarregar
                                onClick={onLogout} // Chama a função de logout passada pelo App.tsx
                            >
                                Sair
                            </a>
                        </li>
                        
                        <li><Link to="/ajuda">Ajuda</Link></li>
                    </ul>
                </nav>
            </aside>

            {/* --- 2. CONTEÚDO PRINCIPAL (Main Content) --- */}
            <main className="main-content">
                
                {/* Cabeçalho do Conteúdo */}
                <header className="content-header">
                    <div className="user-info">
                        <h2>Olá, Guilherme</h2> {/* Você pode substituir por {userName} no futuro */}
                        <p>Veja seu resumo de hoje.</p>
                    </div>
                </header>

                {/* Área Onde os Cards e Gráficos Irão */}
                <section className="content-area">
                    {/* Placeholder: Aqui você irá adicionar os componentes de cards e gráficos */}
                    <p style={{ color: '#9E9E9E' }}>
                        Área de Conteúdo (Content Area). Comece a adicionar seus Cards aqui!
                    </p>
                </section>
                
            </main>

        </div>
    );
};

export default Homepage;