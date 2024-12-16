import { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { ClientThemeWrapper } from "@/components/theme-provider";
import { ViewTransitions } from "next-view-transitions";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Fintraq",
    default: "Fintraq",
  },
  description: "A barebone, modern finance tracking app built with NextJs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col justify-between`}
        >
          <ClientThemeWrapper>{children}</ClientThemeWrapper>
          <Toaster />
        </body>
      </html>
    </ViewTransitions>
  );
}
