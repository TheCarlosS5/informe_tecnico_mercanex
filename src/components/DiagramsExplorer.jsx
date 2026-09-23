import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, GitBranch, Eye } from 'lucide-react';
import { DIAGRAMS_DATA } from '../data/diagramsData';

export default function DiagramsExplorer({ onOpenLightbox }) {
  const trackRef = useRef(null);

  const handleScroll = (direction) => {
    if (trackRef.current) {
      const scrollAmount = direction === 'left' ? -460 : 460;
      trackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="space-y-4" id="cap5-diagramas">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 block mb-0.5">
            Capítulo 05
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <GitBranch className="w-6 h-6 text-emerald-600" />
            Diagramas Oficiales de Modelado del Software (16 Diagramas)
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Modelado formal en UML (secuencias, actividades, estados, componentes y DER relacional) a 300 DPI.
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => handleScroll('left')}
            className="p-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg shadow-xs transition-colors"
            title="Desplazar a la izquierda"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleScroll('right')}
            className="p-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg shadow-xs transition-colors"
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
            onClick={() => onOpenLightbox(`assets/diagrams/${diag.file}`, diag.title, diag.desc)}
            className="flex-none w-[420px] bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs hover:shadow-card hover:border-emerald-500 transition-all duration-200 cursor-pointer group flex flex-col"
          >
            <div className="w-full h-56 bg-slate-900 p-2 flex items-center justify-center relative overflow-hidden">
              <img
                src={`assets/diagrams/${diag.file}`}
                alt={diag.title}
                className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute top-2 right-2 p-1.5 bg-slate-900/60 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="w-4 h-4" />
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded uppercase tracking-wider">
                  {diag.category}
                </span>
                <h3 className="text-sm font-bold text-slate-900 mt-2 group-hover:text-emerald-700 transition-colors">
                  {diag.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-3 leading-relaxed">
                  {diag.desc}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-emerald-600">
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
