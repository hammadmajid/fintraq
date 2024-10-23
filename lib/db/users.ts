import { eq, sql } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import { db } from '@/lib/db';
import { users } from '@/lib/schemas/db';

const SALT_ROUNDS = 12;

export const userQueries = {
    exists: (email: string) =>
        db.select({ count: sql`count(*)` }).
            from(users).
            where(eq(users.email, email)),

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