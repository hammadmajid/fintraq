"use client"

import Link from "next/link"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function Header() {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme !== "light"

  return <header className="cyber-header"><div className="section-wrap cyber-header-inner"><Link href="/" className="cyber-logo"><span>✳</span> FINTRAQ<span>.</span></Link><nav aria-label="Public navigation"><Link href="/product">Product</Link><Link href="/capabilities">Capabilities</Link><Link href="/tax-shield">Tax shield</Link><Link href="/operator-signal">Operator signal</Link></nav><div className="cyber-header-actions"><button type="button" className="cyber-theme-toggle" onClick={() => setTheme(isDark ? "light" : "dark")} aria-label={`Switch to ${isDark ? "light" : "dark"} mode`} title={`Switch to ${isDark ? "light" : "dark"} mode`}>{isDark ? <Sun size={15} /> : <Moon size={15} />}</button><Link href="/login" className="cyber-text-link">SIGN IN</Link><Link href="/signup" className="cyber-button">INITIALIZE <span>↗</span></Link></div></div></header>
}
