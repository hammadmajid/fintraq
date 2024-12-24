import { SiGithub } from "react-icons/si";

export function Footer() {
  return (
    <footer className="container mx-auto px-4 py-4 mt-8 border-t flex justify-between items-center">
      <div className="flex items-center">
        <a
          href="https://github.com/hammadmajid/fintraq"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center hover:text-primary"
        >
          <SiGithub className="mr-2 h-4 w-4" />
          GitHub Repository
        </a>
      </div>
      <div className="text-sm text-muted-foreground">Licensed under MIT</div>
    </footer>
  );
}
