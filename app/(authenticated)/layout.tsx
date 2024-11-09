import { AppSidebar } from "@/components/app-sidebar";
import DynamicBreadcrumbs from "@/components/dynamic-breadcrumb";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getUserId } from "@/app/utils";
import { userQueries } from "@/lib/db/queries/users";
import UserMenu from "@/components/user-menu";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userId = getUserId();
  const [user] = await userQueries.getById(userId);

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center pr-4">
            <div className="flex items-center px-4">
              <SidebarTrigger />
              <DynamicBreadcrumbs />
            </div>
            <UserMenu user={user} />
          </div>
          <div className="mx-auto w-full px-4">{children}</div>
        </div>
      </SidebarProvider>
    </>
  );
}
