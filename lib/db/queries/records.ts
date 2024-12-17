import { eq } from 'drizzle-orm';
import { db } from '@/lib/db/client';
import { records, SelectRecord, InsertRecord } from '@/lib/db/schema';

export const recordQueries = {
    exists: async (id: string): Promise<boolean> => {
        const results = await db.select({ id: records.id })
            .from(records)
            .where(eq(records.id, id))
            .limit(1);

        return results.length > 0;
    },

    create: (account: string, amount: string, category: string, type: string, status: string) => db.insert(records)
        .values({
            account,
            amount,
            category,
            type,
            status,
        } as InsertRecord)
        .returning(),

    getById: (id: string): Promise<SelectRecord[]> => db.select()
        .from(records)
        .where(eq(records.id, id)),

    getByAccountId: (account: string): Promise<SelectRecord[]> => db.select()
        .from(records)
        .where(eq(records.account, account)),

    update: async (id: string, data: Partial<InsertRecord>) => {
        return db.update(records)
            .set(data)
            .where(eq(records.id, id));
    },

    delete: async (id: string) => {
        await db.delete(records)
            .where(eq(records.id, id));
    }
};