"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import logoMark from "@/public/images/logo-mark.jpg";

const HOLD_MS = 1600;
const REDUCED_HOLD_MS = 500;
const FADE_MS = 800;
const REDUCED_FADE_MS = 300;

function unlockScroll(scrollY: number) {
  // Idempotent by construction: resetting these to "" (or scrolling to the
  // same spot) twice is harmless, so this can safely be called from both
  // the effect cleanup (StrictMode double-invoke, genuine unmount) and the
  // unmount timer below (since `if (!mounted) return null` never actually
  // unmounts this component, so the timer is the only guaranteed trigger).
  const { style } = document.body;
  style.position = "";
  style.top = "";
  style.left = "";
  style.right = "";
  style.overflow = "";
  window.scrollTo(0, scrollY);
}

export function IntroLogo() {
  const reduce = useReducedMotion();
  const [fadeOut, setFadeOut] = useState(false);
  const [mounted, setMounted] = useState(true);
  const scrollYRef = useRef(0);

  useEffect(() => {
    // Plain `overflow: hidden` on body does not reliably block scroll or
    // touchmove on iOS Safari, and toggling it back off can jump/flicker
    // the page. Pin the body in place instead, which iOS respects.
    scrollYRef.current = window.scrollY;
    const { style } = document.body;
    style.position = "fixed";
    style.top = `-${scrollYRef.current}px`;
    style.left = "0";
    style.right = "0";
    style.overflow = "hidden";

    return () => unlockScroll(scrollYRef.current);
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
    // callbacks, so this can never get stuck mid-fade.
    const unmountTimer = setTimeout(() => {
      unlockScroll(scrollYRef.current);
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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-bg overscroll-none touch-none"
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
