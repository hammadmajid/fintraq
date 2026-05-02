import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex w-full flex-col">
        <div className="flex items-center justify-between py-2 pr-4">
          <div className="flex items-center justify-center gap-4 px-4">
            <SidebarTrigger />
            {/** <CommandMenu /> **/}
          </div>
          {/** <UserMenu user={session.user} /> **/}
        </div>
        <div className="mx-auto h-full w-full px-4">{children}</div>
      </div>
    </SidebarProvider>
  )
}
