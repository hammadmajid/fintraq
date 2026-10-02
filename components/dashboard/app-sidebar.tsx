"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useSession, signOut } from "@/lib/auth-client"
import { useTheme } from "next-themes"
import { ArrowRightLeft, BarChart3, FileText, Home, Landmark, LogOut, Moon, PiggyBank, Settings, Sun, Users } from "lucide-react"

const items = [
  ["Dashboard", "/dashboard", Home], ["Records", "/records", ArrowRightLeft], ["Accounts", "/accounts", Landmark], ["Budgets", "/budgets", PiggyBank], ["Invoices", "/invoices", FileText], ["Clients", "/clients", Users], ["Reports", "/reports", BarChart3],
] as const

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()
  const name = session?.user?.name || session?.user?.email || "Operator"
  const initials = name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase()
  const handleSignOut = async () => { await signOut(); router.push("/login") }
  return <aside className="cyber-app-sidebar"><div className="app-sidebar-logo"><Link href="/dashboard"><span>✳</span> FINTRAQ<span>.</span></Link></div><p className="app-sidebar-label">COMMAND DECK</p><nav>{items.map(([label, href, Icon], index) => <Link key={href} href={href} className={pathname === href ? "active" : ""}><span className="app-nav-number">0{index + 1}</span><Icon size={15} />{label}</Link>)}</nav><p className="app-sidebar-label app-sidebar-spaced">SYSTEM</p><Link href="/settings" className={pathname === "/settings" ? "active" : ""}><span className="app-nav-number">08</span><Settings size={15} />Settings</Link><div className="app-sidebar-footer"><div className="app-user"><span>{initials}</span><div><b>{name}</b><small>OPERATOR // DEMO</small></div></div><div className="app-sidebar-actions"><button type="button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} title="Toggle theme">{theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}</button><button type="button" onClick={handleSignOut} title="Sign out"><LogOut size={15} /></button></div></div></aside>
}
