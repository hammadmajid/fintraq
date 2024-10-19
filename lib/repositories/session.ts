import { sql } from '@vercel/postgres';
import { v4 as uuidv4 } from 'uuid';
import type { Session } from '@/lib/schemas/auth/types';

export class SessionRepository {
    private sql: typeof sql;
    private SESSION_DURATION = 12 * 60 * 60 * 1000; // 12 hours in milliseconds

    constructor(sqlInstance: typeof sql) {
        this.sql = sqlInstance;
    }

    async create(userId: string): Promise<Session> {
        const session: Session = {
            userId,
            token: uuidv4(),
            createdAt: new Date(),
            expiresAt: new Date(Date.now() + this.SESSION_DURATION),
        };

        await this.sql`
      INSERT INTO sessions (user_id, token, created_at, expires_at)
      VALUES (${session.userId}, ${session.token}, ${session.createdAt.toISOString()}, ${session.expiresAt.toISOString()})
    `;

        return session;
    }

    async getByToken(token: string): Promise<Session | null> {
        const result = await this.sql`
      SELECT user_id, token, created_at, expires_at
      FROM sessions
      WHERE token = ${token} AND expires_at > NOW()
    `;

        if (result.rows.length === 0) {
            return null;
        }

        return {
            userId: result.rows[0].user_id,
            token: result.rows[0].token,
            createdAt: new Date(result.rows[0].created_at),
            expiresAt: new Date(result.rows[0].expires_at),
        };
    }

    async extendSession(token: string): Promise<Session> {
        const newExpiresAt = new Date(Date.now() + this.SESSION_DURATION);

        await this.sql`
      UPDATE sessions
      SET expires_at = ${newExpiresAt.toISOString()}
      WHERE token = ${token}
    `;

        const updatedSession = await this.getByToken(token);
        if (!updatedSession) {
            throw new Error('Failed to extend session');
        }

        return updatedSession;
    }

    async deleteByToken(token: string): Promise<void> {
        await this.sql`
      DELETE FROM sessions
      WHERE token = ${token}
    `;
    }

    async deleteExpiredSessions(): Promise<void> {
        await this.sql`
      DELETE FROM sessions
      WHERE expires_at <= NOW()
    `;
    }
}