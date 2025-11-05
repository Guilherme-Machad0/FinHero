import React from 'react';
import { Link } from 'react-router-dom';
import GoblinMascote from '../../assets/logo-diabinho-verde.png'; 

const navItems = [
    { name: 'Home', path: '/home', isButton: false },
    { name: 'Perfil', path: '/perfil', isButton: false },
    { name: 'Adicionar', path: '/adicionar', isButton: false },
    { name: 'Dupla', path: '/dupla', isButton: false }, 
];

interface SidebarProps {
    onLogout: () => void; 
    activePath: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout, activePath }) => {
    return (
        <aside className="sidebar-container">
            
            <div className="sidebar-logo-section">
                <h1 className="sidebar-logo-text">FINHERO</h1>
                <img src={GoblinMascote} alt="Mascote Goblin" className="sidebar-mascot" />
            </div>

            <nav className="sidebar-nav">
                <ul>
                    {navItems.map((item) => (
                        <li key={item.name} className="sidebar-nav-item">
                            <Link 
                                to={item.path} 
                                className={activePath === item.path ? 'active' : ''}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            
            <div className="sidebar-logout-wrapper">
                <button onClick={onLogout} className="sidebar-logout-button">
                    Sair
                </button>
            </div>
            
            <div className="sidebar-footer">
                <p>&copy; FinHero 2025</p>
            </div>
        </aside>
    );
};

export default Sidebar;