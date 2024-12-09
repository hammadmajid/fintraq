/**
 * @swagger
 * tags:
 *   name: Account
 *   description: API for managing user accounts
 */

/**
 * @swagger
 * /api/v1/account:
 *   post:
 *     summary: Create a new account
 *     tags: [Account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               title:
 *                 type: string
 *               color:
 *                 type: string
 *               type:
 *                 type: string
 *               icon:
 *                 type: string
 *               description:
 *                 type: string
 *               balance:
 *                 type: number
 *     responses:
 *       201:
 *         description: Account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 account:
 *                   type: object
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/account:
 *   delete:
 *     summary: Delete an account
 *     tags: [Account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accountId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Account deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *       401:
 *         description: Unauthorized or account does not exist
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/account:
 *   put:
 *     summary: Update an account
 *     tags: [Account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accountId:
 *                 type: string
 *               updateData:
 *                 type: object
 *     responses:
 *       200:
 *         description: Account updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *       401:
 *         description: Unauthorized or account does not exist
 *       500:
 *         description: Internal server error
 */

import { accountSchema } from '@/lib/schemas/account';
import { accountQueries } from '@/lib/db/queries/accounts';
import { userQueries } from '@/lib/db/queries/users';
import { sessionQueries } from '@/lib/db/queries/session';
import { getSession } from '@/app/utils';

export async function POST(request: Request) {
    try {
        const { userId, title, color, type, icon, description, balance } = accountSchema.parse(await request.json());

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

export async function PUT(request: Request) {
    try {
        const { accountId, ...updateData } = await request.json();

        const [session] = await sessionQueries.getByToken(await getSession());
        const accountExists = await accountQueries.exists(accountId);

        if (!session || !accountExists) {
            return errorResponse("Unauthorized or account does not exist", 401);
        }

        await accountQueries.update(accountId, updateData);

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error('Error in account update:', error);
        return errorResponse('An error occurred during account update.', 500);
    }
}

function errorResponse(message: string, status: number): Response {
    return new Response(JSON.stringify({ error: message }), {
        status,
        headers: { 'Content-Type': 'application/json' }
    });
}