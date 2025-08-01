import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

// Fontes personalizadas
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

// Metadata do site
export const metadata: Metadata = {
  title: "Budget Loop",
  description: "Track your expenses and visualize insights.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}
      >
        {/* Cabeçalho fixo global */}
        <Header />

        {/* Conteúdo principal */}
        <main className="min-h-screen px-4 py-6 container mx-auto">
          {children}
        </main>

        {/* Toast global (Sonner ou shadcn/toast) */}
        <Toaster />
      </body>
    </html>
  )
}
