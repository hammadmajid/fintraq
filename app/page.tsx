import { Button } from "@/components/ui/button";
import { Github, ArrowRight } from "lucide-react";
import Link from "next/link";
import {
  SiNextdotjs,
  SiVercel,
  SiPostgresql,
  SiTypescript,
  SiReact,
  SiTailwindcss,
  SiShadcnui,
} from "react-icons/si";

const techStack = [
  { Icon: SiNextdotjs, link: "https://nextjs.org/" },
  { Icon: SiVercel, link: "https://vercel.com/" },
  { Icon: SiPostgresql, link: "https://www.postgresql.org/" },
  { Icon: SiTypescript, link: "https://www.typescriptlang.org/" },
  { Icon: SiReact, link: "https://reactjs.org/" },
  { Icon: SiTailwindcss, link: "https://tailwindcss.com/" },
  { Icon: SiShadcnui, link: "https://ui.shadcn.com/" },
];

export default function Page() {
  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-0 min-h-screen">
        <div className="w-full flex flex-col gap-8 items-start justify-start">
          <header>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Fintraq
            </h1>
            <p className="text-xl text-muted-foreground">
              A simple finance tracker built with NextJs
            </p>
          </header>
          <div className="flex gap-2 items-center justify-center">
            <Button asChild>
              <Link href="/login">
                Get started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <a
                href="https://github.com/hammadmajid/fintraq"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                Source code
              </a>
            </Button>
          </div>
        </div>

        <div className="w-full">
          <h2 className="sr-only">Tech Stack</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {techStack.map(({ Icon, link }, index) => (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
              >
                <Icon className="h-12 w-12 text-muted-foreground hover:text-foreground transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
