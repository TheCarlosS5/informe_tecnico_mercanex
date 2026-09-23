import React from 'react';
import TechTerm from './TechTerm';
import { ShieldCheck, CheckCircle2, TrendingUp, Layers, Users, Calendar, Award } from 'lucide-react';

export default function HeroSection({ onSelectTerm, onOpenLightbox }) {
  const renders3D = [
    {
      src: "assets/3d/mercanex_ui_3d.jpg",
      title: "Ecosistema UI & Carrito Multi-Vendedor",
      desc: "Modelado 3D de la navegación unificada: vitrina de videojuegos, carrito multi-tienda y despacho digital instantáneo."
    },
    {
      src: "assets/3d/epayco_split_flow_3d.jpg",
      title: "Arquitectura ePayco Split 1:N",
      desc: "Visualización física del cobro al comprador y la dispersión automática hacia subcuentas bancarias sin custodia de fondos."
    },
    {
      src: "assets/3d/saas_freemium_plans_3d.jpg",
      title: "Monetización SaaS Freemium",
      desc: "Estructura de niveles de servicio: Plan Gratis (0% comisión), Plan Emprendedor y Plan Profesional."
    },
    {
      src: "assets/3d/security_keys_3d.jpg",
      title: "Bóveda Criptográfica AES-256",
      desc: "Cifrado de inventario digital en reposo, firmas de Webhooks HMAC-SHA256 y hashing Argon2id."
    }
  ];

  return (
    <section className="py-8 space-y-8" id="hero-top">
      {/* Insignias Superiores */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
          <Award className="w-3.5 h-3.5 text-emerald-600" />
          SENA • TECNOLOGÍA EN ADSO
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800 border border-slate-300">
          <CheckCircle2 className="w-3.5 h-3.5 text-slate-600" />
          EDICIÓN VIVA INTERACTIVA V3.0
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          AUDITORÍA 100% CONFORME Y APROBADA
        </span>
      </div>

      {/* Titular Principal */}
      <div className="space-y-4 max-w-5xl">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
          Informe Técnico de{' '}
          <span className="text-emerald-600 underline decoration-emerald-300 decoration-wavy decoration-2">
            Diseño y Desarrollo
          </span>
          <br />
          Plataforma Marketplace <span className="text-slate-800">Mercanex V3.0</span>
        </h1>

        <p className="text-lg text-slate-600 leading-relaxed">
          Documento técnico integral para la sustentación de etapa práctica. Explica con rigor la evolución hacia el modelo{' '}
          <TechTerm id="saas-freemium" onSelectTerm={onSelectTerm}>SaaS Freemium</TechTerm>, la integración del{' '}
          <TechTerm id="carrito-multitienda" onSelectTerm={onSelectTerm}>Carrito Multi-Vendedor</TechTerm> con dispersión automática{' '}
          <TechTerm id="epayco-split" onSelectTerm={onSelectTerm}>ePayco Pagos Divididos (Split 1:N)</TechTerm> a 0% de comisión de venta para Mercanex, 
          la hoja de ruta global con <TechTerm id="adyen-platforms" onSelectTerm={onSelectTerm}>Adyen for Platforms</TechTerm>, 
          72 pantallas de interfaz de usuario de alta fidelidad, 16 diagramas oficiales de arquitectura y estricto apego al marco legal colombiano.
        </p>
      </div>

      {/* Metadatos y Autores del Proyecto */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Proyecto Formativo</span>
          <span className="text-sm font-bold text-slate-900 block">Mercanex Marketplace de Claves Digitales</span>
        </div>
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Equipo Desarrollador (ADSO)</span>
          <span className="text-sm font-semibold text-emerald-700 block">
            Carlos Morales • Sergio Cuervo • Santiago Garcia • David Rodriguez • Santiago Henao
          </span>
        </div>
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Centro de Formación</span>
          <span className="text-sm font-semibold text-slate-800 block">SENA Regional Antioquia • Ficha 2977494</span>
        </div>
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Fecha de Sustentación</span>
          <span className="text-sm font-semibold text-slate-800 block">Septiembre 2026</span>
        </div>
      </div>

      {/* Bento Grid de KPIs Clave */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border-2 border-emerald-500 rounded-xl p-5 shadow-card relative overflow-hidden group hover:shadow-mint transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -z-0 group-hover:scale-110 transition-transform" />
          <div className="relative z-10">
            <span className="text-4xl font-extrabold text-emerald-600 tracking-tight block">0%</span>
            <span className="text-sm font-bold text-slate-900 block mt-1">Comisión Mercanex</span>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              El 100% del saldo neto tras la tarifa de pasarela va directo a la cuenta del comerciante.
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-emerald-400 transition-all">
          <span className="text-4xl font-extrabold text-slate-900 tracking-tight block">1:N</span>
          <span className="text-sm font-bold text-slate-900 block mt-1">Split de Pagos ePayco</span>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            Cobro unificado al comprador y dispersión automática hacia múltiples cuentas de comerciantes.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-emerald-400 transition-all">
          <span className="text-4xl font-extrabold text-slate-900 tracking-tight block">72</span>
          <span className="text-sm font-bold text-slate-900 block mt-1">Pantallas de Mockup UI/UX</span>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            Catálogo completo de interfaces en Figma cubriendo todo el ciclo funcional del software.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-emerald-400 transition-all">
          <span className="text-4xl font-extrabold text-slate-900 tracking-tight block">16</span>
          <span className="text-sm font-bold text-slate-900 block mt-1">Diagramas Oficiales</span>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            Modelado formal UML (secuencia, actividades, estados, componentes y DER PostgreSQL 16).
          </p>
        </div>
      </div>

      {/* Galería de Renders 3D */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-600" />
            Artefactos Tridimensionales del Sistema (Renders 3D)
          </h3>
          <span className="text-xs text-slate-500 font-medium">Haz clic en cualquier imagen para ampliar en alta definición</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {renders3D.map((render, idx) => (
            <div
              key={idx}
              onClick={() => onOpenLightbox(render.src, render.title, render.desc)}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs hover:shadow-card hover:border-emerald-500 transition-all duration-200 cursor-pointer group flex flex-col"
            >
              <div className="h-44 w-full bg-slate-900 overflow-hidden relative">
                <img
                  src={render.src}
                  alt={render.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors" />
              </div>
              <div className="p-3.5 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {render.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {render.desc}
                  </p>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 mt-2 flex items-center gap-1">
                  Ver en detalle →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
