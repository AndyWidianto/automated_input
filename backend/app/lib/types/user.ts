

export interface UpdateUser {
    name?: string;
    email?: string;
    password?: string;
    usedExcel?: number;
}

export interface User {
    id: string;
    name: string;
    email: string;
    plan: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}