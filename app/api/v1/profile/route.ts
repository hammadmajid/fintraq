import { NextResponse } from 'next/server';
import { z } from 'zod';
import { userQueries } from '@/lib/db/queries/users';
import { getUserId } from '@/app/utils';

const ProfileUpdateSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  bio: z.string().max(1200).optional(),
});

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const validatedData = ProfileUpdateSchema.parse(body);

    const userId = getUserId();

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