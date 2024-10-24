import { sessionQueries } from '@/lib/db/queries/session';
import { userQueries } from '@/lib/db/queries/users';
import { signInForm } from '@/lib/schemas/auth';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        const { email, password } = signInForm.parse(await request.json());

        const [user] = await userQueries.getByEmail(email);

        if (!user || !await userQueries.verifyPassword(user.id, password)) {
            return errorResponse('Invalid email or password.', 400);
        }

        const [session] = await sessionQueries.create(user.id);

        // Combine session token and user ID
        const cookieValue = `${session.token}:${user.id}`;

        cookies().set('session', cookieValue, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
        });

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error('Error in user sign in:', error);
        return errorResponse('An error occurred during sign in.', 500);
    }
}

function errorResponse(message: string, status: number): Response {
    return new Response(JSON.stringify({ error: message }), {
        status,
        headers: { 'Content-Type': 'application/json' }
    });
}