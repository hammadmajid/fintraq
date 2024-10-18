"use client";

import { Button } from "@/components/ui/button";

export default function Error() {

  return (
    <main className="flex w-3/4 mx-auto flex-grow flex-col items-start justify-center space-y-2">
      <h1 className="text-3xl font-bold">404: Not Found</h1>
      <Button onClick={() => window.history.back()}>Go back</Button>
    </main>
  );
}
