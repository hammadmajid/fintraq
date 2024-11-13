import { createAccountSchema } from '@/lib/schemas/account';
import { accountQueries } from '@/lib/db/queries/accounts';
import { userQueries } from '@/lib/db/queries/users';
import { sessionQueries } from '@/lib/db/queries/session';
import { getSession } from '@/app/utils';

export async function POST(request: Request) {
    try {
        const { userId, title, color, type, icon, description, balance } = createAccountSchema.parse(await request.json());

        const [session] = await sessionQueries.getByToken(await getSession());
        const userExists = await userQueries.existsById(userId);

        if (!session || !userExists) {
            return errorResponse("Unauthorized", 401);
        }

        const [account] = await accountQueries.create(userId, title, description, icon, color, type, String(balance));

        return new Response(JSON.stringify({ success: true, account }), { status: 201 });
    } catch (error) {
        console.error('Error in account creation:', error);
        return errorResponse('An error occurred during account creation.', 500);
    }
}

export async function DELETE(request: Request) {
    try {
        const { accountId } = await request.json();

        const [session] = await sessionQueries.getByToken(await getSession());
        const accountExists = await accountQueries.exists(accountId);

        if (!session || !accountExists) {
            return errorResponse("Unauthorized or account does not exist", 401);
        }

        await accountQueries.delete(accountId);

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error('Error in account deletion:', error);
        return errorResponse('An error occurred during account deletion.', 500);
    }
}

function errorResponse(message: string, status: number): Response {
    return new Response(JSON.stringify({ error: message }), {
        status,
        headers: { 'Content-Type': 'application/json' }
    });
}