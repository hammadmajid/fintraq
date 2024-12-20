import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import UserMenu from "@/components/user-menu";
import { auth } from "@/auth";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  const user = session?.user!;

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center pr-4">
            <div className="flex items-center px-4">
              <SidebarTrigger />
            </div>
            <UserMenu user={user} />
          </div>
          <div className="mx-auto w-full px-4 h-full">{children}</div>
        </div>
      </SidebarProvider>
    </>
  );
}
