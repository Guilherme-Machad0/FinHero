// Tipos de Autenticação (adaptar conforme seu backend)
export interface LoginData {
    email: string;
    password: string;
}

export interface SignupData extends LoginData {
    name: string;
}

export interface AuthResponse {
    user: {
        id: string;
        name: string;
        email: string;
        // ... outros dados do usuário
    };
    token: string;
}

// Tipos de Transação
export interface TransactionData {
    title: string;
    value: number;
    category: string;
    date: string; // Ex: '2025-10-31'
    description?: string;
    type: 'RECEITA' | 'DESPESA'; // Para diferenciar Receita (+) e Despesa (-)
}

export interface Transaction extends TransactionData {
    id: string;
    // ... outros campos do banco de dados
}