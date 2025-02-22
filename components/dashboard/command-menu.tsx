"use client";

import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowRightLeft,
  CreditCard,
  FileText,
  Landmark,
  PiggyBank,
  Settings,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const { toast } = useToast();
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleCreateReport = () => {
    setOpen(false);
    toast({
      title: "Feature not implemented",
      description: "The create report feature is not yet available.",
    });
  };

  const handleNavigation = (path: string) => {
    setOpen(false);
    router.push(path);
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        className="flex"
        size="sm"
      >
        <p className="text-sm text-muted-foreground">Command Menu</p>
        <p className="text-sm text-muted-foreground">
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>k
          </kbd>
        </p>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="sr-only">Command Menu</DialogTitle>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Create">
            <CommandItem onSelect={() => handleNavigation("/records/create")}>
              <ArrowRightLeft className="mr-2 h-4 w-4" />
              <span>Create new record</span>
            </CommandItem>
            <CommandItem onSelect={() => handleNavigation("/accounts/create")}>
              <Landmark className="mr-2 h-4 w-4" />
              <span>Create new account</span>
            </CommandItem>
            <CommandItem
              onSelect={() => handleNavigation("/accounts/budgets/create")}
            >
              <PiggyBank className="mr-2 h-4 w-4" />
              <span>Create new budget</span>
            </CommandItem>
            <CommandItem onSelect={handleCreateReport}>
              <FileText className="mr-2 h-4 w-4" />
              <span>Create new report</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem onSelect={() => handleNavigation("/settings/profile")}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </CommandItem>
            <CommandItem onSelect={() => handleNavigation("/settings/billing")}>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
            </CommandItem>
            <CommandItem onSelect={() => handleNavigation("/settings")}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
