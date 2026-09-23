# Mercanex V3.0 — Informe Técnico Vivo (Node.js & Vercel)

> Aplicación web interactiva de ingeniería de software para la sustentación del proyecto formativo **Mercanex Marketplace de Claves Digitales** (SENA ADSO Ficha 2977494).

Construida bajo el estándar de diseño **Taste Skill (Light Theme)** con una estética blanca editorial, contrastes nítidos y acentos verde esmeralda corporativo de Mercanex.

---

## 🚀 Despliegue Inmediato en Vercel

Este proyecto cuenta con configuración nativa para **Vercel** (`vercel.json` y `package.json`).

### Opción A: Despliegue con Vercel CLI
Si tienes la CLI de Vercel instalada:
```bash
cd mercanex-live-report
vercel
```

### Opción B: Despliegue vía GitHub
1. Sube este directorio a un repositorio en GitHub.
2. Ingresa a [vercel.com](https://vercel.com) y pulsa **Add New Project**.
3. Selecciona el repositorio de GitHub.
4. Vercel detectará automáticamente:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Haz clic en **Deploy** y tu sitio estará en línea en segundos con dominio `.vercel.app`.

---

## 💻 Ejecución Local

Para levantar el servidor de desarrollo local:
```bash
# 1. Instalar dependencias (ya instaladas localmente)
npm install

# 2. Iniciar servidor local
npm run dev
```
Abre tu navegador en: [http://localhost:3000](http://localhost:3000)

Para compilar la versión de producción:
```bash
npm run build
npm run preview
```

---

## ✨ Módulos e Interactividad de Alto Nivel

1. **Glosario Técnico Inteligente 2.0 (31 Conceptos):**
   - Términos clicables inline en todo el documento.
   - Modal con definición de ingeniería, rol en Mercanex y analogía cotidiana.
   - Panel lateral deslizable (Drawer) con buscador en vivo y síntesis de voz (Web Speech API).
2. **Motion Graphics Transaccional en Vivo:**
   - Visualizador en HTML5 Canvas del flujo de pagos divididos ePayco Split 1:N con dispersión automática y $0 comisión de Mercanex.
3. **Motion Scrubber (Paso a Paso):**
   - Descomposición fotograma a fotograma del ciclo de vida transaccional con logs de backend en tiempo real.
4. **Simulador Criptográfico AES-256-CBC:**
   - Sandbox interactivo donde el usuario ingresa una clave, ve el cifrado con vector IV y prueba el revelado efímero en memoria RAM.
5. **Catálogo Interactivo de 72 Mockups:**
   - Carrusel horizontal con 8 categorías funcionales y visor modal a pantalla completa (Lightbox).
6. **16 Diagramas Oficiales UML / DER:**
   - Diagramas a 300 DPI ampliables en pantalla completa.
7. **Simulador Financiero (ROI & Break-Even):**
   - Controles deslizantes en tiempo real para simular ventas, deducción de ePayco, $0 comisión Mercanex y margen operativo.
8. **Modo TV / Proyector:**
   - Controles `[A-]` `[A]` `[A+]` en la cabecera para aumentar la tipografía hasta un +20% para visualización a distancia en televisores.

---

## 👥 Equipo de Autores (Aprendices SENA ADSO)

- **Carlos Andres Morales Rengifo**
- **Sergio Andres Cuervo Ramos**
- **Santiago Garcia Ramos**
- **David Alejandro Rodriguez Osorio**
- **Santiago Henao Garcia**

*Centro de Servicios y Gestión Empresarial • Regional Antioquia • 2026*
