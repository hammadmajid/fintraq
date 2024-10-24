import { AppSidebar } from "@/components/app-sidebar";
import DynamicBreadcrumbs from "@/components/dynamic-breadcrumb";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <DynamicBreadcrumbs />
      <SidebarProvider>
        <AppSidebar />
        <div className="grid w-full">{children}</div>
      </SidebarProvider>{" "}
    </>
  );
}
