import { createAccountSchema } from '@/lib/schemas/account';
import { cookies } from 'next/headers';
import { accountQueries } from '@/lib/db/queries/accounts';

export async function POST(request: Request) {
    try {
        const { userId, title, color, type, icon, description, balance } = createAccountSchema.parse(await request.json());

        // TODO: verify that userId is valid

        const [account] = await accountQueries.create(userId, title, description, icon, color, type, String(balance));

        return new Response(JSON.stringify({ success: true, account }), { status: 201 });
    } catch (error) {
        console.error('Error in account creation:', error);
        return errorResponse('An error occurred during account creation.', 500);
    }
}

function errorResponse(message: string, status: number): Response {
    return new Response(JSON.stringify({ error: message }), {
        status,
        headers: { 'Content-Type': 'application/json' }
    });
}