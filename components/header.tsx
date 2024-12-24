import Link from 'next/link';
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="container mx-auto px-4 py-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold">
        Fintraq
      </Link>
      <nav>
        <Button variant="ghost" asChild className="mr-2">
          <Link href="/login">Login</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/about">About</Link>
        </Button>
      </nav>
    </header>
  );
}

