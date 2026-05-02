import { Footer } from "@/features/landing/components/footer"
import { Header } from "@/features/landing/components/header"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
