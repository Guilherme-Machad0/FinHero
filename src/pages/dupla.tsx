// src/pages/dupla.tsx

import React, { useState, FormEvent } from 'react';
// ⬅️ Importa useLocation e useNavigate para a Sidebar
import { useLocation, useNavigate } from 'react-router-dom'; 
import Sidebar from '../components/ui/sidebar.tsx'; // Garante o caminho correto

// Status da Dupla no App:
type DuoStatus = 'none' | 'pending' | 'connected';

const Dupla: React.FC = () => {
    // ⬅️ Inicializa hooks de navegação
    const navigate = useNavigate();
    const location = useLocation(); 
    const currentPath = location.pathname;
    
    // Configura uma função de logout simulada para a Sidebar
    const handleLogout = () => navigate('/login'); 

    // ⚠️ Estado Fictício: Simula se o usuário já tem uma dupla
    const [duoStatus, setDuoStatus] = useState<DuoStatus>('none'); 
    const [partnerName, setPartnerName] = useState('');
    const [invitationCode, setInvitationCode] = useState('XYZ-123-ABC'); // Código fictício para exibição
    const [inputCode, setInputCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Função fictícia para gerar um novo código
    const handleGenerateCode = () => {
        setIsLoading(true);
        // 🚨 Simula chamada de API para gerar um novo código
        setTimeout(() => {
            const newCode = Math.random().toString(36).substring(2, 5).toUpperCase() + 
                            '-' + 
                            Math.random().toString(36).substring(2, 5).toUpperCase() +
                            '-' +
                            Math.random().toString(36).substring(2, 5).toUpperCase();
            setInvitationCode(newCode);
            setDuoStatus('pending'); // Mudamos o status para Pendente
            setIsLoading(false);
            alert("Novo código gerado! Compartilhe com sua dupla.");
        }, 1500);
    };

    // Função para inserir um código
    const handleJoinDuo = (e: FormEvent) => {
        e.preventDefault();
        if (inputCode.length !== 11 || inputCode.indexOf('-') === -1) {
            alert("Código inválido. Por favor, verifique o formato (ex: XXX-YYY-ZZZ).");
            return;
        }

        setIsLoading(true);
        // 🚨 Simula chamada de API para verificar e conectar
        setTimeout(() => {
            setIsLoading(false);
            if (inputCode === 'JOIN-FIN-HERO') { // Código de teste
                setPartnerName("João da Silva");
                setDuoStatus('connected');
                alert("Conexão estabelecida com sucesso com João da Silva!");
            } else {
                alert("Código não encontrado ou expirado.");
            }
            setInputCode('');
        }, 2000);
    };

    // 1. Renderiza quando está conectado (AGORA COM LAYOUT)
    if (duoStatus === 'connected') {
        return (
            // ⬅️ Estrutura de Layout
            <div className="app-layout"> 
                <Sidebar onLogout={handleLogout} activePath={currentPath} /> 
                <main className="main-content">
                    <div className="page-container duo-page-container">
                        <header className="page-header">
                            <h1 className="page-title">
                                Sua <span className="highlight-green">Dupla</span>
                            </h1>
                        </header>
                        <div className="status-box connected-box">
                            <h2>🎉 Conectado com Sucesso!</h2>
                            <p>Você está compartilhando finanças com:</p>
                            <div className="partner-info">
                                <strong>{partnerName}</strong>
                                <span className="partner-status-tag connected">Ativo</span>
                            </div>
                            <p className="small-text">Suas transações são compartilhadas e as metas são unidas.</p>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    // Conteúdo Pendente / Padrão
    const renderPendingState = (
        <div className="status-box pending-box">
            <h2>Aguardando Conexão...</h2>
            <p>Compartilhe o código abaixo com sua dupla:</p>
            <div className="invitation-code-display">
                <span className="code-text">{invitationCode}</span>
                <button 
                    className="copy-button" 
                    onClick={() => navigator.clipboard.writeText(invitationCode)}
                >
                    Copiar
                </button>
            </div>
            {isLoading ? (
                <p className="loading-text">Gerando novo código...</p>
            ) : (
                <button 
                    className="secondary-button" 
                    onClick={handleGenerateCode} 
                    disabled={isLoading}
                >
                    Gerar Novo Código
                </button>
            )}
        </div>
    );
    
    // 3. Renderiza a tela principal (status 'none' ou 'pending') (AGORA COM LAYOUT)
    return (
        // ⬅️ Estrutura de Layout
        <div className="app-layout"> 
            <Sidebar onLogout={handleLogout} activePath={currentPath} /> 
            <main className="main-content">
                <div className="page-container duo-page-container">
                    <header className="page-header">
                        <h1 className="page-title">
                            Configurar <span className="highlight-green">Dupla</span>
                        </h1>
                        <p className="page-subtitle">Conecte-se ao seu parceiro financeiro para compartilhar dados.</p>
                    </header>
                    
                    <div className="duo-content-grid">
                        
                        {/* ⬅️ LADO ESQUERDO: Gerar Código / Pendente */}
                        <div className="duo-panel">
                            <h3>{duoStatus === 'pending' ? 'Código Ativo' : 'Criar uma Dupla'}</h3>
                            {duoStatus === 'pending' ? (
                                renderPendingState
                            ) : (
                                <div className="status-box create-box">
                                    <p>Crie um código e envie para a pessoa que deseja convidar.</p>
                                    <button 
                                        className="primary-button" 
                                        onClick={handleGenerateCode}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Gerando...' : 'Gerar Código de Convite'}
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* ⬅️ LADO DIREITO: Inserir Código */}
                        <div className="duo-panel">
                            <h3>Entrar em uma Dupla</h3>
                            <form className="join-form" onSubmit={handleJoinDuo}>
                                <p>Já recebeu um código? Insira-o abaixo para se conectar:</p>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        value={inputCode}
                                        onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                                        className="form-input code-input"
                                        placeholder="XXX-YYY-ZZZ"
                                        maxLength={11}
                                        required
                                    />
                                </div>
                                <button type="submit" className="primary-button" disabled={isLoading}>
                                    {isLoading ? 'Conectando...' : 'Conectar à Dupla'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dupla;