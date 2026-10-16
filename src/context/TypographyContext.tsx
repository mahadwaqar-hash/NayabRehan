import React, { createContext, useContext, useState, useEffect } from 'react';

export interface FontPairing {
  id: string;
  name: string;
  category: string;
  serif: string;
  sans: string;
  mono: string;
  displayFont: string;
  bodyFont: string;
  specsFont: string;
  rationale: string;
}

export const FONT_PAIRINGS: FontPairing[] = [
  {
    id: 'perandory-paradise',
    name: 'Perandory & Birds of Paradise',
    category: 'High-Fashion Architectural & Luxury Calligraphy',
    displayFont: 'Perandory',
    bodyFont: 'Plus Jakarta Sans',
    specsFont: 'Space Mono',
    serif: "'Perandory', 'Bodoni Moda', Georgia, serif",
    sans: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "'Space Mono', monospace",
    rationale: 'Striking high-contrast architectural serif (Perandory) paired with exquisite fluid calligraphy (Birds of Paradise).',
  },
  {
    id: 'avant-garde',
    name: 'Avant-Garde Architectural',
    category: 'Sculptural European Runway',
    displayFont: 'Syne',
    bodyFont: 'Plus Jakarta Sans',
    specsFont: 'Space Mono',
    serif: "'Syne', sans-serif",
    sans: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "'Space Mono', monospace",
    rationale: 'Extra-wide sculptural geometry inspired by contemporary Parisian couture houses (Mugler, Jacquemus). Unapologetic structural presence.',
  },
  {
    id: 'artisanal-heritage',
    name: 'Artisanal Heritage',
    category: 'Traditional Loom Craft',
    displayFont: 'Cormorant Garamond',
    bodyFont: 'Plus Jakarta Sans',
    specsFont: 'JetBrains Mono',
    serif: "'Cormorant Garamond', Georgia, serif",
    sans: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "'JetBrains Mono', monospace",
    rationale: 'Classical 16th-century Claude Garamond proportions honoring antique South Asian metallic wefts and delicate filament weaving.',
  },
];

interface TypographyContextType {
  activePairing: FontPairing;
  setPairingById: (id: string) => void;
  pairings: FontPairing[];
}

const TypographyContext = createContext<TypographyContextType | undefined>(undefined);

const STORAGE_KEY = 'nr-typography-pairing';

export const TypographyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePairing, setActivePairing] = useState<FontPairing>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      const found = FONT_PAIRINGS.find((p) => p.id === saved);
      if (found) return found;
    }
    return FONT_PAIRINGS[0]; // Default: Haute Couture Editorial (Bodoni Moda)
  });

  const applyPairingToDOM = (pairing: FontPairing) => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    root.style.setProperty('--font-serif', pairing.serif);
    root.style.setProperty('--font-sans', pairing.sans);
    root.style.setProperty('--font-mono', pairing.mono);
  };

  useEffect(() => {
    applyPairingToDOM(activePairing);
  }, [activePairing]);

  const setPairingById = (id: string) => {
    const found = FONT_PAIRINGS.find((p) => p.id === id);
    if (found) {
      setActivePairing(found);
      applyPairingToDOM(found);
      try {
        localStorage.setItem(STORAGE_KEY, id);
      } catch {
        // Safe fallback
      }
    }
  };

  return (
    <TypographyContext.Provider value={{ activePairing, setPairingById, pairings: FONT_PAIRINGS }}>
      {children}
    </TypographyContext.Provider>
  );
};

export const useTypography = (): TypographyContextType => {
  const context = useContext(TypographyContext);
  if (!context) {
    throw new Error('useTypography must be used within a TypographyProvider');
  }
  return context;
};
