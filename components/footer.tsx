"use client";

import { useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa6";
import { ModeToggle } from "@/components/mode-toggle";
import { usePathname, useRouter } from "next/navigation";

type ScrollTargetId =
  | "hero"
  | "features"
  | "schema-canvas"
  | "comparison"
  | "faq"
  | "community"
  | "cta";

const FOOTER_NAV: { label: string; targetId: ScrollTargetId }[] = [
  // { label: "Hero", targetId: "hero" },
  { label: "Features", targetId: "features" },
  { label: "Schema Canvas", targetId: "schema-canvas" },
  { label: "Why DotPortion?", targetId: "comparison" },
  { label: "FAQ", targetId: "faq" },
  { label: "Community", targetId: "community" },
  // { label: "Final CTA", targetId: "cta" },
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

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavClick = useCallback(
    (targetId: ScrollTargetId) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();

      // If we're already on the landing page, just smooth-scroll
      if (pathname === "/") {
        scrollToSection(targetId);
        return;
      }

      // If on another route, go to /#section and let the homepage handle scroll
      router.push(`/#${targetId}`);
    },
    [pathname, router]
  );

  return (
    <footer className="bg-[#fdfdfd] dark:bg-[#0f0f0f]">
      <div className="sm:py-18 container relative mx-auto px-6 py-16 md:py-24 lg:px-16 lg:py-24 xl:px-20 xl:py-8">
        <div className="xl:grid xl:grid-cols-6 xl:gap-4 justify-between ">
          <div className="space-y-8 xl:col-span-2">
            <Link
              href={"/#hero"}
              onClick={handleNavClick("hero")}
              className="w-40"
            >
              <Image
                src={"/logo-dark.png"}
                alt="logo"
                width={124}
                height={36}
                className="h-9 w-auto object-contain block dark:hidden"
              />
            </Link>
            <Link href={"/"} className="w-40 hidden dark:block">
              <Image
                src={"/logo-light.png"}
                alt="logo"
                width={124}
                height={36}
                className="h-9 w-auto object-contain"
              />
            </Link>
            <div className="flex space-x-5 mt-4 ml-2">
              <Link
                href={"https://www.instagram.com/dotportion/"}
                target="_"
                className="text-neutral-500 hover:text-foreground transition"
              >
                <FaInstagram className="w-4 h-4" />
              </Link>
              <Link
                href={"https://discord.gg/wZnKHPBk"}
                target="_"
                className="text-neutral-500 hover:text-foreground transition"
              >
                <FaDiscord className="w-4 h-4" />
              </Link>
              <Link
                href={"/"}
                target="_"
                className="text-neutral-500 hover:text-foreground transition"
              >
                <FaYoutube className="w-4 h-4" />
              </Link>
              <Link
                href={"https://www.linkedin.com/company/dotportion/"}
                target="_"
                className="text-neutral-500 hover:text-foreground transition"
              >
                <FaLinkedin className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 xl:col-span-4 xl:mt-0">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
              {/* Product (still just normal links – you can map these later if you want) */}
              <div>
                <h6 className="text-foreground text-base">Product</h6>
                <ul className="mt-4 space-y-2">
                  {FOOTER_NAV.map((item) => (
                    <li key={item.targetId}>
                      <Link
                        href={`#${item.targetId}`}
                        onClick={handleNavClick(item.targetId)}
                      >
                        <span className="text-sm transition-colors text-neutral-500 hover:text-foreground ">
                          {item.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Documentation (keep docs-style links) */}
              {/* <div>
                <h6 className="text-foreground text-base">Documentation</h6>
                <ul className="mt-4 space-y-2">
                  <li>
                    <Link href={"/"}>
                      <span className="text-sm transition-colors text-neutral-500 hover:text-foreground ">
                        Introduction
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/"}>
                      <span className="text-sm transition-colors text-neutral-500 hover:text-foreground ">
                        Getting Started
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/"}>
                      <span className="text-sm transition-colors text-neutral-500 hover:text-foreground ">
                        Quick setup
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/"}>
                      <span className="text-sm transition-colors text-neutral-500 hover:text-foreground ">
                        Nodes
                      </span>
                    </Link>
                  </li>
                </ul>
              </div> */}

              {/* Resources */}
              {/* <div>
                <h6 className="text-foreground text-base">Resources</h6>
                <ul className="mt-4 space-y-2">
                  <li>
                    <Link href={"/blog"}>
                      <span className="text-sm transition-colors text-neutral-500 hover:text-foreground ">
                        Blogs
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/"}>
                      <span className="text-sm transition-colors text-neutral-500 hover:text-foreground ">
                        Support
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/"}>
                      <span className="text-sm transition-colors text-neutral-500 hover:text-foreground ">
                        System status
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/"}>
                      <span className="text-sm transition-colors text-neutral-500 hover:text-foreground ">
                        Become a partner
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/"}>
                      <span className="text-sm transition-colors text-neutral-500 hover:text-foreground ">
                        Brand Assets
                      </span>
                    </Link>
                  </li>
                </ul>
              </div> */}

              {/* Company – policies, keep as-is */}
              <div>
                <h6 className="text-foreground text-base">Company</h6>
                <ul className="mt-4 space-y-2">
                  <li>
                    <Link href={"/terms"}>
                      <span className="text-sm transition-colors text-neutral-500 hover:text-foreground ">
                        Terms of Service
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/privacy"}>
                      <span className="text-sm transition-colors text-neutral-500 hover:text-foreground ">
                        Privacy Policy
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/aup"}>
                      <span className="text-sm transition-colors text-neutral-500 hover:text-foreground ">
                        Acceptable Use Policy
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/security"}>
                      <span className="text-sm transition-colors text-neutral-500 hover:text-foreground ">
                        Security Policy
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/dpa"}>
                      <span className="text-sm transition-colors text-neutral-500 hover:text-foreground ">
                        Data Processing Aggreement
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/cookie"}>
                      <span className="text-sm transition-colors text-neutral-500 hover:text-foreground ">
                        Cookie Policy
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="border-neutral-300 dark:border-neutral-800 mt-32 flex justify-between border-t pt-8">
          <small className="text-xs text-neutral-500">© Dotportion Inc</small>
          <ModeToggle />
        </div>
      </div>
    </footer>
  );
}
