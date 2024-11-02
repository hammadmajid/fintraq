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
        <div className="flex flex-col w-full">
          <DynamicBreadcrumbs />
          <div className="mx-auto max-w-4xl w-full px-4">{children}</div>
        </div>
      </SidebarProvider>
    </>
  );
}
