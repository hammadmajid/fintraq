import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import UserMenu from "@/components/user-menu";
import { auth } from "@/auth";
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
          <div className="flex justify-between items-center py-2 pr-4">
            <div className="flex items-center px-4">
              <SidebarTrigger />
            </div>
            <UserMenu user={session.user} id={id} />
          </div>
          <div className="mx-auto w-full px-4 h-full">{children}</div>
        </div>
      </SidebarProvider>
    </>
  );
}
