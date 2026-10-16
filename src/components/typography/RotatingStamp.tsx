import React, { useId } from 'react';
import { motion } from 'framer-motion';

export const RotatingStamp: React.FC<{
  text?: string;
  centerText?: string;
  className?: string;
}> = ({
  text = "NAYAB REHAN • LAHORE STUDIO • EST. 2024 • ",
  centerText = "NR",
  className = "w-28 h-28",
}) => {
  const rawId = useId();
  const pathId = `textPath-${rawId.replace(/:/g, '')}`;

  return (
    <motion.div
      whileHover={{ scale: 1.14, rotate: 8 }}
      whileTap={{ scale: 0.88, rotate: -12 }}
      transition={{ type: 'spring', stiffness: 400, damping: 14 }}
      className={`relative flex items-center justify-center select-none group cursor-pointer ${className}`}
    >
      {/* Outer spinning circular text path */}
      <svg
        className="w-full h-full animate-[spin_18s_linear_infinite] group-hover:[animation-duration:5s] transition-all"
        viewBox="0 0 120 120"
      >
        <path
          id={pathId}
          d="M 60, 60 m -46, 0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0"
          fill="none"
        />
        <text className="font-mono text-[9px] uppercase tracking-[0.25em] fill-black font-semibold">
          <textPath href={`#${pathId}`} startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>

      {/* Center tactile clay button */}
      <motion.div
        whileHover={{ scale: 1.08 }}
        className="absolute w-[44%] h-[44%] rounded-full bg-ivory border border-white/90 shadow-clay-light-sm flex items-center justify-center group-hover:border-orange/60 transition-colors"
      >
        <span className="font-serif text-xs sm:text-sm font-bold text-black tracking-widest group-hover:text-orange transition-colors">
          {centerText}
        </span>
      </motion.div>
    </motion.div>
  );
};
