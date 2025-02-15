import Link from "next/link";
import { SiGithub } from "react-icons/si";

export function Footer() {
  return (
    <footer className="container flex flex-col sm:flex-row items-center justify-between px-4 py-4 mx-auto mt-8 text-sm border-t text-muted-foreground">
      <div className="flex items-center space-x-4 mb-2 sm:mb-0">
        <a
          href="https://github.com/hammadmajid/fintraq"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center hover:text-primary"
        >
          <SiGithub className="w-4 h-4 mr-2" />
          GitHub
        </a>
        <Link href="/terms" className="hover:text-primary">
          Terms
        </Link>
        <Link href="/privacy" className="hover:text-primary">
          Privacy
        </Link>
      </div>
      <div>MIT License</div>
    </footer>
  );
}
