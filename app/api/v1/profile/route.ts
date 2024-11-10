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