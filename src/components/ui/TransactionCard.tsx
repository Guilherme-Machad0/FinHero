// src/components/ui/transactionCard.tsx

import React from 'react';

// Tipos de transação para controle de cor
type TransactionType = 'expense' | 'income';

interface TransactionCardProps {
    title: string;
    category: string;
    amount: number;
    type: TransactionType;
    date: string;
}

const TransactionCard: React.FC<TransactionCardProps> = ({ 
    title, 
    category, 
    amount, 
    type, 
    date 
}) => {
    // Determina o sinal e a classe de cor com base no tipo
    const sign = type === 'expense' ? '-' : '+';
    // Classe de cor: 'expense-color' será vermelho, 'income-color' será verde
    const amountClass = type === 'expense' ? 'expense-color' : 'income-color';

    // Formata o valor para Real Brasileiro (R$)
    const formattedAmount = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(amount);

    return (
        <div className="transaction-card">
            
            {/* Seção da Esquerda: Título e Categoria */}
            <div className="transaction-info">
                <h4 className="transaction-title">{title}</h4>
                <p className="transaction-category">{category}</p>
            </div>
            
            {/* Seção da Direita: Valor e Data */}
            <div className="transaction-details">
                <span className={`transaction-amount ${amountClass}`}>
                    {sign} {formattedAmount}
                </span>
                <p className="transaction-date">{date}</p>
            </div>
            
        </div>
    );
};

export default TransactionCard;