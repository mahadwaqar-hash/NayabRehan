import React, { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, type Variants } from 'framer-motion';
import { MessageCircle, X, Sparkles, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { collectionsData } from '../data/portfolioData';
import type { CollectionArchive, CollectionLook } from '../data/portfolioData';
import { createWhatsAppUrl } from '../utils/whatsapp';
import { RotatingStamp } from '../components/typography/RotatingStamp';
import { SplitTextReveal } from '../components/typography/SplitTextReveal';

export const LookbookPage: React.FC = () => {
  const [activeArchiveId, setActiveArchiveId] = useState<string>(collectionsData[0].id);
  const [selectedLook, setSelectedLook] = useState<CollectionLook | null>(null);

  const activeCollection: CollectionArchive =
    collectionsData.find((c) => c.id === activeArchiveId) || collectionsData[0];

  const activePageIndex = collectionsData.findIndex((c) => c.id === activeArchiveId);
  const totalLooks = useMemo(
    () => collectionsData.reduce((acc, c) => acc + c.looks.length, 0),
    []
  );

  // Keyboard navigation for enlarged modal (Escape, ArrowLeft, ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedLook(null);
      } else if (e.key === 'ArrowLeft' && selectedLook && activeCollection.looks.length > 0) {
        const idx = activeCollection.looks.findIndex((l) => l.id === selectedLook.id);
        const prevIdx = (idx - 1 + activeCollection.looks.length) % activeCollection.looks.length;
        setSelectedLook(activeCollection.looks[prevIdx]);
      } else if (e.key === 'ArrowRight' && selectedLook && activeCollection.looks.length > 0) {
        const idx = activeCollection.looks.findIndex((l) => l.id === selectedLook.id);
        const nextIdx = (idx + 1) % activeCollection.looks.length;
        setSelectedLook(activeCollection.looks[nextIdx]);
      }
    };

    if (selectedLook) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedLook, activeCollection]);

  const currentModalIndex = activeCollection.looks.findIndex((l) => l.id === selectedLook?.id);

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeCollection.looks.length) return;
    const prevIdx = (currentModalIndex - 1 + activeCollection.looks.length) % activeCollection.looks.length;
    setSelectedLook(activeCollection.looks[prevIdx]);
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeCollection.looks.length) return;
    const nextIdx = (currentModalIndex + 1) % activeCollection.looks.length;
    setSelectedLook(activeCollection.looks[nextIdx]);
  };

  // Card pop-up spring variant
  const cardPopVariant: Variants = {
    hidden: { opacity: 0, y: 35, scale: 0.95 },
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

  const galleryTopRef = React.useRef<HTMLDivElement>(null);

  // Deterministic organic tilt offsets for runway magazine feel without random layout shifts
  const cardTransforms = useMemo(() => {
    const presets = [
      { tilt: 1.4, offsetX: -2, offsetY: 2 },
      { tilt: -1.6, offsetX: 3, offsetY: -2 },
      { tilt: 1.1, offsetX: -2, offsetY: 3 },
      { tilt: -1.9, offsetX: 2, offsetY: -1 },
      { tilt: 1.5, offsetX: -3, offsetY: 2 },
      { tilt: -1.3, offsetX: 2, offsetY: -2 },
      { tilt: 1.8, offsetX: -2, offsetY: 1 },
      { tilt: -1.5, offsetX: 3, offsetY: -2 },
    ];
    return activeCollection.looks.map((_, index) => presets[index % presets.length]);
  }, [activeCollection.looks]);

  // Organic clay corner variations
  const getSizeTier = (index: number) => {
    const cornerShapes = [
      {
        outer: 'rounded-tl-2xl sm:rounded-tl-3xl rounded-br-2xl sm:rounded-br-3xl rounded-tr-md sm:rounded-tr-xl rounded-bl-md sm:rounded-bl-xl',
        inner: 'rounded-tl-xl sm:rounded-tl-2xl rounded-br-xl sm:rounded-br-2xl rounded-tr-sm sm:rounded-tr-lg rounded-bl-sm sm:rounded-bl-lg',
      },
      {
        outer: 'rounded-tr-2xl sm:rounded-tr-3xl rounded-bl-2xl sm:rounded-bl-3xl rounded-tl-md sm:rounded-tl-xl rounded-br-md sm:rounded-br-xl',
        inner: 'rounded-tr-xl sm:rounded-tr-2xl rounded-bl-xl sm:rounded-bl-2xl rounded-tl-sm sm:rounded-tl-lg rounded-br-sm sm:rounded-br-lg',
      },
      {
        outer: 'rounded-bl-2xl sm:rounded-bl-3xl rounded-tr-2xl sm:rounded-tr-3xl rounded-tl-md sm:rounded-tl-xl rounded-br-md sm:rounded-br-xl',
        inner: 'rounded-bl-xl sm:rounded-bl-2xl rounded-tr-xl sm:rounded-tr-2xl rounded-tl-sm sm:rounded-tl-lg rounded-br-sm sm:rounded-br-lg',
      },
      {
        outer: 'rounded-br-2xl sm:rounded-br-3xl rounded-tl-2xl sm:rounded-tl-3xl rounded-tr-md sm:rounded-tr-xl rounded-bl-md sm:rounded-bl-xl',
        inner: 'rounded-br-xl sm:rounded-br-2xl rounded-tl-xl sm:rounded-tl-2xl rounded-tr-sm sm:rounded-tr-lg rounded-bl-sm sm:rounded-bl-lg',
      },
    ][index % 4];

    return {
      outerShape: cornerShapes.outer,
      innerShape: cornerShapes.inner,
    };
  };

  const handlePageChange = (newPageId: string) => {
    setActiveArchiveId(newPageId);
    setTimeout(() => {
      galleryTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const handlePrevPage = () => {
    if (activePageIndex > 0) {
      handlePageChange(collectionsData[activePageIndex - 1].id);
    }
  };

  const handleNextPage = () => {
    if (activePageIndex < collectionsData.length - 1) {
      handlePageChange(collectionsData[activePageIndex + 1].id);
    }
  };

  return (
    <div className="pt-16 sm:pt-20 xl:pt-22 pb-16 space-y-6 sm:space-y-8 overflow-hidden w-full relative">
      <Helmet>
        <title>Portfolio Lookbook | Nayaab Rehan — Commercial Lawn Collection</title>
        <meta
          name="description"
          content="Explore complete commercial lawn collections, original botanical prints, and garment designs by Nayaab Rehan."
        />
        <link rel="canonical" href="https://nayabrehan.com/lookbook" />
      </Helmet>

      {/* =========================================================================
          1. WIDESCREEN EDITORIAL HEADER
         ========================================================================= */}
      <section className="w-full max-w-[98vw] mx-auto px-2.5 sm:px-4 xl:px-6 relative">
        <div className="watermark-text -top-10 -left-4 text-[80px] sm:text-[160px] xl:text-[240px] tracking-tighter pointer-events-none select-none">
          RUNWAY
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={cardPopVariant}
          whileHover={{ y: -2 }}
          className="clay-card p-4 sm:p-7 xl:p-8 border border-white/80 space-y-3 sm:space-y-4 relative z-10 w-full rounded-tl-[2.5rem] sm:rounded-tl-[3rem] rounded-br-[2.5rem] sm:rounded-br-[3.5rem] rounded-tr-xl sm:rounded-tr-2xl rounded-bl-xl sm:rounded-bl-2xl shadow-xl"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-2.5 max-w-3xl">
              <div className="inline-flex items-center gap-2 clay-pill-orange px-4 py-1.5 text-xs sm:text-[13px] font-sans tracking-wide uppercase font-bold shadow-clay-orange">
                <span>PORTFOLIO LOOKBOOK // {totalLooks} COMMERCIAL DESIGNS</span>
              </div>

              <SplitTextReveal
                text="Seasonal Collections & Lookbook"
                as="h1"
                className="font-serif text-3xl sm:text-5xl xl:text-6xl font-normal text-black tracking-tight leading-[1.1] sm:leading-[1.15] py-0.5 overflow-visible"
                highlightWord="Lookbook"
                highlightClass="font-script text-orange font-normal text-4xl sm:text-6xl xl:text-7xl overflow-visible inline-block px-1"
              />

              <p className="font-sans text-sm sm:text-base text-black/90 leading-relaxed max-w-2xl font-medium">
                Complete catalog photography, botanical print repeats, and garment silhouettes developed for fashion houses, textile brands, and recruiters.
              </p>
            </div>

            <div className="hidden sm:block ml-auto lg:ml-0 shrink-0">
              <RotatingStamp
                text="COMMERCIAL LAWN • NAYAAB REHAN • LAHORE • "
                centerText="ARCHIVE"
                className="w-16 h-16 sm:w-24 sm:h-24"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* =========================================================================
          2. PAGE SELECTION (PAGE 1, PAGE 2, PAGE 3, PAGE 4)
         ========================================================================= */}
      <section className="w-full max-w-[98vw] mx-auto px-2.5 sm:px-4 xl:px-6">
        <div className="flex items-center justify-center gap-2 sm:gap-3.5 flex-wrap py-2">
          {collectionsData.map((col, idx) => {
            const isActive = col.id === activeArchiveId;
            return (
              <motion.button
                key={col.id}
                onClick={() => handlePageChange(col.id)}
                whileHover={{ y: -2, scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className={`px-4 py-2 sm:px-7 sm:py-3.5 rounded-full font-sans text-xs sm:text-base font-bold uppercase tracking-wide transition-all duration-200 cursor-pointer flex items-center gap-1.5 sm:gap-2 ${
                  isActive
                    ? 'bg-orange text-white shadow-clay-orange scale-105 ring-2 ring-black/10'
                    : 'bg-ivory text-black border border-white/90 shadow-clay-light hover:bg-white hover:scale-102'
                }`}
              >
                <span>Page {idx + 1}</span>
                <span
                  className={`text-[10px] sm:text-xs px-1.5 py-0.5 sm:px-2 rounded-full font-bold ${
                    isActive ? 'bg-white/25 text-white' : 'bg-black/10 text-black/85'
                  }`}
                >
                  {col.looks.length}
                </span>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          3. CLEAN RUNWAY GALLERY GRID (2-COLUMN COMPACT MOBILE + RANDOM UNANGLED AESTHETIC)
         ========================================================================= */}
      <section ref={galleryTopRef} className="w-full max-w-[98vw] mx-auto px-2 sm:px-4 xl:px-6 space-y-4 sm:space-y-6 scroll-mt-20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-black/15">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-sans text-xs sm:text-base text-black font-bold uppercase tracking-wide">
              PAGE {activePageIndex + 1} // {activeCollection.looks.length} LOOKS
            </span>
            <span className="clay-pill-ivory px-3 py-1 text-[11px] sm:text-sm font-sans uppercase tracking-wide text-black font-bold flex items-center gap-1.5 border border-white/90">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-orange" />
              <span>{activeCollection.title}</span>
            </span>
          </div>

          <span className="font-sans text-[11px] sm:text-sm text-orange font-bold flex items-center gap-1.5">
            <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> CLICK PHOTO TO ENLARGE
          </span>
        </div>

        {/* Looks Grid: 2 columns on mobile, 4 on desktop, with preserved organic unangled/random tilt aesthetic */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6 items-start py-2">
          {activeCollection.looks.map((look, index) => {
            const tier = getSizeTier(index);
            const transform = cardTransforms[index] || { tilt: 0, offsetX: 0, offsetY: 0 };

            const lookInquiryUrl = createWhatsAppUrl(
              `Hello Nayaab, I am viewing ${look.lookNumber} (${look.title}) on Page ${activePageIndex + 1} of your portfolio and would like to inquire.`
            );

            return (
              <motion.div
                key={look.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  rotate: transform.tilt * 0.18,
                  x: transform.offsetX * 0.12,
                }}
                transition={{
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                  delay: Math.min(index * 0.03, 0.2),
                }}
                whileHover={{
                  rotate: 0,
                  x: 0,
                  y: -5,
                  scale: 1.02,
                  zIndex: 30,
                  transition: { type: 'spring', stiffness: 350, damping: 20 },
                }}
                className={`clay-card p-2 sm:p-4 ${tier.outerShape} border border-white/80 space-y-2 sm:space-y-3 flex flex-col justify-between group cursor-pointer relative overflow-visible transition-shadow shadow-md hover:shadow-xl`}
                onClick={() => setSelectedLook(look)}
              >
                {/* Numeric Watermark */}
                <div className="watermark-text -top-2 -right-1 text-[26px] sm:text-[44px] text-black/[0.04] pointer-events-none select-none">
                  {index < 9 ? `0${index + 1}` : `${index + 1}`}
                </div>

                <div className="space-y-1.5 sm:space-y-2.5 relative z-10 overflow-visible">
                  {/* Photo Inset Frame */}
                  <div className={`clay-inset p-1.5 sm:p-2 ${tier.innerShape} border border-white/50 overflow-hidden w-full relative group/img`}>
                    <div
                      className={`w-full overflow-hidden bg-black/5 relative ${tier.innerShape} shadow-inner flex items-center justify-center`}
                      style={{ aspectRatio: look.aspectRatio }}
                    >
                      <img
                        src={look.imageUrl}
                        alt={look.lookNumber}
                        className="w-full h-full object-contain filter contrast-[1.02] group-hover:scale-104 transition-transform duration-500 block"
                        loading="lazy"
                        decoding="async"
                      />

                      {/* Top Badge */}
                      <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 flex items-center gap-1 z-10">
                        <span className="clay-pill-orange px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-sans tracking-wide uppercase font-bold shadow-clay-orange">
                          {look.lookNumber}
                        </span>
                      </div>

                      {/* Hover Overlay Prompt */}
                      <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none p-1 sm:p-2">
                        <span className="bg-white/95 text-black px-2.5 py-1 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-xs font-sans uppercase tracking-wide font-bold shadow-xl flex items-center gap-1 scale-105">
                          <ZoomIn className="w-3 h-3 sm:w-4 sm:h-4 text-orange" />
                          <span>Enlarge</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Clean Title */}
                  <div className="px-1 pt-0.5 flex items-center justify-between">
                    <h3 className="font-serif text-xs sm:text-base font-bold text-black leading-snug group-hover:text-orange transition-colors truncate">
                      {look.lookNumber}
                    </h3>
                    <span className="font-sans text-[10px] sm:text-xs text-orange font-bold uppercase tracking-wide flex items-center gap-0.5">
                      <ZoomIn className="w-3 h-3" /> View
                    </span>
                  </div>
                </div>

                {/* Footer Inquire Action */}
                <div className="pt-2 sm:pt-2.5 border-t border-black/10 flex items-center justify-between relative z-10 gap-1">
                  <span className="font-sans text-[10px] sm:text-xs text-black/80 font-semibold truncate hidden xs:inline">
                    Commercial
                  </span>

                  <a
                    href={lookInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="clay-pill-orange px-2.5 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-sans uppercase tracking-wide font-bold flex items-center gap-1 shadow-clay-orange hover:scale-105 transition-transform ml-auto"
                  >
                    <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span>Inquire</span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* =========================================================================
            BOTTOM PAGINATION CONTROLS (PREVIOUS PAGE & NEXT PAGE)
           ========================================================================= */}
        <div className="pt-6 sm:pt-10 pb-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-black/15">
          {/* Previous Page Button */}
          <button
            type="button"
            disabled={activePageIndex === 0}
            onClick={handlePrevPage}
            className={`w-full sm:w-auto clay-pill-ivory px-5 sm:px-7 py-3 text-xs sm:text-sm font-sans uppercase tracking-wider font-bold flex items-center justify-center gap-2 border border-white/90 shadow-md transition-all cursor-pointer ${
              activePageIndex === 0
                ? 'opacity-35 cursor-not-allowed pointer-events-none'
                : 'hover:scale-104 hover:bg-white active:scale-96'
            }`}
          >
            <ChevronLeft className="w-4 h-4 text-orange" />
            <span>Previous Page</span>
          </button>

          {/* Page Indicators */}
          <div className="flex items-center gap-2">
            {collectionsData.map((col, idx) => {
              const isActive = idx === activePageIndex;
              return (
                <button
                  key={`bottom-${col.id}`}
                  onClick={() => handlePageChange(col.id)}
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full font-sans text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center ${
                    isActive
                      ? 'bg-orange text-white shadow-clay-orange scale-110'
                      : 'bg-ivory text-black border border-white/90 hover:bg-white hover:scale-105'
                  }`}
                  aria-label={`Go to Page ${idx + 1}`}
                >
                  {idx + 1}
                </button>
              );
            })}
            <span className="font-sans text-xs sm:text-sm text-black/75 font-semibold ml-2">
              Page {activePageIndex + 1} of {collectionsData.length}
            </span>
          </div>

          {/* Next Page Button */}
          <button
            type="button"
            disabled={activePageIndex === collectionsData.length - 1}
            onClick={handleNextPage}
            className={`w-full sm:w-auto clay-pill-orange px-6 sm:px-8 py-3 text-xs sm:text-sm font-sans uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-clay-orange transition-all cursor-pointer ${
              activePageIndex === collectionsData.length - 1
                ? 'opacity-35 cursor-not-allowed pointer-events-none'
                : 'hover:scale-104 hover:bg-[#BA2E0A] active:scale-96'
            }`}
          >
            <span>Next Page</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* =========================================================================
          4. ENLARGED PHOTO LIGHTBOX MODAL (CLEAN FULL-RES PHOTO PREVIEW)
         ========================================================================= */}
      {selectedLook && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/94 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedLook(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[96vh] flex flex-col items-center justify-center animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with Look Number & Close */}
            <div className="w-full flex items-center justify-between px-3 py-2 text-white/95 mb-2">
              <div className="flex items-center gap-2.5">
                <span className="clay-pill-orange px-3.5 py-1 text-xs sm:text-sm font-sans uppercase tracking-wide font-bold shadow-clay-orange">
                  {selectedLook.lookNumber}
                </span>
                <span className="font-sans text-xs sm:text-sm text-white/90 font-semibold">
                  Page {activePageIndex + 1}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-sans text-xs text-white/80 font-bold tracking-wide hidden sm:inline">ESC TO CLOSE</span>
                <button
                  onClick={() => setSelectedLook(null)}
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-orange text-white flex items-center justify-center transition-all cursor-pointer hover:scale-110"
                  aria-label="Close enlarged photo"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Enlarged Photo Container with Left/Right Arrows */}
            <div className="relative w-full flex items-center justify-center max-h-[74vh] overflow-hidden rounded-2xl bg-black/60 border border-white/20 shadow-2xl p-2 sm:p-4">
              {/* Previous Photo Button */}
              <button
                onClick={handlePrevPhoto}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/70 hover:bg-orange text-white flex items-center justify-center border border-white/40 transition-all hover:scale-110 cursor-pointer shadow-xl"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-7 h-7" />
              </button>

              <img
                src={selectedLook.imageUrl}
                alt={selectedLook.lookNumber}
                className="w-auto h-auto max-h-[69vh] max-w-full object-contain rounded-xl shadow-2xl select-none"
              />

              {/* Next Photo Button */}
              <button
                onClick={handleNextPhoto}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/70 hover:bg-orange text-white flex items-center justify-center border border-white/40 transition-all hover:scale-110 cursor-pointer shadow-xl"
                aria-label="Next photo"
              >
                <ChevronRight className="w-7 h-7" />
              </button>
            </div>

            {/* Bottom Bar with Inquiry Action */}
            <div className="w-full mt-2.5 p-3.5 sm:p-4 rounded-2xl bg-black/80 backdrop-blur-md border border-white/25 text-white flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="font-serif text-lg sm:text-2xl font-bold text-white tracking-tight">
                  {selectedLook.lookNumber}
                </span>
                <span className="text-white/80 font-sans text-xs sm:text-sm font-medium">
                  Commercial Lawn Archive
                </span>
              </div>

              <a
                href={createWhatsAppUrl(
                  `Hello Nayaab, I am viewing the enlarged photo of ${selectedLook.lookNumber} on Page ${activePageIndex + 1} of your portfolio.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="clay-pill-orange px-5 py-2.5 text-xs sm:text-sm font-sans uppercase tracking-wide font-bold flex items-center gap-2 shadow-clay-orange hover:scale-105 transition-transform shrink-0"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Inquire WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
