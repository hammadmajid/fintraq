import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import { db } from '@/lib/db/client';
import { users } from '@/lib/db/schema';

const SALT_ROUNDS = 12;

export const userQueries = {
    exists: async (email: string): Promise<boolean> => {
        const results = await db.select({ id: users.id })
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

        return results.length > 0;
    },

    create: (fullName: string, email: string, password: string) => db.insert(users).
        values({
            fullName,
            email,
            password: bcrypt.hashSync(password, SALT_ROUNDS),
        }
        ).returning(),

    getById: (id: string) => db.select().
        from(users).
        where(eq(users.id, id)),

    getByEmail: (email: string) => db.select().
        from(users).
        where(eq(users.email, email)),

    verifyPassword: async (id: string, password: string) => {
        const [user] = await db.select({ password: users.password }).
            from(users).
            where(eq(users.id, id))

        if (!user) return false;

        return await bcrypt.compare(password, user.password);
    }
};