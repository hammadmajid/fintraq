"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import React, { createContext, useContext, useEffect, useState } from "react";

// Context
const ResponsiveDialogContext = createContext<{ isMobile: boolean }>({
  isMobile: false,
});

// Root component
interface ResponsiveDialogProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ResponsiveDialog({
  children,
  open,
  onOpenChange,
}: ResponsiveDialogProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const Wrapper = isMobile ? Drawer : Dialog;
  const Content = isMobile ? DrawerContent : DialogContent;

  return (
    <ResponsiveDialogContext.Provider value={{ isMobile }}>
      <Wrapper open={open} onOpenChange={onOpenChange}>
        <Content className="flex flex-col h-[80vh]">{children}</Content>
      </Wrapper>
    </ResponsiveDialogContext.Provider>
  );
}

// Content component
export function ResponsiveDialogContent({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`flex-grow overflow-y-auto ${className}`} {...props}>
      {children}
    </div>
  );
}

// Header component
export function ResponsiveDialogHeader({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { isMobile } = useContext(ResponsiveDialogContext);
  const HeaderComponent = isMobile ? DrawerHeader : DialogHeader;

  return (
    <HeaderComponent className={`flex-shrink-0 ${className}`} {...props}>
      {children}
    </HeaderComponent>
  );
}

// Footer component
export function ResponsiveDialogFooter({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { isMobile } = useContext(ResponsiveDialogContext);
  const FooterComponent = isMobile ? DrawerFooter : DialogFooter;

  return (
    <FooterComponent className={`flex-shrink-0 ${className}`} {...props}>
      {children}
    </FooterComponent>
  );
}

// Title component
export function ResponsiveDialogTitle({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  const { isMobile } = useContext(ResponsiveDialogContext);
  const TitleComponent = isMobile ? DrawerTitle : DialogTitle;

  return (
    <TitleComponent className={className} {...props}>
      {children}
    </TitleComponent>
  );
}

// Description component
export function ResponsiveDialogDescription({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  const { isMobile } = useContext(ResponsiveDialogContext);
  const DescriptionComponent = isMobile ? DrawerDescription : DialogDescription;

  return (
    <DescriptionComponent className={className} {...props}>
      {children}
    </DescriptionComponent>
  );
}
