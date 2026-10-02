import { AppSidebar } from "@/components/dashboard/app-sidebar"

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="cyber-app-shell"><AppSidebar /><div className="cyber-app-main"><div className="cyber-app-topbar">FINTRAQ // SECURE OPERATOR SESSION // DEMO TELEMETRY</div>{children}</div></div>
}
