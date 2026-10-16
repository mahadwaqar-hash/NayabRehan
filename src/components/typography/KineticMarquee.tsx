import React from 'react';
import { motion } from 'framer-motion';

interface KineticMarqueeProps {
  items: string[];
  direction?: 'left' | 'right';
  duration?: number;
  className?: string;
  outlineOnly?: boolean;
  textColor?: string;
}

export const KineticMarquee: React.FC<KineticMarqueeProps> = ({
  items,
  direction = 'left',
  duration = 20,
  className = '',
  outlineOnly = false,
  textColor,
}) => {
  // Use Framer Motion for guaranteed 60fps GPU infinite marquee that never fails
  const xValues = direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'];

  const colorClass = outlineOnly
    ? 'stroke-text hover:text-orange hover:opacity-100'
    : (textColor || 'text-current');

  return (
    <div className={`overflow-hidden select-none whitespace-nowrap py-2 relative w-full ${className}`}>
      <motion.div
        animate={{ x: xValues }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration,
        }}
        className="inline-flex items-center gap-8 will-change-transform"
      >
        {/* Render duplicate sets for seamless loop */}
        {[...items, ...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="inline-flex items-center gap-8 flex-shrink-0">
            <span
              className={`font-serif tracking-tight uppercase select-none transition-all duration-300 ${colorClass}`}
            >
              {item}
            </span>
            <span className="w-3.5 h-3.5 rounded-full bg-orange flex-shrink-0 shadow-clay-orange animate-pulse" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};
