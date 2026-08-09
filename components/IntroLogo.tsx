"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import logoMark from "@/public/images/logo-mark.jpg";

const HOLD_MS = 1600;
const REDUCED_HOLD_MS = 400;
const FADE_MS = 600;
// Safety cap in case the image load event never fires (offline, blocked
// request, etc.) so the intro can never hang indefinitely.
const IMAGE_LOAD_TIMEOUT_MS = 2500;

function unlockScroll(scrollY: number) {
  // Idempotent by construction (resetting these twice, or scrolling to the
  // same spot twice, is harmless) so it never needs a "run once" guard.
  const { style } = document.body;
  style.position = "";
  style.top = "";
  style.left = "";
  style.right = "";
  style.overflow = "";
  window.scrollTo(0, scrollY);
}

export function IntroLogo() {
  // Rendered from the very first paint on both server and client (same
  // initial state either way), so there is nothing to flash-of-real-content
  // before it appears, and no hydration mismatch either. Plain CSS
  // transitions instead of an animation library: fewer moving parts to
  // interact unpredictably with mobile Safari.
  const [loaded, setLoaded] = useState(false);
  const [entered, setEntered] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [mounted, setMounted] = useState(true);
  const scrollYRef = useRef(0);

  useEffect(() => {
    scrollYRef.current = window.scrollY;
    const { style } = document.body;
    style.position = "fixed";
    style.top = `-${scrollYRef.current}px`;
    style.left = "0";
    style.right = "0";
    style.overflow = "hidden";

    // Don't start the hold/fade countdown until the badge image has
    // actually finished loading, so a slow mobile connection can never
    // cause the image to pop in mid-animation. Capped so this can't hang.
    const safety = setTimeout(() => setLoaded(true), IMAGE_LOAD_TIMEOUT_MS);
    return () => clearTimeout(safety);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const raf = requestAnimationFrame(() => setEntered(true));
    const holdTimer = setTimeout(
      () => setFadeOut(true),
      reduce ? REDUCED_HOLD_MS : HOLD_MS
    );

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(holdTimer);
    };
  }, [loaded]);

  useEffect(() => {
    if (!fadeOut) return;
    // Deterministic unmount timer, independent of any animation-complete
    // callback, so this can never get stuck mid-fade.
    const unmountTimer = setTimeout(() => {
      unlockScroll(scrollYRef.current);
      setMounted(false);
    }, FADE_MS + 50);
    return () => clearTimeout(unmountTimer);
  }, [fadeOut]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-bg overscroll-none touch-none transition-opacity motion-reduce:transition-none ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
      style={{ transitionDuration: `${FADE_MS}ms` }}
    >
      <div
        className={`transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:scale-100 ${
          entered ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        <Image
          src={logoMark}
          alt="The Grill El Gouna"
          width={120}
          height={120}
          className="rounded-full shadow-[var(--shadow-ember)]"
          priority
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  );
}
