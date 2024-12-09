/**
 * @swagger
 * /api/v1/auth/sessions/getall:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Retrieve all sessions for a user
 *     description: Fetches all sessions associated with a given user ID.
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose sessions are to be retrieved.
 *     responses:
 *       200:
 *         description: A list of sessions for the specified user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SelectSession'
 *       400:
 *         description: Invalid userId provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid userId
 *       500:
 *         description: An error occurred while fetching sessions.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while fetching sessions
 */

export const dynamic = 'force-dynamic';

import { sessionQueries } from '@/lib/db/queries/session';
import { z } from 'zod';
import { SelectSession } from '@/lib/db/schema';

const schema = z.object({
  userId: z.string(),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const result = schema.safeParse({ userId: searchParams.get('userId') });

    if (!result.success) {
      return new Response(JSON.stringify({
        error: "Invalid userId",
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { userId } = result.data;

    const sessions: SelectSession[] = await sessionQueries.getAll(userId);

    return new Response(JSON.stringify(sessions), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({
      error: "An error occurred while fetching sessions",
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}