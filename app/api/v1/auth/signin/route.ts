/**
 * @swagger
 * /api/v1/auth/signin:
 *   post:
 *     summary: Sign in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address
 *               password:
 *                 type: string
 *                 description: The user's password
 *     responses:
 *       200:
 *         description: Successful sign in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the sign in was successful
 *       400:
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: An error occurred during sign in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */

import { sessionQueries } from '@/lib/db/queries/session';
import { userQueries } from '@/lib/db/queries/users';
import { signInForm } from '@/lib/schemas/auth';
import { cookies } from 'next/headers';
import { UAParser } from 'ua-parser-js';

export async function POST(request: Request) {
    try {
        const { email, password } = signInForm.parse(await request.json());

        const [user] = await userQueries.getByEmail(email);

        if (!user || !(await userQueries.verifyPassword(user.id, password))) {
            return errorResponse('Invalid email or password.', 400);
        }

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