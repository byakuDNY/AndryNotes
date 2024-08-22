import { Toaster } from "sonner";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ConvexClientPrivider } from "@/components/providers/convex-provider";
import ModalProvider from "@/components/providers/modal-provider";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { useEffect } from "react";
import ThemeManager from "./themeManager";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AndryNotes",
  description: "Take notes and share them with your friends",
  icons: [
    {
      media: "(prefers-color-scheme: dark)",
      url: "/logo-dark.png",
      href: "/logo-dark.png",
    },
    {
      media: "(prefers-color-scheme: light)",
      url: "/logo.png",
      href: "/logo.png",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressContentEditableWarning>
      <body className={inter.className}>
        <ConvexClientPrivider>
          <EdgeStoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              storageKey="AndryNotes-themes"
            >
              <Toaster position="bottom-center" />
              <ModalProvider />
              <ThemeManager />
              {children}
            </ThemeProvider>
          </EdgeStoreProvider>
        </ConvexClientPrivider>
      </body>
    </html>
  );
}
