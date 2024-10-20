import DynamicBreadcrumbs from "@/components/dynamic-breadcrumb";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid w-full">
      <DynamicBreadcrumbs />
      {children}
    </div>
  );
}
