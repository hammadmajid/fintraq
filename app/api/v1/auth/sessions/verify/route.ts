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