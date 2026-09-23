# MERCANEX — AUTONOMOUS DECISION LOG
**Project:** Mercanex — Living Technical Report  
**Format:** Chronological Engineering & Editorial Decisions  
**Governing Standard:** IEEE 830 / ISO/IEC 25010 / SENA Evaluation Criteria  

---

## Log Entry 01: Resolution of the 8 RF vs 17 RF Discrepancy
- **Date:** September 23, 2026
- **Decision:** Establish the core functional taxonomy as **8 Major Functional Modules (`RF-01` to `RF-08`)** containing **72 Detailed Specifications (`ERF-01.01` to `ERF-08.10`)**, and document the mention of "17 RF" in `LEAME_ENTREGABLES_MERCANEX.txt` as a historical editorial typo.
- **Why:** Full programmatic parsing of both `01_SRS_Mercanex_V3` and `02_Informe_Tecnico` verified that all 72 specifications are organized under 8 modules. Table T089 explicitly states *"RF-01 a RF-08 y sus 72 ERF"*.
- **Alternatives Considered:** Fabricating 9 artificial RF modules to reach 17. (Rejected: strictly violates Fundamental Principle 0).
- **Trade-off:** Requires a clear editorial footnote explaining the discrepancy to evaluators.
- **Source:** `01_SRS_Mercanex_V3_Especificacion_Requisitos.docx` (Table T089 & sections 5.3 to 5.10).

---

## Log Entry 02: Architecture Evolution & Gateway Comparator
- **Date:** September 23, 2026
- **Decision:** Implement an interactive **Architecture Evolution & Gateway Comparator** that explicitly presents the three architectural phases of the platform:
  1. *Phase 1 (Legacy V1.4):* Mercado Pago OAuth single-item purchase.
  2. *Phase 2 (V3.0 Production):* ePayco Pagos Divididos Split 1:N with multi-vendor unified cart and automatic fund dispersion ($0 Mercanex custody).
  3. *Phase 3 (Enterprise Scale-up):* Adapter Pattern (`MarketplaceSplitGatewayInterface`) anticipating Adyen for Platforms global processing.
- **Why:** The source documents contain rich technical analysis in Section 5.4.2 comparing ePayco with Adyen for Platforms. Presenting this evolution demonstrates exceptional engineering maturity.
- **Alternatives Considered:** Erasing all references to Mercado Pago or Adyen and showing only ePayco. (Rejected: loses the technical reasoning behind the evolution).
- **Trade-off:** Slightly higher component complexity; mitigated by clean tabbed interface.
- **Source:** `02_Informe_Tecnico_Mercanex_Diseno_y_Desarrollo.docx` (Sections 5.4.2 & 5.7.1).

---

## Log Entry 03: Strict Digital Scope & Anti-Piracy Boundary
- **Date:** September 23, 2026
- **Decision:** Enforce the explicit scope boundary across all UI visualizations:
  - **In-Scope:** Legitimate software licenses, videogame activation keys, official subscription gift cards, and balance reload codes.
  - **Out-of-Scope:** Physical hardware, shipping logistics, shared account credentials, cracked software, and appointment/service bookings (HU-10).
- **Why:** `CORRECCIONES_COMPLETAS_SRS_MERCANEX.md` (Section 0) and the SRS scope section explicitly state that Mercanex does not handle physical delivery or unauthorized accounts.
- **Alternatives Considered:** Showing a generic e-commerce cart with shipping address fields. (Rejected: completely violates project domain).
- **Trade-off:** None; guarantees absolute fidelity to source requirements.
- **Source:** `01_SRS_Mercanex_V3_Especificacion_Requisitos.docx` (Section 1.2 & HU-10).

---

## Log Entry 04: Authorship & Academic Lineage Alignment
- **Date:** September 23, 2026
- **Decision:** Permanently bind all credits, roles, hours, and institutional branding to:
  - **Centro de la Industria, la Empresa y los Servicios (CIES) — SENA Regional Huila**
  - **Ficha 3407799 — Instructor: José de Jesús Motta Vargas**
  - **Team:** Carlos Stiven Gutiérrez (Frontend/UX), Camilo Andrés Tamayo (Backend/Scrum), Kevin Fernando Martínez (Requirements/Doc), Samuel Santiago Ramírez (DB/Inventory), Santiago Ortiz Claros (QA/Security).
- **Why:** Discovered an older prototype README referencing "Regional Antioquia", which was a relic from an audit template or peer review. The official deliverable signed off in September 2026 is from Regional Huila.
- **Alternatives Considered:** Keeping both or ambiguous credits. (Rejected: academic integrity requires accurate team recognition).
- **Trade-off:** Overriding old boilerplate in README.md.
- **Source:** `LEAME_ENTREGABLES_MERCANEX.txt` and Cover Page of `02_Informe_Tecnico`.

---

## Log Entry 05: Presentation HUD & Auditorium Mode
- **Date:** September 23, 2026
- **Decision:** Equip the living report with a dedicated **Presenter HUD** featuring:
  - Instant typography scaling (`[A-]` `[A]` `[A+]`) up to +20% for visibility on auditorium projectors and TVs.
  - Quick-jump Chapter Rail with active scroll progress tracking.
  - Fullscreen Lightbox for all 72 Mockups and 16 Diagrams at native 300 DPI resolution.
  - Global Search (`Ctrl+K`) for fast evaluator questioning.
- **Why:** The project must be defended live during the SENA evaluation. Providing presenter-friendly controls ensures effortless navigation during jury questions.
- **Alternatives Considered:** Normal static header. (Rejected: fails to provide presentation utility).
- **Trade-off:** Requires sticky HUD management; carefully engineered with high z-index and backdrop blur.
- **Source:** Master Prompt directive 63 ("Presentation Mode").

---

## Log Entry 06: Zero-Byte Procedural Acoustic Design
- **Date:** September 23, 2026
- **Decision:** Build a procedural sound synthesizer using the native browser **Web Audio API** instead of loading external audio files.
- **Why:** External MP3/WAV files add 2–5 MB of unnecessary network load. Web Audio API synthesis requires <2 KB of JavaScript code, incurs 0 network requests, and generates warm, subtle micro-acoustic feedback.
- **Alternatives Considered:** Completely silent interface or third-party audio libraries (Howler.js). (Rejected: either misses sensory polish or inflates bundle).
- **Trade-off:** Must be strictly muted by default to satisfy WCAG and user preference guidelines.
- **Source:** ADR-08 and Master Prompt directive 32 ("Audio").
