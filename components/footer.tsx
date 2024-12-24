import { SiGithub } from "react-icons/si";

export function Footer() {
  return (
    <footer className="container text-sm text-muted-foreground mx-auto px-4 py-4 mt-8 border-t flex justify-between items-center">
      <div className="flex items-center">
        <a
          href="https://github.com/hammadmajid/fintraq"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center hover:text-primary"
        >
          <SiGithub className="mr-2 h-4 w-4" />
          GitHub
        </a>
      </div>
      <div>MIT License</div>
    </footer>
  );
}
