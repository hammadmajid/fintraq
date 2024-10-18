import { sql } from '@vercel/postgres';
import { UserRepository } from '@/lib/repositories/user';
import { SessionRepository } from '@/lib/repositories/session';
import { signUpForm } from '@/lib/schemas/auth/signUp';

export async function POST(request: Request) {
	try {
		const { firstName, lastName, email, password } = signUpForm.parse(await request.json());
		const fullName = firstName + " " + lastName;

		const userRepo = new UserRepository(sql);
		const sessionRepo = new SessionRepository(sql);

		if (await userRepo.exists(email)) {
			return errorResponse('User with this email already exists.', 400);
		}

		// Start transaction
		await sql`BEGIN`;

		try {
			const user = await userRepo.create(fullName, email, password);
			const session = await sessionRepo.create(user.id);

			// If we get here, both operations succeeded, so commit the transaction
			await sql`COMMIT`;

			return new Response(JSON.stringify({ session }), { status: 201 });
		} catch (error) {
			// If any operation fails, roll back the transaction
			await sql`ROLLBACK`;
			throw error; // Re-throw to be caught by outer try-catch
		}
	} catch (error) {
		console.error('Error in user registration:', error);
		return errorResponse('An error occurred during registration.', 500);
	}
}

function errorResponse(message: string, status: number): Response {
	return new Response(JSON.stringify({ error: message }), {
		status,
		headers: { 'Content-Type': 'application/json' }
	});
}