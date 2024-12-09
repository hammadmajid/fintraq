/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: User with this email already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User with this email already exists.
 *       500:
 *         description: An error occurred during registration
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred during registration.
 */

import { signUpForm } from '@/lib/schemas/auth';
import { cookies } from 'next/headers';
import { sessionQueries } from '@/lib/db/queries/session';
import { userQueries } from '@/lib/db/queries/users';
import { UAParser } from 'ua-parser-js';

export async function POST(request: Request) {
	try {
		const { firstName, lastName, email, password } = signUpForm.parse(await request.json());
		const fullName = firstName + " " + lastName;

		if (await userQueries.existsByEmail(email)) {
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

		(await cookies()).set('session', cookieValue, {
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