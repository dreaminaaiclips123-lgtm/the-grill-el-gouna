"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { IconFlame } from "@tabler/icons-react";

const HOLD_MS = 1600;
const REDUCED_HOLD_MS = 500;

export function IntroLogo() {
  const reduce = useReducedMotion();
  const [fadeOut, setFadeOut] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const t = setTimeout(
      () => setFadeOut(true),
      reduce ? REDUCED_HOLD_MS : HOLD_MS
    );
    return () => clearTimeout(t);
  }, [reduce]);

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: reduce ? 0.3 : 0.8, ease: [0.23, 1, 0.32, 1] }}
      onAnimationComplete={() => {
        if (fadeOut) setMounted(false);
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-bg"
    >
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className="flex items-center gap-3"
      >
        <IconFlame
          className="h-8 w-8 text-accent"
          strokeWidth={1.75}
          aria-hidden="true"
        />
        <span className="font-display text-3xl tracking-tight text-ink md:text-4xl">
          The Grill
        </span>
      </motion.div>
    </motion.div>
  );
}
