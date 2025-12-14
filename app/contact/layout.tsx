import { ReactNode } from "react";

import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata = {
  title: "Request a demo | DotPortion",
  description:
    "See DotPortion in action. Request a personalized demo to explore how our no-code API and workflow builder can help automate backend logic, streamline operations, and accelerate development.",
  keywords: [
    "DotPortion demo",
    "request demo",
    "no-code API builder demo",
    "workflow automation demo",
    "backend automation platform",
    "no-code backend",
  ],
  alternates: {
    canonical: "https://www.dotportion.com/contact",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className=" bg-[#fcfcfc] dark:bg-[#121212]">
        <Header />
        <main className="relative min-h-screen">
          <div>{children}</div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
