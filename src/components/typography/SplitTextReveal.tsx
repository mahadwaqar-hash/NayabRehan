import React from 'react';
import { motion } from 'framer-motion';

interface SplitTextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div';
  highlightWord?: string;
  highlightClass?: string;
}

export const SplitTextReveal: React.FC<SplitTextRevealProps> = ({
  text,
  className = '',
  delay = 0,
  as = 'h2',
  highlightWord,
  highlightClass = 'text-orange italic',
}) => {
  const words = text.split(' ');
  const Component = as as any;

  return (
    <Component className={`flex flex-wrap gap-x-[0.25em] gap-y-[0.1em] overflow-visible ${className}`}>
      {words.map((word, i) => {
        const isHighlight = highlightWord && word.toLowerCase().includes(highlightWord.toLowerCase());
        return (
          <span key={i} className="inline-block overflow-visible py-0.5 sm:py-1 px-0.5">
            <motion.span
              initial={{ y: 18, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-10px' }}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
                delay: delay + i * 0.02,
              }}
              className={`inline-block will-change-transform overflow-visible ${
                isHighlight ? highlightClass : ''
              }`}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </Component>
  );
};
