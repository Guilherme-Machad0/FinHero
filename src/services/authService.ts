import { LoginData, SignupData, AuthResponse } from '../types/authTypes.ts';

const API_BASE_URL = 'http://localhost:8080/api'; 

async function handleRequest(endpoint: string, options: RequestInit): Promise<any> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        const status = response.status;
        let message = errorData.message || `Erro de rede ou servidor (${status}).`;

        if (status === 401 || status === 403) {
            message = 'Credenciais inválidas ou acesso negado.';
        }
        
        throw new Error(message);
    }

    return response.json();
}

export async function login(data: LoginData): Promise<AuthResponse> {
    return handleRequest('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
}

export async function signup(data: SignupData): Promise<AuthResponse> {
    return handleRequest('/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
}