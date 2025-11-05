import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FinHeroService } from '../services/index';
import '../styles/AuthPage.css';
import logoDiabinho from '../assets/logo-diabinho-verde.png';
import logoDiabinhoRed from '../assets/diabo-espiando.png';

interface AuthPageProps {
  onLoginSuccess: () => void;
  onSignupSuccess: () => void;
}

// --- CONSTANTES DE TESTE (Para entrar no projeto rapidamente) ---
const TEST_EMAIL = 'teste@finhero.com';
const TEST_PASSWORD = '123456';
const TEST_TOKEN = 'fake-finhero-token-for-testing-12345';
const TEST_USER = { id: 'test-user-1', name: 'Herói Teste', email: TEST_EMAIL };

function AuthPage({ onLoginSuccess, onSignupSuccess }: AuthPageProps) {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  // 1. ESTADOS DE LOGIN
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  // 2. ESTADOS DE CADASTRO (ATUALIZADOS)
  const [registerFirstName, setRegisterFirstName] = useState('');
  const [registerLastName, setRegisterLastName] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerCPF, setRegisterCPF] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  
  // NOTE: Se você estava usando 'registerName' no seu código anterior, ele foi 
  // substituído por 'registerFirstName' e 'registerLastName'. Removi o 'registerName'.

  // --- FUNÇÕES DE SUBMISSÃO ---

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoginLoading(true);

    // ⬅️ NOVO: Lógica de Login de Teste (Offline)
    if (loginEmail === TEST_EMAIL && loginPassword === TEST_PASSWORD) {
        console.log("Login de Teste com sucesso!");
        localStorage.setItem('finhero-token', TEST_TOKEN);
        localStorage.setItem('finhero-user', JSON.stringify(TEST_USER));
        await new Promise(resolve => setTimeout(resolve, 500)); // Simula atraso
        onLoginSuccess();
        setIsLoginLoading(false);
        navigate('/home'); 
        return; 
    }
    
    // Lógica Real do Backend
    try {
      const response = await FinHeroService.account.login({
        email: loginEmail,
        password: loginPassword,
      });

      const { token, user } = response.data;
      localStorage.setItem('finhero-token', token);
      localStorage.setItem('finhero-user', JSON.stringify(user));
      
      console.log("Login Real com sucesso!");
      onLoginSuccess();
      navigate('/home');
      
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

    if (registerPassword.length < 6) {
        setRegisterError('A senha deve ter pelo menos 6 caracteres.');
        setIsRegisterLoading(false);
        return;
    }

    try {
        // ⬅️ ATUALIZAÇÃO: Enviando todos os novos campos para o Backend
        const response = await FinHeroService.account.register({
            // Concatena nome completo para o campo 'name' se o backend for Legacy
            name: `${registerFirstName} ${registerLastName}`,
            
            // Novos campos (assumindo que o backend será atualizado para recebê-los)
            firstName: registerFirstName, 
            lastName: registerLastName,
            phone: registerPhone,
            cpf: registerCPF,
            
            email: registerEmail,
            password: registerPassword,
        });

        const { token, user } = response.data;
        localStorage.setItem('finhero-token', token);
        localStorage.setItem('finhero-user', JSON.stringify(user));
        
        console.log("Cadastro com sucesso!");
        onSignupSuccess();
        navigate('/home');
        
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
    
    {/* ⬅️ Estes dois elementos criam o efeito de "caixa cinza" inclinada */}
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
        <h2 className="title animation" style={{ '--i': 0, '--j': 21 } as React.CSSProperties}>Conecte-se</h2>
        <form onSubmit={handleLoginSubmit}>
          {/* CAMPO E-MAIL */}
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
            disabled={isLoginLoading}
          >
            {isLoginLoading ? 'Carregando...' : 'Começar'} 
          </button>
          
          <div className="linkTxt animation" style={{ '--i': 5, '--j': 25 } as React.CSSProperties}>
            <p style={{ cursor: 'pointer' }} onClick={(e) => {
              e.preventDefault();
              setIsActive(true); // Alterna para Cadastro
            }}>
              Não tem conta? <a href="#" className="register-link-text" onClick={(e) => e.preventDefault()}>
                Cadastre-se
              </a>
            </p>
          </div>
        </form>
      </div>

      <div className="info-text login">
        <h2 className="animation neon-text-green" style={{ '--i': 1, '--j': 20 } as React.CSSProperties}>
          BEM-VINDO DE VOLTA!
        </h2>
        <p className="animation neon-text-green" style={{ '--i': 1, '--j': 21 } as React.CSSProperties}>
          Hora de virar mestre do orçamento!
        </p>
      </div>

      {/* --- FORMULÁRIO DE CADASTRO (Com Novos Campos) --- */}
      <div className="form-box register">
        <h2 className="title animation" style={{ '--i': 17, '--j': 0 } as React.CSSProperties}>
          Cadastro
        </h2>
        <form onSubmit={handleSignupSubmit}>
          
          {/* CAMPO: FIRST NAME (Nome) */}
          <div className="input-box animation" style={{ '--i': 18, '--j': 1 } as React.CSSProperties}>
            <input 
              type="text" 
              required 
              value={registerFirstName}
              onChange={(e) => setRegisterFirstName(e.target.value)}
            />
            <label>First name</label>
            <i className='bx bxs-user'></i>
          </div>
          
          {/* CAMPO: LAST NAME (Sobrenome) */}
          <div className="input-box animation" style={{ '--i': 19, '--j': 2 } as React.CSSProperties}>
            <input 
              type="text" 
              required 
              value={registerLastName}
              onChange={(e) => setRegisterLastName(e.target.value)}
            />
            <label>Last name</label>
            <i className='bx bxs-user-detail'></i>
          </div>
          
          {/* CAMPO: PHONE (Telefone) */}
          <div className="input-box animation" style={{ '--i': 20, '--j': 3 } as React.CSSProperties}>
            <input 
              type="tel"
              required 
              value={registerPhone}
              onChange={(e) => setRegisterPhone(e.target.value)}
            />
            <label>Phone (Número)</label>
            <i className='bx bxs-phone'></i>
          </div>
          
          {/* CAMPO: CPF */}
          <div className="input-box animation" style={{ '--i': 21, '--j': 4 } as React.CSSProperties}>
            <input 
              type="text" 
              required 
              maxLength={14}
              value={registerCPF}
              onChange={(e) => setRegisterCPF(e.target.value)}
            />
            <label>CPF</label>
            <i className='bx bxs-id-card'></i>
          </div>

          {/* CAMPO E-MAIL */}
          <div className="input-box animation" style={{ '--i': 22, '--j': 5 } as React.CSSProperties}>
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
          <div className="input-box animation" style={{ '--i': 23, '--j': 6 } as React.CSSProperties}>
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
            style={{ '--i': 24, '--j': 7 } as React.CSSProperties}
            disabled={isRegisterLoading}
          >
            {isRegisterLoading ? 'Carregando...' : 'Começar'}
          </button>
          
          <div className="linkTxt animation" style={{ '--i': 25, '--j': 8 } as React.CSSProperties}>
            <p style={{ cursor: 'pointer' }} onClick={(e) => {
              e.preventDefault();
              setIsActive(false); // Alterna para Login
            }}>
              Já tem conta?<a href="#" className="login-link-text" onClick={(e) => e.preventDefault()}>
                 Faça login!
              </a>
            </p>
          </div>
        </form>
      </div>

      <div className="info-text register">
        <h2 className="animation neon-text-red" style={{ '--i': 17, '--j': 0 } as React.CSSProperties}>
          OLÁ, HERÓI!
        </h2>
        <p className="animation neon-text-red" style={{ '--i': 18, '--j': 1 } as React.CSSProperties}>
          Entre e comece sua jornada financeira!
        </p>
      </div>

    </div>
  );
}

export default AuthPage;