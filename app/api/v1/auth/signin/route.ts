import { sql } from '@vercel/postgres';
import { UserRepository } from '@/lib/repositories/user';
import { SessionRepository } from '@/lib/repositories/session';
import { signInForm } from '@/lib/schemas/auth/zod';

export async function POST(request: Request) {
    try {
        const { email, password } = signInForm.parse(await request.json());

        const userRepo = new UserRepository(sql);
        const sessionRepo = new SessionRepository(sql);

        // Start transaction
        await sql`BEGIN`;

        try {
            const user = await userRepo.getByEmail(email);

            if (!user) {
                return errorResponse('Invalid email.', 400);
            }

            if (!await userRepo.verifyPassword(user.id, password)) {
                return errorResponse('Invalid password.', 400);

            }

            const session = await sessionRepo.create(user.id);

            // If we get here, both operations succeeded, so commit the transaction
            await sql`COMMIT`;

            return new Response(JSON.stringify({ session }), { status: 201 });
        } catch (error) {
            // If any operation fails, roll back the transaction
            await sql`ROLLBACK`;
            throw error; // Re-throw to be caught by outer try-catch
        }
    } catch (error) {
        console.error('Error in user registration:', error);
        return errorResponse('An error occurred during registration.', 500);
    }
}

function errorResponse(message: string, status: number): Response {
    return new Response(JSON.stringify({ error: message }), {
        status,
        headers: { 'Content-Type': 'application/json' }
    });
}