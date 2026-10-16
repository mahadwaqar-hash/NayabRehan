import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useMotionValue, useSpring, useTransform, type Variants } from 'framer-motion';
import { ArrowUpRight, Sparkles, Layers } from 'lucide-react';
import { designerData, collectionsData } from '../data/portfolioData';
import { SplitTextReveal } from '../components/typography/SplitTextReveal';
import { AnimatedKineticTitle } from '../components/typography/AnimatedKineticTitle';

/**
 * Magnetic Button Component
 * Attracts toward cursor on desktop proximity, spring snaps back, sweeps light sheen.
 * Stacks full width on mobile touch devices.
 */
const MagneticButton: React.FC<{
  children: React.ReactNode;
  className?: string;
  to?: string;
  href?: string;
  target?: string;
  rel?: string;
}> = ({ children, className = '', to, href, target, rel }) => {
  const buttonRef = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 350, damping: 15, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 350, damping: 15, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 640 || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * 0.35;
    const distanceY = (e.clientY - centerY) * 0.35;
    x.set(distanceX);
    y.set(distanceY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Inner = (
    <motion.div
      ref={buttonRef}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className={`relative inline-flex items-center justify-center overflow-hidden cursor-pointer select-none group touch-target ${className}`}
    >
      {/* Gliding glossy light sheen on hover */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />
      {children}
    </motion.div>
  );

  if (to) return <Link to={to} className="w-full sm:w-auto inline-block sm:inline-flex">{Inner}</Link>;
  if (href) return <a href={href} target={target} rel={rel} className="w-full sm:w-auto inline-block sm:inline-flex">{Inner}</a>;
  return Inner;
};

/**
 * Clean Non-Clickable Hero Visual Showcase
 * Clean presentation of the hero design without useless buttons or clickable prompts.
 */
const HeroLookShowcase: React.FC<{
  look: (typeof collectionsData)[0]['looks'][0];
}> = ({ look }) => {
  return (
    <div className="relative inline-flex flex-col items-center select-none pointer-events-none mx-auto">
      <div className="clay-card p-2 sm:p-2.5 border border-white/80 rounded-tl-[2.2rem] rounded-br-[2.2rem] rounded-tr-xl rounded-bl-xl shadow-2xl flex flex-col items-center relative overflow-hidden w-fit">
        {/* Inset Photo Frame wrapping tightly around image */}
        <div className="clay-inset p-1.5 sm:p-2 border border-white/50 rounded-tl-[1.8rem] rounded-br-[1.8rem] rounded-tr-md rounded-bl-lg overflow-hidden relative inline-flex items-center justify-center">
          <div className="relative overflow-hidden bg-black/5 rounded-tl-[1.5rem] rounded-br-[1.5rem] rounded-tr-sm rounded-bl-md shadow-inner flex items-center justify-center">
            <img
              src={look.imageUrl}
              alt={look.lookNumber}
              className="h-[300px] xs:h-[340px] sm:h-[380px] lg:h-[410px] w-auto max-w-[210px] xs:max-w-[240px] sm:max-w-[270px] object-cover filter contrast-[1.04] block rounded-tl-[1.5rem] rounded-br-[1.5rem] rounded-tr-sm rounded-bl-md"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>

        {/* Clean Label */}
        <div className="w-full pt-2 px-1 flex items-center justify-between text-xs sm:text-sm">
          <span className="font-sans text-orange uppercase tracking-wide font-bold">
            {look.lookNumber}
          </span>
          <span className="font-sans text-black/85 font-semibold">
            Commercial Lawn
          </span>
        </div>
      </div>
    </div>
  );
};

export const HomePage: React.FC = () => {
  const featuredCollection = collectionsData[0];
  const heroLook = featuredCollection.looks[0];

  // All curated looks across all collection archives to display cleanly on the homepage
  const allCuratedLooks = React.useMemo(() => {
    return collectionsData.flatMap(c => c.looks);
  }, []);

  // Hero Mouse Parallax Physics with cached bounds for zero frame drops
  const heroRef = React.useRef<HTMLElement>(null);
  const heroRectRef = React.useRef<DOMRect | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springMouseX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const springMouseY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  // Subtle watermark inverse parallax
  const watermarkX = useTransform(springMouseX, [-400, 400], [20, -20]);
  const watermarkY = useTransform(springMouseY, [-300, 300], [15, -15]);

  const handleHeroMouseEnter = () => {
    if (heroRef.current) {
      heroRectRef.current = heroRef.current.getBoundingClientRect();
    }
  };

  const handleHeroMouseMove = (e: React.MouseEvent) => {
    if (window.innerWidth < 768) return;
    if (!heroRectRef.current && heroRef.current) {
      heroRectRef.current = heroRef.current.getBoundingClientRect();
    }
    const rect = heroRectRef.current;
    if (!rect) return;
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleHeroMouseLeave = () => {
    heroRectRef.current = null;
    mouseX.set(0);
    mouseY.set(0);
  };

  // Spring animation variant for card entrance
  const cardPopVariant: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    visible: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 220,
        damping: 20,
        delay: i * 0.05,
      },
    }),
  };

  return (
    <div className="pt-14 sm:pt-16 pb-12 sm:pb-14 space-y-8 sm:space-y-12 overflow-hidden w-full">
      <Helmet>
        <title>Nayaab Rehan | Commercial Lawn Collections &amp; Textile Print Portfolio</title>
        <meta
          name="description"
          content="Nayaab Rehan — Commercial Lawn Collections &amp; Textile Design Portfolio for fashion brands and recruiters. Lahore, Pakistan."
        />
        <link rel="canonical" href="https://nayabrehan.com/" />
      </Helmet>

      {/* =========================================================================
          1. COMPACT DYNAMIC EDITORIAL HERO
         ========================================================================= */}
      <section
        ref={heroRef}
        onMouseEnter={handleHeroMouseEnter}
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        className="w-full max-w-[96vw] 2xl:max-w-[1440px] mx-auto px-2 sm:px-4 relative"
      >
        {/* Dynamic Parallax Background Watermark */}
        <motion.div
          style={{ x: watermarkX, y: watermarkY }}
          animate={{
            rotate: [0, 0.5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="watermark-text -top-8 -left-3 text-[90px] sm:text-[140px] xl:text-[200px] tracking-tighter pointer-events-none select-none"
        >
          NAYAAB
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={cardPopVariant}
          whileHover={{ y: -2 }}
          className="clay-card p-4 sm:p-5 lg:p-6 border border-white/70 relative z-10 w-full rounded-tl-[2.5rem] rounded-br-[3rem] rounded-tr-xl rounded-bl-xl shadow-xl overflow-hidden"
        >
          {/* Ambient Couture Floating Particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit] z-0">
            <motion.div
              animate={{
                y: [0, -20, 0],
                x: [0, 12, 0],
                opacity: [0.15, 0.45, 0.15],
                rotate: [0, 90, 180],
              }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-10 left-1/3 text-orange/30"
            >
              <Sparkles className="w-5 h-5" />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center relative z-10">
            {/* Left Typographic Masthead */}
            <div className="lg:col-span-7 xl:col-span-7 space-y-2.5 sm:space-y-3">
              {/* Badges Cluster */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="clay-pill-orange px-4 py-1.5 text-xs sm:text-[13px] font-sans tracking-wide uppercase font-bold flex items-center gap-1.5 shadow-clay-orange">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                  </span>
                  <span>LAWN COLLECTION // BRAND PORTFOLIO</span>
                </span>

                <span className="clay-pill-ivory px-4 py-1.5 text-xs sm:text-[13px] font-sans tracking-wide text-black font-bold border border-white/80 shadow-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
                  <span>FOR BRANDS &amp; RECRUITERS</span>
                </span>
              </div>

              {/* Kinetic Title: NAYAAB Rehan */}
              <AnimatedKineticTitle />

              {/* Split Text Kinetic Headline */}
              <div>
                <SplitTextReveal
                  text="Lawn Collections, Textile Prints & Brand Showcase."
                  as="h1"
                  className="font-serif text-lg sm:text-xl xl:text-2xl text-black font-bold leading-snug"
                  highlightWord="Lawn"
                  highlightClass="font-script text-orange font-normal text-2xl sm:text-3xl xl:text-4xl"
                  delay={0.15}
                />
              </div>

              {/* Designer Statement */}
              <div className="border-l-3 border-orange pl-3.5 py-0.5">
                <p className="font-serif italic text-sm sm:text-base text-black/90 leading-relaxed font-medium">
                  "{designerData.statement}"
                </p>
              </div>

              {/* Animated Button to Lookbook */}
              <div className="pt-2">
                <MagneticButton
                  to="/lookbook"
                  className="clay-pill-orange px-8 sm:px-10 py-3.5 sm:py-4 text-sm sm:text-base font-sans uppercase tracking-wide font-bold flex items-center gap-2.5 shadow-clay-orange group"
                >
                  <span>Explore Lookbook</span>
                  <motion.span
                    animate={{ x: [0, 4, 0], y: [0, -4, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    className="inline-block"
                  >
                    <ArrowUpRight className="w-4 h-4 group-hover:scale-125 transition-transform" />
                  </motion.span>
                </MagneticButton>
              </div>
            </div>

            {/* Right Featured Hero Look (Clean non-clickable visual) */}
            <div className="lg:col-span-5 xl:col-span-5 relative mt-3 lg:mt-0 flex justify-center lg:justify-end">
              <HeroLookShowcase look={heroLook} />
            </div>
          </div>
        </motion.div>
      </section>

      {/* =========================================================================
          2. CLEAN HOMEPAGE PHOTO GALLERY (PURE VISUAL SHOWCASE, NON-CLICKABLE)
          No swatches, no useless buttons, clean photos showcasing the designs.
         ========================================================================= */}
      <section className="w-full max-w-[98vw] mx-auto px-2.5 sm:px-4 xl:px-6 space-y-5 sm:space-y-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-3 border-b border-black/15"
        >
          <div>
            <span className="clay-pill-orange px-4 py-1.5 text-xs sm:text-[13px] font-sans tracking-wide uppercase font-bold inline-block mb-1.5 shadow-clay-orange">
              COLLECTION GALLERY // RECENT WORK
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-black tracking-tight">
              Curated Lawn Designs
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-base text-black/85 max-w-sm leading-relaxed font-medium">
            Commercial lawn collection photography, original botanical print repeats, and modern silhouettes by Nayaab Rehan.
          </p>
        </motion.div>

        {/* Clean Photo Grid — Pure visual presentation, non-clickable, no useless buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 items-start">
          {allCuratedLooks.slice(0, 12).map((look, idx) => {
            const cornerShapes = [
              'rounded-tl-3xl rounded-br-3xl rounded-tr-xl rounded-bl-xl',
              'rounded-tr-3xl rounded-bl-3xl rounded-tl-xl rounded-br-xl',
              'rounded-bl-3xl rounded-tr-3xl rounded-tl-xl rounded-br-xl',
              'rounded-br-3xl rounded-tl-3xl rounded-tr-xl rounded-bl-xl',
            ][idx % 4];

            return (
              <motion.div
                key={look.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                variants={cardPopVariant}
                custom={idx}
                className={`clay-card p-2.5 sm:p-3.5 ${cornerShapes} border border-white/80 space-y-2 select-none shadow-md overflow-hidden pointer-events-none`}
              >
                {/* Photo Inset Frame */}
                <div className="clay-inset p-1.5 sm:p-2 border border-white/50 rounded-2xl overflow-hidden relative">
                  <div
                    className="w-full rounded-xl overflow-hidden bg-black/5 relative flex items-center justify-center shadow-inner"
                    style={{ aspectRatio: look.aspectRatio }}
                  >
                    <img
                      src={look.imageUrl}
                      alt={look.lookNumber}
                      className="w-full h-full object-contain filter contrast-[1.03] block"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Minimal Label */}
                <div className="px-1 py-0.5 flex items-center justify-between font-sans text-xs sm:text-sm text-black">
                  <span className="font-bold text-black uppercase">{look.lookNumber}</span>
                  <span className="text-xs text-orange font-bold uppercase">Commercial</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          3. PROMINENT CALL TO ACTION: EXPLORE ALL 29 DESIGNS IN LOOKBOOK
         ========================================================================= */}
      <section className="w-full max-w-[96vw] 2xl:max-w-[1440px] mx-auto px-2 sm:px-4 text-center pt-3 pb-8 sm:py-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="clay-card p-5 sm:p-10 lg:p-12 rounded-3xl sm:rounded-[3.5rem] border border-white/80 shadow-2xl flex flex-col items-center justify-center space-y-4 sm:space-y-5 max-w-4xl mx-auto relative overflow-hidden"
        >
          <div className="watermark-text -bottom-6 -right-4 text-[90px] sm:text-[160px] text-black/[0.04] pointer-events-none select-none">
            ARCHIVE
          </div>

          <span className="clay-pill-orange px-4 py-1.5 text-xs sm:text-sm font-sans tracking-wide uppercase font-bold shadow-clay-orange flex items-center gap-2">
            <Layers className="w-4 h-4" />
            <span>COMPLETE RUNWAY ARCHIVE // 29 LOOKS</span>
          </span>

          <h2 className="font-serif text-2xl sm:text-5xl lg:text-6xl font-bold text-black tracking-tight max-w-2xl text-balance">
            Explore All 29 Commercial Lawn Designs
          </h2>

          <p className="font-sans text-sm sm:text-base lg:text-lg text-black/90 font-medium max-w-2xl leading-relaxed text-balance">
            Browse complete high-resolution catalog photography, botanical print repeats, and garment silhouettes engineered for fashion brands and recruiters.
          </p>

          <div className="pt-3 sm:pt-4 w-full sm:w-auto">
            <MagneticButton
              to="/lookbook"
              className="w-full sm:w-auto clay-pill-orange px-8 sm:px-16 py-4 sm:py-5 text-base sm:text-xl font-sans uppercase tracking-wide font-bold flex items-center justify-center gap-3 shadow-clay-orange hover:scale-105 transition-transform group"
            >
              <span>View All 29 Designs in Lookbook</span>
              <motion.span
                animate={{ x: [0, 5, 0], y: [0, -5, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-block"
              >
                <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-125 transition-transform" />
              </motion.span>
            </MagneticButton>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
