import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FinHeroService } from '../services/index';
import Joystix from '../assets/fonts/JoystixMonospace.otf';
import '../styles/AuthPage.css';

import logoDiabinho from '../assets/logo-diabinho-verde.png';
import logoDiabinhoRed from '../assets/logo-diabinho-vermelho.png';

interface AuthPageProps {
  onLoginSuccess: () => void;
  onSignupSuccess: () => void;
}

function AuthPage({ onLoginSuccess, onSignupSuccess }: AuthPageProps) {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  // 1. ESTADOS DE LOGIN
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  // 2. ESTADOS DE CADASTRO
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);

  // --- FUNÇÕES DE SUBMISSÃO (Conexão com o Backend) ---

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoginLoading(true);

    try {
      const response = await FinHeroService.account.login({
        email: loginEmail,
        password: loginPassword,
      });

      // Armazena Token e Dados do Usuário
      const { token, user } = response.data;
      localStorage.setItem('finhero-token', token);
      localStorage.setItem('finhero-user', JSON.stringify(user));
      
      console.log("Login com sucesso!");
      onLoginSuccess(); // Chamada de sucesso original
      navigate('/home'); // Redirecionamento original
      
    } catch (error: any) {
      console.error('Login Falhou:', error);
      const errorMessage = error.response?.data?.message || 'Erro ao fazer login. Verifique suas credenciais.';
      setLoginError(errorMessage);
    } finally {
      setIsLoginLoading(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError(null);
    setIsRegisterLoading(true);

    try {
      const response = await FinHeroService.account.register({
        name: registerName,
        email: registerEmail,
        password: registerPassword,
      });

      // Armazena Token e Dados do Usuário
      const { token, user } = response.data;
      localStorage.setItem('finhero-token', token);
      localStorage.setItem('finhero-user', JSON.stringify(user));
      
      console.log("Cadastro com sucesso!");
      onSignupSuccess(); // Chamada de sucesso original
      navigate('/home'); // Redirecionamento original
      
    } catch (error: any) {
      console.error('Cadastro Falhou:', error);
      const errorMessage = error.response?.data?.message || 'Erro ao registrar. O e-mail já pode estar em uso.';
      setRegisterError(errorMessage);
    } finally {
      setIsRegisterLoading(false);
    }
  };

  return (
    <div className={`wrapper ${isActive ? 'active' : ''}`}>
      <span className="rotate-bg"></span>
      <span className="rotate-bg2"></span>
      
      <img
        src={logoDiabinho}
        alt="Diabinho Verde"
        className="login-image"
      />
      
      <img
        src={logoDiabinhoRed}
        alt="Diabinho Vermelho"
        className="register-image"
      />

      {/* --- FORMULÁRIO DE LOGIN --- */}
      <div className="form-box login">
        <h2 className="title animation" style={{ '--i': 0, '--j': 21 } as React.CSSProperties}>Start</h2>
        <form onSubmit={handleLoginSubmit}>
          {/* CAMPO E-MAIL */}
          <div className="input-box animation" style={{ '--i': 1, '--j': 22 } as React.CSSProperties}>
            {/* ⬅️ NOVO: Vínculo com estado de loginEmail */}
            <input 
              type="text" 
              required 
              value={loginEmail} 
              onChange={(e) => setLoginEmail(e.target.value)} 
            />
            <label>E-mail</label>
            <i className='bx bxs-user'></i>
          </div>
          {/* CAMPO SENHA */}
          <div className="input-box animation" style={{ '--i': 2, '--j': 23 } as React.CSSProperties}>
            {/* ⬅️ NOVO: Vínculo com estado de loginPassword */}
            <input 
              type="password" 
              required 
              value={loginPassword} 
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <label>Senha</label>
            <i className='bx bxs-lock-alt'></i>
          </div>
          
          {/* MENSAGEM DE ERRO DE LOGIN */}
          {loginError && 
            <p className="animation" style={{ color: 'var(--color-primary-red)', textAlign: 'center', marginTop: '10px' } as React.CSSProperties}>
              {loginError}
            </p>
          }

          <button 
            type="submit" 
            className="btn animation" 
            style={{ '--i': 3, '--j': 24 } as React.CSSProperties}
            disabled={isLoginLoading} // ⬅️ NOVO: Desabilita enquanto carrega
          >
            {isLoginLoading ? 'Carregando...' : 'Start'} 
          </button>
          
          <div className="linkTxt animation" style={{ '--i': 5, '--j': 25 } as React.CSSProperties}>
            <p style={{ cursor: 'pointer' }} onClick={(e) => {
              e.preventDefault();
              setIsActive(true); // Alterna para Cadastro
            }}>
              Não tem conta? <a href="#" className="register-link" onClick={(e) => e.preventDefault()}>
                Cadastre-se
              </a>
            </p>
          </div>
        </form>
      </div>

      <div className="info-text login">
        <h2 className="animation neon-text-green" style={{ '--i': 1, '--j': 20 } as React.CSSProperties}>
          Bem-vindo de Volta!!
        </h2>
        <p className="animation neon-text-green" style={{ '--i': 1, '--j': 21 } as React.CSSProperties}>
          Hora de virar mestre do orçamento!
        </p>
      </div>

      {/* --- FORMULÁRIO DE CADASTRO --- */}
      <div className="form-box register">
        <h2 className="title animation" style={{ '--i': 17, '--j': 0 } as React.CSSProperties}>
          Crie sua conta
        </h2>
        <form onSubmit={handleSignupSubmit}>
          {/* CAMPO NOME */}
          <div className="input-box animation" style={{ '--i': 18, '--j': 1 } as React.CSSProperties}>
            {/* ⬅️ NOVO: Vínculo com estado de registerName */}
            <input 
              type="text" 
              required 
              value={registerName}
              onChange={(e) => setRegisterName(e.target.value)}
            />
            <label>Nome</label>
            <i className='bx bxs-user'></i>
          </div>
          {/* CAMPO E-MAIL */}
          <div className="input-box animation" style={{ '--i': 19, '--j': 2 } as React.CSSProperties}>
            {/* ⬅️ NOVO: Vínculo com estado de registerEmail */}
            <input 
              type="email" 
              required 
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
            />
            <label>E-mail</label>
            <i className='bx bxs-envelope'></i>
          </div>
          {/* CAMPO SENHA */}
          <div className="input-box animation" style={{ '--i': 20, '--j': 3 } as React.CSSProperties}>
            {/* ⬅️ NOVO: Vínculo com estado de registerPassword */}
            <input 
              type="password" 
              required 
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
            />
            <label>Senha</label>
            <i className='bx bxs-lock-alt'></i>
          </div>

          {/* MENSAGEM DE ERRO DE CADASTRO */}
          {registerError && 
            <p className="animation" style={{ color: 'var(--color-primary-red)', textAlign: 'center', marginTop: '10px' } as React.CSSProperties}>
              {registerError}
            </p>
          }

          <button 
            type="submit" 
            className="btn animation" 
            style={{ '--i': 21, '--j': 4 } as React.CSSProperties}
            disabled={isRegisterLoading} // ⬅️ NOVO: Desabilita enquanto carrega
          >
            {isRegisterLoading ? 'Carregando...' : 'START'}
          </button>
          
          <div className="linkTxt animation" style={{ '--i': 22, '--j': 5 } as React.CSSProperties}>
            <p style={{ cursor: 'pointer' }} onClick={(e) => {
              e.preventDefault();
              setIsActive(false); // Alterna para Login
            }}>
              Já tem uma conta? <a href="#" className="login-link-text" onClick={(e) => e.preventDefault()}>
                Start
              </a>
            </p>
          </div>
        </form>
      </div>

      <div className="info-text register">
        <h2 className="animation neon-text-red" style={{ '--i': 17, '--j': 0 } as React.CSSProperties}>
          Olá, Herói!
        </h2>
        <p className="animation neon-text-red" style={{ '--i': 18, '--j': 1 } as React.CSSProperties}>
          Comece sua jornada e ganhe XP!
        </p>
      </div>

    </div>
  );
}

export default AuthPage;