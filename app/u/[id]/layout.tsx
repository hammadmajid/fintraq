import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;

  // TODO: implement multiple account support
  if (id !== "0")
    return (
      <>
        <main className="min-h-screen grid place-content-center">
          <div className="mx-auto grid w-[400px] gap-8">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle className="font-semibold">Not Implemented</AlertTitle>
              <AlertDescription>
                Currently it is not possible to login into multiple account at
                once.
              </AlertDescription>
            </Alert>
          </div>
        </main>
      </>
    );

  return <>{children};</>;
}
