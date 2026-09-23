import React, { useState, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, ExternalLink, Download } from 'lucide-react';
import { sound } from '../lib/soundSynthesizer';

export default function LightboxModal({ isOpen, src, title, desc, onClose }) {
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        sound.click();
        setIsZoomed(false);
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen || !src) return null;

  const handleClose = () => {
    sound.click();
    setIsZoomed(false);
    onClose();
  };

  const handleToggleZoom = (e) => {
    e.stopPropagation();
    sound.click();
    setIsZoomed(prev => !prev);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn"
      onClick={handleClose}
    >
      {/* Floating Control Toolbar */}
      <div 
        className="absolute top-4 right-4 flex items-center gap-2 z-50 font-mono text-xs"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleToggleZoom}
          className="p-2.5 text-slate-300 hover:text-white bg-[#0B101B] border border-slate-700/80 rounded-xl transition shadow-lg flex items-center gap-1.5"
          title={isZoomed ? "Reducir tamaño" : "Ampliar al 100%"}
        >
          {isZoomed ? <ZoomOut className="w-4 h-4 text-emerald-400" /> : <ZoomIn className="w-4 h-4 text-emerald-400" />}
          <span className="hidden sm:inline">{isZoomed ? 'Ajustar' : 'Zoom 1:1'}</span>
        </button>

        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 text-slate-300 hover:text-emerald-400 bg-[#0B101B] border border-slate-700/80 rounded-xl transition shadow-lg flex items-center gap-1.5"
          title="Abrir imagen original en nueva pestaña"
        >
          <ExternalLink className="w-4 h-4" />
          <span className="hidden sm:inline">Original HD</span>
        </a>

        <button
          onClick={handleClose}
          className="p-2.5 text-slate-300 hover:text-white bg-[#0B101B] border border-slate-700/80 hover:border-red-500/50 hover:bg-red-500/10 rounded-xl transition shadow-lg"
          title="Cerrar visor (Esc)"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div 
        className={`relative max-w-6xl max-h-[92vh] flex flex-col items-center justify-center transition-all ${
          isZoomed ? 'w-full h-full overflow-auto' : ''
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div 
          onClick={handleToggleZoom}
          className={`relative overflow-hidden rounded-2xl shadow-2xl bg-[#06090F] border border-slate-800 cursor-${isZoomed ? 'zoom-out' : 'zoom-in'}`}
        >
          <img
            src={src}
            alt={title || "Vista previa 300 DPI"}
            className={`transition-all duration-200 ${
              isZoomed 
                ? 'max-w-none w-auto h-auto' 
                : 'max-w-full max-h-[75vh] object-contain'
            }`}
          />
        </div>

        {(title || desc) && (
          <div className="mt-3 text-center max-w-3xl px-5 py-3 bg-[#0B101B]/95 border border-slate-800 rounded-xl text-white shadow-xl backdrop-blur-md">
            {title && (
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <h3 className="text-sm font-bold text-emerald-400 font-mono">{title}</h3>
              </div>
            )}
            {desc && <p className="text-xs text-slate-300 leading-relaxed font-sans">{desc}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
