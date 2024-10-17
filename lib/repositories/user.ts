import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import type { User } from '@/lib/schemas/auth/types';

export class UserRepository {
    private sql: typeof sql;
    private SALT_ROUNDS = 12;

    constructor(sqlInstance: typeof sql) {
        this.sql = sqlInstance;
    }

    async exists(email: string): Promise<boolean> {
        try {
            const result = await this.sql`
        SELECT COUNT(*) as count
        FROM users
        WHERE email = ${email}
      `;
            return result.rows[0].count > 0;
        } catch (error) {
            console.error('Error checking if user exists:', error);
            throw new Error('Failed to check if user exists');
        }
    }

    async create(email: string, password: string): Promise<User> {
        try {
            const user: User = {
                id: uuidv4(),
                email,
                createdAt: new Date(),
            };

            const hashedPassword = await bcrypt.hash(password, this.SALT_ROUNDS);

            await this.sql`
        INSERT INTO users (id, email, password, created_at)
        VALUES (${user.id}, ${user.email}, ${hashedPassword}, ${user.createdAt.toISOString()})
      `;

            return user;
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('Failed to create user');
        }
    }

    async getById(id: string): Promise<User | null> {
        try {
            const result = await this.sql`
        SELECT id, email, created_at
        FROM users
        WHERE id = ${id}
      `;

            if (result.rows.length === 0) {
                return null;
            }

            return {
                id: result.rows[0].id,
                email: result.rows[0].email,
                createdAt: new Date(result.rows[0].created_at),
            };
        } catch (error) {
            console.error('Error getting user by ID:', error);
            throw new Error('Failed to get user by ID');
        }
    }

    async getByEmail(email: string): Promise<User | null> {
        try {
            const result = await this.sql`
        SELECT id, email, created_at
        FROM users
        WHERE email = ${email}
      `;

            if (result.rows.length === 0) {
                return null;
            }

            return {
                id: result.rows[0].id,
                email: result.rows[0].email,
                createdAt: new Date(result.rows[0].created_at),
            };
        } catch (error) {
            console.error('Error getting user by email:', error);
            throw new Error('Failed to get user by email');
        }
    }
}