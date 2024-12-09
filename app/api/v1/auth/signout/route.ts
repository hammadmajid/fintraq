/**
 * @swagger
 * /api/v1/auth/signout:
 *   post:
 *     summary: Sign out the user by deleting the session cookie
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Successfully signed out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 */

import { cookies } from 'next/headers';

export async function POST() {
  (await cookies()).delete('session');

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}