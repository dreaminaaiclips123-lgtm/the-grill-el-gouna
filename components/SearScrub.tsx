"use client";

import { useEffect, useRef, useState } from "react";
import {
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import Image from "next/image";
import posterImage from "@/public/images/fillet-mignon.jpg";

const VIDEO_SRC = "/videos/sear.mp4";

export function SearScrub() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [duration, setDuration] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const video = videoRef.current;
    if (!video || !duration || reduce) return;
    video.currentTime = Math.min(duration, Math.max(0, v * duration));
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.playsInline = true;
    function onLoaded() {
      if (video && video.duration && Number.isFinite(video.duration)) {
        setDuration(video.duration);
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
          alt="Charcoal fire and a seared steak"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-bg/45" />
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-[220vh] bg-bg">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/5 to-bg/20" />
      </div>
    </section>
  );
}
