import { signUpForm } from '@/lib/schemas/auth';
import { cookies } from 'next/headers';
import { sessionQueries } from '@/lib/db/queries/session';
import { userQueries } from '@/lib/db/queries/users';
import { UAParser } from 'ua-parser-js';

export async function POST(request: Request) {
	try {
		const { firstName, lastName, email, password } = signUpForm.parse(await request.json());
		const fullName = firstName + " " + lastName;

		if (await userQueries.exists(email)) {
			return errorResponse('User with this email already exists.', 400);
		}

		const [user] = await userQueries.create(fullName, email, password);

		const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('remote-addr') || 'unknown';
		const userAgent = request.headers.get('user-agent') || 'unknown';

		const parser = new UAParser();
		const uaResult = parser.setUA(userAgent).getResult();
		const browserName = uaResult.browser.name || 'unknown';

		const [session] = await sessionQueries.create(user.id, ipAddress, browserName);

		// Combine session token and user ID
		const cookieValue = `${session.token}:${user.id}`;

		cookies().set('session', cookieValue, {
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