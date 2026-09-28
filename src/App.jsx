import React, { useState, useEffect } from 'react';
import HeaderHUD from './components/HeaderHUD';
import CinematicHeroScroll from './components/CinematicHeroScroll';
import ScrollytellingSection from './components/ScrollytellingSection';
import VideoInfrastructureScroll from './components/VideoInfrastructureScroll';
import GatewayComparator from './components/GatewayComparator';
import HorizontalPipelineScroll from './components/HorizontalPipelineScroll';
import SplitPipelineCanvas from './components/SplitPipelineCanvas';
import InteractiveFrameScrubber from './components/InteractiveFrameScrubber';
import AesVaultSimulator from './components/AesVaultSimulator';
import RequirementsExplorer from './components/RequirementsExplorer';
import MockupsExplorer from './components/MockupsExplorer';
import DiagramsExplorer from './components/DiagramsExplorer';
import DatabaseDERSection from './components/DatabaseDERSection';
import TraceabilityExplorer from './components/TraceabilityExplorer';
import FinancialSimulator from './components/FinancialSimulator';
import LegalMatrixSection from './components/LegalMatrixSection';
import QualitySecuritySection from './components/QualitySecuritySection';
import FooterSection from './components/FooterSection';
import TermModal from './components/TermModal';
import DictionaryDrawer from './components/DictionaryDrawer';
import LightboxModal from './components/LightboxModal';
import CommandPalette from './components/CommandPalette';
import EvidenceExplorer from './components/EvidenceExplorer';
import { initSmoothScroll, scrollToAnchor } from './lib/smoothScroll';

export default function App() {
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [selectedERFForModal, setSelectedERFForModal] = useState(null);
  const [isDictionaryOpen, setIsDictionaryOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const [lightboxData, setLightboxData] = useState({ isOpen: false, src: '', title: '', desc: '' });

  // Initialize Lenis + GSAP ScrollTrigger
  useEffect(() => {
    initSmoothScroll();
  }, []);

  const handleOpenLightbox = (src, title, desc) => {
    setLightboxData({ isOpen: true, src, title, desc });
  };

  const handleCloseLightbox = () => {
    setLightboxData(prev => ({ ...prev, isOpen: false }));
  };

  const handleTogglePresentation = () => {
    setIsPresentationMode(prev => !prev);
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleNavigateSection = (sectionId) => {
    const selector = sectionId.startsWith('#') ? sectionId : `#${sectionId}`;
    scrollToAnchor(selector);
  };

  return (
    <div className={`min-h-screen bg-white text-slate-800 flex flex-col antialiased selection:bg-emerald-500/30 selection:text-emerald-800 ${isPresentationMode ? 'presentation-mode' : ''}`}>
      {/* HUD Header Sticky con Zoom TV, Command Palette, Audio Synthesizer y Modo Presentación */}
      <HeaderHUD
        onOpenDictionary={() => setIsDictionaryOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        isPresentationMode={isPresentationMode}
        onTogglePresentation={handleTogglePresentation}
      />

      {/* Contenedor Principal Fijo Desktop (Estilo Impeccable Dark Cyber) */}
      <main className="flex-1 w-full max-w-[1520px] mx-auto px-4 md:px-6 py-6 space-y-16">

        {/* HERO CINEMÁTICO: Video Scroll con Profundidad GSAP & Telemetría SENA CIES Huila */}
        <CinematicHeroScroll onSelectTerm={setSelectedTerm} />

        {/* CAPÍTULOS 01 & 02: Scrollytelling Pinned con Video Terminal & Transición Causal */}
        <ScrollytellingSection onSelectTerm={setSelectedTerm} />

        {/* CAPÍTULO 03.1: Video Background Scroll & Arquitectura en 5 Capas */}
        <VideoInfrastructureScroll onSelectTerm={setSelectedTerm} />

        {/* CAPÍTULO 03.2: Comparador ePayco Split vs Adyen & Patrón Adapter */}
        <GatewayComparator onSelectTerm={setSelectedTerm} />

        {/* CAPÍTULO 04.1: Horizontal Pinned Scroll — Ciclo Transaccional de 6 Etapas */}
        <HorizontalPipelineScroll />

        {/* CAPÍTULO 04.2: Motion Graphics Transaccional, Frame Scrubber & Bóveda AES-256 */}
        <div id="interactive-motion" className="space-y-8 pt-4">
          <SplitPipelineCanvas />
          <InteractiveFrameScrubber />
          <AesVaultSimulator />
        </div>

        {/* CAPÍTULO 05: Explorador de Requisitos Funcionales (72 ERFs con Modal & Simulador de Flujos) */}
        <RequirementsExplorer
          onOpenLightbox={handleOpenLightbox}
          onSelectTerm={setSelectedTerm}
          activeERFProp={selectedERFForModal}
          onCloseActiveERF={() => setSelectedERFForModal(null)}
        />

        {/* CAPÍTULO 06: Catálogo Completo de Mockups UI/UX (72 Pantallas) */}
        <MockupsExplorer onOpenLightbox={handleOpenLightbox} />

        {/* CAPÍTULO 07: Diagramas Oficiales de Modelado UML (16 Diagramas a 300 DPI) */}
        <DiagramsExplorer onOpenLightbox={handleOpenLightbox} />

        {/* CAPÍTULO 08: Modelo de Base de Datos Relacional PostgreSQL 16 (15 Tablas DER) */}
        <DatabaseDERSection
          onSelectTerm={setSelectedTerm}
          onOpenLightbox={handleOpenLightbox}
        />

        {/* CAPÍTULO 09: Matriz de Trazabilidad End-to-End & Linaje Causal */}
        <TraceabilityExplorer onOpenLightbox={handleOpenLightbox} />

        {/* CAPÍTULO 10: Estudio Financiero, Costos (Capex vs Opex) y Calculadora ROI */}
        <FinancialSimulator onSelectTerm={setSelectedTerm} />

        {/* CAPÍTULO 11: Marco Legal, Habeas Data Ley 1581 y Licenciamiento */}
        <LegalMatrixSection onSelectTerm={setSelectedTerm} />

        {/* CAPÍTULO 12: Aseguramiento de Calidad (QA), SLAs y Ciberseguridad */}
        <QualitySecuritySection onSelectTerm={setSelectedTerm} />

        <EvidenceExplorer />

      </main>

      {/* Footer Institucional con Créditos SENA CIES Regional Huila */}
      <FooterSection />

      {/* Paleta de Comandos Global (Ctrl + K) */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectERF={(erf) => {
          setSelectedERFForModal(erf);
          handleNavigateSection('requirements-section');
        }}
        onOpenLightbox={handleOpenLightbox}
        onSelectTerm={(term) => {
          setSelectedTerm(term);
        }}
        onNavigateSection={handleNavigateSection}
      />

      {/* Modal de Término Técnico (Click Inline) */}
      <TermModal
        term={selectedTerm}
        onClose={() => setSelectedTerm(null)}
      />

      {/* Panel Lateral Deslizable del Diccionario Completo (Drawer) */}
      <DictionaryDrawer
        isOpen={isDictionaryOpen}
        onClose={() => setIsDictionaryOpen(false)}
        onSelectTerm={(term) => {
          setIsDictionaryOpen(false);
          setSelectedTerm(term);
        }}
      />

      {/* Visor Fullscreen de Imágenes, Mockups y Diagramas a 300 DPI (Lightbox) */}
      <LightboxModal
        isOpen={lightboxData.isOpen}
        src={lightboxData.src}
        title={lightboxData.title}
        desc={lightboxData.desc}
        onClose={handleCloseLightbox}
      />
    </div>
  );
}
