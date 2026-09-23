import React, { useEffect } from 'react';
import { X, Volume2, Sparkles, BookOpen, Layers } from 'lucide-react';

export default function TermModal({ term, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!term) return null;

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const textToSpeak = `${term.term}. ${term.summary}. En Mercanex: ${term.mercanexRole}`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'es-ES';
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-white border-2 border-emerald-500 rounded-xl shadow-2xl overflow-hidden animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header con botón de cerrar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 rounded-full border border-emerald-300">
              {term.categoryName}
            </span>
            {term.badge && (
              <span className="px-2 py-0.5 text-xs font-semibold text-slate-600 bg-slate-200 rounded">
                {term.badge}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSpeak}
              className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
              title="Escuchar explicación con voz sintetizada"
            >
              <Volume2 className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cuerpo del Modal */}
        <div className="p-6 max-h-[80vh] overflow-y-auto space-y-4">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {term.term}
          </h2>

          <div className="p-3.5 bg-emerald-50/70 border-l-4 border-emerald-500 rounded-r-lg text-slate-800 text-sm font-medium leading-relaxed">
            {term.summary}
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
              Definición Formal de Ingeniería
            </div>
            <p className="text-slate-700 text-sm leading-relaxed">
              {term.definition}
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">
              <Layers className="w-3.5 h-3.5" />
              ¿Cómo se aplica en Mercanex?
            </div>
            <p className="text-slate-700 text-sm leading-relaxed">
              {term.mercanexRole}
            </p>
          </div>

          <div className="p-4 bg-amber-50/70 rounded-lg border border-amber-200">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Analogía para Explicarlo Fácilmente
            </div>
            <p className="text-slate-700 text-sm leading-relaxed italic">
              "{term.analogy}"
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-lg shadow-sm transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
