import Link from "next/link"

export function Header() {
  return (
    <header className="cyber-header">
      <div className="section-wrap cyber-header-inner">
        <Link href="/" className="cyber-logo">
          <span>✳</span> FINTRAQ<span>.</span>
        </Link>
        <nav aria-label="Public navigation">
          <Link href="/product">Product</Link>
          <Link href="/capabilities">Capabilities</Link>
          <Link href="/tax-shield">Tax shield</Link>
          <Link href="/operator-signal">Operator signal</Link>
        </nav>
        <div className="cyber-header-actions">
          <Link href="/login" className="cyber-text-link">
            SIGN IN
          </Link>
          <Link href="/signup" className="cyber-button">
            INITIALIZE <span>↗</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
