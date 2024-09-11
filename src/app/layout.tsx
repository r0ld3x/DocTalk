import NavBar from "@/components/NavBar";
import Providers from "@/components/Providers";
import { cn, constructMetadata } from "@/lib/utils";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import "react-loading-skeleton/dist/skeleton.css";
import "simplebar-react/dist/simplebar.min.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <Providers>
        <body
          className={cn(
            "min-h-screen font-sans antialiased grainy dark:bg-slate-900 dark:text-white",
            inter.className
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <NavBar />
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </Providers>
    </html>
  );
}
