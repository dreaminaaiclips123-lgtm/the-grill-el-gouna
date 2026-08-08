"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Reveal } from "./Reveal";
import ambienceImage from "@/public/images/ambience.jpg";

export function Ambience() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <section
      ref={ref}
      className="relative h-[70vh] min-h-[480px] w-full overflow-hidden md:h-[85vh]"
    >
      <motion.div
        style={reduce ? undefined : { scale, y }}
        className="absolute inset-0"
      >
        <Image
          src={ambienceImage}
          alt="The Grill's terrace at night in Downtown El Gouna, string lights over marina-view tables"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/10 to-bg/30" />
      <div className="relative flex h-full items-end">
        <Reveal className="mx-auto w-full max-w-7xl px-6 pb-16 md:pb-20">
          <p className="max-w-md font-display text-2xl leading-snug tracking-tight text-ink md:text-3xl text-balance">
            Charcoal smoke, marina lights, Downtown El Gouna after dark.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
