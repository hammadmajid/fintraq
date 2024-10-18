export interface Session {
    id: string,
    userId: string,
    token: string,
    createdAt: Date,
    expiresAt: Date,
}

export interface User {
    id: string,
    fullName: string,
    email: string,
    createdAt: Date,
}