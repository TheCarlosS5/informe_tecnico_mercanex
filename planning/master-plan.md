# MERCANEX — MASTER IMPLEMENTATION PLAN
**Project:** Mercanex — Living Technical Report  
**Format:** Comprehensive Technical & Creative Master Plan  
**Target:** SENA ADSO Ficha 3407799 / CIES Regional Huila  

---

## 1. Comprehensive Understanding of Mercanex

Mercanex is an engineering-grade **SaaS Marketplace for Legitimate Digital Goods and Software Licenses** developed in Colombia. It addresses the rampant informality, fraud, and lack of warranty in the digital license trade (activation keys, videogame DLCs, official subscriptions, gift cards).

### Key Architectural Pillars
- **Strict Digital Boundary:** Exclusively intangible, legitimate digital goods. No physical shipping, no shared accounts, no cracked software.
- **Multi-Vendor Cart & Unified Checkout:** A single global order partitions automatically into distinct sub-orders per vendor.
- **ePayco Pagos Divididos (Split 1:N):** Instantaneous fund dispersion directly to each seller's linked subaccount. Mercanex takes $0 commission on base operations and has **$0 fund custody**, eliminating financial intermediary liabilities.
- **Ephemeral Key Delivery & AES-256-CBC Encryption:** Digital keys are stored AES-256 encrypted at rest. Upon confirmed webhook payment from ePayco, keys are decrypted in server RAM, revealed once to the buyer, and assigned permanently.
- **Comprehensive Traceability & Quality Control:** 8 Functional Modules (`RF-01` to `RF-08`), 72 Specifications (`ERF-01.01` to `ERF-08.10`), 72 Mockups (`M01` to `M72`), 16 Diagrams (`D01` to `D15` + DER), 15 PostgreSQL Tables, and 20 Planned Test Cases (`CP-01` to `CP-20`).

---

## 2. Semantic Content Inventory

Through automated extraction of the official SRS and Technical Report XML AST, the content model is mapped as follows:

```
SEMANTIC CONTENT GRAPH
User Story (10 Stories)
       │
       ▼
Functional Module (RF-01 to RF-08)
       │
       ▼
Requirement Specification (ERF-01.01 to ERF-08.10) ──► Mockup (M01 to M72)
       │                                            │
       ▼                                            ▼
UML Diagram (D01 to D15)                     Relational Table (15 Tables)
       │                                            │
       └────────────────────┬───────────────────────┘
                            ▼
              Test Case (CP-01 to CP-20)
                            ▼
               Risk Matrix (11 Risks)
```

---

## 3. Information Architecture & Chapter Organization

The Living Technical Report is structured into 10 logical chapters, accessible via continuous scroll or the floating Presenter HUD:

```
CHAPTER 01: Executive Summary & Telemetry Bento Grid
  ├── Institutional Identification (SENA CIES Ficha 3407799)
  ├── 5 Development Team Members & Engineering Roles
  └── High-Level Metrics (72 ERFs, 72 Mockups, 16 Diagrams, 15 DB Tables, $0 Capex)

CHAPTER 02: Strategic Problem & Scope Formulation
  ├── Problem Statement (Informality in Digital Goods)
  ├── General & Specific Objectives
  └── Strict Scope Boundaries (In-Scope vs Excluded HU-10)

CHAPTER 03: Architecture Evolution & Split Gateway Engine
  ├── Architectural Overview (Nginx + PHP 8.2/Laravel 11 + PostgreSQL 16 + WebSockets)
  ├── Evolutionary Gateway Comparator (Mercado Pago V1.4 vs ePayco Split 1:N V3.0 vs Adyen)
  └── Adapter Pattern (MarketplaceSplitGatewayInterface)

CHAPTER 04: Interactive Transaction Scrollytelling
  ├── Canvas 2D Live Transaction Flow (Split 1:N Fund Dispersal)
  ├── Frame-Accurate Motion Scrubber (Step-by-step transaction state machine)
  └── Interactive AES-256-CBC Cryptographic Vault Sandbox

CHAPTER 05: Explorador de Requisitos (72 ERF) & Mockup Studio
  ├── Filterable Grid by 8 Functional Modules (RF-01 to RF-08)
  ├── 14-Field Canonical ERF Specification Inspector (Drawer / Modal)
  └── 1:1 Linked Mockup Studio (M01 to M72 with Lightbox Zoom)

CHAPTER 06: Official Modeling Diagrams (16 UML / DER)
  ├── Sequence, Activity, and State Machine Visualizer (D01 to D15)
  └── High-Resolution 300 DPI Fullscreen Inspection

CHAPTER 07: PostgreSQL 16 Relational Data Model (DER)
  ├── 12 Logical Entities & 15 Physical Tables
  ├── Interactive Entity Inspector (PK, FK, Unique constraints, data types)
  └── Live SQL Schema Generation & DDL Inspector

CHAPTER 08: End-to-End Traceability Matrix
  ├── Interactive Visual Lineage Explorer (Causal Chain Highlighting)
  └── Searchable Tabular Verification Matrix (RF ➔ ERF ➔ Mockup ➔ Diagram ➔ Test Case)

CHAPTER 09: QA, SLAs & Risk Management
  ├── Quantitative SLA Targets (API latencies, chat <1s, load <=2s)
  ├── 20 Planned Test Cases (CP-01 to CP-20)
  └── Formal Risk Matrix (RIE-TEC, RIE-GES, RIE-SEG, RIE-HUM, RIE-LEG)

CHAPTER 10: Legal Framework, Financial ROI & Technical Conclusions
  ├── 3-Dimensional Licensing Strategy (SaaS EULA, OSS Permissive, Ley 603/2000)
  ├── Colombian Legal Compliance (Ley 1581/2012 Habeas Data, Ley 527/1999)
  ├── Capex $0 COP vs Opex Financial Simulator with ROI Calculator
  └── Engineering Conclusions & Future Evolution Roadmap
```

---

## 4. Creative Direction & Visual Language

- **Style:** Mercanex Living Cyber Engineering (Onyx background `#06090F`, Surface `#0B101B`, Card `#101726`, Neon Emerald `#00F59B`, Cyan `#38BDF8`, Dark Slate `#1E293B`).
- **Principles:** Pure **Impeccable** execution. Dark cyber aesthetic with high-precision engineering telemetry, glowing borders, scanline overlays, HUD brackets, technical monospace badges, and cinematic video backdrops (`cyber_server_scroll.mp4`, `digital_code_stream.mp4`).
- **Scroll Architecture:**
  - `CinematicHeroScroll`: Pinned video backdrop with depth zoom and live telemetry counters.
  - `ScrollytellingSection`: 2-column pinned scrollytelling with live video code stream and reactive telemetry terminal.
  - `VideoInfrastructureScroll`: Pinned server video backdrop with interactive multi-layer architecture depth inspection.
  - `HorizontalPipelineScroll`: GSAP ScrollTrigger pinned horizontal scroll (`pin: true, scrub: 1, ease: 'none'`) across the 6-stage transaction lifecycle.
- **Presentation HUD:** Sticky navigation HUD with TV Zoom modifier (`[A-]` `[A]` `[A+]`), Command Palette trigger (`Ctrl+K`), Glossary Drawer, Procedural Web Audio Synthesizer, and Presentation Fullscreen Mode.

---

## 5. Technology Stack Summary

| Layer | Selected Technology | ADR | Key Benefit |
| :--- | :--- | :--- | :--- |
| **Shell** | Vite 6 + React 18.3 + TypeScript | ADR-01 | Instant HMR, reactive state, static edge deployment. |
| **Styling** | Tailwind CSS v3.4 + PostCSS | ADR-02 | Purged bundle <18KB gzip, strict cyber design tokens. |
| **Animation** | GSAP 3.12+ (ScrollTrigger, useGSAP) | ADR-03 | Industry-standard 60fps GPU transform choreography & pinned scrolls. |
| **Scrolling** | Lenis Smooth Scroll | ADR-04 | Ultra-smooth momentum, synchronized directly with GSAP ticker. |
| **Videos** | HTML5 Video loops (MP4) | ADR-05 | Cinematic backdrops with CSS dark gradient overlays and scanlines. |
| **Scrubber** | HTML5 Canvas 2D Frame Sequencer | ADR-06 | 0ms seek latency, frame-perfect transaction scrubbing. |
| **Search** | MiniSearch / In-Memory Trie | ADR-07 | <2ms fuzzy search across 72 ERFs, diagrams, and glossary. |
| **Audio** | Web Audio API Procedural Synthesis | ADR-08 | 0 KB asset weight, zero network requests, muted by default. |

---

## 6. Implementation Phases Status

- **Phase 0:** Document Ingestion & AST Extraction *(Completed)*
- **Phase 1:** Autonomous Research & Discovery *(Completed)*
- **Phase 2:** Content Modeling & JSON Dataset Generation *(Completed)*
- **Phase 3:** Visual Design System & Impeccable Cyber Tokens *(Completed)*
- **Phase 4:** Risky Prototypes (Canvas Scrubber, Sound Synthesizer, Search Trie) *(Completed)*
- **Phase 5:** Core Shell, HUD & TV Zoom Controls *(Completed)*
- **Phase 6:** Global Search & Command Palette (`Ctrl+K`) *(Completed)*
- **Phase 7:** Hero Bento Grid & Cinematic Hero Scroll *(Completed)*
- **Phase 8:** Gateway Comparator & Architecture Evolution *(Completed)*
- **Phase 9:** Scrollytelling Narrative & Pinned Video Infrastructure *(Completed)*
- **Phase 10:** Horizontal Pipeline Scroll across 6 Transaction Stages *(Completed)*
- **Phase 11:** 72 ERF Requirements Explorer & Mockup Studio *(Completed)*
- **Phase 12:** 16 Official UML Diagrams & Fullscreen Lightbox *(Completed)*
- **Phase 13:** PostgreSQL 16 DER Interactive Explorer *(Completed)*
- **Phase 14:** Bidirectional Traceability Explorer *(Completed)*
- **Phase 15:** QA Verification Center, Test Cases & Risk Matrix *(Completed)*
- **Phase 16:** Legal & Financial Simulator (Capex vs Opex) *(Completed)*
- **Phase 17:** Full Dark Cyber Impeccable Theme Unification *(Completed)*
- **Phase 18:** Build Optimization & Production Bundling *(Verified: Code 0, ~3.15s)*
- **Phase 19:** Final Documentation & Deliverables *(Completed)*
