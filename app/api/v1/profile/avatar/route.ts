import { put, del, list } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { userQueries } from '@/lib/db/queries/users';

// Define the maximum file size (5MB in bytes)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Define the schema for the request
const UploadSchema = z.object({
    userId: z.string().uuid(),
    file: z.instanceof(File).refine(
        (file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
        'File must be a valid image (JPEG, PNG, or WebP)'
    ).refine(
        (file) => file.size <= MAX_FILE_SIZE,
        `File size must be less than or equal to ${MAX_FILE_SIZE / (1024 * 1024)}MB`
    ),
});

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const userId = formData.get('userId') as string;
        const file = formData.get('file') as File;

        // Validate the input
        const validatedData = UploadSchema.parse({ userId, file });

        // Check if the user exists
        const userExists = await userQueries.existsById(validatedData.userId);
        if (!userExists) {
            return NextResponse.json({ error: 'User not found.' }, { status: 404 });
        }

        const pathname = `avatars/${validatedData.userId}`;

        // List and delete old avatars
        const { blobs } = await list({ prefix: pathname });
        if (blobs.length > 0) {
            await del(blobs.map(blob => blob.url));
        }

        // Upload new avatar
        const blob = await put(pathname, validatedData.file, {
            access: 'public',
            addRandomSuffix: false,
            contentType: validatedData.file.type,
        });

        // Update the user's profile picture URL in the database
        await userQueries.updateProfilePicture(validatedData.userId, blob.url);

        return NextResponse.json(blob);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors }, { status: 400 });
        }
        console.error('Error uploading file:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}