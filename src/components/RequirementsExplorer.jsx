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

export default function RequirementsExplorer({ onOpenLightbox, onSelectTerm }) {
  const [selectedModule, setSelectedModule] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeERF, setActiveERF] = useState(null);
  const [flowSimulator, setFlowSimulator] = useState({
    isOpen: false,
    erf: null,
    currentStep: 0,
    isPlaying: false
  });

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
    // Matches patterns like "1. Step text. 2. Next text."
    const parts = flowStr.split(/(?=\b\d+\.\s+)/).map(s => s.trim()).filter(Boolean);
    return parts.map((step, idx) => {
      const clean = step.replace(/^\d+\.\s*/, '');
      return { stepNum: idx + 1, text: clean };
    });
  };

  const handleOpenFlowPlayer = (erf) => {
    sound.playChime(580, 0.15);
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
      sound.playClick();
      setFlowSimulator(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
    } else {
      sound.playSuccess();
      setFlowSimulator(prev => ({ ...prev, isPlaying: false }));
    }
  };

  const handleStepPrev = () => {
    if (flowSimulator.currentStep > 0) {
      sound.playClick();
      setFlowSimulator(prev => ({ ...prev, currentStep: prev.currentStep - 1 }));
    }
  };

  const handleResetFlow = () => {
    sound.playClick();
    setFlowSimulator(prev => ({ ...prev, currentStep: 0, isPlaying: false }));
  };

  return (
    <section id="requirements-section" className="scroll-mt-24 space-y-8">
      {/* Chapter Title & Header */}
      <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 font-mono text-xs uppercase tracking-wider font-semibold mb-2">
            <Layers className="w-4 h-4" />
            <span>Capítulo 05 • Especificación Formal IEEE 830</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Explorador Interactivo de Requisitos Funcionales (72 ERF)
          </h2>
          <p className="text-slate-600 text-sm max-w-3xl mt-1.5 leading-relaxed">
            Catálogo completo de especificaciones de ingeniería derivadas del SRS oficial. Cada ERF cuenta con actores, precondiciones, flujo algorítmico, reglas de negocio inmutables, criterios de aceptación y vinculación directa con su respectivo mockup.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-mono text-xs font-semibold">
            {filteredERFs.length} de 72 ERFs
          </span>
        </div>
      </div>

      {/* Module Filters Bar & Search Input */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          {/* Quick Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filtrar por código (ERF-05.04), título, actor o mockup..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="text-xs text-slate-500 flex items-center gap-1.5 self-center">
            <Filter className="w-3.5 h-3.5 text-emerald-600" />
            <span>Filtro activo por módulo funcional</span>
          </div>
        </div>

        {/* Module Pill Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {MODULES.map((mod) => {
            const isSelected = selectedModule === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedModule(mod.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition flex items-center gap-1.5 border ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span>{mod.name}</span>
                <span className={`px-1.5 py-0.2 rounded-md font-mono text-[10px] ${isSelected ? 'bg-slate-800 text-emerald-400' : 'bg-slate-200/80 text-slate-600'}`}>
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
              className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-emerald-300 hover:shadow-md transition flex flex-col justify-between group"
            >
              <div>
                {/* Card Top: ID & Badges */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {erf.id}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {erf.mockup_id && (
                      <span className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {erf.mockup_id}
                      </span>
                    )}
                    <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                      {erf.prioridad || 'Alta'}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-bold text-slate-900 text-base group-hover:text-emerald-700 transition leading-snug">
                  {erf.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                  {erf['descripcin'] || erf.descripcion || 'Sin descripción formal'}
                </p>

                {/* Actor & Source Meta */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1 truncate max-w-[180px]">
                    <User className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate">{erf['actor(es)'] || 'Usuario'}</span>
                  </span>
                  <span className="font-mono text-[10px] text-slate-400">
                    {erf.fuente?.split('—')[0] || 'SRS'}
                  </span>
                </div>
              </div>

              {/* Card Actions */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveERF(erf);
                  }}
                  className="flex-1 py-1.5 px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-medium transition flex items-center justify-center gap-1.5 border border-slate-200"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-500" />
                  <span>Ficha Técnica</span>
                </button>

                <button
                  onClick={() => handleOpenFlowPlayer(erf)}
                  title="Simular Flujo Algorítmico Paso a Paso"
                  className="py-1.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-medium transition flex items-center justify-center gap-1 border border-emerald-200 shrink-0"
                >
                  <Play className="w-3.5 h-3.5 text-emerald-700 fill-emerald-700" />
                  <span>Flujo</span>
                </button>

                {mockupFile && (
                  <button
                    onClick={() => {
                      sound.playClick();
                      onOpenLightbox(`/assets/mockups/${mockupFile}`, `${erf.mockup_id}: ${erf.mockup_title || erf.title}`, `Interfaz correspondiente al requisito ${erf.id}`);
                    }}
                    title="Ver Mockup Vinculado"
                    className="p-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-500 border border-slate-200 hover:text-slate-800 transition shrink-0"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ERF Detail Modal / Drawer (Canonical 14 Fields) */}
      {activeERF && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn"
          onClick={() => setActiveERF(null)}
        >
          <div 
            className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300">
                    {activeERF.id}
                  </span>
                  {activeERF.mockup_id && (
                    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                      MOCKUP {activeERF.mockup_id}
                    </span>
                  )}
                  <span className="text-xs uppercase font-semibold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                    Prioridad: {activeERF.prioridad || 'Alta'}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">{activeERF.title}</h3>
                <p className="text-xs text-slate-500 mt-1">Fuente de Requisito: {activeERF.fuente || 'SRS Mercanex V3'}</p>
              </div>
              <button 
                onClick={() => setActiveERF(null)}
                className="p-1.5 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: The 14 Canonical Fields */}
            <div className="p-6 overflow-y-auto space-y-6 text-sm">
              {/* Description */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">1. Descripción del Requisito</h4>
                <p className="text-slate-800 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  {activeERF['descripcin'] || activeERF.descripcion}
                </p>
              </div>

              {/* Actors & Preconditions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">2. Actor(es)</h4>
                  <p className="text-slate-800 font-medium">{activeERF['actor(es)'] || 'Usuario'}</p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">3. Precondiciones</h4>
                  <p className="text-slate-800">{activeERF.precondiciones || 'Ninguna previa'}</p>
                </div>
              </div>

              {/* Inputs */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">4. Entradas / Parámetros</h4>
                <p className="text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 font-mono text-xs">
                  {activeERF.entradas || 'N/A'}
                </p>
              </div>

              {/* Main Flow (Step-by-Step) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">5. Flujo Principal Algorítmico</h4>
                  <button
                    onClick={() => {
                      const target = activeERF;
                      setActiveERF(null);
                      handleOpenFlowPlayer(target);
                    }}
                    className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                  >
                    <Play className="w-3 h-3 fill-emerald-600" />
                    <span>Reproducir en Simulador</span>
                  </button>
                </div>
                <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {parseFlowSteps(activeERF['flujo principal']).map(s => (
                    <div key={s.stepNum} className="flex items-start gap-3 text-xs leading-relaxed text-slate-800">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-mono font-bold flex items-center justify-center shrink-0 text-[10px]">
                        {s.stepNum}
                      </span>
                      <span>{s.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business Rules & Exceptions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>6. Reglas de Negocio</span>
                  </h4>
                  <p className="text-xs text-emerald-950 leading-relaxed">{activeERF.reglas || 'Conforme a especificación base.'}</p>
                </div>

                <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-1.5 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>7. Excepciones & Fallos</span>
                  </h4>
                  <p className="text-xs text-amber-950 leading-relaxed">{activeERF.excepciones || 'Reintento o validación de campos.'}</p>
                </div>
              </div>

              {/* Postconditions & Acceptance Criteria */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">8. Postcondiciones</h4>
                  <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {activeERF.postcondiciones || 'Estado de la base de datos actualizado.'}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">9. Criterios de Aceptación</h4>
                  <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {activeERF['criterios de aceptacin'] || activeERF.criterios_aceptacion || 'Verificación en ambiente de QA.'}
                  </p>
                </div>
              </div>

              {/* Dependencies & Linked Artifacts */}
              <div className="p-4 bg-slate-100/60 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-slate-500">Dependencias Técnicas: </span>
                  <span className="font-semibold text-slate-800">{activeERF.dependencias || 'Ninguna'}</span>
                </div>
                {activeERF.mockup_id && (
                  <button
                    onClick={() => {
                      const file = `${activeERF.mockup_id}.png`;
                      setActiveERF(null);
                      onOpenLightbox(`/assets/mockups/${file}`, `Mockup ${activeERF.mockup_id}`, `Pantalla vinculada a ${activeERF.id}`);
                    }}
                    className="px-3 py-1.5 bg-white text-indigo-700 font-semibold rounded-lg border border-indigo-200 hover:bg-indigo-50 transition flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Abrir Mockup {activeERF.mockup_id} en HD</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-end">
              <button
                onClick={() => setActiveERF(null)}
                className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition"
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fadeIn"
          onClick={() => setFlowSimulator(prev => ({ ...prev, isOpen: false }))}
        >
          <div 
            className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-4xl w-full flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Simulator Header */}
            <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-900 text-white">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    SIMULADOR DE FLUJO PASO A PASO
                  </span>
                  <span className="font-mono text-xs text-slate-400">{flowSimulator.erf.id}</span>
                </div>
                <h3 className="text-xl font-bold">{flowSimulator.erf.title}</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Carriles de Actores: {flowSimulator.erf['actor(es)'] || 'Usuario'} ➔ Aplicación Mercanex ➔ Pasarela ePayco ➔ PostgreSQL 16
                </p>
              </div>
              <button 
                onClick={() => setFlowSimulator(prev => ({ ...prev, isOpen: false }))}
                className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
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
                    <div className="flex justify-between text-xs text-slate-500 font-mono mb-2">
                      <span>Paso {flowSimulator.currentStep + 1} de {steps.length}</span>
                      <span>{Math.round(progressPct)}% Completado</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 transition-all duration-300 rounded-full"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Actor Swimlanes Display */}
                  <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono">
                    <div className={`p-3 rounded-xl border transition ${flowSimulator.currentStep % 4 === 0 ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold shadow-sm' : 'bg-slate-50 border-slate-100 text-slate-500'}`}>
                      <User className="w-4 h-4 mx-auto mb-1 opacity-70" />
                      <span>{flowSimulator.erf['actor(es)']?.split('.')[0] || 'Actor'}</span>
                    </div>
                    <div className={`p-3 rounded-xl border transition ${flowSimulator.currentStep % 4 === 1 ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold shadow-sm' : 'bg-slate-50 border-slate-100 text-slate-500'}`}>
                      <Layers className="w-4 h-4 mx-auto mb-1 opacity-70" />
                      <span>Mercanex App</span>
                    </div>
                    <div className={`p-3 rounded-xl border transition ${flowSimulator.currentStep % 4 === 2 ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold shadow-sm' : 'bg-slate-50 border-slate-100 text-slate-500'}`}>
                      <Sparkles className="w-4 h-4 mx-auto mb-1 opacity-70" />
                      <span>ePayco Split</span>
                    </div>
                    <div className={`p-3 rounded-xl border transition ${flowSimulator.currentStep % 4 === 3 ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold shadow-sm' : 'bg-slate-50 border-slate-100 text-slate-500'}`}>
                      <Database className="w-4 h-4 mx-auto mb-1 opacity-70" />
                      <span>PostgreSQL 16</span>
                    </div>
                  </div>

                  {/* Step Description Card */}
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white font-mono font-bold flex items-center justify-center shrink-0 shadow-md">
                      {current.stepNum}
                    </div>
                    <div>
                      <h4 className="text-xs uppercase font-mono font-bold text-emerald-700 tracking-wider mb-1">
                        Acción Ejecutada en el Sistema
                      </h4>
                      <p className="text-base text-slate-800 font-medium leading-relaxed">
                        {current.text}
                      </p>
                    </div>
                  </div>

                  {/* Simulated Terminal Log */}
                  <div className="bg-slate-900 text-slate-300 p-4 rounded-xl font-mono text-xs space-y-1 overflow-x-auto shadow-inner">
                    <div className="text-emerald-400">$ [MERCANEX_KERNEL_DISPATCH] Sequence trigger: {flowSimulator.erf.id}</div>
                    <div className="text-slate-400">» Timestamp: {new Date().toISOString()} • Step #{current.stepNum}</div>
                    <div className="text-blue-300">» Payload: {JSON.stringify({ step: current.stepNum, actor: flowSimulator.erf['actor(es)'] || 'User', status: 'OK' })}</div>
                  </div>

                  {/* Simulator Controls */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={handleResetFlow}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reiniciar</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleStepPrev}
                        disabled={flowSimulator.currentStep === 0}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 rounded-xl text-xs font-semibold transition"
                      >
                        Anterior
                      </button>

                      <button
                        onClick={handleStepNext}
                        className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition flex items-center gap-1.5 shadow-sm"
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
