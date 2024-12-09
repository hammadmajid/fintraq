/**
 * @swagger
 * /api/v1/auth/sessions/verify:
 *   post:
 *     summary: Verify a session token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: The session token to verify
 *             required:
 *               - token
 *     responses:
 *       200:
 *         description: Session verification result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 valid:
 *                   type: boolean
 *                   description: Indicates if the session is valid
 *                 session:
 *                   type: object
 *                   description: The session details (if valid)
 *                   properties:
 *                     userId:
 *                       type: string
 *                     token:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     expiresAt:
 *                       type: string
 *                       format: date-time
 *                     ipAddress:
 *                       type: string
 *                     device:
 *                       type: string
 *                 error:
 *                   type: string
 *                   description: Error message (if any)
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                 details:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       path:
 *                         type: array
 *                         items:
 *                           type: string
 *                       message:
 *                         type: string
 *       500:
 *         description: Internal server error
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
import { z } from 'zod';
import { SelectSession } from '@/lib/db/schema';

const schema = z.object({
    token: z.string(),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const result = schema.safeParse(body);

        if (!result.success) {
            return new Response(JSON.stringify({
                error: "Invalid token",
                details: result.error.issues,
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const { token } = result.data;

        const sessions: SelectSession[] = await sessionQueries.getByToken(token);

        if (sessions.length === 0) {
            return new Response(JSON.stringify({
                valid: false,
                error: "Session not found",
            }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const session = sessions[0];
        const now = new Date();

        if (now > session.expiresAt) {
            return new Response(JSON.stringify({
                valid: false,
                error: "Session has expired",
            }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Optionally extend the session
        await sessionQueries.extendSession(token);

        return new Response(JSON.stringify({
            valid: true,
            session: {
                userId: session.userId,
                token: session.token,
                createdAt: session.createdAt,
                expiresAt: session.expiresAt,
                ipAddress: session.ipAddress,
                device: session.device,
            },
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({
            error: "An error occurred while verifying the session",
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}