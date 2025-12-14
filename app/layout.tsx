import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dotportion.com"),
  title: "DotPortion | No-Code API & Workflow Builder",
  description:
    "DotPortion is a visual no-code API and workflow builder. Design workflows, connect databases, and ship secure backend APIs without writing boilerplate code.",
  keywords: [
    "DotPortion",
    "no-code",
    "low-code",
    "API builder",
    "workflow automation",
    "backend builder",
    "serverless workflows",
    "Node-based workflows",
    "REST API designer",
    "no-code backend",
  ],
  openGraph: {
    title: "DotPortion | No-Code API & Workflow Builder",
    description:
      "Build and automate APIs visually with DotPortion. Drag-and-drop workflows, connect databases, add logic, and deploy secure backends in minutes.",
    url: "https://www.dotportion.com",
    siteName: "DotPortion",
    images: [
      {
        // Put this image in /public as og-dotportion.png (or change the name)
        url: "/logo-dark.png",
        width: 1200,
        height: 630,
        alt: "DotPortion visual workflow and API builder interface",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DotPortion | No-Code API & Workflow Builder",
    description:
      "Design APIs, workflows, and automations visually. DotPortion lets you build production-ready backends with drag-and-drop nodes and instant deployment.",
    images: ["/logo-dark.png"],
  },
  icons: {
    icon: "./favicon.ico", // standard favicon in /public
    shortcut: "./logo/light.svg",
    apple: "./logo/light.svg", // 180x180 recommended
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dmSans.variable} font-dm-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
