import { signUpForm } from '@/lib/schemas/auth';
import { cookies } from 'next/headers';
import { sessionQueries } from '@/lib/db/queries/session';
import { userQueries } from '@/lib/db/queries/users';

export async function POST(request: Request) {
	try {
		const { firstName, lastName, email, password } = signUpForm.parse(await request.json());
		const fullName = firstName + " " + lastName;

		if (await userQueries.exists(email)) {
			return errorResponse('User with this email already exists.', 400);
		}

		const [user] = await userQueries.create(fullName, email, password);
		const [session] = await sessionQueries.create(user.id);

		cookies().set('session_token', session.token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 7, // 1 week
			path: '/',
		});

		return new Response(JSON.stringify({ success: true }), { status: 201 });
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