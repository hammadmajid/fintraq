"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-col items-start justify-center grow w-3/4 mx-auto space-y-2">
      <h1 className="text-3xl font-bold">Something went wrong!</h1>
      <Button onClick={() => reset()}>Try again</Button>
    </main>
  );
}
