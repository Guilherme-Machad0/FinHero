import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import GoblinMascote from '../assets/logo-diabinho-verde.png';

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
        
        if (password.length < 6) {
             setError("A senha deve ter pelo menos 6 caracteres.");
             return;
        }
        
        onSignupSuccess(); 
        navigate('/home'); 
    };

    return (
        <div className="auth-page"> 
            
            <div className="auth-container">
                
                <div className="signup-logo-section">
                    <h1 className="signup-logo-text">FINHERO</h1>
                    <img src={GoblinMascote} alt="Mascote FinHero" className="signup-mascot" />
                </div>

                <p className="signup-slogan">Comece sua jornada e ganhe XP enquanto conquista seus objetivos financeiros!</p>

                <h2 className="signup-form-title">Crie sua conta</h2>

                <form onSubmit={handleSubmit}>
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
                    
                    <input
                        type="password"
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="signup-input-full-width"
                    />

                    <button type="submit" className="signup-button">
                        START
                    </button>
                </form>
            </div>

            <div className="coin-pattern"></div>
        </div>
    );
};

export default Signup;