"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconBrandWhatsapp } from "@tabler/icons-react";

export function FloatingContact() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.a
          href="https://wa.me/201221783333"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Message The Grill on WhatsApp"
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
          className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-bg shadow-[var(--shadow-ember)] transition-transform duration-200 ease-out hover:-translate-y-0.5 active:scale-95"
        >
          <IconBrandWhatsapp className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
        </motion.a>
      ) : null}
    </AnimatePresence>
  );
}
