import { AppSidebarWrapper } from "@/components/app-sidebar-wrapper";
import DynamicBreadcrumbs from "@/components/dynamic-breadcrumb";
import { SidebarProvider } from "@/components/ui/sidebar";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SidebarProvider>
        <AppSidebarWrapper />
        <div className="grid w-full">
          <DynamicBreadcrumbs />
          {children}
        </div>
      </SidebarProvider>{" "}
    </>
  );
}
