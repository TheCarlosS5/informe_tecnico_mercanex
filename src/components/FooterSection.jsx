import React from 'react';
import { ArrowUp, Award, ShieldCheck, Heart, Terminal } from 'lucide-react';
import { sound } from '../lib/soundSynthesizer';

export default function FooterSection() {
  const scrollToTop = () => {
    sound.click();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-16 pt-8 pb-12 border-t border-slate-800 text-xs text-slate-400 font-mono">
      <div className="max-w-[1520px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 px-4">
        <div className="space-y-1.5 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="font-black text-sm text-white tracking-tight">MERCANEX V3.0</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              SENA ADSO • CIES HUILA
            </span>
            <span className="text-[10px] text-slate-500">FICHA 3407799</span>
          </div>
          <p className="text-slate-400 font-sans">
            Tecnología en Análisis y Desarrollo de Software • Centro de la Industria, la Empresa y los Servicios (CIES) — Regional Huila
          </p>
          <p className="text-slate-500 text-[11px]">
            Equipo Desarrollador:{' '}
            <strong className="text-slate-300">Carlos Stiven Gutiérrez, Camilo Andrés Tamayo, Kevin Fernando Martínez, Samuel Santiago Ramírez, Santiago Ortiz Claros</strong> • Instructor: <strong className="text-emerald-400 font-mono">José de Jesús Motta Vargas</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#0B101B] border border-slate-800 hover:border-emerald-500/50 text-slate-300 hover:text-emerald-400 rounded-xl shadow-lg transition font-mono font-bold text-xs"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Volver Arriba</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
