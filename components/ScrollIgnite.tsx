"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { IconFlame } from "@tabler/icons-react";
import posterImage from "@/public/images/ember-fire.jpg";

const VIDEO_SRC = "/videos/ignite.mp4";
const POSTER_SRC = "/images/ember-fire.jpg";

export function ScrollIgnite() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [duration, setDuration] = useState(0);
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const wordmarkOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);
  const wordmarkY = useTransform(scrollYProgress, [0, 0.18], [0, -16]);
  const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const video = videoRef.current;
    if (!video || !duration || reduce) return;
    video.currentTime = Math.min(duration, Math.max(0, v * duration));
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    function onLoaded() {
      if (video && video.duration && Number.isFinite(video.duration)) {
        setDuration(video.duration);
        setReady(true);
      }
    }
    video.addEventListener("loadedmetadata", onLoaded);
    if (video.readyState >= 1) onLoaded();
    return () => video.removeEventListener("loadedmetadata", onLoaded);
  }, []);

  if (reduce) {
    return (
      <section className="relative flex h-[70vh] min-h-[480px] items-center justify-center overflow-hidden bg-bg">
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
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-[250vh] bg-bg">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          poster={POSTER_SRC}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/10 to-bg/25" />

        <motion.div
          style={{ opacity: wordmarkOpacity, y: wordmarkY }}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3"
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

        <motion.p
          style={{ opacity: scrollCueOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-6 text-center text-xs uppercase tracking-[0.2em] text-ink-faint"
        >
          Scroll
        </motion.p>

        {!ready ? (
          <div className="absolute inset-0 animate-pulse bg-bg/20" aria-hidden="true" />
        ) : null}
      </div>
    </section>
  );
}
