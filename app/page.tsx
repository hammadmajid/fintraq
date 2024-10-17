import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 items-start justify-center p-8 sm:p-20">
      <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Fintraq
        </h1>
        <p className="text-xl text-muted-foreground">
          A simple finance tracker built with NextJs
        </p>
      </div>

      <div className="flex gap-2 items-center justify-center">
        <Button asChild>
          <Link href="/signup">Create account</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/login">Login</Link>
        </Button>
      </div>
    </div>
  );
}
