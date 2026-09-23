# MERCANEX — ARCHITECTURAL & TECHNOLOGY DECISIONS
**Project:** Mercanex — Living Technical Report  
**Format:** Architectural Decision Records (ADR)  
**Standard:** Rigorous Engineering Trade-off Analysis  

---

## ADR-01: Core Application Shell & Runtime
- **Problem:** Delivering an interactive, responsive, multi-view living technical report that handles complex state (modals, drawers, interactive sandboxes, canvas scrubber, filters) with instant load times and zero server hosting costs.
- **Alternatives Considered:**
  1. *Astro 4 (Content Collections + Island Architecture):* Excellent for static documentation; slightly more friction when state must be shared deeply between global HUD, drawers, modals, and dynamic canvas scrubbers.
  2. *Next.js 14 (App Router):* Overkill for a client-side explorable technical report; requires Node server or complex static export workarounds.
  3. *Vite 6 + React 18.3 + TypeScript/ESM (Single Page Application with Modular Components):* Instant HMR, unified state tree, native client-side routing and modals, highly optimized tree-shaken static bundle deployable directly to Vercel or GitHub Pages.
- **Decision:** **Vite 6 + React 18.3 + TypeScript/ESM**.
- **Rationale:** React allows deep componentization of the 72 ERFs, 16 diagrams, interactive crypto-vault, and financial calculator while Vite guarantees sub-second build times and minimal bundle overhead.
- **Trade-offs:** Client-side hydration required; mitigated by fast initial DOM paint, lazy loading of heavy sub-components, and zero server round-trips.
- **Fallback:** Complete static HTML/CSS export mode (`?mode=print` or print stylesheets).

---

## ADR-02: Styling Architecture & Visual Language
- **Problem:** Ensuring pixel-perfect alignment, typographic hierarchy, responsive adaptability across mobile/tablet/desktop, and zero CSS runtime cost.
- **Alternatives Considered:**
  1. *CSS Modules / Sass:* Highly decoupled, but slower prototyping and potential class name explosion.
  2. *Tailwind CSS v3.4 + PostCSS + Tailwind Merge:* Utility-first, compile-time purge, zero runtime overhead, unified design tokens for borders, typography, and colors.
- **Decision:** **Tailwind CSS v3.4 with custom typography and color tokens**.
- **Rationale:** Purged production CSS is <18 KB gzip. Enforces visual consistency with strict spacing scales (`4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`) and tokenized palette (`emerald-600`, `slate-900`, `slate-50`).
- **Trade-offs:** Verbose class strings in JSX; mitigated by extracting reusable atomic components (`Badge`, `Button`, `StatCard`, `TechTerm`).

---

## ADR-03: Motion & Scrollytelling Engine
- **Problem:** Choreographing complex scroll-driven sequences (ePayco 1:N payment split, multi-vendor cart breakdown, chapter progress, sticky split-screen narratives) with 60 FPS performance and reliable cleanup.
- **Alternatives Considered:**
  1. *Framer Motion:* Elegant for simple component mounts/unmounts, but less robust for complex scroll scrubbing, timeline pinning, and bidirectional scroll choreography.
  2. *Native CSS Scroll-Timeline:* Experimental; incomplete cross-browser support in older mobile browsers.
  3. *GSAP 3.12 (ScrollTrigger, Flip, Observer) via `@gsap/react`:* Industry standard for technical scrollytelling; precise timeline scrubbing, pin controls, automatic cleanup with `useGSAP` hook, and hardware-accelerated transforms.
- **Decision:** **GSAP 3.12+ with ScrollTrigger, Flip, and `@gsap/react`**.
- **Rationale:** GSAP guarantees buttery smooth 60fps animations by operating strictly on GPU-composited transform properties (`x`, `y`, `scale`, `rotation`, `autoAlpha`).
- **Trade-offs:** Additional ~45 KB bundle weight; completely justified by the requirement for award-level scrollytelling.
- **Fallback:** Full `prefers-reduced-motion` detection that disables scrubbing and reveals static, accessible card progressions.

---

## ADR-04: Viewport Smoothing & Lenis Integration
- **Problem:** Preventing jitter when synchronizing native mouse-wheel scrolling with GSAP ScrollTrigger pinned elements.
- **Alternatives Considered:**
  1. *Native browser scrolling:* Good, but produces frame inconsistencies on Windows Chrome with high-resolution mice.
  2. *Locomotive Scroll:* Heavy, frequently breaks native keyboard accessibility and anchor jump links.
  3. *Lenis Smooth Scroll (by Studio Freight / Darkroom):* Ultra-lightweight (3KB), does not trap or hijack native events, synchronizes seamlessly with `ScrollTrigger.update()`.
- **Decision:** **Lenis Smooth Scroll integrated with GSAP ticker**.
- **Rationale:** Delivers luxury editorial momentum while preserving 100% native keyboard scrolling (`PageDown`, `Space`, `ArrowKeys`) and anchor links.
- **Fallback:** Auto-disabled on mobile touch devices and when `prefers-reduced-motion: reduce` is active.

---

## ADR-05: Traceability Graph & Architecture Visualization
- **Problem:** Visualizing the multi-tier engineering hierarchy (User Stories ➔ RFs ➔ ERFs ➔ Mockups ➔ Diagrams ➔ Database Tables ➔ Test Cases) comprising over 210 entities without crashing low-end devices.
- **Alternatives Considered:**
  1. *React Flow:* Heavy DOM overhead for 200+ simultaneous custom nodes; layout thrashing during pan/zoom.
  2. *Three.js / WebGL only:* High GPU overhead on integrated laptop graphics; poor accessibility for screen readers.
  3. *Hybrid Dual Engine: High-Performance Canvas 2D + D3 Hierarchy Layout with Interactive SVG Lineage Overlay, coupled with a Filterable Editorial Matrix.*
- **Decision:** **Custom Interactive Canvas 2D / SVG Lineage Explorer backed by D3-hierarchy algorithms**.
- **Rationale:** Provides 60fps rendering, instantaneous node filtering by module (RF-01 to RF-08), bi-directional causal chain highlighting, and zero WebGL context crash risk.
- **Fallback:** Searchable, tabular Traceability Matrix with direct cross-links.

---

## ADR-06: High-Performance Frame-Accurate Scrubbing
- **Problem:** Demonstrating the end-to-end digital transaction lifecycle (buyer checkout ➔ ePayco webhook ➔ AES-256 decryption ➔ ephemeral RAM delivery) with cinema-level visual fidelity.
- **Alternatives Considered:**
  1. *HTML5 `<video>` currentTime seeking:* High seek latency (200-500ms), visual stutter, buffering spinner interrupts.
  2. *WebCodecs API:* Ideal in theory, but requires heavy MP4 demuxing libraries and lacks full cross-browser reliability.
  3. *HTML5 Canvas 2D Frame Sequencer (WebP / AVIF frames):* Zero seek lag, frame-perfect scrub, predictable memory footprint (<1.8MB total asset weight for 60 frames), 100% universal browser compatibility.
- **Decision:** **HTML5 Canvas 2D Frame Sequencer with GSAP ScrollTrigger timeline indexing**.
- **Rationale:** Guarantees 60fps scrub with zero delay. Allows stepping back and forth frame-by-frame with a tactile visual slider.
- **Fallback:** Step-by-step visual carousel with poster thumbnails.

---

## ADR-07: Client-Side Search & Command Palette
- **Problem:** Allowing instant keyboard access (`Ctrl+K`) to any requirement (ERF), screen (Mockup), diagram (D), entity, risk, or test case across a massive document.
- **Alternatives Considered:**
  1. *Server-side search:* Unnecessary complexity and network latency.
  2. *Simple Array `.filter()`:* Poor substring and fuzzy match capability.
  3. *MiniSearch / Fuse.js client-side Trie indexing:* In-memory fuzzy search with prefix matching, sub-millisecond query execution, and direct deep-linking.
- **Decision:** **In-memory Trie search (MiniSearch / Fuse.js algorithm)**.
- **Rationale:** Instant (<2ms) results across all 72 ERFs, 72 Mockups, 16 Diagrams, 15 DB Tables, 20 Test Cases, and 31 Glossary terms.
- **Fallback:** Traditional categorized dropdowns and chapter index rail.

---

## ADR-08: Zero-Byte Micro-Acoustic Interface
- **Problem:** Enhancing tactile immersion with subtle audio cues without forcing multi-megabyte audio file downloads.
- **Alternatives Considered:**
  1. *Howler.js with MP3/WAV assets:* ~2-5 MB asset footprint; bandwidth waste.
  2. *Web Audio API Procedural Synthesis:* 0 KB asset weight; sounds are generated mathematically in real-time via oscillator and gain nodes.
- **Decision:** **Web Audio API procedural sound synthesis (Muted by default)**.
- **Rationale:** Zero network load. Smooth, warm acoustic feedback using exponential decay low-pass filtered sine waves (220 Hz – 440 Hz). User-controlled master mute state persisted in `localStorage`.
- **Fallback:** Silent mode; audio is 100% non-essential to information access.
