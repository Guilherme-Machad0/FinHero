import axios, { AxiosInstance } from 'axios';
const BASE_URL = 'http://localhost:8080/api';
const api: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// ----------------------------------------------------
// TIPAGENS (Obrigatório para TypeScript, ajuste conforme a estrutura real dos seus dados)
// ----------------------------------------------------

// Simplificado para este exemplo, você deve expandir essas interfaces
interface UserData {
    id?: string;
    name: string;
    email: string;
    password?: string;
}

interface AuthResponse {
    token: string;
    user: UserData;
}

interface Category {
    id: string;
    name: string;
}

interface Transaction {
    id?: string;
    title: string;
    value: number;
    type: 'receita' | 'despesa';
    categoryId: string;
    date: string;
    description?: string;
}

interface DuplaLink {
    linkedUserId: string;
    // Adicione mais campos, se necessário, como data de linkagem
}

// ----------------------------------------------------
// 2. LÓGICA DO SERVIÇO DE API
// ----------------------------------------------------

export const FinHeroService = {

    // --- Módulo 1: ACCOUNT (Autenticação e Usuários) ---
    account: {
        // 1. POST /api/account/register
        register: (data: UserData) => 
            api.post<AuthResponse>('/account/register', data),

        // 2. POST /api/account/login
        login: (data: Pick<UserData, 'email' | 'password'>) => 
            api.post<AuthResponse>('/account/login', data),

        // 3. GET /api/account/users
        listUsers: () => 
            api.get<UserData[]>('/account/users'),

        // 4. PUT /api/account/users/{id}
        updateUser: (id: string, data: Partial<UserData>) => 
            api.put<UserData>(`/account/users/${id}`, data),

        // 5. DELETE /api/account/users/{id}
        deleteUser: (id: string) => 
            api.delete(`/account/users/${id}`),
    },

    // --- Módulo 2: CATEGORIES ---
    categories: {
        // 6. POST /api/categories/default
        createDefault: (data: { userId: string }) => 
            api.post<Category[]>('/categories/default', data),

        // 7. GET /api/categories
        listCategories: () => 
            api.get<Category[]>('/categories'),

        // 8. DELETE /api/categories/{id}
        deleteCategory: (id: string) => 
            api.delete(`/categories/${id}`),
    },

    // --- Módulo 3: TRANSACTIONS ---
    transactions: {
        // 9. POST /api/transactions
        create: (data: Transaction) => 
            api.post<Transaction>('/transactions', data),

        // 10. GET /api/transactions
        list: () => 
            api.get<Transaction[]>('/transactions'),

        // 11. GET /api/transactions/category/{id}
        listByCategory: (id: string) => 
            api.get<Transaction[]>(`/transactions/category/${id}`),

        // 12. DELETE /api/transactions/{id}
        delete: (id: string) => 
            api.delete(`/transactions/${id}`),
    },

    // --- Módulo 4: DUPLA ---
    dupla: {
        // 13. POST /api/dupla/link/{id} (onde {id} é o ID do usuário a ser vinculado)
        link: (linkedUserId: string) => 
            api.post<DuplaLink>(`/dupla/link/${linkedUserId}`),

        // 14. GET /api/dupla/{id} (onde {id} é o ID do usuário que está buscando sua dupla)
        get: (userId: string) => 
            api.get<DuplaLink>(`/dupla/${userId}`),

        // 15. DELETE /api/dupla/{id} (onde {id} é o ID do usuário que será desvinculado)
        delete: (userId: string) => 
            api.delete(`/dupla/${userId}`),
    },
};