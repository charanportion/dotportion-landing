"use client";
import { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="min-h-screen bg-[#fcfcfc] dark:bg-[#121212]">
        <Header />
        <main className="relative min-h-screen">
          <div className="px-5 lg:px-20">{children}</div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
