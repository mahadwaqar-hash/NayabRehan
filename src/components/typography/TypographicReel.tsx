import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const TypographicReel: React.FC<{ words?: string[]; intervalMs?: number }> = ({
  words = [
    "CONTEMPORARY LUXURY PRÊT",
    "EXCLUSIVE LAWN & SILK",
    "HANDCRAFTED EMBROIDERY",
    "BESPOKE FESTIVE ENSEMBLES",
    "STATEMENT SUMMER PRINTS",
  ],
  intervalMs = 2600,
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [words.length, intervalMs]);

  return (
    <div className="inline-flex items-center overflow-hidden h-12 sm:h-16 relative align-middle px-3">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 40, opacity: 0, rotateX: -40 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          exit={{ y: -40, opacity: 0, rotateX: 40 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="clay-pill-orange px-5 py-2 sm:py-2.5 text-xs sm:text-base font-mono uppercase tracking-widest font-bold text-white shadow-clay-orange flex items-center gap-2 whitespace-nowrap"
        >
          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
          <span>{words[index]}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
