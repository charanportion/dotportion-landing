"use client";

import {
  Check,
  Database,
  File,
  Lock,
  Logs,
  Pencil,
  Workflow,
  Image as ImageIcon,
  Video,
  Sparkles,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Mockup, MockupFrame } from "@/components/ui/mockup";

import LightRays from "@/components/LightRays";
import FloatingNodes from "@/components/floating-nodes";
import HeroFlowPreview from "@/components/hero-frame-preview";
import SchemaHeroPreview from "@/components/schema-frame-preview";

import { FaFlutter } from "react-icons/fa6";
import { FaDiscord, FaReact } from "react-icons/fa";
import {
  SiNextdotjs,
  SiRedwoodjs,
  SiKotlin,
  SiNuxtdotjs,
  SiRefine,
} from "react-icons/si";
import { RiSvelteFill, RiVuejsFill } from "react-icons/ri";
import { TbBrandSolidjs } from "react-icons/tb";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useRef, useState } from "react";
import WorkflowMiniCanvas from "@/components/workflow-mini-canvas";
import SchemaMiniCanvas from "@/components/schema-mini-canvas";
import DisplayCards from "@/components/ui/display-cards";
import FAQAccordion from "@/components/faq-accordian";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { motion, useScroll, useTransform } from "framer-motion";

const founderTestimonials = [
  {
    id: 1,
    handle: "@sricharan",
    text: "Dotportion lets you go from idea to working backend in a weekend, without sacrificing structure or scalability.",
  },
  {
    id: 2,
    handle: "@sricharan",
    text: "I’m building Dotportion for founders who hate waiting on backend tickets just to ship a simple feature.",
  },
  {
    id: 3,
    handle: "@sricharan",
    text: "Your API shouldn’t be a black box. Every node is intentional, debuggable, and versioned.",
  },
  {
    id: 4,
    handle: "@sricharan",
    text: "If you can describe the workflow in plain English, you can build it in Dotportion’s visual editor.",
  },
  {
    id: 5,
    handle: "@sricharan",
    text: "You don’t have to choose between flexibility and speed. Dotportion gives you both.",
  },
  {
    id: 6,
    handle: "@sricharan",
    text: "I want you to spend more time on product and less on plumbing. That’s the entire point of Dotportion.",
  },
  {
    id: 7,
    handle: "@sricharan",
    text: "Dotportion lets you go from idea to working backend in a weekend, without sacrificing structure or scalability.",
  },
  {
    id: 8,
    handle: "@sricharan",
    text: "I’m building Dotportion for founders who hate waiting on backend tickets just to ship a simple feature.",
  },
  {
    id: 9,
    handle: "@sricharan",
    text: "Dotportion lets you go from idea to working backend in a weekend, without sacrificing structure or scalability.",
  },
  {
    id: 10,
    handle: "@sricharan",
    text: "I’m building Dotportion for founders who hate waiting on backend tickets just to ship a simple feature.",
  },
  {
    id: 11,
    handle: "@sricharan",
    text: "Your API shouldn’t be a black box. Every node is intentional, debuggable, and versioned.",
  },
  {
    id: 12,
    handle: "@sricharan",
    text: "If you can describe the workflow in plain English, you can build it in Dotportion’s visual editor.",
  },
  {
    id: 13,
    handle: "@sricharan",
    text: "You don’t have to choose between flexibility and speed. Dotportion gives you both.",
  },
  {
    id: 14,
    handle: "@sricharan",
    text: "I want you to spend more time on product and less on plumbing. That’s the entire point of Dotportion.",
  },
  {
    id: 15,
    handle: "@sricharan",
    text: "Dotportion lets you go from idea to working backend in a weekend, without sacrificing structure or scalability.",
  },
  {
    id: 16,
    handle: "@sricharan",
    text: "I’m building Dotportion for founders who hate waiting on backend tickets just to ship a simple feature.",
  },
];

const frameworks = [
  { id: "react", label: "React", Icon: FaReact },
  { id: "next", label: "Next.js", Icon: SiNextdotjs },
  { id: "redwood", label: "RedwoodJS", Icon: SiRedwoodjs },
  { id: "flutter", label: "Flutter", Icon: FaFlutter },
  { id: "kotlin", label: "Kotlin", Icon: SiKotlin },
  { id: "svelte", label: "Svelte", Icon: RiSvelteFill },
  { id: "solid", label: "SolidJS", Icon: TbBrandSolidjs },
  { id: "vue", label: "Vue.js", Icon: RiVuejsFill },
  { id: "nuxt", label: "Nuxt.js", Icon: SiNuxtdotjs },
  { id: "refine", label: "Refine", Icon: SiRefine },
];

const defaultCards = [
  {
    icon: <Sparkles className="size-4 text-blue-300" />,
    title: "POST /auth/login",
    description: "User logged in via email/password",
    date: "2 min ago",
    iconClassName:
      "text-blue-500  bg-blue-100 dark:bg-blue-800 border border-blue-300",
    titleClassName: "text-blue-500",
    className:
      "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Sparkles className="size-4 text-amber-300" />,
    title: "GET /workflows/124/logs",
    description: "Fetched execution logs (312 records)",
    date: "1 hr ago",
    iconClassName:
      "text-amber-500 bg-amber-100 dark:bg-amber-800 border border-amber-300",
    titleClassName: "text-amber-500",
    className:
      "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Sparkles className="size-4 text-green-300" />,
    title: "POST /user/id",
    description: "User updated his details successfuly",
    date: "Today",
    iconClassName:
      "text-green-500 bg-green-100 dark:bg-green-800 border border-green-300",
    titleClassName: "text-green-500",
    className:
      "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
  },
];

export default function Page() {
  const [activeFrameworkId, setActiveFrameworkId] = useState<string>("flutter");
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isWorkflowHovered, setIsWorkflowHovered] = useState(false);

  const activeFramework =
    frameworks.find((f) => f.id === activeFrameworkId) ??
    frameworks.find((f) => f.id === "flutter")!;

  const schemaCanvas = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: schemaCanvas,
    offset: ["start end", "end end"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], [15, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  return (
    <div className="min-h-screen bg-[#fcfcfc] dark:bg-[#121212]">
      {/* navigation */}
      <Header />
      <main className="relative min-h-screen">
        {/* hero */}
        <section id="hero" className="relative -mt-[65px]">
          <div
            style={{ width: "100%", height: "600px" }}
            className="absolute top-0 dark:block hidden"
          >
            {/* <LightRays
              raysOrigin="top-center"
              raysColor="#000"
              raysSpeed={1.5}
              lightSpread={0.8}
              rayLength={0.4}
              followMouse={true}
              mouseInfluence={0.1}
              noiseAmount={0.1}
              distortion={0.05}
              className="custom-rays dark:hidden block"
            /> */}
            <LightRays
              raysOrigin="top-center"
              raysColor="#fff"
              raysSpeed={1.5}
              lightSpread={0.8}
              rayLength={0.4}
              followMouse={true}
              mouseInfluence={0.1}
              noiseAmount={0.1}
              distortion={0.05}
              className="custom-rays "
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 1,
              delay: 0.25,
              ease: "easeInOut",
            }}
          >
            <FloatingNodes />
          </motion.div>
          <div className="sm:py-18 container relative mx-auto px-6 py-16 md:py-24 lg:px-16 lg:py-24 xl:px-20 pt-8 pb-10 md:pt-16 overflow-hidden">
            <div className="relative">
              <div className="mx-auto">
                <div className="mx-auto max-w-3xl lg:col-span-6 lg:flex lg:items-center justify-center text-center">
                  <div className="relative z-10 lg:h-auto pt-[90px] lg:pt-[90px] lg:min-h-[300px] flex flex-col items-center justify-center sm:mx-auto md:w-3/4 lg:mx-0 lg:w-full gap-4 lg:gap-8">
                    <div className="flex flex-col items-center ">
                      <motion.span
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.15,
                          ease: "easeInOut",
                        }}
                        className="text-xs text-neutral-600 dark:text-neutral-300 mb-5 border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 px-3 py-1 flex gap-2 items-center rounded-full"
                      >
                        <div className="bg-green-500 h-3 w-3 animate-pulse rounded-full" />
                        Early Access Filling Fast
                      </motion.span>
                      <h1 className="text-foreground font-dm-sans text-4xl sm:text-5xl sm:leading-none lg:text-6xl">
                        <motion.span
                          initial={{ opacity: 0, y: 50 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.15 }}
                          transition={{
                            duration: 0.7,
                            delay: 0.15,
                            ease: "easeInOut",
                          }}
                          className="block text-neutral-600 dark:text-neutral-500"
                        >
                          Build your backend visually
                        </motion.span>
                        <motion.span
                          initial={{ opacity: 0, y: 50 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.15 }}
                          transition={{
                            duration: 0.7,
                            delay: 0.18,
                            ease: "easeInOut",
                          }}
                          className="text-brand font-medium block md:ml-0"
                        >
                          Ship products 10× faster
                        </motion.span>
                      </h1>
                      <motion.p
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{
                          duration: 0.7,
                          delay: 0.2,
                          ease: "easeInOut",
                        }}
                        className="pt-2 font-dm-sans text-foreground dark:text-neutral-500 my-3 text-sm sm:mt-5 lg:mb-0 sm:text-base lg:text-base"
                      >
                        A new way to build backends.faster, visual,
                        collaborative.
                        <br className="hidden md:block" /> Join the builders
                        shaping DotPortion before anyone else
                      </motion.p>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{
                        duration: 0.7,
                        delay: 0.25,
                        ease: "easeInOut",
                      }}
                      className="flex items-center gap-2 "
                    >
                      <Link
                        href={"https://beta.dotportion.com"}
                        className="px-2 lg:px-4 py-1 lg:py-2 h-7 lg:h-10  text-sm justify-center cursor-pointer items-center space-x-2 text-center ease-out duration-200 rounded-md outline-none transition-all outlint-0 border border-neutral-700 text-white bg-neutral-900 hover:bg-neutral-700 dark:bg-white dark:border-neutral-300 dark:text-black dark:hover:bg-neutral-300"
                      >
                        Get Early Access
                      </Link>
                      <Link
                        href={"/contact/sales"}
                        className="px-2 lg:px-4 py-1 lg:py-2 h-7 lg:h-10  text-sm justify-center cursor-pointer items-center space-x-2 text-center ease-out duration-200 rounded-md outline-none transition-all outlint-0 border border-neutral-300 hover:border-neutral-400 text-neutral-700 bg-white hover:bg-neutral-100 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-700"
                      >
                        Request a Demo
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* workflow canvas */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 1,
            delay: 0.25,
            ease: "easeInOut",
          }}
          className="relative flex flex-col items-center px-4 sm:px-6 lg:px-0 pb-12 md:pb-20 lg:pb-24"
        >
          {/* Soft radial glow */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 1,
              delay: 0.25,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute -top-6 left-1/2 h-1/2 w-1/2 -translate-x-1/2 rounded-full bg-blue-200 dark:bg-white/30 opacity-30 blur-3xl"
          />

          <MockupFrame
            className="animate-appear opacity-0 delay-700 bg-neutral-100 dark:bg-neutral-700 z-40 w-full max-w-6xl"
            size="small"
          >
            <Mockup type="responsive" className="z-10 w-full">
              <div className="w-full h-full aspect-video lg:aspect-auto">
                <HeroFlowPreview />
              </div>
            </Mockup>
          </MockupFrame>
        </motion.section>

        {/* FEATURES GRID */}
        <section
          id="features"
          className="pt-14 md:pt-24 sm:py-18 container relative mx-auto px-6 py-16 md:py-24 lg:px-16 lg:py-24 xl:px-20  grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-4 xl:gap-3 2xl:gap-6 md:grid-cols-12"
        >
          {/* 1 - workflow */}
          <div
            onMouseEnter={() => setIsWorkflowHovered(true)}
            onMouseLeave={() => setIsWorkflowHovered(false)}
            className="group relative w-full sm:h-[400px] flex flex-col gap-5 lg:flex-row focus:outline-none focus:border-none focus:ring-brand-600 focus:ring-2 focus:rounded-xl col-span-6 md:col-span-12 xl:col-span-6"
          >
            <div className="group/panel rounded-lg md:rounded-xl p-px bg-neutral-100 dark:bg-[#171717]  border border-neutral-300 dark:border-neutral-800 transition-all hover:shadow-md flex items-center justify-center hover:bg-none hover:border-neutral-400! dark:hover:border-neutral-700! relative w-full h-full">
              <div className="z-10 rounded-[7px] md:rounded-[11px] relative overflow-hidden flex-1 flex flex-row sm:flex-col gap-4 items-start sm:items-center lg:items-start justify-between bg-surface-75 w-full h-full text-neutral-500 [&_strong]:font-normal! [&_strong]:text-foreground! p-4 sm:py-6">
                <div className="relative z-10 h-full w-full mx-auto gap-2 sm:gap-4 flex flex-col items-start sm:items-center text-left sm:text-center md:ml-2 md:mt-2 lg:pl-0 md:justify-start md:max-w-[250px] md:text-left md:items-start">
                  <div className="flex items-center gap-2 text-foreground font-dm-sans">
                    <Workflow className="size-4" />
                    <h2>Workflows (API&apos;S)</h2>
                  </div>
                  <div className="flex-1 flex flex-col justify-between gap-2">
                    <p className="text-sm [&_strong]:text-foreground!">
                      Build <strong>complete backend logic using nodes</strong>{" "}
                      for Parameters, Logic, Database, Auth, and Responses.
                      Every workflow becomes a{" "}
                      <strong>production ready API.</strong>
                    </p>
                    <span className="hidden lg:block text-foreground md:block">
                      <ul className="flex flex-col gap-1 text-sm font-dm-sans">
                        <li className="flex items-center gap-1 ">
                          <Check className="size-4" />
                          Versioned workflows
                        </li>
                        <li className="flex items-center gap-1">
                          <Check className="size-4" />
                          Step-by-step execution flow
                        </li>
                        <li className="flex items-center gap-1">
                          <Check className="size-4" />
                          Automatic req / res typing
                        </li>
                      </ul>
                    </span>
                  </div>
                </div>
                <figure className="absolute inset-0 z-0 hidden sm:block">
                  <span className="absolute group w-full md:w-auto h-full md:aspect-square flex items-end md:items-center justify-center md:justify-end right-0 left-0 md:left-auto xl:-right-12 2xl:right-0 top-12 md:top-0 md:bottom-0 my-auto">
                    <WorkflowMiniCanvas animate={isWorkflowHovered} />
                  </span>
                </figure>
              </div>
            </div>
          </div>
          {/* 2 - auth */}
          <div className="group relative w-full sm:h-[400px] flex flex-col gap-5 lg:flex-row focus:outline-none focus:border-none focus:ring-brand-600 focus:ring-2 focus:rounded-xl col-span-6 xl:col-span-3">
            <div className="group/panel rounded-lg md:rounded-xl p-px bg-neutral-100 dark:bg-[#171717] border border-neutral-300 dark:border-neutral-800 transition-all hover:shadow-md flex items-center justify-center hover:bg-none hover:border-neutral-400! dark:hover:border-neutral-700! relative w-full h-full">
              <div className="z-10 rounded-[7px] md:rounded-[11px] relative overflow-hidden flex-1 flex flex-row sm:flex-col gap-4 items-start sm:items-center lg:items-start justify-between bg-surface-75 w-full h-full text-neutral-500 [&_strong]:font-normal! [&_strong]:text-foreground! p-4 sm:py-6">
                <div className="relative z-10 h-full w-full mx-auto gap-2 sm:gap-4 flex flex-col items-start sm:items-center text-left sm:text-center lg:mx-0 lg:pl-2 lg:items-start lg:text-left">
                  <div className="flex items-center gap-2 text-foreground">
                    <Lock className="size-4" />
                    <h2>Secrets</h2>
                  </div>
                  <div className="flex-1 flex flex-col justify-between gap-2">
                    <p className="text-sm [&_strong]:text-foreground!">
                      <strong>
                        Store and manage sensitive credentials securely.
                      </strong>
                      , <br className="hidden lg:inline-block" />
                      Use Secrets inside workflows without exposing them
                    </p>
                  </div>
                </div>
                <figure className="group absolute inset-0 z-0 bottom-0 -top-16 xl:top-0 xl:bottom-0 hidden sm:block">
                  <div className="bg-transparent h-1/2 w-full "></div>
                  <div className=" w-full h-1/2 grid grid-cols-2 grid-rows-3 gap-2 py-2">
                    <div className="relative overflow-hidden w-full h-full border-l-0 border border-neutral-300 dark:border-neutral-800 rounded-r-md">
                      <span className="text-sm absolute top-1/4 text-neutral-500 -left-6">
                        sricharan@gmail.com
                      </span>
                    </div>
                    <div className="relative overflow-hidden w-full h-full border-r-0 border border-neutral-300 dark:border-neutral-800 rounded-l-md">
                      <span className="text-sm absolute top-1/4 text-neutral-500 -right-3">
                        portioner@1234
                      </span>
                    </div>
                    <div className="relative overflow-hidden w-full h-full border-l-0 border border-neutral-300 dark:border-neutral-800 group-hover:border-neutral-700 transition-all duration-200 rounded-r-md">
                      <span className="transition-all duration-200 leading-0  text-6xl blur-sm group-hover:blur-none absolute top-1/6 text-neutral-500 -left-2 bg-red-200">
                        . . . .
                      </span>
                    </div>
                    <div className="relative overflow-hidden w-full h-full border-r-0 border border-neutral-300 dark:border-neutral-800 group-hover:border-neutral-700 transition-all duration-200 rounded-l-md">
                      <span className="transition-all duration-200 leading-0  text-6xl blur-sm group-hover:blur-none absolute top-1/6 text-neutral-500 -right-2 bg-red-200">
                        . . . .
                      </span>
                    </div>
                    <div className="relative overflow-hidden w-full h-full border-l-0 border border-neutral-300 dark:border-neutral-800 rounded-r-md">
                      <span className="text-sm absolute top-1/4 text-neutral-500 -left-6">
                        charanrayala@gmail.com
                      </span>
                    </div>
                    <div className="relative overflow-hidden w-full h-full border-r-0 border border-neutral-300 dark:border-neutral-800 rounded-l-md">
                      <span className="text-sm absolute top-1/4 text-neutral-500 -right-3">
                        wonkwizard@1234
                      </span>
                    </div>
                  </div>
                </figure>
              </div>
            </div>
          </div>
          {/* 2 - Logs */}
          <div className="group relative w-full sm:h-[400px] flex flex-col gap-5 lg:flex-row focus:outline-none focus:border-none focus:ring-brand-600 focus:ring-2 focus:rounded-xl col-span-6 xl:col-span-3">
            <div className="group/panel rounded-lg md:rounded-xl p-px bg-neutral-100 dark:bg-[#171717] border border-neutral-300 dark:border-neutral-800 transition-all hover:shadow-md flex items-center justify-center hover:bg-none hover:border-neutral-400! dark:hover:border-neutral-700! relative w-full h-full">
              <div className="z-10 rounded-[7px] md:rounded-[11px] relative overflow-hidden flex-1 flex flex-row sm:flex-col gap-4 items-start sm:items-center lg:items-start justify-between bg-surface-75 w-full h-full text-neutral-500 [&_strong]:font-normal! [&_strong]:text-foreground! p-4 sm:py-6">
                <div className="relative z-10 h-full w-full mx-auto gap-2 sm:gap-4 flex flex-col items-start sm:items-center text-left sm:text-center lg:mx-0 lg:pl-2 lg:items-start lg:text-left">
                  <div className="flex items-center gap-2 text-foreground">
                    <Logs className="size-4" />
                    <h2>Logs</h2>
                  </div>
                  <div className="flex-1 flex flex-col justify-between gap-2">
                    <p className="text-sm [&_strong]:text-foreground!">
                      <strong>
                        See exactly what your workflows are doing.
                      </strong>
                      , <br className="hidden lg:inline-block" />
                      Trace executions, inspect inputs/outputs, debug failures,
                    </p>
                  </div>
                </div>

                <figure className="group absolute inset-0 z-40 -top-16 xl:top-0 xl:bottom-0 hidden sm:block">
                  <div className="h-1/2 w-full"></div>

                  <div className="flex max-h-1/2 w-full items-center justify-center z-40">
                    <DisplayCards cards={defaultCards} />
                  </div>
                </figure>
              </div>
            </div>
          </div>
          {/* 2 - Database */}
          <div className="group relative w-full sm:h-[400px] flex flex-col gap-5 lg:flex-row focus:outline-none focus:border-none focus:ring-brand-600 focus:ring-2 focus:rounded-xl col-span-6 xl:col-span-3">
            <div className="group/panel rounded-lg md:rounded-xl p-px bg-neutral-100 dark:bg-[#171717] border border-neutral-300 dark:border-neutral-800 transition-all hover:shadow-md flex items-center justify-center hover:bg-none hover:border-neutral-400! dark:hover:border-neutral-700! relative w-full h-full">
              <div className="z-10 rounded-[7px] md:rounded-[11px] relative overflow-hidden flex-1 flex flex-row sm:flex-col gap-4 items-start sm:items-center lg:items-start justify-between bg-surface-75 w-full h-full text-neutral-500 [&_strong]:font-normal! [&_strong]:text-foreground! p-4 sm:py-6">
                <div className="relative z-10 h-full w-full mx-auto gap-2 sm:gap-4 flex flex-col items-start sm:items-center text-left sm:text-center lg:mx-0 lg:pl-2 lg:items-start lg:text-left">
                  <div className="flex items-center gap-2 text-foreground">
                    <Database className="size-4" />
                    <h2>Database</h2>
                  </div>
                  <div className="flex-1 flex flex-col justify-between gap-2">
                    <p className="text-sm [&_strong]:text-foreground!">
                      <strong>
                        Manage your data without leaving the editor.
                      </strong>
                      , <br className="hidden lg:inline-block" />
                      Connect your database, run queries visually, and use DB
                      Actions inside workflows
                    </p>
                  </div>
                </div>
                <figure className="absolute inset-0 overflow-hidden nowrap hidden sm:block">
                  <div
                    className="relative h-full left-0 w-auto items-end pb-4 z-10 flex
    whitespace-nowrap
    animate-marquee-x
    paused
    motion-safe:group-hover:running
    will-change-transform"
                  >
                    <div className="flex flex-col ml-2 gap-2 md:gap-2">
                      <div className="w-14 h-14 md:min-w-14 md:w-14 md:h-14 flex items-center justify-center rounded-lg border bg hover:border-neutral-500 text-neutral-500 hover:text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-800">
                        <File className="size-6" />
                      </div>
                      <div className="w-14 h-14 md:min-w-14 md:w-14 md:h-14  flex items-center justify-center rounded-lg border bg hover:border-neutral-500 text-neutral-500 hover:text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-800">
                        <ImageIcon className="size-6" />
                      </div>
                      <div className="w-14 h-14 md:min-w-14 md:w-14 md:h-14  flex items-center justify-center rounded-lg border bg hover:border-neutral-500 text-neutral-500 hover:text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-800">
                        <Video className="size-6" />
                      </div>
                    </div>
                    <div className="flex flex-col ml-2 gap-2 md:gap-2">
                      <div className="w-14 h-14 md:min-w-14 md:w-14 md:h-14 flex items-center justify-center rounded-lg border bg hover:border-neutral-500 text-neutral-500 hover:text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-800">
                        <File className="size-6" />
                      </div>
                      <div className="w-14 h-14 md:min-w-14 md:w-14 md:h-14  flex items-center justify-center rounded-lg border bg hover:border-neutral-500 text-neutral-500 hover:text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-800">
                        <ImageIcon className="size-6" />
                      </div>
                      <div className="w-14 h-14 md:min-w-14 md:w-14 md:h-14  flex items-center justify-center rounded-lg border bg hover:border-neutral-500 text-neutral-500 hover:text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-800">
                        <Video className="size-6" />
                      </div>
                    </div>
                    <div className="flex flex-col ml-2 gap-2 md:gap-2">
                      <div className="w-14 h-14 md:min-w-14 md:w-14 md:h-14 flex items-center justify-center rounded-lg border bg hover:border-neutral-500 text-neutral-600 hover:text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-800">
                        <File className="size-6" />
                      </div>
                      <div className="w-14 h-14 md:min-w-14 md:w-14 md:h-14  flex items-center justify-center rounded-lg border bg hover:border-neutral-500 text-neutral-600 hover:text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-800">
                        <ImageIcon className="size-6" />
                      </div>
                      <div className="w-14 h-14 md:min-w-14 md:w-14 md:h-14  flex items-center justify-center rounded-lg border bg hover:border-neutral-500 text-neutral-600 hover:text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-800">
                        <Video className="size-6" />
                      </div>
                    </div>
                    <div className="flex flex-col ml-2 gap-2 md:gap-2">
                      <div className="w-14 h-14 md:min-w-14 md:w-14 md:h-14 flex items-center justify-center rounded-lg border bg hover:border-neutral-500 text-neutral-600 hover:text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-800">
                        <File className="size-6" />
                      </div>
                      <div className="w-14 h-14 md:min-w-14 md:w-14 md:h-14  flex items-center justify-center rounded-lg border bg hover:border-neutral-500 text-neutral-600 hover:text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-800">
                        <ImageIcon className="size-6" />
                      </div>
                      <div className="w-14 h-14 md:min-w-14 md:w-14 md:h-14  flex items-center justify-center rounded-lg border bg hover:border-neutral-500 text-neutral-600 hover:text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-800">
                        <Video className="size-6" />
                      </div>
                    </div>
                    <div className="flex flex-col ml-2 gap-2 md:gap-2">
                      <div className="w-14 h-14 md:min-w-14 md:w-14 md:h-14 flex items-center justify-center rounded-lg border bg hover:border-neutral-500 text-neutral-500 hover:text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-800">
                        <File className="size-6" />
                      </div>
                      <div className="w-14 h-14 md:min-w-14 md:w-14 md:h-14  flex items-center justify-center rounded-lg border bg hover:border-neutral-500 text-neutral-500 hover:text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-800">
                        <ImageIcon className="size-6" />
                      </div>
                      <div className="w-14 h-14 md:min-w-14 md:w-14 md:h-14  flex items-center justify-center rounded-lg border bg hover:border-neutral-500 text-neutral-500 hover:text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-800">
                        <Video className="size-6" />
                      </div>
                    </div>
                    <div className="flex flex-col ml-2 gap-2 md:gap-2">
                      <div className="w-14 h-14 md:min-w-14 md:w-14 md:h-14 flex items-center justify-center rounded-lg border bg hover:border-neutral-500 text-neutral-500 hover:text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-800">
                        <File className="size-6" />
                      </div>
                      <div className="w-14 h-14 md:min-w-14 md:w-14 md:h-14  flex items-center justify-center rounded-lg border bg hover:border-neutral-500 text-neutral-500 hover:text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-800">
                        <ImageIcon className="size-6" />
                      </div>
                      <div className="w-14 h-14 md:min-w-14 md:w-14 md:h-14  flex items-center justify-center rounded-lg border bg hover:border-neutral-500 text-neutral-500 hover:text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-800">
                        <Video className="size-6" />
                      </div>
                    </div>
                    <div className="flex flex-col ml-2 gap-2 md:gap-2">
                      <div className="w-14 h-14 md:min-w-14 md:w-14 md:h-14 flex items-center justify-center rounded-lg border bg hover:border-neutral-500 text-neutral-600 hover:text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-800">
                        <File className="size-6" />
                      </div>
                      <div className="w-14 h-14 md:min-w-14 md:w-14 md:h-14  flex items-center justify-center rounded-lg border bg hover:border-neutral-500 text-neutral-600 hover:text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-800">
                        <ImageIcon className="size-6" />
                      </div>
                      <div className="w-14 h-14 md:min-w-14 md:w-14 md:h-14  flex items-center justify-center rounded-lg border bg hover:border-neutral-500 text-neutral-600 hover:text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-800">
                        <Video className="size-6" />
                      </div>
                    </div>
                    <div className="flex flex-col ml-2 gap-2 md:gap-2">
                      <div className="w-14 h-14 md:min-w-14 md:w-14 md:h-14 flex items-center justify-center rounded-lg border bg hover:border-neutral-500 text-neutral-600 hover:text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-800">
                        <File className="size-6" />
                      </div>
                      <div className="w-14 h-14 md:min-w-14 md:w-14 md:h-14  flex items-center justify-center rounded-lg border bg hover:border-neutral-500 text-neutral-600 hover:text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-800">
                        <ImageIcon className="size-6" />
                      </div>
                      <div className="w-14 h-14 md:min-w-14 md:w-14 md:h-14  flex items-center justify-center rounded-lg border bg hover:border-neutral-500 text-neutral-600 hover:text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-800">
                        <Video className="size-6" />
                      </div>
                    </div>
                  </div>
                </figure>
              </div>
            </div>
          </div>

          {/* 2 - API Docs */}
          <div className="group relative w-full sm:h-[400px] flex flex-col gap-5 lg:flex-row focus:outline-none focus:border-none focus:ring-brand-600 focus:ring-2 focus:rounded-xl col-span-6 xl:col-span-3">
            <div className="group/panel rounded-lg md:rounded-xl p-px bg-neutral-100 dark:bg-[#171717] border border-neutral-300 dark:border-neutral-800 transition-all hover:shadow-md flex items-center justify-center hover:bg-none hover:border-neutral-400! dark:hover:border-neutral-700! relative w-full h-full">
              <div className="z-10 rounded-[7px] md:rounded-[11px] relative overflow-hidden flex-1 flex flex-row sm:flex-col gap-4 items-start sm:items-center lg:items-start justify-between bg-surface-75 w-full h-full text-neutral-500 [&_strong]:font-normal! [&_strong]:text-foreground! p-4 sm:py-6">
                <div className="relative z-10 h-full w-full mx-auto gap-2 sm:gap-4 flex flex-col items-start sm:items-center text-left sm:text-center lg:mx-0 lg:pl-2 lg:items-start lg:text-left">
                  <div className="flex items-center gap-2 text-foreground">
                    <File className="size-4" />
                    <h2>API Docs</h2>
                  </div>
                  <div className="flex-1 flex flex-col justify-between gap-2">
                    <p className="text-sm [&_strong]:text-foreground!">
                      <strong>Documentation generated automatically.</strong>
                      , <br className="hidden lg:inline-block" />
                      Every workflow instantly becomes a clean, shareable API
                      endpoint.
                    </p>
                  </div>
                </div>
                <figure className="absolute inset-0 overflow-hidden nowrap hidden sm:block">
                  <div className="h-3/6"></div>
                  <div className="h-3/6 overflow-hidden pt-6 relative border-t border-neutral-300 dark:border-neutral-800 group-hover:border-neutral-700">
                    <div
                      className="relative h-full left-0  w-auto items-end pb-4 z-10 flex  flex-col gap-2
    whitespace-nowrap
    animate-marquee-y
    paused
    motion-safe:group-hover:running
    will-change-transform
    "
                    >
                      <div className="flex items-center gap-6 ml-2 w-full relative">
                        <div className="ml-5 z-10 w-fit h-7 md:h-7 flex items-center justify-center rounded-md border border-green-500 dark:border-green-800 bg-green-100 dark:bg-green-950  hover:border-green-700 text-green-600 hover:text-green-500 hover:bg-green-800 px-2 py-1">
                          Post
                        </div>
                        <p className="z-10  bg-neutral-100 dark:bg-neutral-800 px-3 py-1 rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-400 text-sm">
                          ../api/v1/create
                        </p>
                        <div className="border-t-2 border-dashed h-1 w-full absolute"></div>
                      </div>
                      <div className="flex items-center gap-6 ml-2 w-full relative">
                        <div className="ml-10 z-10 w-fit h-7 md:h-7 flex items-center justify-center rounded-md border border-amber-500 dark:border-amber-800 bg-amber-100 dark:bg-amber-950  hover:border-amber-700 text-amber-600 hover:text-amber-500 hover:bg-amber-800 px-2 py-1">
                          Get
                        </div>
                        <p className="z-10  bg-neutral-100 dark:bg-neutral-800 px-3 py-1 rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-400 text-sm">
                          ../api/v1/id
                        </p>
                        <div className="border-t-2 border-dashed h-1 w-full absolute"></div>
                      </div>
                      <div className="flex items-center gap-6 ml-2 w-full relative">
                        <div className="ml-2 z-10 w-fit h-7 md:h-7 flex items-center justify-center rounded-md border border-blue-500 dark:border-blue-800 bg-blue-100 dark:bg-blue-950  hover:border-blue-700 text-blue-600 hover:text-blue-500 hover:bg-blue-800 px-2 py-1">
                          PUT
                        </div>
                        <p className="z-10  bg-neutral-100 dark:bg-neutral-800 px-3 py-1 rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-400 text-sm">
                          ../api/v1/id
                        </p>
                        <div className="border-t-2 border-dashed h-1 w-full absolute"></div>
                      </div>
                      <div className="flex items-center gap-6 ml-2 w-full relative">
                        <div className="ml-16 z-10 w-fit h-7 md:h-7 flex items-center justify-center rounded-md border border-red-500 dark:border-red-800 bg-red-100 dark:bg-red-950 text-red-600 hover:text-red-500 hover:bg-red-800 px-2 py-1">
                          Delete
                        </div>
                        <p className="z-10  bg-neutral-100 dark:bg-neutral-800 px-3 py-1 rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-400 text-sm">
                          ../api/v1/id
                        </p>
                        <div className="border-t-2 border-dashed h-1 w-full absolute"></div>
                      </div>
                      <div className="flex items-center gap-6 ml-2 w-full relative">
                        <div className="ml-10 z-10 w-fit h-7 md:h-7 flex items-center justify-center rounded-md border border-amber-500 dark:border-amber-800 bg-amber-100 dark:bg-amber-950  hover:border-amber-700 text-amber-600 hover:text-amber-500 hover:bg-amber-800 px-2 py-1">
                          Get
                        </div>
                        <p className="z-10  bg-neutral-100 dark:bg-neutral-800 px-3 py-1 rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-400 text-sm">
                          ../api/v1/all
                        </p>
                        <div className="border-t-2 border-dashed h-1 w-full absolute"></div>
                      </div>
                      <div className="flex items-center gap-6 ml-2 w-full relative">
                        <div className="ml-5 z-10 w-fit h-7 md:h-7 flex items-center justify-center rounded-md border border-green-500 dark:border-green-800 bg-green-100 dark:bg-green-950  hover:border-green-700 text-green-600 hover:text-green-500 hover:bg-green-800 px-2 py-1">
                          Post
                        </div>
                        <p className="z-10  bg-neutral-100 dark:bg-neutral-800 px-3 py-1 rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-400 text-sm">
                          ../api/v1/create
                        </p>
                        <div className="border-t-2 border-dashed h-1 w-full absolute"></div>
                      </div>
                      <div className="flex items-center gap-6 ml-2 w-full relative">
                        <div className="ml-10 z-10 w-fit h-7 md:h-7 flex items-center justify-center rounded-md border border-amber-500 dark:border-amber-800 bg-amber-100 dark:bg-amber-950  hover:border-amber-700 text-amber-600 hover:text-amber-500 hover:bg-amber-800 px-2 py-1">
                          Get
                        </div>
                        <p className="z-10  bg-neutral-100 dark:bg-neutral-800 px-3 py-1 rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-400 text-sm">
                          ../api/v1/id
                        </p>
                        <div className="border-t-2 border-dashed h-1 w-full absolute"></div>
                      </div>
                      <div className="flex items-center gap-6 ml-2 w-full relative">
                        <div className="ml-2 z-10 w-fit h-7 md:h-7 flex items-center justify-center rounded-md border border-blue-500 dark:border-blue-800 bg-blue-100 dark:bg-blue-950  hover:border-blue-700 text-blue-600 hover:text-blue-500 hover:bg-blue-800 px-2 py-1">
                          PUT
                        </div>
                        <p className="z-10  bg-neutral-100 dark:bg-neutral-800 px-3 py-1 rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-400 text-sm">
                          ../api/v1/id
                        </p>
                        <div className="border-t-2 border-dashed h-1 w-full absolute"></div>
                      </div>
                      <div className="flex items-center gap-6 ml-2 w-full relative">
                        <div className="ml-16 z-10 w-fit h-7 md:h-7 flex items-center justify-center rounded-md border border-red-500 dark:border-red-800 bg-red-100 dark:bg-red-950 text-red-600 hover:text-red-500 hover:bg-red-800 px-2 py-1">
                          Delete
                        </div>
                        <p className="z-10  bg-neutral-100 dark:bg-neutral-800 px-3 py-1 rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-400 text-sm">
                          ../api/v1/id
                        </p>
                        <div className="border-t-2 border-dashed h-1 w-full absolute"></div>
                      </div>
                      <div className="flex items-center gap-6 ml-2 w-full relative">
                        <div className="ml-10 z-10 w-fit h-7 md:h-7 flex items-center justify-center rounded-md border border-amber-500 dark:border-amber-800 bg-amber-100 dark:bg-amber-950  hover:border-amber-700 text-amber-600 hover:text-amber-500 hover:bg-amber-800 px-2 py-1">
                          Get
                        </div>
                        <p className="z-10  bg-neutral-100 dark:bg-neutral-800 px-3 py-1 rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-400 text-sm">
                          ../api/v1/all
                        </p>
                        <div className="border-t-2 border-dashed h-1 w-full absolute"></div>
                      </div>
                    </div>
                  </div>
                </figure>
              </div>
            </div>
          </div>

          {/* 1 - schema canvas */}
          <div className="group relative w-full sm:h-[400px] flex flex-col gap-5 lg:flex-row focus:outline-none focus:border-none focus:ring-brand-600 focus:ring-2 focus:rounded-xl col-span-6 md:col-span-12 xl:col-span-6">
            <div className="group/panel rounded-lg md:rounded-xl p-px bg-neutral-100 dark:bg-[#171717]  border border-neutral-300 dark:border-neutral-800 transition-all hover:shadow-md flex items-center justify-center hover:bg-none hover:border-neutral-400! dark:hover:border-neutral-700! relative w-full h-full">
              <div className="z-10 rounded-[7px] md:rounded-[11px] relative overflow-hidden flex-1 flex flex-row sm:flex-col gap-4 items-start sm:items-center lg:items-start justify-between bg-surface-75 w-full h-full text-neutral-500 [&_strong]:font-normal! [&_strong]:text-foreground! p-4 sm:py-6">
                <div className="relative z-10 h-full w-full mx-auto gap-2 sm:gap-4 flex flex-col items-start sm:items-center text-left sm:text-center md:ml-2 md:mt-2 lg:pl-0 md:justify-start md:max-w-[250px] md:text-left md:items-start">
                  <div className="flex items-center gap-2 text-foreground font-dm-sans">
                    <Pencil className="size-4" />
                    <h2>Schema Canvas</h2>
                  </div>
                  <div className="flex-1 flex flex-col justify-between gap-2">
                    <p className="text-sm [&_strong]:text-foreground!">
                      A <strong>visual schema editor</strong> that keeps your
                      data structures, workflow inputs, and API contracts{" "}
                      <strong>perfectly aligned.</strong>
                    </p>
                    <span className="hidden lg:block text-foreground md:block">
                      <ul className="flex flex-col gap-1 text-sm font-dm-sans">
                        <li className="flex items-center gap-1 ">
                          <Check className="size-4" />
                          Interactive schema diagrams
                        </li>
                        <li className="flex items-center gap-1">
                          <Check className="size-4" />
                          Auto-generated types
                        </li>
                        <li className="flex items-center gap-1">
                          <Check className="size-4" />
                          Live sync with workflows
                        </li>
                      </ul>
                    </span>
                  </div>
                </div>
                <figure className="absolute inset-0 z-0 hidden sm:block">
                  <span className="absolute group w-full md:w-auto h-full md:aspect-square flex items-end md:items-center justify-center md:justify-end right-0 left-0 md:left-auto xl:-right-12 2xl:right-0 top-12 md:top-0 md:bottom-0 my-auto">
                    <SchemaMiniCanvas />
                  </span>
                </figure>
              </div>
            </div>
          </div>
          <p className="text-xl sm:text-2xl text-neutral-500 col-span-full tracking-[-.01rem]">
            Modular tools that unify into a{" "}
            <span className="text-foreground"> complete backend platform</span>
          </p>
        </section>

        {/* use with */}
        <section
          id="integrations"
          className="sm:py-18 container relative mx-auto px-6 py-16 md:py-24 lg:px-16 lg:py-24 xl:px-20"
        >
          <div className="relative z-20 w-full max-w-6xl mx-auto h-full flex flex-col xl:flex-row gap-4 items-center justify-between">
            {/* name */}
            <div className="leading-tight! text-center xl:text-left text-2xl md:text-4xl text-neutral-500 whitespace-nowrap">
              Use Dotportion with
              <div className="block">
                <span className="inline-block text-foreground font-medium font-dm-sans">
                  {activeFramework.label}
                </span>
              </div>
            </div>
            {/* grid icons */}
            <div
              className="grid grid-cols-5 md:grid-cols-10"
              onMouseLeave={() => setIsHovering(false)}
            >
              {frameworks.map((framework) => {
                const { id, Icon } = framework;
                const isActive = activeFrameworkId === id;

                const colorClass = isHovering
                  ? isActive
                    ? "text-neutral-800 dark:text-neutral-400"
                    : "text-neutral-400 dark:text-neutral-800"
                  : "text-neutral-800 dark:text-neutral-400"; // when not hovering, all active color

                return (
                  <div
                    key={id}
                    className="transition-opacity group"
                    onMouseEnter={() => {
                      setActiveFrameworkId(id);
                      setIsHovering(true);
                    }}
                  >
                    <div
                      className={`
                        m-1 bg-transparent h-16 w-16 flex items-center justify-center rounded-md
                        border-foreground-light
                        transition-all
                        ${colorClass}
                      `}
                    >
                      <Icon className="size-11" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Schema Canvas */}
        <section className="sm:pt-18 container relative mx-auto px-6 pt-16 md:pt-24 lg:px-16 lg:pt-24 xl:px-20 text-center">
          <h3 className="mb-8 text-2xl md:text-4xl max-w-[300px] sm:max-w-none mx-auto text-neutral-500">
            <span className="text-foreground">
              Model your data, workflows, and relations
            </span>
            <br className="hidden sm:block" />
            all inside the Schema Canvas
          </h3>
          <div className="relative flex flex-col gap-8 lg:gap-12 items-center">
            <ul className="position order-last lg:order-2 w-ful flex flex-wrap items-center gap-x-8 gap-y-4 lg:gap-8 justify-center text-center mx-auto z-30">
              <li className="group cursor-pointer flex items-center gap-2 text-sm whitespace-nowrap text-neutral-500 hover:text-foreground transition-colors hover:underline">
                <Check className="size-4" />
                <span>Visual ERD Editor</span>
              </li>
              <li className="group cursor-pointer flex items-center gap-2 text-sm whitespace-nowrap text-neutral-500 hover:text-foreground transition-colors hover:underline">
                <Check className="size-4" />
                <span>Relation Mapping</span>
              </li>
              <li className="group cursor-pointer flex items-center gap-2 text-sm whitespace-nowrap text-neutral-500 hover:text-foreground transition-colors hover:underline">
                <Check className="size-4" />
                <span>Auto-Generated Types</span>
              </li>
              <li className="group cursor-pointer flex items-center gap-2 text-sm whitespace-nowrap text-neutral-500 hover:text-foreground transition-colors hover:underline">
                <Check className="size-4" />
                <span>Workflow-Synced Models</span>
              </li>
              <li className="group cursor-pointer flex items-center gap-2 text-sm whitespace-nowrap text-neutral-500 hover:text-foreground transition-colors hover:underline">
                <Check className="size-4" />
                <span>Instant API Contracts</span>
              </li>
            </ul>
            <motion.div
              style={{
                opacity: opacity,
                rotateX: rotateX,
                transformPerspective: "800px",
              }}
            >
              <MockupFrame
                className="animate-appear opacity-0 delay-700 z-40 bg-neutral-100 dark:bg-neutral-700 lg:order-last"
                size="small"
                ref={schemaCanvas}
              >
                <Mockup type="responsive" className="z-10">
                  <div className="max-w-6xl w-full h-ful z-40 aspect-video lg:aspect-auto">
                    <SchemaHeroPreview />
                  </div>
                </Mockup>
              </MockupFrame>
            </motion.div>
          </div>
        </section>

        {/* comparision */}
        <section
          id="comparison"
          className="max-w-[1400px] w-full mx-auto px-6 mt-[120px] lg:mt-40"
        >
          <span className="text-neutral-500 text-[18px] tracking-[0] block text-center landing-text-medium lg:text-[19px]">
            Ok but...
          </span>
          <h2 className="text-[30px] leading-[115%] lg:leading-[115%] lg:text-[36px] font-medium tracking-[-0.04em] text-center text-black dark:text-white landing-text-medium flex flex-col items-center justify-center w-full max-w-2xl mx-auto">
            Why does DotPortion beat traditional backend development?
          </h2>
          <div className="mt-16 max-w-[900px] mx-auto lg:mt-20">
            {/* title */}
            <div className="grid grid-cols-12 w-full mb-4 px-4 lg:px-8 items-center">
              <div className="flex gap-x-0 justify-center items-center col-start-7 col-span-3 lg:gap-x-[7px]">
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
              </div>
              <div className="col-start-10 col-span-3 opacity-50">
                <h6 className="text-black dark:text-white  font-medium text-center text-xs lg:text-[16px] w-full">
                  Manual Backend / Tools
                </h6>
              </div>
            </div>
            {/* rows */}
            <div className="grid grid-cols-12 w-full text-black dark:text-white py-4 rounded-[12px] px-4 bg-neutral-100 dark:bg-neutral-900 lg:px-8">
              <h6 className="col-start-1 col-span-5 text-[16px] font-medium">
                Build APIs visually instead of writing boilerplate
              </h6>
              <h6 className="col-start-7 col-span-3 text-center flex justify-center items-center">
                <div className="flex items-center justify-center size-6 rounded-full">
                  <Check className="size-6" />
                </div>
              </h6>
              <h6 className="col-start-10 col-span-3 text-center flex items-center justify-center text-neutral-500">
                <div className="flex items-center justify-center  size-6 rounded-full">
                  <X className="size-6" />
                </div>
              </h6>
            </div>
            <div className="grid grid-cols-12 w-full text-black dark:text-white py-4 rounded-[12px] px-4  lg:px-8">
              <h6 className="col-start-1 col-span-5 text-[16px] font-medium">
                Auto-generated API endpoints & documentation
              </h6>
              <h6 className="col-start-7 col-span-3 text-center flex justify-center items-center">
                <div className="flex items-center justify-center size-6 rounded-full">
                  <Check className="size-6" />
                </div>
              </h6>
              <h6 className="col-start-10 col-span-3 text-center flex items-center justify-center text-neutral-500">
                <div className="flex items-center justify-center  size-6 rounded-full">
                  <X className="size-6" />
                </div>
              </h6>
            </div>
            <div className="grid grid-cols-12 w-full text-black dark:text-white py-4 rounded-[12px] px-4 bg-neutral-100 dark:bg-neutral-900 lg:px-8">
              <h6 className="col-start-1 col-span-5 text-[16px] font-medium">
                Visual database & schema modeling (SchemaCanvas)
              </h6>
              <h6 className="col-start-7 col-span-3 text-center flex justify-center items-center">
                <div className="flex items-center justify-center size-6 rounded-full">
                  <Check className="size-6" />
                </div>
              </h6>
              <h6 className="col-start-10 col-span-3 text-center flex items-center justify-center text-neutral-500">
                <div className="flex items-center justify-center  size-6 rounded-full">
                  <X className="size-6" />
                </div>
              </h6>
            </div>
            <div className="grid grid-cols-12 w-full text-black dark:text-white py-4 rounded-[12px] px-4  lg:px-8">
              <h6 className="col-start-1 col-span-5 text-[16px] font-medium">
                Secure secrets management out of the box
              </h6>
              <h6 className="col-start-7 col-span-3 text-center flex justify-center items-center">
                <div className="flex items-center justify-center size-6 rounded-full">
                  <Check className="size-6" />
                </div>
              </h6>
              <h6 className="col-start-10 col-span-3 text-center flex items-center justify-center text-neutral-500">
                <div className="flex items-center justify-center  size-6 rounded-full">
                  <X className="size-6" />
                </div>
              </h6>
            </div>
            <div className="grid grid-cols-12 w-full text-black dark:text-white py-4 rounded-[12px] px-4 bg-neutral-100 dark:bg-neutral-900 lg:px-8">
              <h6 className="col-start-1 col-span-5 text-[16px] font-medium">
                Real-time logs for every workflow execution
              </h6>
              <h6 className="col-start-7 col-span-3 text-center flex justify-center items-center">
                <div className="flex items-center justify-center size-6 rounded-full">
                  <Check className="size-6" />
                </div>
              </h6>
              <h6 className="col-start-10 col-span-3 text-center flex items-center justify-center text-neutral-500">
                <div className="flex items-center justify-center  size-6 rounded-full">
                  <X className="size-6" />
                </div>
              </h6>
            </div>
            <div className="grid grid-cols-12 w-full text-black dark:text-white py-4 rounded-[12px] px-4  lg:px-8">
              <h6 className="col-start-1 col-span-5 text-[16px] font-medium">
                Built-in analytics for usage & performance
              </h6>
              <h6 className="col-start-7 col-span-3 text-center flex justify-center items-center">
                <div className="flex items-center justify-center size-6 rounded-full">
                  <Check className="size-6" />
                </div>
              </h6>
              <h6 className="col-start-10 col-span-3 text-center flex items-center justify-center text-neutral-500">
                <div className="flex items-center justify-center  size-6 rounded-full">
                  <X className="size-6" />
                </div>
              </h6>
            </div>
            <div className="grid grid-cols-12 w-full text-black dark:text-white py-4 rounded-[12px] px-4 bg-neutral-100 dark:bg-neutral-900 lg:px-8">
              <h6 className="col-start-1 col-span-5 text-[16px] font-medium">
                Deploy & iterate 10× faster than traditional backend development
              </h6>
              <h6 className="col-start-7 col-span-3 text-center flex justify-center items-center">
                <div className="flex items-center justify-center size-6 rounded-full">
                  <Check className="size-6" />
                </div>
              </h6>
              <h6 className="col-start-10 col-span-3 text-center flex items-center justify-center text-neutral-500">
                <div className="flex items-center justify-center  size-6 rounded-full">
                  <X className="size-6" />
                </div>
              </h6>
            </div>
          </div>
        </section>

        {/* Faqs */}
        <section
          id="faq"
          className="mt-[120px] relative z-10 px-6 lg:mt-52 lg:px-8 container mx-auto"
        >
          <span className="text-neutral-500 text-[18px] tracking-[0] block text-center landing-text-medium lg:text-[19px]">
            FAQ
          </span>
          <h2 className="text-[30px] leading-[115%] lg:leading-[115%] lg:text-[36px] font-medium tracking-[-0.04em] text-center text-black dark:text-white landing-text-medium flex flex-col items-center justify-center w-full max-w-[520px] mx-auto">
            A few more questions?
          </h2>
          <div className="max-w-[900px] mx-auto mt-10">
            <FAQAccordion />
          </div>
          <p className="mt-8 text-neutral-500  max-w-[900px] mx-auto text-center text-[16px]">
            Still have questions?{" "}
            <Link href={""} className="text-black dark:text-white font-medium">
              Book a demo
            </Link>
          </p>
        </section>

        {/* Discord */}
        <section
          id="community"
          className=" mt-[120px] lg:mt-40 sm:py-18 container relative mx-auto px-6 py-16 md:py-24 lg:px-16 lg:py-24 xl:px-20 w-full text-center flex flex-col items-center pb-0!"
        >
          <h2 className="text-4xl mt-4">Join the community</h2>
          <p className="text-sm mt-4 max-w-[300px] md:max-w-none">
            Share your experience, suggest improvements, and get featured here
            as one of our earliest community members.
          </p>
          <div className="my-4 flex justify-center gap-2">
            <Link
              href={"https://discord.gg/RjtPmUcS"}
              className=" gap-2 px-4 py-2 h-10 lg:block text-sm justify-center cursor-pointer space-x-2 text-center ease-out duration-200 rounded-md outline-none transition-all outlint-0 border border-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-600  text-neutral-700 bg-white hover:bg-neutral-100  dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-700"
            >
              <div className="flex items-center gap-2">
                <FaDiscord className="w-4 h-4" />
                <span className="truncate">Join us on Discord</span>
              </div>
            </Link>
          </div>
        </section>

        <section className="sm:py-18 container relative mx-auto  py-16 md:py-24  lg:py-24  w-full px-0! lg:px-16! xl:px-0! pb-0! mb-16 md:mb-12 lg:mb-12 pt-6! max-w-[1400px]">
          <div className="lg:hidden -mb-32"></div>

          <div className="group/ticker overflow-hidden relative max-h-[500px] w-auto flex-nowrap hidden lg:flex">
            {/* marquee track */}
            <div
              className="
        flex w-max gap-0
        animate-[marquee_40000ms_linear_infinite]
        [animation-play-state:running]
        group-hover/ticker:[animation-play-state:paused]
        motion-reduce:animate-none
        motion-reduce:will-change-none
        will-change-transform
      "
            >
              {[0, 1, 2].map((blockIndex) => (
                <div
                  key={blockIndex}
                  className="columns-1 sm:columns-2 md:columns-2 lg:columns-3 xl:columns-4 gap-4 h-fit w-screen pr-4 min-w-[900px] xl:min-w-[900px] max-w-[1600px]"
                >
                  {founderTestimonials.map((t) => (
                    <Link
                      key={`${blockIndex}-${t.id}`}
                      href={"/"}
                      target="_"
                      className="min-w-[200px] mb-4 z-0 break-inside-avoid-column block group/tweet-card "
                    >
                      <div
                        className="
                  bg-surface-75 border
                  group-hover/tweet-card:border-foreground-muted
                  rounded-2xl p-6 drop-shadow-sm
                  transition-all
                  group-hover/tweet-card:shadow-md
                 hover:border-neutral-500
                "
                      >
                        <div className="relative">
                          <div className="flex items-center gap-2">
                            <Avatar className="size-10 rounded-full">
                              <AvatarImage
                                src={"/founder.jpg"}
                                alt="founder image charan"
                                className="size-10 rounded-full object-cover"
                              />
                              <AvatarFallback>SC</AvatarFallback>
                            </Avatar>
                            <p className="text-foreground text-sm font-medium">
                              {t.handle}
                            </p>
                          </div>
                        </div>
                        <p className="text-neutral-500 mt-3 text-sm whitespace-pre-line">
                          {t.text}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Radial overlay, unchanged logic – just centered */}
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
            <div className="w-full h-full bg-[radial-gradient(circle_at_center,transparent_0,transparent_1%,rgb(18,18,18)_100%)] dark:block hidden" />
            <div className="w-full h-full bg-[radial-gradient(circle_at_center,transparent_0,transparent_1%,rgb(252,252,252)_100%)] block dark:hidden" />
          </div>
        </section>

        {/* CTO */}
        <section className=" grid grid-cols-12 items-center gap-4 border-t py-32 text-center px-16 border-none">
          <div className="col-span-12">
            <h2 className="mb-4 font-dm-sans text-4xl">
              <span className="text-neutral-600 dark:text-neutral-400">
                Build visually,{" "}
              </span>
              <span className="text-brand font-medium">deploy instantly</span>
            </h2>
            <p className="">
              Only 300 early access spots. <strong>187 / 300</strong> claimed
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 col-span-12 mt-4">
            <Link
              href={"https://beta.dotportion.com"}
              className="px-2 lg:px-4 py-1 lg:py-2 h-7 lg:h-10 text-sm justify-center cursor-pointer items-center space-x-2 text-center ease-out duration-200 rounded-md outline-none transition-all outlint-0 border border-neutral-700 hover:border-neutral-900 text-white bg-neutral-900 hover:bg-neutral-700 dark:bg-white dark:border-neutral-300 dark:text-black dark:hover:bg-neutral-300"
            >
              Secure My Spot
            </Link>
            <Link
              href={"/contact/sales"}
              className="px-2 lg:px-4 py-1 lg:py-2 h-7 lg:h-10 text-sm justify-center cursor-pointer items-center space-x-2 text-center ease-out duration-200 rounded-md outline-none transition-all outlint-0 border border-neutral-300 hover:border-neutral-400 text-neutral-700 bg-white hover:bg-neutral-100 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-700"
            >
              Request a Demo
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
