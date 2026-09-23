# MERCANEX — EDITORIAL DESIGN SYSTEM & MOTION SPECIFICATION
**System Name:** Mercanex Living Editorial System (M-LES)  
**Standard:** Taste & Impeccable Design Guidelines  
**Visual Spirit:** Technical • Editorial • Modern • Cinematic • Precise • Controlled  

---

## 1. Visual Philosophy & Anti-Slop Directive

The visual language of the **Mercanex Living Technical Report** is rooted in high-end technical publishing and architectural documentation. It rejects the generic clichés of AI-generated SaaS templates:
- **NO** meaningless purple/indigo gradient soup.
- **NO** pervasive translucent glassmorphism that destroys reading contrast.
- **NO** floating disconnected decorative cards with arbitrary shadows.
- **NO** decorative particle swarms that consume GPU cycles without narrative function.

Instead, M-LES implements a **White Editorial Canvas** with surgical Emerald Green accents, crisp hairline borders (`1px solid #E2E8F0`), high-contrast ink typography, and monospace technical callouts.

---

## 2. Color Palette & Semantic Tokens

```
SURFACE HIERARCHY
┌────────────────────────────────────────────────────────┐
│ Canvas Background   : #F8FAFC (Slate 50)               │
│ Card Surface Layer  : #FFFFFF (Pure White)             │
│ Sub-surface / Muted : #F1F5F9 (Slate 100)              │
│ Hairline Borders    : #E2E8F0 (Slate 200)              │
│ Elevated Borders    : #CBD5E1 (Slate 300)              │
└────────────────────────────────────────────────────────┘

TYPOGRAPHIC INK
┌────────────────────────────────────────────────────────┐
│ Primary Text (Heading): #0F172A (Slate 900 - 95% Ink)  │
│ Secondary Text (Body) : #334155 (Slate 700 - 85% Ink)  │
│ Muted Caption / Meta  : #64748B (Slate 500)            │
│ Border Inactive       : #94A3B8 (Slate 400)            │
└────────────────────────────────────────────────────────┘

MERCANEX BRAND & ACCENT
┌────────────────────────────────────────────────────────┐
│ Brand Primary       : #059669 (Emerald 600)            │
│ Brand Highlight     : #10B981 (Emerald 500)            │
│ Brand Surface       : #ECFDF5 (Emerald 50)             │
│ Brand Border Tint   : #A7F3D0 (Emerald 200)            │
└────────────────────────────────────────────────────────┘

STATUS & TELEMETRY SEMANTICS
┌────────────────────────────────────────────────────────┐
│ Success / Verified  : #059669 (Emerald 600)            │
│ Warning / Revision  : #D97706 (Amber 600)              │
│ Critical / Dispute  : #DC2626 (Rose 600)               │
│ Information / OAuth : #2563EB (Blue 600)               │
│ Security / Crypto   : #7C3AED (Violet 600)             │
└────────────────────────────────────────────────────────┘
```

---

## 3. Typographic Hierarchy

M-LES establishes a strict three-tier typographic rhythm:

1. **Editorial Sans (Inter / Geist / System UI):** Used for chapter titles, structural section markers, and running body prose.
   - `Display 1`: `text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900`
   - `Chapter Title`: `text-2xl md:text-3xl font-bold tracking-tight text-slate-900`
   - `Section Subtitle`: `text-lg font-semibold text-slate-800`
   - `Body Prose`: `text-base text-slate-700 leading-relaxed font-normal`
2. **Technical Monospace (JetBrains Mono / Fira Code / ui-monospace):** Used for all system identifiers, technical codes, database entities, and cryptographic hashes.
   - `Requirement ID`: `font-mono text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200`
   - `Database Field`: `font-mono text-xs text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded`
   - `API Endpoint`: `font-mono text-xs text-blue-700 font-semibold`
3. **Auditorium / Projector Mode (Scale Modifier):**
   - The HUD provides instantaneous font scaling (`[A-]` `[A]` `[A+]`) modifying the root CSS variable `--text-scale` from `1.0` to `1.2` for distance reading during SENA jury defenses.

---

## 4. Spacing Scale & Grid Layout

- **Base Unit:** 4px geometric grid.
- **Micro Spacing:** `4px (1)`, `8px (2)`, `12px (3)`, `16px (4)`, `24px (6)`.
- **Component Spacing:** `32px (8)`, `48px (12)`, `64px (16)`.
- **Max Content Container:** `max-w-[1520px] mx-auto px-4 md:px-8`.
- **Grid Layout:** 12-column responsive layout with fluid gap (`gap-6` to `gap-8`).

---

## 5. Motion Language & Choreography

Motion in M-LES is strictly semantic. Every animation answers: *"What software process does this explain?"*

### Categories of Motion

| Category | Typical Duration | Easing | Intent |
| :--- | :--- | :--- | :--- |
| **Structural Motion** | 400ms – 600ms | `power2.out` | Moving between chapters; pinning narrative split-views. |
| **Explanatory Flow** | 800ms – 1200ms | `power1.inOut` | Token dispatch, ePayco Split 1:N payment dispersal, AES encryption sandbox. |
| **Micro-Interactions** | 150ms – 250ms | `expo.out` | Button presses, drawer slide-out, modal lightboxes, glossary tooltips. |
| **Scroll Scrubbing** | Realtime (1:1) | `none` (direct) | Progress bar tracking, frame-by-frame transaction scrubbing. |

### Golden Rules of Motion
1. **Transforms Only:** All animations animate exclusively `transform` properties (`x`, `y`, `scale`, `rotation`, `xPercent`) and `autoAlpha`. Never animate `top`, `left`, `width`, `height`, or `margin` to prevent browser layout reflows.
2. **Interruptibility:** Every animation can be paused, scrubbed backwards, or skipped immediately.
3. **Reduced-Motion Mode:** When `prefers-reduced-motion: reduce` is detected, all continuous scroll transitions and animated loops are disabled, instantly displaying static, readable states.
