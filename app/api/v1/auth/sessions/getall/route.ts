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

    const sessions: SelectSession[] = await sessionQueries.getAllByUserId(userId);

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