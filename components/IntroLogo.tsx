"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import logoMark from "@/public/images/logo-mark.jpg";

const HOLD_MS = 1600;
const REDUCED_HOLD_MS = 400;
const FADE_MS = 600;

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
  // Render nothing during SSR and the first client render, so there is
  // nothing here for React to hydrate and no client/server mismatch is
  // possible. Plain CSS transitions instead of an animation library, since
  // this specific overlay only needs a single opacity fade and simpler is
  // more predictable across mobile browsers.
  const [ready, setReady] = useState(false);
  const [entered, setEntered] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [mounted, setMounted] = useState(true);
  const scrollYRef = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Plain `overflow: hidden` on body does not reliably block scroll or
    // touchmove on iOS Safari. Pin the body in place instead.
    scrollYRef.current = window.scrollY;
    const { style } = document.body;
    style.position = "fixed";
    style.top = `-${scrollYRef.current}px`;
    style.left = "0";
    style.right = "0";
    style.overflow = "hidden";

    // Both state flips happen inside rAF callbacks, never synchronously in
    // the effect body. `ready` and `entered` are deliberately set on
    // separate frames: mounting with `entered` already true would skip the
    // CSS transition entirely (nothing to transition from).
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      setReady(true);
      raf2 = requestAnimationFrame(() => setEntered(true));
    });
    const holdTimer = setTimeout(
      () => setFadeOut(true),
      reduce ? REDUCED_HOLD_MS : HOLD_MS
    );

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      clearTimeout(holdTimer);
    };
  }, []);

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

  if (!mounted || !ready) return null;

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
        />
      </div>
    </div>
  );
}
