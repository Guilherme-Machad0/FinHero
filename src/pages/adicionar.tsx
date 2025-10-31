// src/pages/adicionar.tsx

import React, { useState, FormEvent } from 'react';
// 1. Importa useLocation para saber a rota atual
import { useNavigate, useLocation } from 'react-router-dom'; 
import Sidebar from '../components/ui/sidebar.tsx'; // ⬅️ Garante o '.tsx'

export interface TransactionForm {
    title: string;
    amount: number | ''; 
    type: 'expense' | 'income';
    category: string;
    date: string;
    description: string;
}

// 2. Assinatura de props (Recebe a função onAddTransaction)
interface AdicionarProps {
    onAddTransaction: (transaction: Omit<TransactionForm, 'amount'> & { amount: number }) => void; 
}

// 3. O componente recebe a prop onAddTransaction
const Adicionar: React.FC<AdicionarProps> = ({ onAddTransaction }) => {
    const navigate = useNavigate();
    // 4. Inicializa useLocation e pega o path
    const location = useLocation(); 
    const currentPath = location.pathname;
    
    // Configura uma função de logout simulada para a Sidebar
    const handleLogout = () => navigate('/login'); 
    
    const [form, setForm] = useState<TransactionForm>({
        title: '',
        amount: '',
        type: 'expense', // Padrão: Despesa
        category: 'Alimentação',
        date: new Date().toISOString().split('T')[0], // Data de hoje
        description: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        
        // Trata o input de número para garantir que seja um valor válido ou string vazia
        const finalValue = (type === 'number' && value !== '') ? parseFloat(value) : value;

        setForm(prev => ({
            ...prev,
            [name]: finalValue,
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        
        // Validação simples
        if (form.title.trim() === '' || form.amount === '' || form.amount <= 0) {
            alert("Por favor, preencha o Título e um Valor válido.");
            return;
        }

        // 4. Cria a transação final com o valor formatado como number
        const finalTransaction = {
            ...form,
            amount: parseFloat(form.amount.toString()), 
        };

        // 5. CHAMA A FUNÇÃO RECEBIDA POR PROPS
        onAddTransaction(finalTransaction);
        
        alert(`Transação de ${form.type === 'expense' ? 'Despesa' : 'Receita'} adicionada!`);
        navigate('/home'); 
    };

    return (
        // ⬅️ 6. Envolve todo o conteúdo com o layout principal
        <div className="app-layout"> 
            
            {/* ⬅️ 7. Renderiza a Sidebar */}
            <Sidebar onLogout={handleLogout} activePath={currentPath} /> 
            
            {/* ⬅️ 8. Renderiza o conteúdo da página dentro de <main> */}
            <main className="main-content">
                <div className="page-container add-page-container">
                    <header className="page-header">
                        <h1 className="page-title">
                            Adicionar <span className="highlight-green">Transação</span>
                        </h1>
                        <p className="page-subtitle">Registre suas receitas ou despesas rapidamente.</p>
                    </header>
                    
                    <form className="add-form" onSubmit={handleSubmit}>
                        
                        {/* 1. Tipo de Transação (Receita/Despesa) */}
                        <div className="form-group type-selector-group">
                            <label className="form-label">Tipo:</label>
                            <div className="type-toggle">
                                <button
                                    type="button"
                                    className={`type-button ${form.type === 'income' ? 'active-income' : ''}`}
                                    onClick={() => setForm({...form, type: 'income'})}
                                >
                                    Receita (+)
                                </button>
                                <button
                                    type="button"
                                    className={`type-button ${form.type === 'expense' ? 'active-expense' : ''}`}
                                    onClick={() => setForm({...form, type: 'expense'})}
                                >
                                    Despesa (-)
                                </button>
                            </div>
                        </div>

                        {/* 2. Título e Valor */}
                        <div className="form-row">
                            <div className="form-group flex-item-70">
                                <label className="form-label" htmlFor="title">Título:</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="Ex: Aluguel, Salário, Conta de Luz"
                                    required
                                />
                            </div>
                            <div className="form-group flex-item-30">
                                <label className="form-label" htmlFor="amount">Valor (R$):</label>
                                <input
                                    type="number"
                                    id="amount"
                                    name="amount"
                                    value={form.amount}
                                    onChange={handleChange}
                                    className="form-input"
                                    min="0.01"
                                    step="0.01"
                                    placeholder="0.00"
                                    required
                                />
                            </div>
                        </div>

                        {/* 3. Categoria e Data */}
                        <div className="form-row">
                            <div className="form-group flex-item-50">
                                <label className="form-label" htmlFor="category">Categoria:</label>
                                <select
                                    id="category"
                                    name="category"
                                    value={form.category}
                                    onChange={handleChange}
                                    className="form-input form-select"
                                    required
                                >
                                    <option value="Alimentação">Alimentação</option>
                                    <option value="Moradia">Moradia</option>
                                    <option value="Transporte">Transporte</option>
                                    <option value="Salário">Salário</option>
                                    <option value="Outros">Outros</option>
                                </select>
                            </div>
                            <div className="form-group flex-item-50">
                                <label className="form-label" htmlFor="date">Data:</label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={form.date}
                                    onChange={handleChange}
                                    className="form-input"
                                    required
                                />
                            </div>
                        </div>

                        {/* 4. Descrição */}
                        <div className="form-group">
                            <label className="form-label" htmlFor="description">Descrição (Opcional):</label>
                            <textarea
                                id="description"
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                className="form-input form-textarea"
                                rows={3}
                                placeholder="Detalhes sobre esta transação..."
                            />
                        </div>

                        {/* Botão de Envio */}
                        <button type="submit" className="submit-button add-transaction-button">
                            Registrar Transação
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Adicionar;