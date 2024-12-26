import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { CommandMenu } from "@/components/dashboard/command-menu";
import { UserMenu } from "@/components/dashboard/user-menu";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;
  const session = await auth();

  if (!session || !session.user) {
    redirect("/login");
  }

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between py-2 pr-4">
            <div className="flex items-center justify-center gap-4 px-4">
              <SidebarTrigger />
              <CommandMenu />
            </div>
            <UserMenu user={session.user} id={id} />
          </div>
          <div className="w-full h-full px-4 mx-auto">{children}</div>
        </div>
      </SidebarProvider>
    </>
  );
}
