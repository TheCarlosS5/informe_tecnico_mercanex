import React, { useEffect } from 'react';
import { X, ZoomIn } from 'lucide-react';

export default function LightboxModal({ isOpen, src, title, desc, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen || !src) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-white/80 hover:text-white bg-slate-900/60 hover:bg-slate-800 rounded-full transition-colors z-50"
        title="Cerrar visor"
      >
        <X className="w-6 h-6" />
      </button>

      <div 
        className="relative max-w-5xl max-h-[90vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative overflow-hidden rounded-xl shadow-2xl bg-slate-950 border border-slate-800">
          <img
            src={src}
            alt={title || "Vista previa"}
            className="max-w-full max-h-[75vh] object-contain"
          />
        </div>

        {(title || desc) && (
          <div className="mt-3 text-center max-w-2xl px-4 py-2 bg-slate-900/90 border border-slate-800 rounded-lg text-white">
            {title && <h3 className="text-sm font-bold text-emerald-400">{title}</h3>}
            {desc && <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{desc}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
