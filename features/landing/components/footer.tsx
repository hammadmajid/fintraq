import Link from "next/link"
import { SiGithub } from "react-icons/si"

export function Footer() {
  return (
    <footer className="container mx-auto mt-8 flex flex-col items-center justify-between border-t px-4 py-4 text-sm text-muted-foreground sm:flex-row">
      <div className="mb-2 flex items-center gap-4 sm:mb-0">
        <a
          href="https://github.com/hammadmajid/fintraq"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center hover:text-primary"
        >
          <SiGithub className="mr-2 h-4 w-4" />
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
  )
}
