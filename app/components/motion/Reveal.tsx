"use client";

import { motion, type MotionProps } from "framer-motion";

export function Reveal({
  children,
  delay = 0,
  y = 18,
  scale = 0.98,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  scale?: number;
  className?: string;
}) {
  const props: MotionProps = {
    initial: { opacity: 0, y, scale },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, margin: "-80px" },
    transition: {
      duration: 0.75,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  };

  return (
    <motion.div className={className} {...props}>
      {children}
    </motion.div>
  );
}

