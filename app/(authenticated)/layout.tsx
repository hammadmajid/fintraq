import { AppSidebar } from "@/components/app-sidebar";
import DynamicBreadcrumbs from "@/components/dynamic-breadcrumb";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <DynamicBreadcrumbs />
        <SidebarProvider>
          <AppSidebar />
          <div className="grid w-full">{children}</div>
        </SidebarProvider>{" "}
      </ThemeProvider>
    </>
  );
}
