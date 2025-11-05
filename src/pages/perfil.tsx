import React, { useState, FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/ui/sidebar.tsx';

interface UserProfile {
    name: string;
    email: string;
    password?: string;
    currentLevel: number;
    duoPartner: string | null;
}

const initialProfile: UserProfile = {
    name: 'Guilherme Machado',
    email: 'guilherme@finhero.com',
    currentLevel: 5,
    duoPartner: 'João da Silva',
};

const Perfil: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation(); 
    const currentPath = location.pathname;
    
    const handleLogout = () => navigate('/login'); 

    const [profile, setProfile] = useState<UserProfile>(initialProfile);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handleSaveProfile = (e: FormEvent) => {
        e.preventDefault();
        
        console.log('Perfil atualizado:', profile);
        
        alert("Perfil atualizado com sucesso!");
        setIsEditing(false);
    };

    const handleChangePassword = (e: FormEvent) => {
        e.preventDefault();

        if (newPassword.length < 6) {
            alert("A nova senha deve ter pelo menos 6 caracteres.");
            return;
        }

        if (newPassword !== confirmNewPassword) {
            alert("A nova senha e a confirmação não coincidem.");
            return;
        }

        console.log('Senha alterada.');
        
        alert("Senha alterada com sucesso!");
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
    };
    
    const renderDuoStatus = () => {
        if (profile.duoPartner) {
            return (
                <div className="duo-status-box connected">
                    <h4>Dupla Conectada</h4>
                    <p>Você está conectado a: <strong>{profile.duoPartner}</strong></p>
                    <button className="danger-button" onClick={() => alert('Função de desconexão (duoPartner: null)')}>
                        Desconectar Dupla
                    </button>
                </div>
            );
        }
        return (
             <div className="duo-status-box none">
                <h4>Sem Dupla Ativa</h4>
                <p>Compartilhe as finanças com um parceiro para desbloquear metas conjuntas.</p>
                <button 
                    className="primary-button small-button" 
                    onClick={() => navigate('/dupla')}
                >
                    Configurar Dupla
                </button>
            </div>
        );
    };

    return (
        <div className="app-layout"> 
            
            <Sidebar onLogout={handleLogout} activePath={currentPath} /> 
            
            <main className="main-content">
                <div className="page-container profile-page-container">
                    <header className="page-header">
                        <h1 className="page-title">
                            Meu <span className="highlight-green">Perfil</span>
                        </h1>
                        <p className="page-subtitle">Visualize e gerencie suas informações de conta.</p>
                    </header>

                    <div className="profile-grid">
                        
                        <div className="profile-panel personal-info-panel">
                            <h3>Informações da Conta</h3>
                            <form onSubmit={handleSaveProfile}>
                                <div className="form-group">
                                    <label className="form-label">Nome:</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={profile.name}
                                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                                        disabled={!isEditing}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">E-mail:</label>
                                    <input
                                        type="email"
                                        className="form-input"
                                        value={profile.email}
                                        disabled
                                    />
                                    <small className="form-hint">E-mail não pode ser alterado diretamente.</small>
                                </div>

                                <div className="profile-actions">
                                    {!isEditing ? (
                                        <button type="button" className="primary-button" onClick={() => setIsEditing(true)}>
                                            Editar Perfil
                                        </button>
                                    ) : (
                                        <>
                                            <button type="submit" className="primary-button">
                                                Salvar Alterações
                                            </button>
                                            <button type="button" className="secondary-button" onClick={() => { setProfile(initialProfile); setIsEditing(false); }}>
                                                Cancelar
                                            </button>
                                        </>
                                    )}
                                </div>
                            </form>
                        </div>
                        
                        <div className="profile-panel security-panel">
                            <h3>Segurança e Senha</h3>
                            <form onSubmit={handleChangePassword}>
                                <div className="form-group">
                                    <label className="form-label">Senha Atual:</label>
                                    <input
                                        type="password"
                                        className="form-input"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Nova Senha:</label>
                                    <input
                                        type="password"
                                        className="form-input"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                 <div className="form-group">
                                    <label className="form-label">Confirmar Nova Senha:</label>
                                    <input
                                        type="password"
                                        className="form-input"
                                        value={confirmNewPassword}
                                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="primary-button">
                                    Alterar Senha
                                </button>
                            </form>
                        </div>

                        <div className="profile-panel game-status-panel">
                            <h3>Status do FinHero</h3>
                            <div className="status-detail">
                                <p>Nível Atual:</p>
                                <span className="xp-value level-value">{profile.currentLevel}</span>
                            </div>
                            <div className="status-detail">
                                <p>XP Atual:</p>
                                <span className="xp-value">1245 / 2000</span>
                            </div>
                            
                        </div>

                         <div className="profile-panel settings-panel">
                            <h3>Excluir conta</h3>
                            <button className="danger-button full-width-button" onClick={() => alert('Função de exclusão de conta')}>
                                Excluir Conta
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Perfil;