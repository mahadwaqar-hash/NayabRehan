import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export const AnimatedKineticTitle: React.FC = () => {
  const line1 = "NAYAAB";
  const line2 = "Rehan";

  return (
    <div
      className="space-y-0.5 sm:space-y-1 select-none tracking-normal py-0.5 overflow-visible will-change-transform"
      aria-label="Nayaab Rehan"
    >
      {/* Line 1: NAYAAB (Perandory bold uppercase display with softer kinetic wave + interactive spring physics) */}
      <div
        className="flex items-baseline flex-wrap font-serif text-[2.8rem] xs:text-[3.6rem] sm:text-7xl md:text-8xl lg:text-[6rem] xl:text-[7rem] 2xl:text-[7.8rem] font-bold text-black uppercase leading-[0.92] py-0.5 overflow-visible tracking-tight"
        aria-hidden="true"
      >
        {line1.split('').map((char, index) => (
          <motion.span
            key={`l1-${index}`}
            tabIndex={-1}
            whileHover={{
              y: -14,
              scale: 1.15,
              rotate: index % 2 === 0 ? 5 : -5,
              color: '#D5360C',
              transition: { type: 'spring', stiffness: 450, damping: 15 },
            }}
            whileTap={{
              scale: 0.9,
              transition: { type: 'spring', stiffness: 400, damping: 15 },
            }}
            style={{ animationDelay: `${index * 0.12}s` }}
            className="inline-block kinetic-char-1 cursor-pointer transition-colors duration-150"
          >
            {char}
          </motion.span>
        ))}
      </div>

      {/* Line 2: Rehan (Birds of Paradise Luxury Cursive Script with liquid wave & dynamic accent bar) */}
      <div
        className="flex items-center gap-2.5 sm:gap-5 font-script text-[3.2rem] xs:text-[4.2rem] sm:text-7xl md:text-8xl lg:text-[6.4rem] xl:text-[7.5rem] 2xl:text-[8.4rem] font-normal text-orange tracking-normal leading-[1.0] py-0.5 overflow-visible"
        aria-hidden="true"
      >
        <div className="flex">
          {line2.split('').map((char, index) => (
            <motion.span
              key={`l2-${index}`}
              tabIndex={-1}
              whileHover={{
                y: -12,
                scale: 1.15,
                rotate: -6,
                color: '#101010',
                transition: { type: 'spring', stiffness: 450, damping: 15 },
              }}
              whileTap={{
                scale: 0.9,
                transition: { type: 'spring', stiffness: 400, damping: 15 },
              }}
              style={{ animationDelay: `${(index + 3) * 0.14}s` }}
              className="inline-block kinetic-char-2 cursor-pointer transition-colors duration-150"
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* Dynamic Clay Orange Breathing Bar with Shimmer Beam & Diamond Sparkle - Wider on desktop, shorter on mobile */}
        <div className="flex items-center gap-2">
          <motion.div
            aria-hidden="true"
            animate={{
              scaleX: [1, 1.15, 1],
              opacity: [0.85, 1, 0.85],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ willChange: 'transform' }}
            className="relative w-8 xs:w-11 sm:w-32 lg:w-40 xl:w-48 h-2 sm:h-3.5 bg-orange rounded-full shadow-clay-orange origin-left overflow-hidden will-change-transform"
          >
            {/* Continuous Shimmer Light Beam */}
            <motion.div
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                repeatDelay: 0.5,
              }}
              className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12"
            />
          </motion.div>

          {/* Oscillating Accent Sparkle */}
          <motion.div
            animate={{
              rotate: [0, 180, 360],
              scale: [0.85, 1.15, 0.85],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="text-orange shrink-0 cursor-pointer"
          >
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 fill-orange/20" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
