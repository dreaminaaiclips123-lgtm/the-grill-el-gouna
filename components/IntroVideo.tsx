"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { IconFlame } from "@tabler/icons-react";
import posterImage from "@/public/images/ember-fire.jpg";

const VIDEO_SRC = "/videos/ignite.mp4";
const SAFETY_TIMEOUT_MS = 12000;
const REDUCED_HOLD_MS = 900;

export function IntroVideo() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [fadeOut, setFadeOut] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (reduce) {
      const t = setTimeout(() => setFadeOut(true), REDUCED_HOLD_MS);
      return () => clearTimeout(t);
    }
    const safety = setTimeout(() => setFadeOut(true), SAFETY_TIMEOUT_MS);
    return () => clearTimeout(safety);
  }, [reduce]);

  useEffect(() => {
    if (reduce) return;
    const video = videoRef.current;
    if (!video) return;
    // Set these imperatively (not just as JSX props) so autoplay is honored
    // by strict mobile browser policies even on the very first paint.
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("webkit-playsinline", "true");
    video.playsInline = true;
    const playPromise = video.play();
    if (playPromise) {
      playPromise.catch(() => {
        // Autoplay blocked; fall back to the safety timeout so the intro
        // never hangs, and try once more on the first user interaction.
        const retry = () => video.play().catch(() => {});
        window.addEventListener("pointerdown", retry, { once: true });
      });
    }
  }, [reduce]);

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
      onAnimationComplete={() => {
        if (fadeOut) setMounted(false);
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-bg"
    >
      {reduce ? (
        <>
          <Image
            src={posterImage}
            alt="Charcoal embers glowing in the dark"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-bg/55" />
          <div className="relative flex flex-col items-center gap-3">
            <IconFlame className="h-9 w-9 text-accent" strokeWidth={1.5} aria-hidden="true" />
            <p className="font-display text-2xl tracking-[0.02em] text-ink">
              The Grill
            </p>
          </div>
        </>
      ) : (
        <>
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            muted
            playsInline
            autoPlay
            preload="auto"
            disablePictureInPicture
            controlsList="nodownload noplaybackrate"
            onEnded={() => setFadeOut(true)}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/5 to-bg/20" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: [0, 1, 0], scale: [0.9, 1, 1] }}
            transition={{
              duration: 2.4,
              times: [0, 0.35, 1],
              ease: [0.23, 1, 0.32, 1],
            }}
            className="pointer-events-none relative flex flex-col items-center gap-3"
          >
            <IconFlame
              className="h-9 w-9 text-accent"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <p className="font-display text-3xl tracking-[0.02em] text-ink md:text-4xl">
              The Grill
            </p>
          </motion.div>
        </>
      )}
    </motion.div>
  );
}
