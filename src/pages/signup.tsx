// src/pages/signup.tsx

import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import GoblinMascote from '../assets/greendevil-finhero.png'; // Importe seu mascote verde

interface SignupProps {
    onSignupSuccess: () => void;
}

const Signup: React.FC<SignupProps> = ({ onSignupSuccess }) => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        setError('');
        
        // Simulação de autenticação
        if (password.length < 6) {
             setError("A senha deve ter pelo menos 6 caracteres.");
             return;
        }
        
        // Simula cadastro bem-sucedido
        onSignupSuccess(); 
        navigate('/home'); 
    };

    return (
        // Usando a classe principal para fundo e centralização
        <div className="auth-page"> 
            
            <div className="auth-container">
                
                {/* LOGO E MASCOTE */}
                <div className="signup-logo-section">
                    <h1 className="signup-logo-text">FINHERO</h1>
                    {/* Se o caminho estiver correto, a imagem será carregada */}
                    <img src={GoblinMascote} alt="Mascote FinHero" className="signup-mascot" />
                </div>

                {/* SLOGAN */}
                <p className="signup-slogan">Comece sua jornada e ganhe XP enquanto conquista seus objetivos financeiros!</p>

                {/* TÍTULO DO FORMULÁRIO */}
                <h2 className="signup-form-title">Crie sua conta</h2>

                <form onSubmit={handleSubmit}>
                    {/* Mensagem de Erro (o estilo da classe 'error-message' virá do App.css) */}
                    {error && <p className="error-message">{error}</p>}

                    <div className="signup-input-row">
                        <input
                            type="text"
                            placeholder="Nome"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="signup-input-field"
                        />
                         <input
                            type="email"
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="signup-input-field"
                        />
                    </div>
                    
                    {/* Senha (Último input que cobre a largura total) */}
                    <input
                        type="password"
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="signup-input-full-width"
                    />

                    {/* Botão START */}
                    <button type="submit" className="signup-button">
                        START
                    </button>
                </form>
            </div>

            {/* Efeito de Moedas no Rodapé */}
            <div className="coin-pattern"></div>
        </div>
    );
};

export default Signup;