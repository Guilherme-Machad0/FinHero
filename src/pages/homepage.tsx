import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/ui/sidebar.tsx';
import { TransactionForm } from './adicionar.tsx'; 

interface Transaction extends TransactionForm {
    id: string; 
}

interface HomepageProps {
    onLogout: () => void;
    transactions: Transaction[];
}

interface TransactionCardProps {
    title: string;
    category: string;
    amount: number;
    type: 'income' | 'expense';
    date: string;
}

const TransactionCard: React.FC<TransactionCardProps> = ({ title, category, amount, type, date }) => {
    const formattedAmount = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(amount);

    const [year, month, day] = date.split('-');
    const formattedDate = `${day}/${month}`;
    
    const colorClass = type === 'income' ? 'income-color' : 'expense-color';
    const sign = type === 'income' ? '+' : '-';

    return (
        <div className="transaction-card">
            <div className="transaction-details">
                <span className="transaction-title">{title}</span>
                <span className="transaction-category">{category}</span>
            </div>
            <div className="transaction-amount-info">
                <span className={`transaction-amount ${colorClass}`}>
                    {sign} {formattedAmount}
                </span>
                <span className="transaction-date">{formattedDate}</span>
            </div>
        </div>
    );
};

const Homepage: React.FC<HomepageProps> = ({ onLogout, transactions }) => {
    const location = useLocation();
    const currentPath = location.pathname;
    const userName = "Guilherme";

    const totalIncome = transactions
        .filter(tx => tx.type === 'income')
        .reduce((sum, tx) => sum + tx.amount, 0);

    const totalExpense = transactions
        .filter(tx => tx.type === 'expense')
        .reduce((sum, tx) => sum + tx.amount, 0);

    const currentBalance = totalIncome - totalExpense;

    const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);


    return (
        <div className="app-layout"> 
            
            <Sidebar onLogout={onLogout} activePath={currentPath} />

            <main className="main-content">
                
                <header className="content-header">
                    <h2 className="user-greeting">
                        Olá, <span className="highlight-name">{userName}</span>!
                    </h2>
                    <p className="summary-text">
                        Seu resumo financeiro e últimas movimentações.
                    </p>
                </header>
                
                <section className="dashboard-widgets-area">
                    
                    <div className="status-card">
                        <h3>Status Financeiro</h3>
                        <div className="status-detail">
                            <p>Saldo Atual:</p>
                            <span className="saldo-value">{formatCurrency(currentBalance)}</span>
                        </div>
                        <div className="status-detail">
                            <p>Receitas Totais:</p>
                            <span className="saldo-value">+ {formatCurrency(totalIncome)}</span>
                        </div>
                        <div className="status-detail">
                            <p>Despesas Totais:</p>
                            <span className="xp-value">- {formatCurrency(totalExpense)}</span>
                        </div>
                    </div>
                    

                    <div className="transactions-list-card">
                        <h3>Últimas Transações</h3>
                        
                        <div className="transaction-list-container">
                            {transactions.length > 0 ? (
                                transactions.map((tx) => (
                                    <TransactionCard 
                                        key={tx.id}
                                        title={tx.title}
                                        category={tx.category}
                                        amount={tx.amount}
                                        type={tx.type}
                                        date={tx.date}
                                    />
                                ))
                            ) : (
                                <p className="summary-text" style={{textAlign: 'center', marginTop: '30px'}}>
                                    Nenhuma transação registrada. Comece a adicionar uma na aba "Adicionar"!
                                </p>
                            )}
                        </div>
                    </div>

                </section>
            </main>
        </div>
    );
};

export default Homepage;