import React from 'react';
import { ArrowUp, Award, ShieldCheck, Heart } from 'lucide-react';

export default function FooterSection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-16 pt-8 pb-12 border-t border-slate-200 text-xs text-slate-500">
      <div className="max-w-[1520px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="font-extrabold text-sm text-slate-900 tracking-tight">MERCANEX V3.0</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
              SENA ADSO 2026
            </span>
          </div>
          <p className="text-slate-600">
            Tecnología en Análisis y Desarrollo de Software • Ficha 2977494 • Centro de Servicios y Gestión Empresarial
          </p>
          <p className="text-slate-400">
            Desarrollado con rigor de ingeniería por:{' '}
            <strong className="text-slate-700">Carlos Morales, Sergio Cuervo, Santiago Garcia, David Rodriguez, Santiago Henao</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 hover:border-emerald-500 text-slate-700 rounded-lg shadow-xs hover:text-emerald-700 transition-colors font-bold text-xs"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            Volver Arriba
          </button>
        </div>
      </div>
    </footer>
  );
}
