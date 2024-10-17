import RegisterForm from '@/components/register-form';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function Register() {
	await new Promise((resolve) => setTimeout(resolve, 2000));

	return (
		<main className="flex flex-col gap-4 p-8 sm:p-20">
			<h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-5xl">
				Create Account
			</h1>
			<RegisterForm />
			<p>
				Already have an account?{' '}
				<Button variant="link" className="p-0" asChild>
					<Link href="/login">Login</Link>
				</Button>
			</p>
		</main>
	);
}
