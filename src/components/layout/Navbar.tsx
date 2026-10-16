import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Layers, Mail } from 'lucide-react';
import { designerData } from '../../data/portfolioData';

interface DockIconItemProps {
  title: string;
  icon: React.ReactNode;
  href: string;
  isExternal?: boolean;
  isActive?: boolean;
  isMobile?: boolean;
}

function DockIconItem({
  title,
  icon,
  href,
  isExternal,
  isActive,
  isMobile = false,
}: DockIconItemProps) {
  const [hovered, setHovered] = useState(false);

  const content = (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.12, y: -2 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`relative w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center cursor-pointer select-none transition-colors duration-200 ${
        isActive
          ? 'bg-black text-ivory shadow-clay-dark-sm border border-orange/70'
          : 'bg-ivory/95 text-black hover:text-orange hover:bg-white border border-white/80 shadow-clay-light-sm'
      }`}
    >
      <span
        className={`flex items-center justify-center shrink-0 transition-transform ${
          isActive ? 'text-orange scale-110' : 'text-black/80'
        }`}
      >
        {icon}
      </span>

      {/* Active Dot Indicator */}
      {isActive && (
        <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
      )}

      {/* Floating Hover Label Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: isMobile ? -4 : 6, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: isMobile ? -4 : 4, scale: 0.85 }}
            transition={{ duration: 0.12 }}
            className="absolute -top-10 sm:top-auto sm:-bottom-9 left-1/2 -translate-x-1/2 px-3.5 py-1.5 rounded-full bg-black text-ivory text-xs sm:text-[13px] font-sans tracking-wide uppercase font-bold shadow-2xl whitespace-nowrap pointer-events-none border border-white/30 z-50 flex items-center gap-1.5"
          >
            {isActive && <span className="w-1.5 h-1.5 rounded-full bg-orange" />}
            <span>{title}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={title} className="inline-block touch-target">
        {content}
      </a>
    );
  }

  return (
    <Link to={href} aria-label={title} className="inline-block touch-target">
      {content}
    </Link>
  );
}

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [brandHovered, setBrandHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navItems = [
    {
      title: 'Home',
      href: '/',
      icon: <Home className="w-4 h-4 sm:w-4 sm:h-4" />,
    },
    {
      title: 'Lookbook',
      href: '/lookbook',
      icon: <Layers className="w-4 h-4 sm:w-4 sm:h-4" />,
    },
    {
      title: 'Inquire',
      href: '/contact',
      icon: <Mail className="w-4 h-4 sm:w-4 sm:h-4" />,
    },
  ];

  return (
    <header className="fixed top-3.5 sm:top-5 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none w-full">
      <motion.nav
        initial={{ y: -25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        className="pointer-events-auto clay-card bg-[#E6D5BD]/90 backdrop-blur-2xl p-1.5 sm:p-2 rounded-full border border-white/90 shadow-2xl flex items-center gap-2 sm:gap-2.5 select-none max-w-fit mx-auto"
        aria-label="Dynamic Navigation Bar"
      >
        {/* Brand NR Icon */}
        <Link
          to="/"
          aria-label="Nayab Rehan Home"
          className="inline-block relative touch-target"
          onMouseEnter={() => setBrandHovered(true)}
          onMouseLeave={() => setBrandHovered(false)}
        >
          <motion.div
            whileHover={{ scale: 1.1, y: -1 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black text-ivory font-serif text-sm sm:text-sm font-bold flex items-center justify-center shadow-clay-dark-sm border border-white/20 cursor-pointer"
          >
            <span className="leading-none pt-0.5 tracking-tight">{designerData.monogram}</span>
          </motion.div>

          <AnimatePresence>
            {brandHovered && (
              <motion.div
                initial={{ opacity: 0, y: isMobile ? -4 : 6, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: isMobile ? -4 : 4, scale: 0.85 }}
                transition={{ duration: 0.12 }}
                className="absolute -top-10 sm:top-auto sm:-bottom-9 left-1/2 -translate-x-1/2 px-3.5 py-1.5 rounded-full bg-black text-ivory text-xs sm:text-[13px] font-sans tracking-wide uppercase font-bold shadow-2xl whitespace-nowrap pointer-events-none border border-white/30 z-50"
              >
                {designerData.name}
              </motion.div>
            )}
          </AnimatePresence>
        </Link>

        {/* Divider */}
        <span className="w-px h-5 bg-black/15 mx-0.5" />

        {/* Dynamic Navigation Items */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {navItems.map((item) => (
            <DockIconItem
              key={item.href}
              title={item.title}
              icon={item.icon}
              href={item.href}
              isActive={location.pathname === item.href}
              isMobile={isMobile}
            />
          ))}
        </div>
      </motion.nav>
    </header>
  );
};
