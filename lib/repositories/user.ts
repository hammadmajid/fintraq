import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import type { User } from '@/lib/schemas/auth';

export class UserRepository {
    private sql: typeof sql;
    private SALT_ROUNDS = 12;

    constructor(sqlInstance: typeof sql) {
        this.sql = sqlInstance;
    }

    async exists(email: string): Promise<boolean> {
        const result = await this.sql`
            SELECT COUNT(*) as count
            FROM users
            WHERE email = ${email}
        `;
        return result.rows[0].count > 0;
    }

    async create(fullName: string, email: string, password: string): Promise<User> {
        const user: User = {
            id: uuidv4(),
            fullName,
            email,
            createdAt: new Date(),
        };

        const hashedPassword = await bcrypt.hash(password, this.SALT_ROUNDS);

        await this.sql`
            INSERT INTO users (id, full_name, email, password, created_at)
            VALUES (${user.id}, ${user.fullName}, ${user.email}, ${hashedPassword}, ${user.createdAt.toISOString()})
        `;

        return user;
    }

    async getById(id: string): Promise<User | null> {
        const result = await this.sql`
            SELECT id, full_name, email, created_at
            FROM users
            WHERE id = ${id}
        `;

        if (result.rows.length === 0) {
            return null;
        }

        return {
            id: result.rows[0].id,
            fullName: result.rows[0].full_name,
            email: result.rows[0].email,
            createdAt: new Date(result.rows[0].created_at),
        };
    }

    async getByEmail(email: string): Promise<User | null> {
        const result = await this.sql`
            SELECT id, full_name, email, created_at
            FROM users
            WHERE email = ${email}
        `;

        if (result.rows.length === 0) {
            return null;
        }

        return {
            id: result.rows[0].id,
            fullName: result.rows[0].full_name,
            email: result.rows[0].email,
            createdAt: new Date(result.rows[0].created_at),
        };
    }

    async verifyPassword(id: string, password: string): Promise<boolean> {
        const result = await this.sql`
            SELECT password
            FROM users
            WHERE id = ${id}
        `;

        if (result.rows.length === 0) {
            return false;
        }

        const dbPassword = result.rows[0].password;
        return await bcrypt.compare(password, dbPassword);
    }
}