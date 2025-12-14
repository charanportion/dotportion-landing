"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

type ScrollTargetId =
  | "hero"
  | "features"
  | "schema-canvas"
  | "comparison"
  | "faq"
  | "community"
  | "cta";

const NAV_SCROLL_ITEMS: { label: string; targetId: ScrollTargetId }[] = [
  { label: "Features", targetId: "features" },
  { label: "Why DotPortion?", targetId: "comparison" },
  { label: "FAQ", targetId: "faq" },
  { label: "Community", targetId: "community" },
];

function scrollToSection(targetId: ScrollTargetId) {
  if (typeof window === "undefined") return;

  const el = document.getElementById(targetId);
  if (!el) return;

  const headerOffset = 72;
  const elementPosition = el.getBoundingClientRect().top + window.scrollY;
  const offsetPosition = elementPosition - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
}

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = useCallback(
    (targetId: ScrollTargetId) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();

      if (pathname === "/") {
        scrollToSection(targetId);
        return;
      }

      router.push(`/#${targetId}`);
    },
    [pathname, router]
  );

  const handleMobileNavClick = (targetId: ScrollTargetId) => () => {
    setIsMobileMenuOpen(false);

    if (pathname === "/") {
      scrollToSection(targetId);
      return;
    }

    router.push(`/#${targetId}`);
  };

  return (
    <>
      <header className="sticky top-0 z-50">
        <nav className="relative z-50 border-neutral-300 dark:border-neutral-800 border-b backdrop-blur-sm ">
          <div className="relative flex justify-between h-16 mx-auto lg:container lg:px-16 xl:px-20">
            <div className="flex items-center px-6 lg:px-0 flex-1 sm:items-stretch justify-between">
              {/* Logo + desktop nav */}
              <div className="flex items-center">
                <div className="flex items-center shrink-0">
                  <Link
                    href={`/#hero`}
                    onClick={handleNavClick("hero")}
                    className="block cursor-pointer w-auto h-9 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-foreground-lighter focus-visible:ring-offset-4 focus-visible:ring-offset-background-alternative focus-visible:rounded-sm"
                  >
                    <Image
                      src={"/logo-dark.png"}
                      alt="logo"
                      width={124}
                      height={36}
                      className="h-9 w-auto object-contain block dark:hidden"
                    />
                    <Image
                      src={"/logo-light.png"}
                      alt="logo"
                      width={124}
                      height={36}
                      className="h-9 w-auto object-contain hidden dark:block"
                    />
                  </Link>
                </div>

                {/* Desktop nav */}
                <nav className="relative z-10 flex-1 items-center justify-center hidden pl-8 sm:space-x-4 lg:flex h-16">
                  <div className="relative">
                    <ul className="group flex flex-1 list-none items-center justify-center space-x-1">
                      {NAV_SCROLL_ITEMS.map((item) => (
                        <li key={item.targetId} className="text-sm font-medium">
                          <Link
                            href={`#${item.targetId}`}
                            onClick={handleNavClick(item.targetId)}
                            className="group/menu-item flex items-center text-sm hover:text-foreground select-none gap-3 rounded-md p-2 leading-none no-underline outline-none focus-visible:ring-2 focus-visible:ring-foreground-lighter group-hover:bg-transparent text-neutral-500 duration-200 transition-all focus-visible:text-brand-link"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                      <li className="text-sm font-medium">
                        <Link
                          href={"https://docs.dotportion.com"}
                          target="_"
                          className="group/menu-item flex items-center text-sm hover:text-foreground select-none gap-3 rounded-md p-2 leading-none no-underline outline-none focus-visible:ring-2 focus-visible:ring-foreground-lighter group-hover:bg-transparent text-neutral-500 duration-200 transition-all focus-visible:text-brand-link"
                        >
                          Docs
                        </Link>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>

              {/* Desktop buttons */}
              <div className="flex items-center gap-2 animate-fade-in scale-100! delay-300">
                <Link
                  href={"https://beta.dotportion.com"}
                  className="px-2.5 py-1 h-7 hidden lg:block text-xs justify-center cursor-pointer items-center space-x-2 text-center ease-out duration-200 rounded-sm outline-none transition-all outlint-0 border border-neutral-300 hover:border-neutral-400 text-neutral-700 bg-white hover:bg-neutral-100 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-700"
                >
                  Sign in
                </Link>
                <Link
                  href={"https://beta.dotportion.com"}
                  className="px-2.5 py-1 h-7 hidden lg:block text-xs justify-center cursor-pointer items-center space-x-2 text-center ease-out duration-200 rounded-sm outline-none transition-all outlint-0 border border-neutral-700 text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:border-neutral-300 dark:text-black dark:hover:bg-neutral-200"
                >
                  Get Early Access
                </Link>
              </div>
            </div>

            {/* Mobile menu icon */}
            <div className="inset-y-0 flex mr-2 items-center px-4 lg:hidden">
              <Button
                size={"icon-sm"}
                className="p-2 rounded-sm"
                variant={"ghost"}
                aria-label="Open navigation menu"
                aria-expanded={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="size-6 text-neutral-700 dark:text-neutral-100" />
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile full-screen menu (Supabase style) */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-200 ${
          isMobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {/* Dark overlay */}
        <div
          className="absolute inset-0 bg-[#fcfcfc] dark:bg-[#121212]"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu panel */}
        <div
          className={`absolute inset-y-0 right-0 left-0 bg-[#fcfcfc] dark:bg-[#121212] text-foreground flex flex-col transition-transform duration-200 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 h-16 border-b border-neutral-300 dark:border-neutral-800">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2"
            >
              <Image
                src={"/logo-dark.png"}
                alt="logo"
                width={124}
                height={36}
                className="h-9 w-auto object-contain block dark:hidden"
              />
              <Image
                src={"/logo-light.png"}
                alt="logo"
                width={124}
                height={36}
                className="h-9 w-auto object-contain hidden dark:block"
              />
            </Link>
            <Button
              size="icon-sm"
              variant="ghost"
              className="rounded-sm"
              aria-label="Close navigation menu"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="size-6 text-neutral-700 dark:text-neutral-100" />
            </Button>
          </div>

          {/* Nav items */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <nav className="space-y-4 text-sm">
              {/* main sections (like Product / Developers in Supabase) */}
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-wide text-neutral-500">
                  Product
                </p>
                <div className="space-y-1">
                  {NAV_SCROLL_ITEMS.map((item) => (
                    <button
                      key={item.targetId}
                      onClick={handleMobileNavClick(item.targetId)}
                      className="w-full text-left py-2 border-b border-neutral-200 dark:border-neutral-800 text-black dark:text-neutral-100 hover:text-white"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <p className="text-xs uppercase tracking-wide text-neutral-400">
                  Resources
                </p>
                <div className="space-y-1 w-full ">
                  <div className="border-b border-neutral-200 dark:border-neutral-800 py-2">
                    <Link
                      href="https://docs.dotportion.com"
                      target="_"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full text-left   text-black dark:text-neutral-100 hover:text-white"
                    >
                      Docs
                    </Link>
                  </div>
                  {/* add more links later if needed */}
                </div>
              </div>
            </nav>
          </div>

          {/* Bottom buttons */}
          <div className="border-t border-neutral-300 dark:border-neutral-800 px-4 py-4 flex gap-3 bg-neutral-100 dark:bg-neutral-900">
            <Link
              href="https://beta.dotportion.com"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex-1"
            >
              <Button
                variant="outline"
                className="px-2.5 py-1 h-7 w-full text-xs justify-center cursor-pointer items-center space-x-2 text-center ease-out duration-200 rounded-sm outline-none transition-all outlint-0 border border-neutral-300 hover:border-neutral-400 text-neutral-700 bg-white hover:bg-neutral-100 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-700"
              >
                Sign in
              </Button>
            </Link>

            <Link
              href="https://beta.dotportion.com"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex-1"
            >
              <Button className="px-2.5 py-1 h-7 w-full text-xs justify-center cursor-pointer items-center space-x-2 text-center ease-out duration-200 rounded-sm outline-none transition-all outlint-0 border border-neutral-700 text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:border-neutral-300 dark:text-black dark:hover:bg-neutral-200">
                Get Early Access
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
