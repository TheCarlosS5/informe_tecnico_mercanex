import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Search, Volume2, VolumeX, Maximize2, Minimize2, 
  Sparkles, Layers, GitMerge, ShieldCheck, Terminal, Compass
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
    sound.click();
    document.body.classList.remove('tv-zoom-in', 'tv-zoom-out');
    if (level === 'in') document.body.classList.add('tv-zoom-in');
    if (level === 'out') document.body.classList.add('tv-zoom-out');
  };

  const handleToggleAudio = () => {
    const nextMuted = sound.toggleMute();
    setIsAudioMuted(nextMuted);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#06090F]/90 backdrop-blur-md border-b border-slate-800/80 shadow-2xl">
      {/* Dynamic Scroll Progress Bar in Neon Emerald */}
      <div 
        className="h-[2px] bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 transition-all duration-75 shadow-[0_0_8px_rgba(0,245,155,0.7)]"
        style={{ width: scrollProgress }}
      />

      <div className="max-w-[1520px] mx-auto px-4 md:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Brand & SENA Institutional Telemetry */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-900/90 text-white rounded-xl font-mono text-xs tracking-tight shadow-sm border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#00F59B]" />
            <span className="font-black text-emerald-400">MERCANEX</span>
            <span className="text-slate-400 font-bold">V3.0</span>
          </div>
          <div className="hidden lg:flex flex-col text-left">
            <span className="text-xs font-bold text-slate-200 leading-tight">Living Technical Report</span>
            <span className="text-[10px] text-slate-400 font-mono">SENA ADSO Ficha 3407799 • CIES Huila</span>
          </div>
        </div>

        {/* Global Navigation Chapter Rail */}
        <nav className="hidden xl:flex items-center gap-1 text-xs font-mono text-slate-400 overflow-x-auto py-1">
          <a href="#scrollytelling-narrative" className="px-2.5 py-1 rounded-lg hover:text-emerald-400 hover:bg-slate-900 transition">
            01/02 Scrollytelling
          </a>
          <a href="#video-infrastructure-scroll" className="px-2.5 py-1 rounded-lg hover:text-emerald-400 hover:bg-slate-900 transition">
            03 Arquitectura
          </a>
          <a href="#horizontal-pipeline" className="px-2.5 py-1 rounded-lg hover:text-emerald-400 hover:bg-slate-900 transition flex items-center gap-1 text-emerald-400 font-bold">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>04 Pipeline Split</span>
          </a>
          <a href="#requirements-section" className="px-2.5 py-1 rounded-lg hover:text-emerald-400 hover:bg-slate-900 transition flex items-center gap-1 text-slate-200 font-bold">
            <Layers className="w-3 h-3 text-emerald-400" />
            <span>05 72 ERFs</span>
          </a>
          <a href="#cap4-mockups" className="px-2.5 py-1 rounded-lg hover:text-emerald-400 hover:bg-slate-900 transition">
            06 Mockups (72)
          </a>
          <a href="#cap5-diagramas" className="px-2.5 py-1 rounded-lg hover:text-emerald-400 hover:bg-slate-900 transition">
            07 Diagramas (16)
          </a>
          <a href="#cap6-der" className="px-2.5 py-1 rounded-lg hover:text-emerald-400 hover:bg-slate-900 transition">
            08 BD (15 Tablas)
          </a>
          <a href="#traceability-section" className="px-2.5 py-1 rounded-lg hover:text-emerald-400 hover:bg-slate-900 transition flex items-center gap-1 text-slate-200 font-bold">
            <GitMerge className="w-3 h-3 text-emerald-400" />
            <span>09 Trazabilidad</span>
          </a>
          <a href="#cap7-costos" className="px-2.5 py-1 rounded-lg hover:text-emerald-400 hover:bg-slate-900 transition">
            10 Costos
          </a>
          <a href="#cap8-legal" className="px-2.5 py-1 rounded-lg hover:text-emerald-400 hover:bg-slate-900 transition">
            11 Legal
          </a>
          <a href="#cap9-qa" className="px-2.5 py-1 rounded-lg hover:text-emerald-400 hover:bg-slate-900 transition">
            12 QA
          </a>
        </nav>

        {/* Global Action Utilities */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Command Palette Trigger (Ctrl+K) */}
          <button
            onClick={() => {
              sound.click();
              onOpenSearch();
            }}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/90 hover:bg-slate-800 text-slate-300 rounded-xl text-xs font-mono border border-slate-700/80 transition group shadow-sm"
            title="Abrir Paleta de Comandos Global (Ctrl + K)"
          >
            <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400 transition" />
            <span className="hidden sm:inline">Buscar</span>
            <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-black/60 border border-slate-700 rounded">
              Ctrl K
            </kbd>
          </button>

          {/* Sound Synthesizer Toggle */}
          <button
            onClick={handleToggleAudio}
            className={`p-1.5 rounded-xl border font-mono transition ${
              isAudioMuted 
                ? 'bg-slate-900/80 text-slate-500 border-slate-800 hover:text-slate-300' 
                : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40 shadow-[0_0_8px_rgba(0,245,155,0.2)]'
            }`}
            title={isAudioMuted ? 'Activar audio procedural Web Audio API' : 'Silenciar audio'}
          >
            {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Presentation Mode Toggle */}
          <button
            onClick={() => {
              sound.click();
              onTogglePresentation();
            }}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-mono font-semibold border transition ${
              isPresentationMode 
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' 
                : 'bg-slate-900/90 text-slate-300 border-slate-700/80 hover:bg-slate-800'
            }`}
            title="Alternar Modo Sustentación (Fullscreen & Presenter View)"
          >
            {isPresentationMode ? <Minimize2 className="w-3.5 h-3.5 text-emerald-400" /> : <Maximize2 className="w-3.5 h-3.5 text-slate-400" />}
            <span>{isPresentationMode ? 'Salir' : 'Sustentación'}</span>
          </button>

          {/* TV / Auditorium Zoom Controls */}
          <div className="flex items-center bg-slate-900/90 p-0.5 rounded-xl border border-slate-800">
            <button
              onClick={() => handleZoom('out')}
              className="px-1.5 py-1 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg text-xs font-mono font-bold transition"
              title="Reducir fuente"
            >
              A-
            </button>
            <button
              onClick={() => handleZoom('reset')}
              className="px-1.5 py-1 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg text-xs font-mono font-bold transition"
              title="Fuente estándar"
            >
              A
            </button>
            <button
              onClick={() => handleZoom('in')}
              className="px-1.5 py-1 hover:bg-slate-800 text-emerald-400 rounded-lg text-xs font-mono font-bold transition"
              title="Aumentar fuente para proyector o TV"
            >
              A+
            </button>
          </div>

          {/* Technical Dictionary Button */}
          <button
            onClick={() => {
              sound.click();
              onOpenDictionary();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/40 rounded-xl font-mono font-bold text-xs shadow-sm transition"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Glosario</span>
            <span className="bg-emerald-950 text-emerald-300 px-1 rounded text-[10px] border border-emerald-500/30">31</span>
          </button>
        </div>
      </div>
    </header>
  );
}
