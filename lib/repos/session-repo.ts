import { sql } from '@vercel/postgres';
import { v4 as uuidv4 } from 'uuid';
import type { Session } from '@/lib/types';

export class SessionRepository {
    private sql: typeof sql;
    private SESSION_DURATION = 12 * 60 * 60 * 1000; // 12 hours in milliseconds

    constructor(sqlInstance: typeof sql) {
        this.sql = sqlInstance;
    }

    async create(userId: string): Promise<Session> {
        try {
            const session: Session = {
                id: uuidv4(),
                userId,
                token: uuidv4(),
                createdAt: new Date(),
                expiresAt: new Date(Date.now() + this.SESSION_DURATION),
            };

            await this.sql`
        INSERT INTO sessions (id, user_id, token, created_at, expires_at)
        VALUES (${session.id}, ${session.userId}, ${session.token}, ${session.createdAt.toISOString()}, ${session.expiresAt.toISOString()})
      `;

            return session;
        } catch (error) {
            console.error('Error creating session:', error);
            throw new Error('Failed to create session');
        }
    }

    async getByToken(token: string): Promise<Session | null> {
        try {
            const result = await this.sql`
        SELECT id, user_id, token, created_at, expires_at
        FROM sessions
        WHERE token = ${token} AND expires_at > NOW()
      `;

            if (result.rows.length === 0) {
                return null;
            }

            return {
                id: result.rows[0].id,
                userId: result.rows[0].user_id,
                token: result.rows[0].token,
                createdAt: new Date(result.rows[0].created_at),
                expiresAt: new Date(result.rows[0].expires_at),
            };
        } catch (error) {
            console.error('Error getting session by token:', error);
            throw new Error('Failed to get session by token');
        }
    }

    async deleteByUserId(userId: string): Promise<void> {
        try {
            await this.sql`
        DELETE FROM sessions
        WHERE user_id = ${userId}
      `;
        } catch (error) {
            console.error('Error deleting sessions for user:', error);
            throw new Error('Failed to delete sessions for user');
        }
    }

    async deleteExpiredSessions(): Promise<void> {
        try {
            await this.sql`
        DELETE FROM sessions
        WHERE expires_at <= NOW()
      `;
        } catch (error) {
            console.error('Error deleting expired sessions:', error);
            throw new Error('Failed to delete expired sessions');
        }
    }
}