import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Search, Volume2, VolumeX, Maximize2, Minimize2, 
  Sparkles, Layers, GitMerge, ShieldCheck 
} from 'lucide-react';
import { sound } from '../lib/soundSynthesizer';

export default function HeaderHUD({ 
  onOpenDictionary, 
  onOpenSearch, 
  isPresentationMode, 
  onTogglePresentation 
}) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAudioMuted, setIsAudioMuted] = useState(sound.getMuted());

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${(totalScroll / windowHeight) * 100}%`;
      setScrollProgress(scroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleZoom = (level) => {
    sound.playClick();
    document.body.classList.remove('tv-zoom-in', 'tv-zoom-out');
    if (level === 'in') document.body.classList.add('tv-zoom-in');
    if (level === 'out') document.body.classList.add('tv-zoom-out');
  };

  const handleToggleAudio = () => {
    const nextMuted = sound.toggleMute();
    setIsAudioMuted(nextMuted);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Dynamic Scroll Progress Indicator */}
      <div 
        className="h-1 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-400 transition-all duration-75"
        style={{ width: scrollProgress }}
      />

      <div className="max-w-[1520px] mx-auto px-4 md:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Brand & SENA Institutional Telemetry */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-900 text-white rounded-xl font-extrabold text-xs tracking-tight shadow-sm border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>MERCANEX 3.0</span>
          </div>
          <div className="hidden lg:flex flex-col text-left">
            <span className="text-xs font-bold text-slate-900 leading-tight">Living Technical Report</span>
            <span className="text-[10px] text-slate-500 font-medium">SENA ADSO Ficha 3407799 • CIES Regional Huila</span>
          </div>
        </div>

        {/* Global Navigation Chapter Rail */}
        <nav className="hidden xl:flex items-center gap-1 text-xs font-semibold text-slate-600 overflow-x-auto py-1">
          <a href="#cap1-problema" className="px-2.5 py-1 rounded-lg hover:text-emerald-700 hover:bg-emerald-50 transition">Alcance</a>
          <a href="#cap3-arquitectura" className="px-2.5 py-1 rounded-lg hover:text-emerald-700 hover:bg-emerald-50 transition">Arquitectura</a>
          <a href="#interactive-motion" className="px-2.5 py-1 rounded-lg hover:text-emerald-700 hover:bg-emerald-50 transition flex items-center gap-1 text-emerald-700 font-bold">
            <Sparkles className="w-3 h-3 text-emerald-500" />
            <span>Motion</span>
          </a>
          <a href="#requirements-section" className="px-2.5 py-1 rounded-lg hover:text-emerald-700 hover:bg-emerald-50 transition flex items-center gap-1 text-slate-900 font-bold">
            <Layers className="w-3 h-3 text-emerald-600" />
            <span>72 ERFs</span>
          </a>
          <a href="#cap4-mockups" className="px-2.5 py-1 rounded-lg hover:text-emerald-700 hover:bg-emerald-50 transition">Mockups (72)</a>
          <a href="#cap5-diagramas" className="px-2.5 py-1 rounded-lg hover:text-emerald-700 hover:bg-emerald-50 transition">Diagramas (16)</a>
          <a href="#cap6-der" className="px-2.5 py-1 rounded-lg hover:text-emerald-700 hover:bg-emerald-50 transition">BD (15 Tablas)</a>
          <a href="#traceability-section" className="px-2.5 py-1 rounded-lg hover:text-emerald-700 hover:bg-emerald-50 transition flex items-center gap-1 text-slate-900 font-bold">
            <GitMerge className="w-3 h-3 text-emerald-600" />
            <span>Trazabilidad</span>
          </a>
          <a href="#cap7-costos" className="px-2.5 py-1 rounded-lg hover:text-emerald-700 hover:bg-emerald-50 transition">Costos</a>
          <a href="#cap8-legal" className="px-2.5 py-1 rounded-lg hover:text-emerald-700 hover:bg-emerald-50 transition">Leyes</a>
          <a href="#cap9-qa" className="px-2.5 py-1 rounded-lg hover:text-emerald-700 hover:bg-emerald-50 transition">QA & SLAs</a>
        </nav>

        {/* Global Action Utilities (Search, Sound, TV Zoom, Presentation Mode) */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Command Palette Trigger (Ctrl+K) */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenSearch();
            }}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200/80 text-slate-700 rounded-xl text-xs font-medium border border-slate-200 transition group shadow-2xs"
            title="Abrir Paleta de Comandos Global (Ctrl + K)"
          >
            <Search className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-600 transition" />
            <span className="hidden sm:inline">Buscar</span>
            <kbd className="hidden md:inline-block px-1.5 py-0.2 text-[10px] font-mono text-slate-500 bg-white border border-slate-200 rounded">
              Ctrl K
            </kbd>
          </button>

          {/* Sound Synthesizer Toggle */}
          <button
            onClick={handleToggleAudio}
            className={`p-1.5 rounded-xl border transition ${
              isAudioMuted 
                ? 'bg-slate-100 text-slate-400 border-slate-200 hover:text-slate-700' 
                : 'bg-emerald-50 text-emerald-700 border-emerald-300 shadow-2xs'
            }`}
            title={isAudioMuted ? 'Activar audio procedural Web Audio API' : 'Silenciar audio'}
          >
            {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Presentation Mode Toggle */}
          <button
            onClick={() => {
              sound.playClick();
              onTogglePresentation();
            }}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition ${
              isPresentationMode 
                ? 'bg-slate-900 text-white border-slate-900' 
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
            title="Alternar Modo Sustentación (Fullscreen & Presenter View)"
          >
            {isPresentationMode ? <Minimize2 className="w-3.5 h-3.5 text-emerald-400" /> : <Maximize2 className="w-3.5 h-3.5 text-slate-500" />}
            <span>{isPresentationMode ? 'Salir' : 'Sustentación'}</span>
          </button>

          {/* TV / Auditorium Zoom Controls */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200">
            <button
              onClick={() => handleZoom('out')}
              className="px-1.5 py-1 hover:bg-white text-slate-600 rounded-lg text-xs font-bold transition"
              title="Reducir fuente"
            >
              A-
            </button>
            <button
              onClick={() => handleZoom('reset')}
              className="px-1.5 py-1 hover:bg-white text-slate-600 rounded-lg text-xs font-bold transition"
              title="Fuente estándar"
            >
              A
            </button>
            <button
              onClick={() => handleZoom('in')}
              className="px-1.5 py-1 hover:bg-white text-slate-900 rounded-lg text-xs font-bold transition"
              title="Aumentar fuente para proyector o TV"
            >
              A+
            </button>
          </div>

          {/* Technical Dictionary Button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenDictionary();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-sm transition"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Glosario</span>
            <span className="bg-emerald-800 text-emerald-200 px-1 rounded text-[10px]">31</span>
          </button>
        </div>
      </div>
    </header>
  );
}
