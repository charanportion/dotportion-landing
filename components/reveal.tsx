"use client";

import { ReactNode } from "react";
import { motion, MotionProps } from "framer-motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number; // seconds
  duration?: number; // seconds
  distance?: number; // px to translateY from
  once?: boolean; // animate once when it comes into view
  viewportAmount?: number; // fraction visible to trigger
} & MotionProps;

export default function Reveal({
  children,
  className = "",
  delay = 0.25,
  duration = 0.5,
  distance = 75,
  once = true,
  viewportAmount = 0.15,
  ...rest
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: viewportAmount }}
      transition={{ duration, delay, ease: [0.22, 0.8, 0.2, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
