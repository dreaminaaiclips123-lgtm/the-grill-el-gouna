"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import logoMark from "@/public/images/logo-mark.jpg";

const HOLD_MS = 1600;
const REDUCED_HOLD_MS = 500;
const FADE_MS = 800;
const REDUCED_FADE_MS = 300;

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
    const holdTimer = setTimeout(
      () => setFadeOut(true),
      reduce ? REDUCED_HOLD_MS : HOLD_MS
    );
    return () => clearTimeout(holdTimer);
  }, [reduce]);

  useEffect(() => {
    if (!fadeOut) return;
    // Deterministic unmount timer, independent of animation-complete
    // callbacks, so the body scroll lock can never get stuck. Reset the
    // scroll lock directly here too, not only via the mount effect's
    // cleanup, so it is unlocked even if unmount ordering is unusual.
    const unmountTimer = setTimeout(() => {
      document.body.style.overflow = "";
      setMounted(false);
    }, (reduce ? REDUCED_FADE_MS : FADE_MS) + 50);
    return () => clearTimeout(unmountTimer);
  }, [fadeOut, reduce]);

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{
        duration: (reduce ? REDUCED_FADE_MS : FADE_MS) / 1000,
        ease: [0.23, 1, 0.32, 1],
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-bg"
    >
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      >
        <Image
          src={logoMark}
          alt="The Grill El Gouna"
          width={120}
          height={120}
          className="rounded-full shadow-[var(--shadow-ember)]"
          priority
        />
      </motion.div>
    </motion.div>
  );
}
