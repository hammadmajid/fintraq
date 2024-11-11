import { eq } from 'drizzle-orm';
import { db } from '@/lib/db/client';
import { accounts, SelectAccount, InsertAccount } from '@/lib/db/schema';

export const accountQueries = {
    exists: async (id: string): Promise<boolean> => {
        const results = await db.select({ id: accounts.id })
            .from(accounts)
            .where(eq(accounts.id, id))
            .limit(1);

        return results.length > 0;
    },

    create: (userId: string, title: string, description: string, icon: string, color: string, type: string) => db.insert(accounts)
        .values({
            userId,
            title,
            description,
            icon,
            color,
            type,
        } as InsertAccount)
        .returning(),

    getById: (id: string): Promise<SelectAccount[]> => db.select()
        .from(accounts)
        .where(eq(accounts.id, id)),

    getByUserId: (userId: string): Promise<SelectAccount[]> => db.select()
        .from(accounts)
        .where(eq(accounts.userId, userId)),

    update: async (id: string, data: Partial<InsertAccount>) => {
        return db.update(accounts)
            .set(data)
            .where(eq(accounts.id, id));
    },

    delete: async (id: string) => {
        await db.delete(accounts)
            .where(eq(accounts.id, id));
    }
};