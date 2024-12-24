import { SiNextdotjs, SiVercel, SiPostgresql, SiTypescript, SiTailwindcss, SiShadcnui, SiDrizzle, SiResend, SiZod } from "react-icons/si";

const techStack = [
  { Icon: SiNextdotjs, link: "https://nextjs.org/" },
  { Icon: SiVercel, link: "https://vercel.com/" },
  { Icon: SiPostgresql, link: "https://www.postgresql.org/" },
  { Icon: SiDrizzle, link: "https://orm.drizzle.team/" },
  { Icon: SiResend, link: "https://resend.com" },
  { Icon: SiTypescript, link: "https://www.typescriptlang.org/" },
  { Icon: SiTailwindcss, link: "https://tailwindcss.com/" },
  { Icon: SiShadcnui, link: "https://ui.shadcn.com/" },
  { Icon: SiZod, link: "https://zod.dev/" },
];

export function TechStack() {
  return (
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
            <Icon className="h-12 w-12 text-muted-foreground hover:text-purple-400 transition-colors" />
          </a>
        ))}
      </div>
    </div>
  );
}
