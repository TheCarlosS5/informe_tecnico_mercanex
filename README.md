# ⚡ MERCANEX V3.0 — LIVING TECHNICAL REPORT
### Interactive Software Engineering Report & Architectural Experience

[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![GSAP](https://img.shields.io/badge/GSAP-3.15-0AE448?logo=greensock&logoColor=white)](https://greensock.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary%20SENA-00F59B)](#)

> Aplicación web interactiva de ingeniería de software para la sustentación y auditoría del proyecto formativo **MERCANEX — Marketplace de Bienes y Licencias Digitales** (SENA Regional Huila • Centro de la Industria, la Empresa y los Servicios CIES • Ficha ADSO 3407799).

Presentación clara con fondo blanco, superficies suaves y acentos verdes. Conserva las interacciones de **GSAP + ScrollTrigger** y **Lenis**.

Las evidencias vigentes se toman de la [carpeta E5 de Google Drive](https://drive.google.com/drive/folders/1r_8w99sg2UWE0Zu8jeC2iwInff6m5xoo). `src/data/driveManifest.json` conserva los nombres, la jerarquía y los enlaces individuales; `EquipoAnterior` está excluida. Las imágenes de 72 mockups y 16 diagramas del informe técnico se cargan desde Drive. La interfaz requiere que esos archivos conserven el permiso «Cualquiera con el enlace → Lector».

---

## 🚀 Despliegue en Vercel (Paso a Paso)

Este repositorio está optimizado para despliegue sin configuración adicional en **Vercel**.

### Opción 1: Despliegue Automático vía GitHub (Recomendado)
1. Ve a tu panel en [vercel.com](https://vercel.com) e inicia sesión con tu cuenta de GitHub.
2. Pulsa el botón **"Add New..."** y selecciona **"Project"**.
3. En la lista de repositorios, localiza y haz clic en **Import** junto a `TheCarlosS5/informe_tecnico_mercanex`.
4. Configura el proyecto como Vite:
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. Haz clic en el botón azul **"Deploy"**.
6. Revisa el resultado de la compilación y la URL de Vercel.

### Opción 2: Despliegue Directo con Vercel CLI
```bash
# 1. Instalar Vercel CLI globalmente
npm i -g vercel

# 2. Iniciar sesión en tu cuenta
vercel login

# 3. Desplegar en modo producción
vercel --prod
```

---

## 💻 Ejecución y Desarrollo Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/TheCarlosS5/informe_tecnico_mercanex.git
cd informe_tecnico_mercanex

# 2. Instalar dependencias
npm install

# 3. Levantar servidor local Vite con HMR
npm run dev
```
Abre la URL local que indique Vite (por defecto `http://localhost:5173`).

```bash
# Compilar build optimizado de producción
npm run build

# Previsualizar el build generado localmente
npm run preview
```

---

## 🏛️ Arquitectura del Informe y Módulos Interactivos

El aplicativo presenta los módulos del informe y enlaza las evidencias originales en Drive:

| Capítulo | Componente | Descripción e Interactividad |
| :--- | :--- | :--- |
| **HUD & Navegación** | `HeaderHUD.jsx` | Barra sticky con telemetría de scroll, atajo `Ctrl+K`, zoom de lectura, conmutador de audio procedural y salto offset a secciones. |
| **Hero Cinemático** | `CinematicHeroScroll.jsx` | Video scroll de alta resolución, contadores Bento KPI reactivos e interactivos que guían a cada capítulo. |
| **Cap. 01 & 02** | `ScrollytellingSection.jsx` | Scrollytelling Pinned con video terminal, diagnóstico de comisiones abusivas y delimitación estricta de bienes digitales. |
| **Cap. 03.1** | `VideoInfrastructureScroll.jsx` | Background video con inspector interactivo de las 5 capas de hardware/software (Nginx, Laravel, PostgreSQL, Redis, ePayco). |
| **Cap. 03.2** | `GatewayComparator.jsx` | Comparador interactivo por pestañas: ePayco Split 1:N (Fase Colombia) vs Adyen for Platforms (Fase Expansión) y código del **Patrón Adapter POO**. |
| **Cap. 04.1** | `HorizontalPipelineScroll.jsx` | Desplazamiento horizontal fijado (Pinned) de 6 etapas del ciclo transaccional con payload JSON de telemetría y navegación por etapas. |
| **Cap. 04.2** | `SplitPipelineCanvas.jsx` & `AesVaultSimulator.jsx` | Simulación transaccional en HTML5 Canvas con partículas reactivas, scrubber fotograma a fotograma y simulador de cifrado AES-256 en vivo con auto-bloqueo en RAM. |
| **Cap. 05** | `RequirementsExplorer.jsx` | Explorador interactivo de los **72 Requisitos Funcionales (ERFs)** con modal canónico de 14 campos técnicos y simulador de flujos por pasos. |
| **Cap. 06** | `MockupsExplorer.jsx` | Catálogo de **72 Pantallas UI/UX** organizadas por categorías con buscador instantáneo y visor Lightbox HD a 300 DPI. |
| **Cap. 07** | `DiagramsExplorer.jsx` | **16 Diagramas Oficiales UML** (secuencia, componentes, actividades, estados y DER) en resolución nativa de 300 DPI. |
| **Cap. 08** | `DatabaseDERSection.jsx` | Esquema relacional de **15 tablas en 3FN** (PostgreSQL 16) con visor interactivo de atributos, claves foráneas y cerrojos pesimistas. |
| **Cap. 09** | `TraceabilityExplorer.jsx` | Matriz de trazabilidad y linaje causal cruzando Historias de Usuario, ERFs, Mockups, Diagramas UML, Tablas DER y Pruebas QA. |
| **Cap. 10** | `FinancialSimulator.jsx` | Evaluación Capex vs Opex (alta autosuficiencia) y simulador interactivo de punto de equilibrio con deslizadores y presets de escenario (Semilla, Crecimiento, Escala). |
| **Cap. 11** | `LegalMatrixSection.jsx` | Gobernanza jurídica colombiana: Ley 1581 (Habeas Data), Ley 527 (Comercio Electrónico), Ley 1480 (Consumidor) y Ley 603 (Antipiratería). |
| **Cap. 12** | `QualitySecuritySection.jsx` | Ciberseguridad (Argon2id, 2FA TOTP, HMAC, Idempotencia), SLAs de rendimiento Apache JMeter y **Plan Oficial de 20 Casos de Prueba (CP-01 a CP-20)**. |
| **Glosario & Paleta** | `DictionaryDrawer.jsx` & `CommandPalette.jsx` | Glosario de 31 conceptos clave con síntesis de voz nativa y paleta de comandos global tipo Spotlight (`Ctrl + K`). |
| **Evidencias / Documentación** | `EvidenceExplorer.jsx` | Árbol navegable y buscable de carpetas y archivos, con tipo y enlace individual de Drive. |

---

## 🔊 Sintetizador Acústico Procedural (Zero-Byte)

El sistema incorpora un sintetizador de audio procedural basado exclusivamente en la **Web Audio API** del navegador:
- **0 KB de descarga en red** (cero archivos `.mp3` o `.wav` externos).
- Silenciado por defecto conforme al criterio de accesibilidad y WCAG.
- Generación matemática de micro-tonos para clics, confirmaciones y aperturas de modales.

---

## 👥 Equipo de Desarrollo e Información Académica

- **Institución:** Servicio Nacional de Aprendizaje (SENA)
- **Centro:** Centro de la Industria, la Empresa y los Servicios (CIES) — Regional Huila
- **Programa:** Tecnología en Análisis y Desarrollo de Software (ADSO)
- **Ficha:** 3407799
- **Equipo de Aprendices:**
  - Carlos Stiven Gutiérrez
  - Camilo Andrés Tamayo
  - Kevin Fernando Martínez
  - Samuel Santiago Ramírez
  - Santiago Ortiz Claros
- **Instructor Asesor:** José de Jesús Motta Vargas
