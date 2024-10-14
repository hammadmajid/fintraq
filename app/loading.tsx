import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-screen w-screen flex-row items-center justify-center gap-2">
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      <p>Loading</p>
    </div>
  );
}
