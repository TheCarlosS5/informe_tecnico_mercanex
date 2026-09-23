import React, { useState, useEffect } from 'react';
import HeaderHUD from './components/HeaderHUD';
import HeroSection from './components/HeroSection';
import ChapterOneTwo from './components/ChapterOneTwo';
import GatewayComparator from './components/GatewayComparator';
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
import { initSmoothScroll } from './lib/smoothScroll';

export default function App() {
  const [selectedTerm, setSelectedTerm] = useState(null);
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
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col antialiased ${isPresentationMode ? 'presentation-mode' : ''}`}>
      {/* HUD Header Sticky con Zoom TV, Command Palette, Audio Synthesizer y Modo Presentación */}
      <HeaderHUD 
        onOpenDictionary={() => setIsDictionaryOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        isPresentationMode={isPresentationMode}
        onTogglePresentation={handleTogglePresentation}
      />

      {/* Contenedor Principal Fijo Desktop (Estilo Editorial Blanco Elegante M-LES) */}
      <main className="flex-1 w-full max-w-[1520px] mx-auto px-4 md:px-6 py-8 space-y-20">
        
        {/* Portada & Bento Grid de Métricas SENA CIES */}
        <HeroSection
          onSelectTerm={setSelectedTerm}
          onOpenLightbox={handleOpenLightbox}
        />

        {/* Capítulo 01 y 02: Problema, Justificación, Objetivos y Alcance Estricto */}
        <ChapterOneTwo onSelectTerm={setSelectedTerm} />

        {/* Capítulo 03: Arquitectura y Comparador ePayco Split vs Adyen vs Mercado Pago */}
        <GatewayComparator onSelectTerm={setSelectedTerm} />

        {/* Capítulo 04: Scrollytelling Transaccional, Motion Scrubber & Bóveda AES-256 */}
        <div id="interactive-motion" className="space-y-8 pt-4">
          <SplitPipelineCanvas />
          <InteractiveFrameScrubber />
          <AesVaultSimulator />
        </div>

        {/* Capítulo 05: Explorador Interactivo de Requisitos Funcionales (72 ERF) */}
        <RequirementsExplorer
          onOpenLightbox={handleOpenLightbox}
          onSelectTerm={setSelectedTerm}
        />

        {/* Capítulo 06: Catálogo Completo de Mockups UI/UX (72 Pantallas) */}
        <MockupsExplorer onOpenLightbox={handleOpenLightbox} />

        {/* Capítulo 07: Diagramas Oficiales de Modelado UML (16 Diagramas a 300 DPI) */}
        <DiagramsExplorer onOpenLightbox={handleOpenLightbox} />

        {/* Capítulo 08: Modelo de Base de Datos Relacional PostgreSQL 16 (DER) */}
        <DatabaseDERSection
          onSelectTerm={setSelectedTerm}
          onOpenLightbox={handleOpenLightbox}
        />

        {/* Capítulo 09: Matriz de Trazabilidad End-to-End & Linaje Causal */}
        <TraceabilityExplorer onOpenLightbox={handleOpenLightbox} />

        {/* Capítulo 10: Estudio Financiero, Costos (Capex vs Opex) y Calculadora ROI */}
        <FinancialSimulator onSelectTerm={setSelectedTerm} />

        {/* Capítulo 11: Marco Legal, Habeas Data Ley 1581 y Licenciamiento 3D */}
        <LegalMatrixSection onSelectTerm={setSelectedTerm} />

        {/* Capítulo 12: Aseguramiento de Calidad (QA), SLAs y Matriz de Riesgos */}
        <QualitySecuritySection onSelectTerm={setSelectedTerm} />

      </main>

      {/* Footer Institucional con Créditos SENA CIES Regional Huila */}
      <FooterSection />

      {/* Paleta de Comandos Global (Ctrl + K) */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectERF={(erf) => {
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
