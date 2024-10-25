import { eq, gt, and } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import { db } from '@/lib/db/client';
import { sessions } from '@/lib/db/schema';
import type { InsertSession } from "@/lib/db/schema";

const SESSION_DURATION = 12 * 60 * 60 * 1000; // 12 hours in milliseconds

export const sessionQueries = {
    create: (userId: string, ipAddress: string, device: string) => {
        const session: InsertSession = {
            userId,
            token: uuidv4(),
            createdAt: new Date(),
            expiresAt: new Date(Date.now() + SESSION_DURATION),
            ipAddress,
            device,
        };

        return db.insert(sessions).values(session).returning();
    },

    getByToken: (token: string) =>
        db.select()
            .from(sessions)
            .where(and(eq(sessions.token, token), gt(sessions.expiresAt, new Date()))),

    extendSession: (token: string) => {
        const newExpiresAt = new Date(Date.now() + SESSION_DURATION);
        return db.update(sessions)
            .set({ expiresAt: newExpiresAt })
            .where(eq(sessions.token, token))
            .returning();
    },

    deleteByToken: (token: string) =>
        db.delete(sessions)
            .where(eq(sessions.token, token)),

    deleteExpiredSessions: () =>
        db.delete(sessions)
            .where(gt(sessions.expiresAt, new Date())),
};