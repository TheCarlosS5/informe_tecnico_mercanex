import React, { useState, useMemo } from 'react';
import { 
  Layers, Filter, Eye, Play, Pause, RotateCcw, ChevronRight, CheckCircle2, 
  AlertTriangle, Shield, User, ExternalLink, X, Search, Sparkles, Database,
  ArrowRight, Clock, FileText, Smartphone
} from 'lucide-react';
import { sound } from '../lib/soundSynthesizer';
import semanticData from '../data/mercanex_semantic_inventory.json';

const MODULES = [
  { id: 'ALL', name: 'Todos los Módulos (72 ERF)', count: 72 },
  { id: 'RF-01', name: 'RF-01: Autenticación y Acceso', count: 8, icon: Shield },
  { id: 'RF-02', name: 'RF-02: Gestión Vendedor y Tienda', count: 8, icon: User },
  { id: 'RF-03', name: 'RF-03: Publicaciones e Inventario', count: 9, icon: Database },
  { id: 'RF-04', name: 'RF-04: Búsqueda y Navegación', count: 7, icon: Search },
  { id: 'RF-05', name: 'RF-05: Compra, Pago y Entrega', count: 11, icon: Sparkles },
  { id: 'RF-06', name: 'RF-06: Chat y Notificaciones', count: 9, icon: Smartphone },
  { id: 'RF-07', name: 'RF-07: Reputación y Reclamos', count: 10, icon: AlertTriangle },
  { id: 'RF-08', name: 'RF-08: Administración y Control', count: 10, icon: Layers },
];

export default function RequirementsExplorer({ onOpenLightbox, onSelectTerm, activeERFProp, onCloseActiveERF }) {
  const [selectedModule, setSelectedModule] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [localActiveERF, setLocalActiveERF] = useState(null);
  const [flowSimulator, setFlowSimulator] = useState({
    isOpen: false,
    erf: null,
    currentStep: 0,
    isPlaying: false
  });

  const activeERF = activeERFProp || localActiveERF;
  const setActiveERF = (erf) => {
    setLocalActiveERF(erf);
    if (!erf && onCloseActiveERF) {
      onCloseActiveERF();
    }
  };

  // Filter ERFs
  const filteredERFs = useMemo(() => {
    return semanticData.erfs.filter(erf => {
      const matchesMod = selectedModule === 'ALL' || erf.id.startsWith(selectedModule.replace('RF-', 'ERF-'));
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery = !q || 
        erf.id.toLowerCase().includes(q) ||
        erf.title.toLowerCase().includes(q) ||
        (erf.mockup_title && erf.mockup_title.toLowerCase().includes(q)) ||
        (erf['actor(es)'] && erf['actor(es)'].toLowerCase().includes(q));
      return matchesMod && matchesQuery;
    });
  }, [selectedModule, searchQuery]);

  // Parse flow steps from mainFlow string
  const parseFlowSteps = (flowStr) => {
    if (!flowStr) return [];
    const parts = flowStr.split(/(?=\b\d+\.\s+)/).map(s => s.trim()).filter(Boolean);
    return parts.map((step, idx) => {
      const clean = step.replace(/^\d+\.\s*/, '');
      return { stepNum: idx + 1, text: clean };
    });
  };

  const handleOpenFlowPlayer = (erf) => {
    sound.ping();
    setFlowSimulator({
      isOpen: true,
      erf,
      currentStep: 0,
      isPlaying: false
    });
  };

  const handleStepNext = () => {
    if (!flowSimulator.erf) return;
    const steps = parseFlowSteps(flowSimulator.erf['flujo principal']);
    if (flowSimulator.currentStep < steps.length - 1) {
      sound.click();
      setFlowSimulator(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
    } else {
      sound.success();
      setFlowSimulator(prev => ({ ...prev, isPlaying: false }));
    }
  };

  const handleStepPrev = () => {
    if (flowSimulator.currentStep > 0) {
      sound.click();
      setFlowSimulator(prev => ({ ...prev, currentStep: prev.currentStep - 1 }));
    }
  };

  const handleResetFlow = () => {
    sound.click();
    setFlowSimulator(prev => ({ ...prev, currentStep: 0, isPlaying: false }));
  };

  return (
    <section id="requirements-section" className="scroll-mt-24 space-y-8">
      {/* Chapter Title & Header */}
      <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider font-semibold mb-2">
            <Layers className="w-4 h-4" />
            <span>Capítulo 05 • Especificación Formal IEEE 830</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Explorador Interactivo de Requisitos Funcionales (72 ERF)
          </h2>
          <p className="text-slate-400 text-sm max-w-3xl mt-1.5 leading-relaxed">
            Catálogo completo de especificaciones de ingeniería derivadas del SRS oficial. Cada ERF cuenta con actores, precondiciones, flujo algorítmico, reglas de negocio inmutables, criterios de aceptación y vinculación directa con su respectivo mockup.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full font-mono text-xs font-semibold">
            {filteredERFs.length} de 72 ERFs
          </span>
        </div>
      </div>

      {/* Module Filters Bar & Search Input */}
      <div className="bg-[#0B101B] p-4 sm:p-5 rounded-2xl border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          {/* Quick Search */}
          <div className="relative flex-1 max-w-md font-mono">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filtrar por código (ERF-05.04), título, actor o mockup..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-8 py-2 text-xs bg-[#06090F] border border-slate-700/80 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400 transition"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5 self-center">
            <Filter className="w-3.5 h-3.5 text-emerald-400" />
            <span>Filtro activo por módulo funcional</span>
          </div>
        </div>

        {/* Module Pill Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none font-mono">
          {MODULES.map((mod) => {
            const isSelected = selectedModule === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => {
                  sound.click();
                  setSelectedModule(mod.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition flex items-center gap-1.5 border ${
                  isSelected
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-sm'
                    : 'bg-[#06090F] text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                <span>{mod.name}</span>
                <span className={`px-1.5 py-0.2 rounded-md font-mono text-[10px] ${isSelected ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30' : 'bg-slate-900 text-slate-500'}`}>
                  {mod.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ERF Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredERFs.map((erf) => {
          const mockupFile = erf.mockup_id ? `${erf.mockup_id}.png` : null;
          return (
            <div
              key={erf.id}
              className="bg-[#0B101B] border border-slate-800 rounded-2xl p-5 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-950/20 transition flex flex-col justify-between group"
            >
              <div>
                {/* Card Top: ID & Badges */}
                <div className="flex items-start justify-between gap-2 mb-3 font-mono">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    {erf.id}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {erf.mockup_id && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                        {erf.mockup_id}
                      </span>
                    )}
                    <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                      {erf.prioridad || 'Alta'}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-bold text-white text-base group-hover:text-emerald-300 transition leading-snug">
                  {erf.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                  {erf['descripcin'] || erf.descripcion || 'Sin descripción formal'}
                </p>

                {/* Actor & Source Meta */}
                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span className="flex items-center gap-1 truncate max-w-[180px]">
                    <User className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span className="truncate text-slate-400">{erf['actor(es)'] || 'Usuario'}</span>
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {erf.fuente?.split('—')[0] || 'SRS'}
                  </span>
                </div>
              </div>

              {/* Card Actions */}
              <div className="mt-5 pt-3 border-t border-slate-800 flex items-center gap-2 font-mono">
                <button
                  onClick={() => {
                    sound.click();
                    setActiveERF(erf);
                  }}
                  className="flex-1 py-1.5 px-3 bg-[#06090F] hover:bg-slate-900 text-slate-300 hover:text-white rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5 border border-slate-800"
                >
                  <Eye className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Ficha Técnica</span>
                </button>

                <button
                  onClick={() => handleOpenFlowPlayer(erf)}
                  title="Simular Flujo Algorítmico Paso a Paso"
                  className="py-1.5 px-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1 border border-emerald-500/30 shrink-0"
                >
                  <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                  <span>Flujo</span>
                </button>

                {mockupFile && (
                  <button
                    onClick={() => {
                      sound.ping();
                      onOpenLightbox(`assets/mockups/${mockupFile}`, `${erf.mockup_id}: ${erf.mockup_title || erf.title}`, `Interfaz correspondiente al requisito ${erf.id}`);
                    }}
                    title="Ver Mockup Vinculado"
                    className="p-1.5 rounded-xl bg-[#06090F] hover:bg-slate-900 text-slate-400 border border-slate-800 hover:text-cyan-400 transition shrink-0"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ERF Detail Modal (14 canonical fields) */}
      {activeERF && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
          onClick={() => setActiveERF(null)}
        >
          <div 
            className="bg-[#0B101B] rounded-2xl border border-slate-800 shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 flex items-start justify-between bg-[#06090F]">
              <div>
                <div className="flex items-center gap-2 mb-1.5 font-mono">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    {activeERF.id}
                  </span>
                  {activeERF.mockup_id && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                      {activeERF.mockup_id}
                    </span>
                  )}
                  <span className="text-xs text-slate-500">
                    Prioridad: {activeERF.prioridad || 'Alta'}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">{activeERF.title}</h3>
              </div>
              <button 
                onClick={() => {
                  sound.click();
                  setActiveERF(null);
                }}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: 14 Canonical Fields */}
            <div className="p-6 overflow-y-auto space-y-5 text-sm">
              {/* Description */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">1. Descripción del Requisito</h4>
                <p className="text-slate-300 leading-relaxed bg-[#06090F] p-3.5 rounded-xl border border-slate-800">
                  {activeERF['descripcin'] || activeERF.descripcion}
                </p>
              </div>

              {/* Actors & Preconditions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                <div className="p-3.5 bg-[#06090F] rounded-xl border border-slate-800">
                  <h4 className="font-bold uppercase tracking-wider text-slate-400 mb-1">2. Actor(es)</h4>
                  <p className="text-emerald-400 font-semibold">{activeERF['actor(es)'] || 'Usuario'}</p>
                </div>
                <div className="p-3.5 bg-[#06090F] rounded-xl border border-slate-800">
                  <h4 className="font-bold uppercase tracking-wider text-slate-400 mb-1">3. Precondiciones</h4>
                  <p className="text-slate-300 font-sans">{activeERF.precondiciones || 'Ninguna previa'}</p>
                </div>
              </div>

              {/* Inputs */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">4. Entradas / Parámetros</h4>
                <p className="text-slate-300 bg-[#06090F] p-3 rounded-xl border border-slate-800 font-mono text-xs">
                  {activeERF.entradas || 'N/A'}
                </p>
              </div>

              {/* Main Flow (Step-by-Step) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">5. Flujo Principal Algorítmico</h4>
                  <button
                    onClick={() => {
                      const target = activeERF;
                      setActiveERF(null);
                      handleOpenFlowPlayer(target);
                    }}
                    className="text-xs font-mono font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition"
                  >
                    <Play className="w-3 h-3 fill-emerald-400" />
                    <span>Reproducir en Simulador</span>
                  </button>
                </div>
                <div className="space-y-2 bg-[#06090F] p-4 rounded-xl border border-slate-800">
                  {parseFlowSteps(activeERF['flujo principal']).map(s => (
                    <div key={s.stepNum} className="flex items-start gap-3 text-xs leading-relaxed text-slate-300">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono font-bold flex items-center justify-center shrink-0 text-[10px]">
                        {s.stepNum}
                      </span>
                      <span>{s.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business Rules & Exceptions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/25">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-1.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>6. Reglas de Negocio</span>
                  </h4>
                  <p className="text-xs text-emerald-200/90 leading-relaxed">{activeERF.reglas || 'Conforme a especificación base.'}</p>
                </div>

                <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/25">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 mb-1.5 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>7. Excepciones & Fallos</span>
                  </h4>
                  <p className="text-xs text-amber-200/90 leading-relaxed">{activeERF.excepciones || 'Reintento o validación de campos.'}</p>
                </div>
              </div>

              {/* Postconditions & Acceptance Criteria */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">8. Postcondiciones</h4>
                  <p className="text-xs text-slate-300 bg-[#06090F] p-3 rounded-xl border border-slate-800">
                    {activeERF.postcondiciones || 'Estado de la base de datos actualizado.'}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">9. Criterios de Aceptación</h4>
                  <p className="text-xs text-slate-300 bg-[#06090F] p-3 rounded-xl border border-slate-800">
                    {activeERF['criterios de aceptacin'] || activeERF.criterios_aceptacion || 'Verificación en ambiente de QA.'}
                  </p>
                </div>
              </div>

              {/* Dependencies & Linked Artifacts */}
              <div className="p-4 bg-[#06090F] rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <div>
                  <span className="text-slate-500">Dependencias Técnicas: </span>
                  <span className="font-semibold text-white">{activeERF.dependencias || 'Ninguna'}</span>
                </div>
                {activeERF.mockup_id && (
                  <button
                    onClick={() => {
                      const file = `${activeERF.mockup_id}.png`;
                      setActiveERF(null);
                      sound.ping();
                      onOpenLightbox(`assets/mockups/${file}`, `Mockup ${activeERF.mockup_id}`, `Pantalla vinculada a ${activeERF.id}`);
                    }}
                    className="px-3 py-1.5 bg-cyan-500/10 text-cyan-400 font-semibold rounded-lg border border-cyan-500/30 hover:bg-cyan-500/20 transition flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Abrir Mockup {activeERF.mockup_id} en HD</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-800 bg-[#06090F] flex justify-end font-mono">
              <button
                onClick={() => {
                  sound.click();
                  setActiveERF(null);
                }}
                className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-bold transition"
              >
                Cerrar Ficha
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ERF Flow Player Simulator (State Machine Swimlanes) */}
      {flowSimulator.isOpen && flowSimulator.erf && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
          onClick={() => setFlowSimulator(prev => ({ ...prev, isOpen: false }))}
        >
          <div 
            className="bg-[#0B101B] rounded-2xl border border-slate-800 shadow-2xl max-w-4xl w-full flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Simulator Header */}
            <div className="p-6 border-b border-slate-800 flex items-start justify-between bg-[#06090F] text-white">
              <div>
                <div className="flex items-center gap-2 mb-1 font-mono">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    SIMULADOR DE FLUJO PASO A PASO
                  </span>
                  <span className="text-xs text-slate-400">{flowSimulator.erf.id}</span>
                </div>
                <h3 className="text-xl font-bold">{flowSimulator.erf.title}</h3>
                <p className="text-xs text-slate-400 mt-1 font-mono">
                  Carriles de Actores: {flowSimulator.erf['actor(es)'] || 'Usuario'} ➔ Mercanex App ➔ ePayco Split ➔ PostgreSQL 16
                </p>
              </div>
              <button 
                onClick={() => setFlowSimulator(prev => ({ ...prev, isOpen: false }))}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Simulator Execution Stage */}
            {(() => {
              const steps = parseFlowSteps(flowSimulator.erf['flujo principal']);
              const current = steps[flowSimulator.currentStep] || { stepNum: 1, text: 'Inicio de flujo' };
              const progressPct = ((flowSimulator.currentStep + 1) / steps.length) * 100;

              return (
                <div className="p-6 space-y-6">
                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-xs text-slate-400 font-mono mb-2">
                      <span>Paso {flowSimulator.currentStep + 1} de {steps.length}</span>
                      <span className="text-emerald-400 font-bold">{Math.round(progressPct)}% Completado</span>
                    </div>
                    <div className="h-2 w-full bg-[#06090F] rounded-full overflow-hidden border border-slate-800">
                      <div 
                        className="h-full bg-emerald-400 transition-all duration-300 rounded-full shadow-[0_0_8px_rgba(0,245,155,0.7)]"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Actor Swimlanes Display */}
                  <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono">
                    <div className={`p-3 rounded-xl border transition ${flowSimulator.currentStep % 4 === 0 ? 'bg-emerald-500/15 border-emerald-400 text-emerald-400 font-bold shadow-sm' : 'bg-[#06090F] border-slate-800 text-slate-500'}`}>
                      <User className="w-4 h-4 mx-auto mb-1 opacity-80" />
                      <span>{flowSimulator.erf['actor(es)']?.split('.')[0] || 'Actor'}</span>
                    </div>
                    <div className={`p-3 rounded-xl border transition ${flowSimulator.currentStep % 4 === 1 ? 'bg-emerald-500/15 border-emerald-400 text-emerald-400 font-bold shadow-sm' : 'bg-[#06090F] border-slate-800 text-slate-500'}`}>
                      <Layers className="w-4 h-4 mx-auto mb-1 opacity-80" />
                      <span>Mercanex App</span>
                    </div>
                    <div className={`p-3 rounded-xl border transition ${flowSimulator.currentStep % 4 === 2 ? 'bg-emerald-500/15 border-emerald-400 text-emerald-400 font-bold shadow-sm' : 'bg-[#06090F] border-slate-800 text-slate-500'}`}>
                      <Sparkles className="w-4 h-4 mx-auto mb-1 opacity-80" />
                      <span>ePayco Split</span>
                    </div>
                    <div className={`p-3 rounded-xl border transition ${flowSimulator.currentStep % 4 === 3 ? 'bg-emerald-500/15 border-emerald-400 text-emerald-400 font-bold shadow-sm' : 'bg-[#06090F] border-slate-800 text-slate-500'}`}>
                      <Database className="w-4 h-4 mx-auto mb-1 opacity-80" />
                      <span>PostgreSQL 16</span>
                    </div>
                  </div>

                  {/* Step Description Card */}
                  <div className="p-6 bg-[#06090F] rounded-2xl border border-slate-800 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono font-bold flex items-center justify-center shrink-0 shadow-md">
                      {current.stepNum}
                    </div>
                    <div>
                      <h4 className="text-xs uppercase font-mono font-bold text-emerald-400 tracking-wider mb-1">
                        Acción Ejecutada en el Sistema
                      </h4>
                      <p className="text-base text-slate-200 font-medium leading-relaxed font-sans">
                        {current.text}
                      </p>
                    </div>
                  </div>

                  {/* Simulated Terminal Log */}
                  <div className="bg-[#06090F] text-slate-300 p-4 rounded-xl font-mono text-xs space-y-1 overflow-x-auto border border-slate-800/80 shadow-inner">
                    <div className="text-emerald-400">$ [MERCANEX_KERNEL_DISPATCH] Sequence trigger: {flowSimulator.erf.id}</div>
                    <div className="text-slate-500">» Timestamp: {new Date().toISOString()} • Step #{current.stepNum}</div>
                    <div className="text-cyan-400">» Payload: {JSON.stringify({ step: current.stepNum, actor: flowSimulator.erf['actor(es)'] || 'User', status: 'OK' })}</div>
                  </div>

                  {/* Simulator Controls */}
                  <div className="flex items-center justify-between pt-2 font-mono">
                    <button
                      onClick={handleResetFlow}
                      className="px-4 py-2 bg-[#06090F] hover:bg-slate-900 border border-slate-800 text-slate-300 rounded-xl text-xs font-semibold transition flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reiniciar</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleStepPrev}
                        disabled={flowSimulator.currentStep === 0}
                        className="px-4 py-2 bg-[#06090F] hover:bg-slate-900 border border-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 rounded-xl text-xs font-semibold transition"
                      >
                        Anterior
                      </button>

                      <button
                        onClick={handleStepNext}
                        className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                      >
                        <span>{flowSimulator.currentStep === steps.length - 1 ? 'Finalizar' : 'Siguiente Paso'}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </section>
  );
}
