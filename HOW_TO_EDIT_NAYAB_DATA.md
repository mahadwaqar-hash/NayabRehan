# 📖 HOW TO EDIT NAYAB'S PORTFOLIO DATA
### Single-Source-of-Truth Guide for `src/data/portfolioData.ts`

This website was built using a **centralized configuration architecture**. You do **NOT** need to edit HTML, JSX components, or styles to update Nayab's details, collections, fabrics, or phone numbers.

Editing the single file at:
```bash
src/data/portfolioData.ts
```
automatically updates every page, mobile drawer, WhatsApp link, footer, metadata, and JSON-LD structured data schema across the entire website.

---

## 📍 SECTION-BY-SECTION CHEAT SHEET

### 1. Designer Profile & Contact Info (Lines ~85–115)
To update phone number, Instagram, email, or bio:
```ts
export const designerData: DesignerInfo = {
  name: "Nayab Rehan Piracha",              // <-- Change if title varies
  shortName: "Nayab Piracha",
  monogram: "NRP",
  title: "Fashion Designer & Textile Architect",
  tagline: "...",                           // <-- Main hero statement
  bio: "...",                               // <-- Full bio on Process page
  studioAddress: "Atelier Suites, Gulberg & DHA Phase 5, Lahore, Pakistan",
  whatsappNumber: "923000000000",           // <-- Enter phone digits with country code, NO '+' or spaces
  formattedPhone: "+92 300 0000000",       // <-- Human-readable display
  email: "contact@nayabpiracha.com",        // <-- Official email address
  instagramHandle: "@nayabrehanpiracha",
  instagramUrl: "https://instagram.com/nayabrehanpiracha",
};
```
> **Tip for WhatsApp:** The `whatsappNumber` must start with country code `92` for Pakistan without leading zeros or plus signs (e.g. `923001234567`).

---

### 2. The 4 Specialty Pillars (Lines ~120–185)
To adjust the 4 core disciplines (Bespoke Couture, Surface Print, Loom R&D, Capsule Collections):
```ts
export const specialtyPillars: SpecialtyPillar[] = [
  {
    id: "bespoke-couture",
    number: "01",
    title: "Bespoke Couture & Silhouette Draping",
    subtitle: "Architectural Patternmaking & Muslin Toiles",
    description: "...",
    details: [ ... ],
    heroImage: "https://... (Replace with Nayab's atelier photo)"
  },
  ...
];
```

---

### 3. The 4 Runway Collections (Lines ~190–420)
All 4 collections are pre-populated with titles ready to be swapped with Nayab's real projects:
- **Slot 1:** `Collection 01 — "Archive I: Raw Silk & Shadow"`
- **Slot 2:** `Collection 02 — "Archive II: Botanical Loom"`
- **Slot 3:** `Collection 03 — "Archive III: Structural Drape"`
- **Slot 4:** `Collection 04 — "Archive IV: Heirloom Zari"`

Each collection contains:
- `title`: Collection name
- `season`: e.g. "Autumn / Winter Haute Couture"
- `year`: e.g. "2025–2026"
- `concept`: Curatorial statement
- `palette`: Array of `{ name: "...", hex: "#..." }` fabric dots
- `looks`: Up to 4 or more individual looks with:
  - `lookNumber`: "LOOK 01"
  - `title`: Look title
  - `silhouette`: Structural cut notes
  - `textileDetails`: Fabric description
  - `composition`: e.g. "100% Raw Handloomed Silk"
  - `imageUrl`: High-resolution portrait link

---

### 4. The 6 Textile Swatches (Lines ~425–580)
The interactive 60fps Macro Loupe displays 6 tactile fabrics:
1. `SW-01-SILK-RAW`: Unbleached Wild Mulberry Raw Silk
2. `SW-02-JACQ-BOT`: Botanical Relief Jacquard Weave
3. `SW-03-ORG-GAZ`: Crisp Triple-Silk Organza Gazar
4. `SW-04-PRINT-MAD`: Engineered Botanical Madder Repeat Print
5. `SW-05-ZARI-MET`: Heirloom Antique Gilded Micro-Zari
6. `SW-06-LINEN-DRP`: Heavy Washed Artisanal Flax Linen

Each swatch has:
- `composition`: Thread makeup
- `gsmWeight`: Fabric density
- `technique`: Loom or printing method
- `loomOrigin`: Region / workshop
- `colorways`: Swatch chips
- `baseImageUrl`: The standard swatch view
- `macroImageUrl`: The ultra-close-up fiber weave texture (used for the 2.2x circular magnifying loupe)

---

### 5. Client & Buyer Regions (Lines ~640–740)
To add or modify geographic areas served (e.g. DHA, Gulberg, Model Town, Cantt, Bahria, Dubai, London, New York):
- Edit the objects in `clientRegionsData`.
- Set `isLocal: true` for Lahore enclaves and `isLocal: false` for international cities.

---

### 6. Frequently Asked Questions (Lines ~745–800)
To add or revise customer/buyer questions:
- Edit the `faqsData` array. Updating this automatically updates the FAQ accordion on `/inquire` and the JSON-LD `@graph` schema for Google search rich snippets.

---

## 🚀 HOW TO PREVIEW & DEPLOY

1. **Local Preview:**
   ```bash
   npm run dev
   ```
2. **Production Build:**
   ```bash
   npm run build
   ```
3. **Deploy to Vercel:**
   Connect the repository to Vercel. Build command: `npm run build`, Output directory: `dist`. The provided `vercel.json` automatically manages client-side SPA routing and performance caching.
