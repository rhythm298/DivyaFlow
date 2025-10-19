import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DivyaFlow - AI-Powered Temple Crowd Management",
  description:
    "Smart crowd management system for major pilgrimage sites in Gujarat. Real-time monitoring, virtual queue management, and emergency response coordination.",
  keywords: [
    "temple management",
    "crowd control",
    "pilgrimage",
    "Gujarat temples",
    "AI crowd monitoring",
  ],
  authors: [{ name: "DivyaFlow Team" }],
  openGraph: {
    title: "DivyaFlow - Temple Crowd Management System",
    description: "Smart solution for managing temple crowds with AI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster position="top-right" richColors />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
