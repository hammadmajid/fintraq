import { SiGithub } from "react-icons/si";

export function Footer() {
  return (
    <footer className="container flex items-center justify-between px-4 py-4 mx-auto mt-8 text-sm border-t text-muted-foreground">
      <div className="flex items-center">
        <a
          href="https://github.com/hammadmajid/fintraq"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center hover:text-primary"
        >
          <SiGithub className="w-4 h-4 mr-2" />
          GitHub
        </a>
      </div>
      <div>MIT License</div>
    </footer>
  );
}
