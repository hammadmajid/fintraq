import { Button } from "@/components/ui/button";
import { Github, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
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
              <Link href="/login">
                Get started
                <ArrowRight />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <a href="https://github.com/hammadmajid/fintraq" target="_blank">
                <Github />
                Source code
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
