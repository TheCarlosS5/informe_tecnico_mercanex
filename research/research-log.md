# MERCANEX — RESEARCH LOG & SYSTEMIC DISCOVERY
**Project:** Mercanex — Living Technical Report  
**Institution:** Centro de la Industria, la Empresa y los Servicios (CIES) — SENA Regional Huila  
**Program & Cohort:** Análisis y Desarrollo de Software (ADSO) — Ficha 3407799  
**Date of Research:** September 23, 2026  
**Status:** Phase 0 (Ingestion) & Phase 1 (Research) Completed  

---

## 1. Executive Summary & Objective

The purpose of this research log is to document the autonomous discovery phase for the **Mercanex Living Technical Report**. This report is an explorable, cinematic, interactive, and mathematically rigorous web adaptation of the official Mercanex V3.0 engineering deliverable package.

Following the core directive:
> *"The existing Mercanex technical report is the SOURCE OF TRUTH. You must inspect the entire report before deciding the final structure. Do not silently invent functionality."*

We conducted an exhaustive audit of:
- `01_SRS_Mercanex_V3_Especificacion_Requisitos.docx` (15.74 MB, 3,126 paragraphs, 125 structured tables).
- `02_Informe_Tecnico_Mercanex_Diseno_y_Desarrollo.docx` (16.17 MB, 3,765 paragraphs, 106 structured tables).
- `05_Diagramas_Oficiales/` (16 official technical diagrams D01–D15 + DER in PostgreSQL 16 at 300 DPI).
- `06_Mockups_UI_UX_72_Pantallas/` (72 official UI/UX screens M01–M72).
- `CORRECCIONES_COMPLETAS_SRS_MERCANEX.md` (152 KB baseline alignment document).
- `Mercanex_Cambios_Modelo_Comercial_SaaS.md` (Transition log from V1.4 to V3.0).
- `04_Auditoria_Externa_Mercanex_v1_4_Equipo_Par.pdf` (External peer audit report).

---

## 2. Ingestion & Semantic Inventory Findings

Through programmatic parsing of the XML AST of the official deliverables, we extracted the definitive, non-assumed data inventory:

| Dimension | Exact Metric | Source / Identification |
| :--- | :--- | :--- |
| **Functional Modules (RF)** | 8 Modules | RF-01 to RF-08 (Auth, User/Store, Listings/Stock, Catalog/Search, Checkout/Delivery, Chat/Notifications, Reviews/Disputes, Admin/Audit). |
| **Requirement Specs (ERF)** | 72 Specifications | ERF-01.01 to ERF-08.10 (Exactly 72 structured tables with 14 canonical fields each). |
| **Mockups (UI/UX)** | 72 Screens | M01.png to M72.png (Strict 1:1 mapping with each ERF). |
| **Technical Diagrams** | 16 Diagrams | D01 to D15 + D13_DER (UML Sequence, Activity, State Machine, and Relational DER). |
| **User Stories (HU)** | 10 Stories | HU-01 to HU-09 active; HU-10 ("Gestión de citas y servicios") strictly excluded as Out-of-Scope. |
| **Non-Functional Categories** | 6 Categories (18 specs) | RNF-01 (Usability) to RNF-06 (Files/Content), including RNF-03.06 (AES-256 key protection). |
| **Business Rules (RN)** | 43 Concrete Rules | Embedded within ERF specs (e.g. 15-min cart reservation, non-reversible inventory states). |
| **Relational Database** | 15 Physical Tables | PostgreSQL 16 schema (`usuarios`, `tiendas`, `publicaciones`, `inventario_digital`, `pedidos`, `pagos`, `entregas`, etc.). |
| **Logical Entities** | 12 Entities | Documented in Section 9 of the Technical Report. |
| **Planned Test Cases (CP)** | 20 Test Cases | CP-01 to CP-20 across unit, integration, stress, and security vectors. |
| **Formal Risk Matrix (RIE)** | 11 Managed Risks | RIE-TEC-01 to RIE-TEC-04, RIE-GES, RIE-SEG, RIE-HUM, RIE-LEG, RIE-INF. |
| **Financial Capex vs Opex** | Capex $0 COP / Opex ~$257k COP | 400 person-hours valued at $20,900,000 COP direct labor. |
| **Legal Architecture** | 3 Licensing Dimensions | SaaS EULA, Permissive OSS (MIT/PostgreSQL), Colombian Laws (1581/2012, 527/1999, 1480/2011, 603/2000). |

---

## 3. Critical Contradictions & Discrepancy Audit

As instructed, we identified, documented, and classified discrepancies rather than silently smoothing them over:

### A. Editorial Typo in `LEAME_ENTREGABLES_MERCANEX.txt`
- **Conflict:** The file asserts *"Contiene los 17 Requisitos Funcionales (RF-01 a RF-17)..."*
- **Evidence:** Analysis of both `01_SRS` and `02_Informe_Tecnico` proves unequivocally that there are **8 functional modules** (`RF-01` through `RF-08`), which contain **72 specifications** (`ERF-01.01` to `ERF-08.10`).
- **Classification:** Editorial typographical error in the readme document. The actual technical core is RF-01 to RF-08.
- **Resolution in Live Report:** Clearly present the 8 major functional modules (RF-01 to RF-08) while highlighting the 72 ERFs and explaining the historical note.

### B. Gateway Evolution (Mercado Pago OAuth vs ePayco Pagos Divididos Split 1:N)
- **Conflict:** Older V1.4 documents (and older diagram captions) referenced Mercado Pago OAuth direct checkout with single seller operations. V3.0 deliverables explicitly introduce **ePayco Pagos Divididos Split 1:N** with multi-vendor unified cart, and an architectural Adapter pattern (`MarketplaceSplitGatewayInterface`) anticipating Adyen for Platforms.
- **Evidence:** Section 5.4.2 D04 in the Technical Report was formally renamed to *"D04. Integración con ePayco Pagos Divididos (Split 1:N)"*. Diagram `D04_Secuencia_ePayco_Split_1_a_N.png` and `D08_Carrito_Multivendedor_y_Checkout.png` reflect this reality.
- **Classification:** Evolutionary architectural transition.
- **Resolution in Live Report:** The living report must document this exact evolution. We preserve both contexts through an interactive "Architecture Evolution & Gateway Comparator" (ePayco Split vs Adyen for Platforms vs Mercado Pago).

### C. Team & Authorship Metadata Discrepancy
- **Conflict:** An early template in `mercanex-live-report/README.md` referenced apprentices from "Regional Antioquia".
- **Evidence:** The authoritative cover page, sign-off sheet, and `LEAME_ENTREGABLES_MERCANEX.txt` of the official September 2026 delivery specify:
  - **SENA Regional Huila — Centro de la Industria, la Empresa y los Servicios (CIES)**
  - **Ficha 3407799 — Instructor: José de Jesús Motta Vargas**
  - **Team (5 apprentices):** Carlos Stiven Gutiérrez Ramírez (Frontend/UX), Camilo Andrés Tamayo Durán (Backend/Scrum), Kevin Fernando Martínez Pérez (Requirements/Doc), Samuel Santiago Ramírez Fierro (DB/Stock), Santiago Ortiz Claros (QA/Security).
- **Classification:** Stale boilerplate metadata in early prototype.
- **Resolution in Live Report:** Bind 100% of credits, roles, and hour allocations to the official Regional Huila team.

---

## 4. Novel Solution Space Discoveries & Benchmarking

We conducted deep autonomous research into techniques that elevate this technical report beyond conventional web documentation:

### Discovery 1: Graphology + WebGL Sigma.js vs Reagraph vs React Flow for Traceability
- **The Challenge:** Mercanex requires complete bidirectional traceability:
  `User Story (10) ➔ RF (8) ➔ ERF (72) ➔ Mockup (72) ➔ Diagram (16) ➔ Entity (15) ➔ Test Case (20)`. That is over 210 nodes and 450 directed edges.
- **Comparison:**
  - *React Flow:* Superb for node-level DOM forms, but 200+ DOM nodes with continuous zoom/pan introduce layout thrashing and high frame-time spikes on mobile/laptop GPUs.
  - *D3 Force + Canvas 2D:* Lightweight and fast, but requires custom hit-testing and manual camera matrices.
  - *Reagraph (WebGL / Three.js) & Graphology:* Hardware-accelerated WebGL rendering capable of rendering thousands of edges at 60 FPS, with instant node clustering, neighborhood sub-graph isolation, and bidirectional edge highlighting.
- **Decision:** Implement a dual-mode Traceability Explorer:
  1. **Primary Matrix Mode (Editorial / Tabular):** Instant lookup by ERF/RF for fast grading and reading.
  2. **Interactive Spatial Graph Mode:** Accelerated canvas/WebGL visualization that highlights the exact causal lineage when clicking any node (e.g. selecting `CP-12` highlights `ERF-05.07` ➔ `M39` ➔ `D09` ➔ `inventario_digital` ➔ `entregas`).

### Discovery 2: Frame-Accurate Scroll Scrubbing (Canvas Frame Sequencer vs WebCodecs)
- **The Challenge:** Providing cinematic scrollytelling of the transactional lifecycle without video stutter or heavy bandwidth.
- **Research Findings:**
  - `HTMLVideoElement.currentTime`: Janky on scrub; browsers prioritize streaming buffers, not random seeking.
  - `WebCodecs API`: Hardware-accelerated, frame-perfect, but requires complex WASM demuxing (MP4Box) and has incomplete mobile Safari support.
  - `Canvas 2D Frame Sequencer (AVIF / WebP)`: The industry standard used by Apple and Awwwards sites. Pre-extracting 60–90 optimized WebP/AVIF keyframes (scaled to 1280x720 at ~25KB each, totaling <1.8MB) drawn to a high-DPI `<canvas>` synced with GSAP ScrollTrigger yields silky smooth 60fps scrubbing with 0ms seek latency.
- **Decision:** Use an optimized Canvas 2D frame buffer with progressive loading and dynamic poster fallback.

### Discovery 3: Zero-Byte Micro-Audio Synthesizer (Web Audio API)
- **The Challenge:** Adding tasteful, subtle sound cues for chapter transitions, key revelation, and HUD interactions without loading megabytes of MP3/WAV assets.
- **Solution:** A custom, procedural Web Audio API sound generator (<2KB code, 0 HTTP asset requests).
  - Uses soft sine/triangle oscillators through an exponential decay biquad low-pass filter (220 Hz to 440 Hz) for soft "chime" or "tick" feedback.
  - Muted by default with clear HUD toggle; strictly respects user audio preferences and state.

### Discovery 4: Interactive Requirement Flow Player (Finite State Machine)
- **The Challenge:** ERFs contain detailed textual flows (e.g. 9-step checkout, 48-hour dispute cycle). Reading text can be dry.
- **Solution:** An interactive, timeline-driven State Machine Flow Player:
  - Visual swimlanes representing actors: `Actor (Comprador/Vendedor)` ➔ `Mercanex Application` ➔ `External Gateway (ePayco)` ➔ `Database / Storage`.
  - Step-by-step playback with Play, Pause, Step Forward, and Reset controls.
  - Live simulation of happy paths and exception branches (e.g. `Webhook Timeout`, `Stock Exhaustion`, `AES Decryption Failure`).

### Discovery 5: Device Capability Tiers & Progressive Degradation
- **Tier 1 (High Performance / Desktop GPU):** Full WebGL spatial graph, Canvas frame scrubber, GSAP smooth scrub, dynamic shadows, and particle flows.
- **Tier 2 (Medium / Tablets / Mobile):** Hardware-accelerated CSS transforms, static SVG flow diagrams, stepped frame scrub, responsive cards.
- **Tier 3 (Low / Reduced Motion / Accessibility):** Zero continuous scroll animations, pure editorial layout, high-contrast text, instant jump navigation, print-ready sheets.

---

## 5. Next Steps
Move to `research/inspiration.md` and complete the full planning artifacts (`master-plan.md`, `technology-decisions.md`, `design-system.md`, `decision-log.md`, `media-sources.md`).
