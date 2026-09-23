import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Award, CheckCircle2, ChevronDown, Terminal, Cpu, Database, Zap } from 'lucide-react';
import TechTerm from './TechTerm';
import { sound } from '../lib/soundSynthesizer';

gsap.registerPlugin(ScrollTrigger);

export default function CinematicHeroScroll({ onSelectTerm }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const textRef = useRef(null);
  const kpiRef = useRef(null);

  useGSAP(() => {
    // Subtle scale and fade on scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    tl.to(videoRef.current, {
      scale: 1.15,
      opacity: 0.35,
      ease: 'none'
    }, 0);

    tl.to(textRef.current, {
      y: -60,
      opacity: 0.2,
      ease: 'none'
    }, 0);

    tl.to(kpiRef.current, {
      y: -40,
      ease: 'none'
    }, 0);
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative min-h-[95vh] flex flex-col justify-between pt-12 pb-16 overflow-hidden rounded-3xl border border-slate-800/80 bg-[#06090F] shadow-2xl">
      {/* Background Cyber Video Backdrop with Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-45 will-change-transform filter brightness-75 contrast-125"
        >
          <source src="/assets/videos/cyber_server_scroll.mp4" type="video/mp4" />
        </video>
        {/* Dark Vignette & Scanlines */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#06090F] via-[#06090F]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#06090F] via-transparent to-[#06090F]" />
        <div className="absolute inset-0 bg-grid-cyber opacity-40" />
      </div>

      {/* Top Telemetry Header */}
      <div className="relative z-10 px-6 sm:px-12 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <Award className="w-3.5 h-3.5" />
            SENA CIES • REGIONAL HUILA • FICHA 3407799
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-800/80 text-slate-300 border border-slate-700">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            KERNEL V3.0 • LIVING REPORT
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950/60 text-emerald-300 border border-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            AUDITORÍA 100% CONFORME
          </span>
        </div>

        <div className="font-mono text-[11px] text-slate-400 flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>SYS_ONLINE: 99.98%</span>
          </span>
          <span className="text-slate-600">|</span>
          <span>LATENCIA: 18ms</span>
        </div>
      </div>

      {/* Hero Central Typography (Impeccable Cyber Craft) */}
      <div ref={textRef} className="relative z-10 px-6 sm:px-12 max-w-5xl my-auto space-y-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 font-mono text-xs uppercase tracking-widest font-semibold">
            <Cpu className="w-3.5 h-3.5" />
            <span>Documento Técnico Integral de Ingeniería</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08]">
            MERCANEX{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              V3.0
            </span>
            <br />
            <span className="text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-300">
              Living Technical Report
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl">
            Sustentación interactiva del marketplace de licencias y software digital bajo el modelo{' '}
            <TechTerm id="saas-freemium" onSelectTerm={onSelectTerm}>SaaS Freemium</TechTerm>. 
            Orquestación de un <TechTerm id="carrito-multitienda" onSelectTerm={onSelectTerm}>Carrito Multi-Vendedor</TechTerm> con dispersión automática{' '}
            <TechTerm id="epayco-split" onSelectTerm={onSelectTerm}>ePayco Pagos Divididos (Split 1:N)</TechTerm> a 0% de comisión para Mercanex, 
            72 especificaciones formales ERF, 72 pantallas de mockup y 16 diagramas de modelado de software.
          </p>
        </div>

        {/* Academic Team Ribbon */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 text-xs">
          <div>
            <span className="text-slate-400 font-mono block text-[10px] uppercase tracking-wider mb-0.5">Equipo de Desarrollo (ADSO CIES Huila)</span>
            <span className="text-white font-semibold">
              Carlos Stiven Gutiérrez • Camilo Andrés Tamayo • Kevin Fernando Martínez • Samuel Santiago Ramírez • Santiago Ortiz Claros
            </span>
          </div>
          <div>
            <span className="text-slate-400 font-mono block text-[10px] uppercase tracking-wider mb-0.5">Instructor Líder</span>
            <span className="text-emerald-400 font-semibold font-mono">José de Jesús Motta Vargas</span>
          </div>
        </div>
      </div>

      {/* Floating Bottom KPI Bento */}
      <div ref={kpiRef} className="relative z-10 px-6 sm:px-12 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-[#0D131F]/90 border border-emerald-500/30 backdrop-blur-md relative overflow-hidden group hover:border-emerald-400 transition">
          <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
          <span className="font-mono text-3xl sm:text-4xl font-black text-emerald-400 block tracking-tight">0%</span>
          <span className="text-xs font-bold text-white uppercase tracking-wider mt-1 block">Comisión Mercanex</span>
          <p className="text-[11px] text-slate-400 mt-1 leading-snug">0 fondos en custodia; dispersión instantánea a comerciantes.</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#0D131F]/90 border border-slate-800 backdrop-blur-md hover:border-emerald-500/40 transition">
          <span className="font-mono text-3xl sm:text-4xl font-black text-cyan-400 block tracking-tight">1:N</span>
          <span className="text-xs font-bold text-white uppercase tracking-wider mt-1 block">Split de Pagos ePayco</span>
          <p className="text-[11px] text-slate-400 mt-1 leading-snug">Cobro único al comprador y reparto atómico por suborden.</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#0D131F]/90 border border-slate-800 backdrop-blur-md hover:border-emerald-500/40 transition">
          <span className="font-mono text-3xl sm:text-4xl font-black text-white block tracking-tight">72</span>
          <span className="text-xs font-bold text-white uppercase tracking-wider mt-1 block">Requisitos ERF & Mockups</span>
          <p className="text-[11px] text-slate-400 mt-1 leading-snug">Trazabilidad formal 1:1 verificada bajo estándar IEEE 830.</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#0D131F]/90 border border-slate-800 backdrop-blur-md hover:border-emerald-500/40 transition">
          <span className="font-mono text-3xl sm:text-4xl font-black text-emerald-400 block tracking-tight">16</span>
          <span className="text-xs font-bold text-white uppercase tracking-wider mt-1 block">Diagramas Oficiales</span>
          <p className="text-[11px] text-slate-400 mt-1 leading-snug">UML de secuencia, estados, DER PostgreSQL 16 a 300 DPI.</p>
        </div>
      </div>

      {/* Downward Scroll Cue */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-4 text-slate-400 text-xs font-mono">
        <span className="animate-pulse flex items-center gap-1.5">
          <span>DESPLÁZATE HACIA ABAJO PARA EXPLORAR LOS SCROLLS INTERACTIVOS</span>
          <ChevronDown className="w-4 h-4 text-emerald-400 animate-bounce" />
        </span>
      </div>
    </div>
  );
}
