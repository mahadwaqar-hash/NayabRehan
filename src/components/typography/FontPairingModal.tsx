import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Sparkles, Feather } from 'lucide-react';
import { useTypography } from '../../context/TypographyContext';

interface FontPairingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FontPairingModal: React.FC<FontPairingModalProps> = ({ isOpen, onClose }) => {
  const { activePairing, setPairingById, pairings } = useTypography();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="clay-card relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto p-5 sm:p-8 rounded-3xl border border-white/90 shadow-2xl space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-black/10">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="clay-pill-orange px-2.5 py-0.5 text-[9px] font-mono tracking-widest uppercase font-bold shadow-clay-orange flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" />
                    DESIGN CURATION
                  </span>
                  <span className="font-mono text-[10px] text-black/50 uppercase tracking-wider font-semibold">
                    REAL-TIME ENGINE
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-black tracking-tight">
                  Typography Architecture &amp; Font Pairings
                </h3>
                <p className="font-sans text-xs sm:text-sm text-black/70">
                  Switch the typographic system across all headlines, body copy, and garment specs.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-ivory text-black flex items-center justify-center shadow-clay-light-sm hover:text-orange hover:scale-105 border border-white/80 transition-transform shrink-0"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Pairings List */}
            <div className="space-y-3.5">
              {pairings.map((p) => {
                const isActive = activePairing.id === p.id;

                return (
                  <motion.div
                    key={p.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setPairingById(p.id)}
                    className={`p-4 sm:p-5 rounded-2xl cursor-pointer transition-all border ${
                      isActive
                        ? 'clay-card border-orange shadow-lg ring-2 ring-orange/30'
                        : 'clay-inset bg-ivory/50 border-white/60 hover:bg-white/40'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2 border-b border-black/5">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif text-lg sm:text-xl font-bold text-black">
                            {p.name}
                          </h4>
                          {isActive && (
                            <span className="clay-pill-orange px-2 py-0.5 text-[8px] font-mono tracking-widest uppercase font-bold flex items-center gap-1 shadow-clay-orange">
                              <Check className="w-2.5 h-2.5" />
                              ACTIVE
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-[10px] text-orange tracking-wider uppercase font-semibold">
                          {p.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="px-2 py-0.5 rounded-md bg-black/5 text-[9px] font-mono font-medium text-black/80">
                          Display: <strong className="font-bold">{p.displayFont}</strong>
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-black/5 text-[9px] font-mono font-medium text-black/80">
                          Body: <strong className="font-bold">{p.bodyFont}</strong>
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-black/5 text-[9px] font-mono font-medium text-black/80">
                          Specs: <strong className="font-bold">{p.specsFont}</strong>
                        </span>
                      </div>
                    </div>

                    {/* Live Preview Sample */}
                    <div className="pt-3 space-y-1.5">
                      <div
                        style={{ fontFamily: p.serif }}
                        className="text-xl sm:text-2xl tracking-tight text-black flex items-baseline gap-2"
                      >
                        <span className="font-light">NAYAB</span>
                        <span className="italic text-orange font-light">REHAN</span>
                      </div>

                      <p
                        style={{ fontFamily: p.sans }}
                        className="text-xs text-black/75 leading-relaxed line-clamp-2"
                      >
                        {p.rationale}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Footer / Tip */}
            <div className="pt-2 border-t border-black/10 flex items-center justify-between text-[11px] text-black/60 font-sans">
              <span className="flex items-center gap-1 font-mono text-[10px] text-black/60">
                <Feather className="w-3 h-3 text-orange" />
                Changes apply instantly across all pages and persist automatically.
              </span>
              <button
                type="button"
                onClick={onClose}
                className="clay-pill-orange px-4 py-1.5 text-[10px] font-mono uppercase tracking-widest font-bold shadow-clay-orange hover:scale-105 transition-transform"
              >
                Done
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
