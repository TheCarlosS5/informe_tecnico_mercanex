# MERCANEX — MEDIA RESEARCH & ASSET MANIFEST
**Project:** Mercanex — Living Technical Report  
**Policy:** Strict Ethical Licensing • Zero Copyright Gambling • 100% Attribution  

---

## 1. Compliance & Licensing Policy

In strict accordance with Master Prompt Directive 60:
> *"Do not assume 'it's on the internet, therefore we can use it.' If licensing is uncertain: exclude it."*

Every media element within the Mercanex Living Technical Report belongs to one of three verified categories:
1. **Primary Project Artifacts (Proprietary / SENA Team):** Created directly by the Mercanex ADSO apprentice team (Diagrams in draw.io, Mockups in Penpot/Figma).
2. **Public Domain / Creative Commons (CC0 / CC-BY):** Verified open media with explicit commercial and educational reuse rights.
3. **Procedural / Self-Generated Assets:** Canvas-rendered vector graphs, procedural audio via Web Audio API, and SVG iconography.

---

## 2. Primary Project Asset Inventory

### A. Official Technical Diagrams (300 DPI PNG)
Created by the Mercanex engineering team; located in `public/assets/diagrams/`:

| Asset ID | File Name | Technical Topic | Linked Requirements |
| :--- | :--- | :--- | :--- |
| `D01` | `D01_Registro_y_Verificacion.png` | Registration & Email Verification (Sequence) | ERF-01.01, ERF-01.02 |
| `D02` | `D02_Inicio_Sesion_y_2FA.png` | Login & 2FA Two-Factor Authentication (Activity) | ERF-01.03, ERF-01.06 |
| `D03` | `D03_Habilitacion_Vendedor_y_Tienda.png` | Seller Onboarding & Store Creation (Activity) | ERF-02.02, ERF-02.03 |
| `D04` | `D04_Secuencia_ePayco_Split_1_a_N.png` | ePayco Pagos Divididos Split 1:N (Sequence) | ERF-02.05, ERF-05.04 |
| `D05` | `D05_Creacion_y_Aprobacion_Publicacion.png` | Listing Creation & Admin Review (Activity) | ERF-03.01, ERF-03.03 |
| `D06` | `D06_Ciclo_Inventario_Digital.png` | Digital Key State Machine (States) | ERF-03.05 to ERF-03.08 |
| `D07` | `D07_Navegacion_del_Catalogo.png` | Catalog Navigation & Multi-Filter (Activity) | RF-04 / ERF-04.01–04.04 |
| `D08` | `D08_Carrito_Multivendedor_y_Checkout.png` | Multi-Vendor Cart & Unified Checkout (Activity) | ERF-05.01 to ERF-05.06 |
| `D09` | `D09_Entrega_Digital_y_Recuperacion_Fallo.png` | Automatic Delivery & Exception Handling (Activity) | ERF-05.07, ERF-05.08 |
| `D10` | `D10_WebSockets_Mensajeria_Tiempo_Real.png` | Real-time WebSocket Messaging (Sequence) | RF-06 / ERF-06.01–06.05 |
| `D11` | `D11_Distribucion_de_Notificaciones.png` | Internal & Email Notification Pipeline (Activity) | ERF-06.08, ERF-06.09 |
| `D12` | `D12_Ciclo_Completo_de_un_Reclamo.png` | Dispute & 48h Resolution Lifecycle (Activity) | RF-07 / ERF-07.04–07.07 |
| `D13_DER` | `D13_DER_Modelo_Entidad_Relacion_PostgreSQL16.png` | Relational DER Schema in PostgreSQL 16 | Section 9 / 15 Tables |
| `D13_REC` | `D13_Reincidencias_y_Medidas_Revision.png` | Recidivism Detection & Penalties (Activity) | ERF-07.08, ERF-07.09 |
| `D14` | `D14_Revision_y_Aprobacion_Vendedor.png` | Administrative Seller Auditing (Activity) | ERF-08.02, ERF-08.03 |
| `D15` | `D15_Moderacion_Administrativa.png` | General Platform Moderation (Activity) | RF-08 / ERF-08.01–08.10 |

### B. Official UI/UX Mockups (72 Screens)
Located in `public/assets/mockups/` (`M01.png` to `M72.png`):
- All 72 mockups strictly map 1:1 to their corresponding ERF specifications.
- Resolution: High-definition 1300x803+ px, clean editorial frame styling.

---

## 3. Video & Scrollytelling Media Pipeline

For the cinematic scrollytelling sequences (system overview, payment split choreography, digital vault decryption), we establish an automated FFmpeg transcoding and frame extraction pipeline:

### Automated Script Specification (`scripts/process-media.py` / `scripts/process-media.ts`)
```bash
# 1. Generate WebM video (VP9 / no audio / muted background)
ffmpeg -i input.mp4 -c:v libvpx-vp9 -b:v 0 -crf 30 -an -vf "scale=1280:-2" output.webm

# 2. Extract WebP / AVIF frame sequence for 60fps Canvas Scrubbing
ffmpeg -i input.mp4 -vf "fps=24,scale=1280:720:force_original_aspect_ratio=decrease" -q:v 80 frames/frame_%04d.webp

# 3. Extract High-Res Poster
ffmpeg -ss 00:00:01 -i input.mp4 -vframes 1 -q:v 2 poster.webp
```

### Verified Permissive Media Sources for Background Ambiance
- **Pexels Video / Mixkit Free Commercial License:**
  - Topic: Abstract server data racks, high-speed fiber optics, digital code streams.
  - License: Free for commercial and non-commercial use; no attribution required (though full attribution is maintained in the report manifest).
- **Procedural Canvas Generators:**
  - Used for the **ePayco Split 1:N Flow** and **AES-256 Vault Sandbox**: 100% vector-drawn in real-time on HTML5 `<canvas>`, generating 0 byte media weight and infinite dynamic resolution.
