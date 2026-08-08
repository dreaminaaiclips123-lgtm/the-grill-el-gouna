"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { IconFlame } from "@tabler/icons-react";

const HOLD_MS = 2400;
const REDUCED_HOLD_MS = 900;

export function IntroSplash() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const hideTimer = setTimeout(
      () => setVisible(false),
      reduce ? REDUCED_HOLD_MS : HOLD_MS
    );
    return () => clearTimeout(hideTimer);
  }, [reduce]);

  useEffect(() => {
    if (!mounted) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <AnimatePresence onExitComplete={() => setMounted(false)}>
      {visible ? (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.2 : 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-bg"
        >
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.85 }}
            animate={
              reduce
                ? { opacity: 1, scale: 1 }
                : { opacity: 1, scale: [0.85, 1.06, 1] }
            }
            transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
          >
            <IconFlame
              className="h-10 w-10 text-accent"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </motion.div>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: reduce ? 0 : 0.35,
              ease: [0.23, 1, 0.32, 1],
            }}
            className="font-display text-2xl tracking-[0.02em] text-ink"
          >
            The Grill
          </motion.p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
