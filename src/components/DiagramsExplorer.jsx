import { driveImage } from '../data/driveAssets';
import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, GitBranch, Eye } from 'lucide-react';
import { DIAGRAMS_DATA } from '../data/diagramsData';
import { sound } from '../lib/soundSynthesizer';

export default function DiagramsExplorer({ onOpenLightbox }) {
  const trackRef = useRef(null);

  const handleScroll = (direction) => {
    sound.click();
    if (trackRef.current) {
      const scrollAmount = direction === 'left' ? -460 : 460;
      trackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="space-y-4" id="cap5-diagramas">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 block mb-0.5">
            Capítulo 07 • Modelado de Software
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <GitBranch className="w-6 h-6 text-emerald-400" />
            <span>Diagramas Oficiales de Modelado UML (16 Diagramas)</span>
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Modelado formal en UML (secuencias, actividades, estados, componentes y DER relacional) renderizados a 300 DPI.
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => handleScroll('left')}
            className="p-2 bg-[#0B101B] border border-slate-800 hover:bg-slate-900 text-slate-300 rounded-xl transition"
            title="Desplazar a la izquierda"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleScroll('right')}
            className="p-2 bg-[#0B101B] border border-slate-800 hover:bg-slate-900 text-slate-300 rounded-xl transition"
            title="Desplazar a la derecha"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Track Horizontal de Diagramas */}
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto pb-4 pt-1 scroll-smooth scrollbar-thin"
      >
        {DIAGRAMS_DATA.map((diag) => (
          <div
            key={diag.id}
            onClick={() => {
              sound.ping();
              onOpenLightbox(`assets/diagrams/${diag.file}`, diag.title, diag.desc);
            }}
            className="flex-none w-[420px] bg-[#0B101B] border border-slate-800 rounded-2xl overflow-hidden shadow-xl hover:border-emerald-500/60 hover:shadow-2xl hover:shadow-emerald-950/20 transition-all duration-300 cursor-pointer group flex flex-col"
          >
            <div className="w-full h-56 bg-black p-3 flex items-center justify-center relative overflow-hidden">
              <img
                src={driveImage('diagrams', diag.file, 1000)}
                alt={diag.title}
                className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute top-2 right-2 p-1.5 bg-black/80 border border-slate-700 text-emerald-400 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="w-4 h-4" />
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded uppercase tracking-wider">
                  {diag.category}
                </span>
                <h3 className="text-sm font-bold text-white mt-2 group-hover:text-emerald-300 transition-colors">
                  {diag.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-3 leading-relaxed">
                  {diag.desc}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono font-bold text-emerald-400">
                <span>Examinar Diagrama a 300 DPI</span>
                <span>→</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
