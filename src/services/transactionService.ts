import { TransactionData, Transaction } from '../types';

const API_BASE_URL = 'http://localhost:8080/api'; 

function getAuthHeaders() {
    const token = localStorage.getItem('authToken'); 
    if (!token) {
        throw new Error('Usuário não autenticado. Favor fazer login novamente.');
    }
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };
}

export async function addTransaction(data: TransactionData): Promise<Transaction> {
    const headers = getAuthHeaders();
    
    const response = await fetch(`${API_BASE_URL}/transactions`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Falha ao registrar a transação.');
    }

    return response.json();
}

export async function getTransactions(): Promise<Transaction[]> {
    const headers = getAuthHeaders();

    const response = await fetch(`${API_BASE_URL}/transactions`, {
        method: 'GET',
        headers: headers,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Falha ao carregar as transações.');
    }

    return response.json();
}