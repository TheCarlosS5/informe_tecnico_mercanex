import React, { useState, useEffect } from 'react';
import { BookOpen, ZoomIn, ZoomOut, RotateCcw, ShieldCheck, Sparkles } from 'lucide-react';

export default function HeaderHUD({ onOpenDictionary }) {
  const [scrollProgress, setScrollProgress] = useState(0);

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
    document.body.classList.remove('tv-zoom-in', 'tv-zoom-out');
    if (level === 'in') document.body.classList.add('tv-zoom-in');
    if (level === 'out') document.body.classList.add('tv-zoom-out');
  };

  return (
    <header className="sticky top-0 z-40 glass-header border-b border-slate-200 shadow-xs">
      {/* Barra de Progreso de Lectura */}
      <div 
        className="h-1 bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-75"
        style={{ width: scrollProgress }}
      />

      <div className="max-w-[1520px] mx-auto px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand & Metadatos */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-600 text-white rounded-md font-extrabold text-sm tracking-tight shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-200 animate-pulse" />
            MERCANEX 3.0
          </div>
          <div className="hidden lg:flex flex-col">
            <span className="text-xs font-bold text-slate-900 leading-none">Informe Técnico Vivo</span>
            <span className="text-[10px] text-slate-500 font-medium">SENA ADSO Ficha 2977494 • Regional Antioquia</span>
          </div>
        </div>

        {/* Navegación por Capítulos */}
        <nav className="hidden xl:flex items-center gap-1 text-xs font-semibold text-slate-600">
          <a href="#cap1-problema" className="px-2.5 py-1.5 rounded-md hover:text-emerald-700 hover:bg-emerald-50 transition-colors">Problema</a>
          <a href="#cap2-objetivos" className="px-2.5 py-1.5 rounded-md hover:text-emerald-700 hover:bg-emerald-50 transition-colors">Objetivos</a>
          <a href="#cap3-arquitectura" className="px-2.5 py-1.5 rounded-md hover:text-emerald-700 hover:bg-emerald-50 transition-colors">Arquitectura & Pagos</a>
          <a href="#interactive-motion" className="px-2.5 py-1.5 rounded-md hover:text-emerald-700 hover:bg-emerald-50 transition-colors flex items-center gap-1 text-emerald-700 font-bold">
            <Sparkles className="w-3 h-3 text-emerald-500" />
            Motion Scrubber
          </a>
          <a href="#cap4-mockups" className="px-2.5 py-1.5 rounded-md hover:text-emerald-700 hover:bg-emerald-50 transition-colors">Mockups (72)</a>
          <a href="#cap5-diagramas" className="px-2.5 py-1.5 rounded-md hover:text-emerald-700 hover:bg-emerald-50 transition-colors">Diagramas (16)</a>
          <a href="#cap6-der" className="px-2.5 py-1.5 rounded-md hover:text-emerald-700 hover:bg-emerald-50 transition-colors">Base de Datos</a>
          <a href="#cap7-costos" className="px-2.5 py-1.5 rounded-md hover:text-emerald-700 hover:bg-emerald-50 transition-colors">Costos & ROI</a>
          <a href="#cap8-legal" className="px-2.5 py-1.5 rounded-md hover:text-emerald-700 hover:bg-emerald-50 transition-colors">Leyes & Licencias</a>
          <a href="#cap9-qa" className="px-2.5 py-1.5 rounded-md hover:text-emerald-700 hover:bg-emerald-50 transition-colors">Seguridad QA</a>
        </nav>

        {/* Controles de Vista TV y Botón de Glosario */}
        <div className="flex items-center gap-3">
          {/* Zoom TV */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 px-1.5 hidden sm:inline">ZOOM TV:</span>
            <button
              onClick={() => handleZoom('out')}
              className="p-1 hover:bg-white text-slate-600 rounded shadow-xs text-xs font-bold transition-colors"
              title="Reducir tamaño de letra"
            >
              A-
            </button>
            <button
              onClick={() => handleZoom('reset')}
              className="p-1 hover:bg-white text-slate-600 rounded shadow-xs text-xs font-bold transition-colors"
              title="Restablecer tamaño"
            >
              A
            </button>
            <button
              onClick={() => handleZoom('in')}
              className="p-1 hover:bg-white text-slate-900 rounded shadow-xs text-xs font-bold transition-colors"
              title="Aumentar tamaño de letra para pantalla grande o TV"
            >
              A+
            </button>
          </div>

          {/* Botón Glosario */}
          <button
            onClick={onOpenDictionary}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg font-bold text-xs shadow-xs transition-all duration-150 group"
          >
            <BookOpen className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
            <span>Glosario Técnico (31)</span>
          </button>
        </div>
      </div>
    </header>
  );
}
