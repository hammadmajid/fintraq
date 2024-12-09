/**
 * @swagger
 * tags:
 *   name: Account
 *   description: API endpoints for managing user accounts
 */

/**
 * @swagger
 * /api/v1/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [Account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: Full name of the user
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: Email address of the user
 *                 example: john.doe@example.com
 *               bio:
 *                 type: string
 *                 description: Short biography of the user
 *                 example: Software developer with 10 years of experience
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Profile updated successfully
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       path:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["fullName"]
 *                       message:
 *                         type: string
 *                         example: Full name must be at least 2 characters long
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */

/**
 * @swagger
 * /api/v1/profile:
 *   delete:
 *     summary: Delete user account
 *     tags: [Account]
 *     responses:
 *       200:
 *         description: User account deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred during user deletion.
 */

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { userQueries } from '@/lib/db/queries/users';
import { getUserId } from '@/app/utils';
import { cookies } from 'next/headers';

const ProfileUpdateSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  bio: z.string().max(1200).optional(),
});

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const validatedData = ProfileUpdateSchema.parse(body);

    const userId = await getUserId();

    // Update the user's profile in the database
    await userQueries.updateProfile(userId, validatedData);

    return NextResponse.json({ message: 'Profile updated successfully' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error('Error updating profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const cookie = (await cookies()).get('session');
    if (!cookie) {
      return errorResponse('Unauthorized', 401);
    }

    const [sessionToken, userId] = cookie.value.split(':');
    if (!sessionToken || !userId) {
      return errorResponse('Unauthorized', 401);
    }

    await userQueries.delete(userId);

    (await cookies()).set('session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: -1, // Expire the cookie
      path: '/',
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Error in user deletion:', error);
    return errorResponse('An error occurred during user deletion.', 500);
  }
}

function errorResponse(message: string, status: number): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}