// src/pages/login.tsx (ou src/components/Login.tsx)

import React, { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importa Link e 
import { colors ,layout}from '../../styles/themes.ts'


interface LoginProps {
    onLogin: () => void; // Função para ser chamada quando o login for bem-sucedido
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate(); // Hook para navegação programática

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault(); // Previne o recarregamento da página
        setError(''); // Limpa mensagens de erro anteriores

        // Lógica de autenticação (Exemplo: credenciais fixas)
        if (email === "teste@finhero.com" && password === "123") {
            onLogin(); // Chama a função de login bem-sucedido passada via props
            navigate('/home'); // Redireciona para a página inicial
        } else {
            setError("E-mail ou senha incorretos. Tente 'teste@finhero.com' e '123'.");
        }
    };

    return (
        // O elemento pai (div com id="login-page") terá os estilos de fundo
        // e centralização aplicados via CSS global (App.css ou index.css)
        <div className="login-page"> 
            
            {/* Ícones do FinHero - Você pode substituir por imagens reais (assets) */}
            <div className="logo-section">
                <img src="/src/assets/finhero_icon_left.png" alt="FinHero Green Mascot" className="mascot-left" /> {/* Exemplo de como usar uma imagem */}
                <h1 className="logo-text">FINHERO</h1>
                <img src="/src/assets/finhero_icon_right.png" alt="FinHero Red Mascot" className="mascot-right" /> {/* Exemplo de como usar uma imagem */}
            </div>

            {/* Mensagens de Boas-vindas */}
            <p className="slogan">Hora de virar mestres do orçamento!</p>
            <p className="tagline">Ganhe XP com cada boa decisão.</p>

            {/* Seção de Formulário */}
            <div className="login-form-section">
                <h2 className="form-title">Acesse sua conta</h2>

                <form onSubmit={handleSubmit}>
                    {/* Mensagem de Erro */}
                    {error && <p className="error-message">{error}</p>}

                    {/* Input de E-mail */}
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="input-field"
                    />

                    {/* Input de Senha */}
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input-field"
                    />

                    {/* Link para Esqueceu a Senha */}
                    <p className="forgot-password">
                        Esqueceu sua senha? <Link to="/reset-password">Resete aqui</Link>
                    </p>

                    {/* Botão de Login */}
                    <button type="submit" className="login-button">
                        START
                    </button>
                </form>

                {/* Link para Cadastro */}
                <p className="signup-text">
                    Não tem conta? <Link to="/signup" className="signup-link">Cadastre-se</Link>
                </p>
            </div>

            {/* Efeito de Moedas no Rodapé */}
            <div className="coin-pattern"></div>
        </div>
    );
};

export default Login;