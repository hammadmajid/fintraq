"use client";

import { deleteRecord } from "@/actions/records";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface DeleteRecordProps {
  id: string;
}

export function DeleteRecord({ id }: DeleteRecordProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  async function handleDeletion() {
    setIsLoading(true);

    try {
      await deleteRecord(id);
      toast({
        title: "Record deleted",
        description: "The record has been successfully deleted.",
      });
      setIsOpen(false);
    } catch {
      toast({
        title: "Failed to delete record",
        description:
          "An unexpected error occurred while performing this action. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="w-full flex justify-start px-2">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you sure you want to delete this record?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete the
            record from our servers.
          </SheetDescription>
        </SheetHeader>
        <SheetFooter className="mt-4">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDeletion}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
