import React, { useState } from 'react';
import HeaderHUD from './components/HeaderHUD';
import HeroSection from './components/HeroSection';
import ChapterOneTwo from './components/ChapterOneTwo';
import GatewayComparator from './components/GatewayComparator';
import SplitPipelineCanvas from './components/SplitPipelineCanvas';
import InteractiveFrameScrubber from './components/InteractiveFrameScrubber';
import AesVaultSimulator from './components/AesVaultSimulator';
import MockupsExplorer from './components/MockupsExplorer';
import DiagramsExplorer from './components/DiagramsExplorer';
import DatabaseDERSection from './components/DatabaseDERSection';
import FinancialSimulator from './components/FinancialSimulator';
import LegalMatrixSection from './components/LegalMatrixSection';
import QualitySecuritySection from './components/QualitySecuritySection';
import FooterSection from './components/FooterSection';
import TermModal from './components/TermModal';
import DictionaryDrawer from './components/DictionaryDrawer';
import LightboxModal from './components/LightboxModal';

export default function App() {
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [isDictionaryOpen, setIsDictionaryOpen] = useState(false);
  const [lightboxData, setLightboxData] = useState({ isOpen: false, src: '', title: '', desc: '' });

  const handleOpenLightbox = (src, title, desc) => {
    setLightboxData({ isOpen: true, src, title, desc });
  };

  const handleCloseLightbox = () => {
    setLightboxData(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col antialiased">
      {/* HUD Header Sticky con Zoom TV y Acceso a Glosario */}
      <HeaderHUD onOpenDictionary={() => setIsDictionaryOpen(true)} />

      {/* Contenedor Principal Fijo Desktop (Estilo Editorial Blanco Elegante) */}
      <main className="flex-1 w-full max-w-[1520px] mx-auto px-6 py-8 space-y-16">
        
        {/* Portada & Bento Grid de Métricas */}
        <HeroSection
          onSelectTerm={setSelectedTerm}
          onOpenLightbox={handleOpenLightbox}
        />

        {/* Capítulo 01 y 02: Problema, Justificación, Objetivos y Alcance */}
        <ChapterOneTwo onSelectTerm={setSelectedTerm} />

        {/* Capítulo 03: Arquitectura y Comparador ePayco Split vs Adyen */}
        <GatewayComparator onSelectTerm={setSelectedTerm} />

        {/* Sección Especial: Motion Graphics & Descomposición de Fotogramas */}
        <div className="space-y-8 pt-4">
          <SplitPipelineCanvas />
          <InteractiveFrameScrubber />
          <AesVaultSimulator />
        </div>

        {/* Capítulo 04: Catálogo Completo de Mockups (72 Pantallas) */}
        <MockupsExplorer onOpenLightbox={handleOpenLightbox} />

        {/* Capítulo 05: Diagramas Oficiales de Modelado (16 Diagramas) */}
        <DiagramsExplorer onOpenLightbox={handleOpenLightbox} />

        {/* Capítulo 06: Modelo de Base de Datos PostgreSQL 16 (DER) */}
        <DatabaseDERSection
          onSelectTerm={setSelectedTerm}
          onOpenLightbox={handleOpenLightbox}
        />

        {/* Capítulo 07: Estudio Financiero, Costos y Calculadora ROI */}
        <FinancialSimulator onSelectTerm={setSelectedTerm} />

        {/* Capítulo 08: Licenciamiento y Cumplimiento de Leyes Colombianas */}
        <LegalMatrixSection onSelectTerm={setSelectedTerm} />

        {/* Capítulo 09: Ciberseguridad, QA y SLAs */}
        <QualitySecuritySection onSelectTerm={setSelectedTerm} />

      </main>

      {/* Footer Institucional con Créditos SENA */}
      <FooterSection />

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

      {/* Visor Fullscreen de Imágenes, Mockups y Diagramas (Lightbox) */}
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
