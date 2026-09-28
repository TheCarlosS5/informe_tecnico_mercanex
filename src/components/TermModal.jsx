import React, { useEffect } from 'react';
import { X, Volume2, Sparkles, BookOpen, Layers } from 'lucide-react';
import { sound } from '../lib/soundSynthesizer';

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
    sound.ping();
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-[#F8FAFC] border border-emerald-500/50 rounded-lg shadow-sm overflow-hidden animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header con botón de cerrar */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200">
          <div className="flex items-center gap-2 font-mono">
            <span className="px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
              {term.categoryName}
            </span>
            {term.badge && (
              <span className="px-2 py-0.5 text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 rounded">
                {term.badge}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSpeak}
              className="p-1.5 text-slate-600 hover:text-emerald-700 hover:bg-slate-200 rounded-lg transition"
              title="Escuchar explicación con voz sintetizada"
            >
              <Volume2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                sound.click();
                onClose();
              }}
              className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cuerpo del Modal */}
        <div className="p-6 max-h-[80vh] overflow-y-auto space-y-4">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            {term.term}
          </h2>

          <div className="p-3.5 bg-emerald-500/10 border-l-4 border-emerald-400 rounded-r-xl text-slate-800 text-sm font-medium leading-relaxed">
            {term.summary}
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-slate-600 mb-1">
              <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
              <span>Definición Formal de Ingeniería</span>
            </div>
            <p className="text-slate-700 text-sm leading-relaxed">
              {term.definition}
            </p>
          </div>

          <div className="p-4 bg-white rounded-md border border-slate-200">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 mb-1">
              <Layers className="w-3.5 h-3.5" />
              <span>¿Cómo se aplica en Mercanex?</span>
            </div>
            <p className="text-slate-700 text-sm leading-relaxed">
              {term.mercanexRole}
            </p>
          </div>

          <div className="p-4 bg-amber-500/10 rounded-md border border-amber-500/30">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-amber-300 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Analogía para Explicarlo Fácilmente</span>
            </div>
            <p className="text-amber-200/90 text-sm leading-relaxed italic">
              "{term.analogy}"
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-white border-t border-slate-200 flex justify-end font-mono">
          <button
            onClick={() => {
              sound.click();
              onClose();
            }}
            className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-md shadow-lg transition"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
