import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginService, signup as signupService } from '../services/authService';

import '../styles/AuthPage.css';
import 'boxicons/css/boxicons.min.css';
import logoDiabinho from '../assets/logo-diabinho-verde.png';
import logoDiabinhoRed from '../assets/logo-diabinho-vermelho.png';

interface LoginProps {
  onLogin: () => void;
  onSignupSuccess?: () => void;
}

function Login({ onLogin, onSignupSuccess }: LoginProps) {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  // Estados para login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Estados para cadastro
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  // Estados para erros
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoading(true);

    try {
      const response = await loginService({
        email: loginEmail,
        password: loginPassword,
      });

      // Salvar token se necessário
      if (response.token) {
        localStorage.setItem('token', response.token);
      }

      onLogin();
      navigate('/home');
    } catch (error: any) {
      setLoginError(error.message || 'Erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError('');

    if (registerPassword.length < 6) {
      setRegisterError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await signupService({
        name: registerName,
        email: registerEmail,
        password: registerPassword,
      });

      // Salvar token se necessário
      if (response.token) {
        localStorage.setItem('token', response.token);
      }

      if (onSignupSuccess) {
        onSignupSuccess();
      }
      navigate('/home');
    } catch (error: any) {
      setRegisterError(error.message || 'Erro ao cadastrar. Tente novamente.');
    } finally {
      setIsLoading(false);
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

      <div className="form-box login">
        <h2 className="animation" style={{ '--i': 0, '--j': 21 } as React.CSSProperties}>Login</h2>
        <form onSubmit={handleLoginSubmit}>
          {loginError && (
            <div style={{ color: 'red', fontSize: '14px', marginBottom: '10px', textAlign: 'center' }}>
              {loginError}
            </div>
          )}
          <div className="input-box animation" style={{ '--i': 1, '--j': 22 } as React.CSSProperties}>
            <input 
              type="email" 
              required 
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <label>E-mail</label>
            <i className='bx bxs-user'></i>
          </div>
          <div className="input-box animation" style={{ '--i': 2, '--j': 23 } as React.CSSProperties}>
            <input 
              type="password" 
              required 
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <label>Senha</label>
            <i className='bx bxs-lock-alt'></i>
          </div>
          <button 
            type="submit" 
            className="animation" 
            style={{ '--i': 3, '--j': 24 } as React.CSSProperties}
            disabled={isLoading}
          >
            {isLoading ? 'Carregando...' : 'Start'}
          </button>
          <div className="linkTxt animation" style={{ '--i': 5, '--j': 25 } as React.CSSProperties}>
            <p>
              Não tem conta? <a href="#" onClick={(e) => {
                e.preventDefault();
                setIsActive(true);
                setLoginError('');
              }}>
                Cadastre-se
              </a>
            </p>
          </div>
        </form>
      </div>

      <div className="form-box register">
        <h2 className="animation" style={{ '--i': 0, '--j': 17 } as React.CSSProperties}>Cadastro</h2>
        <form onSubmit={handleRegisterSubmit}>
          {registerError && (
            <div style={{ color: 'red', fontSize: '14px', marginBottom: '10px', textAlign: 'center' }}>
              {registerError}
            </div>
          )}
          <div className="input-box animation" style={{ '--i': 1, '--j': 18 } as React.CSSProperties}>
            <input 
              type="text" 
              required 
              value={registerName}
              onChange={(e) => setRegisterName(e.target.value)}
            />
            <label>Nome</label>
            <i className='bx bxs-user'></i>
          </div>
          <div className="input-box animation" style={{ '--i': 2, '--j': 19 } as React.CSSProperties}>
            <input 
              type="email" 
              required 
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
            />
            <label>E-mail</label>
            <i className='bx bxs-envelope'></i>
          </div>
          <div className="input-box animation" style={{ '--i': 3, '--j': 20 } as React.CSSProperties}>
            <input 
              type="password" 
              required 
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
            />
            <label>Senha</label>
            <i className='bx bxs-lock-alt'></i>
          </div>
          <button 
            type="submit" 
            className="animation" 
            style={{ '--i': 4, '--j': 21 } as React.CSSProperties}
            disabled={isLoading}
          >
            {isLoading ? 'Carregando...' : 'Start'}
          </button>
          <div className="linkTxt animation" style={{ '--i': 5, '--j': 22 } as React.CSSProperties}>
            <p>
              Já tem conta? <a href="#" onClick={(e) => {
                e.preventDefault();
                setIsActive(false);
                setRegisterError('');
              }}>
                Faça login
              </a>
            </p>
          </div>
        </form>
      </div>

      <div className="info-text login">
        <h2 className="animation neon-text-green" style={{ '--i': 1, '--j': 20 } as React.CSSProperties}>
          Bem-vindo de Volta!
        </h2>
        <p className="animation neon-text-green" style={{ '--i': 2, '--j': 21 } as React.CSSProperties}>
          Hora de virar mestre do orçamento!
        </p>
      </div>

      <div className="info-text register">
        <h2 className="animation neon-text-red" style={{ '--i': 1, '--j': 16 } as React.CSSProperties}>
          Olá, Herói!
        </h2>
        <p className="animation neon-text-red" style={{ '--i': 2, '--j': 17 } as React.CSSProperties}>
          Entre e comece sua jornada financeira!
        </p>
      </div>

    </div>
  );
}

export default Login;