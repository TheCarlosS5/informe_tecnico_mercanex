import React, { useState } from 'react';
import {
  GitMerge, CheckCircle2, ArrowRight, Layers, Image as ImageIcon,
  GitFork, Database, ShieldCheck, Sparkles, Filter, Eye, ExternalLink
} from 'lucide-react';
import { sound } from '../lib/soundSynthesizer';
import semanticData from '../data/mercanex_semantic_inventory.json';
import { DIAGRAMS_DATA } from '../data/diagramsData';

const TRACE_MODULES = [
  {
    rf: 'RF-01',
    name: 'Autenticación y Acceso',
    hu: 'HU-01 (Acceso sencillo y seguro)',
    erfs: ['ERF-01.01', 'ERF-01.02', 'ERF-01.03', 'ERF-01.04', 'ERF-01.05', 'ERF-01.06', 'ERF-01.07', 'ERF-01.08'],
    mockups: ['M01', 'M02', 'M03', 'M04', 'M05', 'M06', 'M07', 'M08'],
    diagrams: ['D01', 'D02'],
    tables: ['usuarios', 'sesiones'],
    tests: ['CP-01', 'CP-02', 'CP-03', 'CP-04']
  },
  {
    rf: 'RF-02',
    name: 'Gestión Vendedor y Tienda',
    hu: 'HU-02 (Publicación y gestión de bienes digitales)',
    erfs: ['ERF-02.01', 'ERF-02.02', 'ERF-02.03', 'ERF-02.04', 'ERF-02.05', 'ERF-02.06', 'ERF-02.07', 'ERF-02.08'],
    mockups: ['M09', 'M10', 'M11', 'M12', 'M13', 'M14', 'M15', 'M16'],
    diagrams: ['D03', 'D04', 'D14'],
    tables: ['tiendas', 'usuarios'],
    tests: ['CP-05', 'CP-06']
  },
  {
    rf: 'RF-03',
    name: 'Publicaciones e Inventario',
    hu: 'HU-03 (Gestión de inventario digital)',
    erfs: ['ERF-03.01', 'ERF-03.02', 'ERF-03.03', 'ERF-03.04', 'ERF-03.05', 'ERF-03.06', 'ERF-03.07', 'ERF-03.08', 'ERF-03.09'],
    mockups: ['M17', 'M18', 'M19', 'M20', 'M21', 'M22', 'M23', 'M24', 'M25'],
    diagrams: ['D05', 'D06'],
    tables: ['publicaciones', 'inventario_digital', 'categorias', 'imagenes_publicacion'],
    tests: ['CP-07', 'CP-08']
  },
  {
    rf: 'RF-04',
    name: 'Búsqueda y Navegación',
    hu: 'HU-04 (Búsqueda y filtrado de bienes digitales)',
    erfs: ['ERF-04.01', 'ERF-04.02', 'ERF-04.03', 'ERF-04.04', 'ERF-04.05', 'ERF-04.06', 'ERF-04.07'],
    mockups: ['M26', 'M27', 'M28', 'M29', 'M30', 'M31', 'M32'],
    diagrams: ['D07'],
    tables: ['publicaciones', 'categorias'],
    tests: ['CP-09']
  },
  {
    rf: 'RF-05',
    name: 'Compra, Pago y Entrega',
    hu: 'HU-07 (Compra y confirmación de pago)',
    erfs: ['ERF-05.01', 'ERF-05.02', 'ERF-05.03', 'ERF-05.04', 'ERF-05.05', 'ERF-05.06', 'ERF-05.07', 'ERF-05.08', 'ERF-05.09', 'ERF-05.10', 'ERF-05.11'],
    mockups: ['M33', 'M34', 'M35', 'M36', 'M37', 'M38', 'M39', 'M40', 'M41', 'M42', 'M43'],
    diagrams: ['D08', 'D09'],
    tables: ['pedidos', 'subordenes', 'pagos', 'entregas', 'inventario_digital'],
    tests: ['CP-10', 'CP-11', 'CP-12']
  },
  {
    rf: 'RF-06',
    name: 'Chat y Notificaciones',
    hu: 'HU-05 / HU-06 (Soporte directo entre partes)',
    erfs: ['ERF-06.01', 'ERF-06.02', 'ERF-06.03', 'ERF-06.04', 'ERF-06.05', 'ERF-06.06', 'ERF-06.07', 'ERF-06.08', 'ERF-06.09'],
    mockups: ['M44', 'M45', 'M46', 'M47', 'M48', 'M49', 'M50', 'M51', 'M52'],
    diagrams: ['D10', 'D11'],
    tables: ['mensajes', 'conversaciones', 'notificaciones'],
    tests: ['CP-13', 'CP-14']
  },
  {
    rf: 'RF-07',
    name: 'Reputación y Reclamos',
    hu: 'Garantías y Protección Ley 1480',
    erfs: ['ERF-07.01', 'ERF-07.02', 'ERF-07.03', 'ERF-07.04', 'ERF-07.05', 'ERF-07.06', 'ERF-07.07', 'ERF-07.08', 'ERF-07.09', 'ERF-07.10'],
    mockups: ['M53', 'M54', 'M55', 'M56', 'M57', 'M58', 'M59', 'M60', 'M61', 'M62'],
    diagrams: ['D12', 'D13_REC'],
    tables: ['reclamaciones', 'calificaciones'],
    tests: ['CP-15']
  },
  {
    rf: 'RF-08',
    name: 'Administración y Control',
    hu: 'HU-08 / HU-09 & Decisiones de Gobernanza',
    erfs: ['ERF-08.01', 'ERF-08.02', 'ERF-08.03', 'ERF-08.04', 'ERF-08.05', 'ERF-08.06', 'ERF-08.07', 'ERF-08.08', 'ERF-08.09', 'ERF-08.10'],
    mockups: ['M63', 'M64', 'M65', 'M66', 'M67', 'M68', 'M69', 'M70', 'M71', 'M72'],
    diagrams: ['D14', 'D15'],
    tables: ['acciones_administrativas'],
    tests: ['CP-16']
  }
];

export default function TraceabilityExplorer({ onOpenLightbox }) {
  const [selectedRF, setSelectedRF] = useState('RF-05');
  const [selectedERF, setSelectedERF] = useState('ERF-05.07');
  const [viewMode, setViewMode] = useState('lineage'); // 'lineage' | 'matrix'

  const activeModule = TRACE_MODULES.find(m => m.rf === selectedRF) || TRACE_MODULES[4];

  const handleSelectRF = (rf) => {
    sound.click();
    setSelectedRF(rf);
    const mod = TRACE_MODULES.find(m => m.rf === rf);
    if (mod && mod.erfs.length > 0) {
      setSelectedERF(mod.erfs[0]);
    }
  };

  const handleSelectERF = (erf) => {
    sound.click();
    setSelectedERF(erf);
  };

  const findDiagramFile = (dId) => {
    const diag = DIAGRAMS_DATA.find(d => d.id === dId || d.file.startsWith(dId + '_'));
    return diag ? diag.file : 'D13_DER_Modelo_Entidad_Relacion_PostgreSQL16.png';
  };

  return (
    <section id="traceability-section" className="scroll-mt-24 space-y-8">
      {/* Chapter Title & Header */}
      <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 font-mono text-xs uppercase tracking-wider font-semibold mb-2">
            <GitMerge className="w-4 h-4" />
            <span>Capítulo 09 • Trazabilidad End-to-End</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Matriz de Trazabilidad y Linaje Causal de Ingeniería
          </h2>
          <p className="text-slate-600 text-sm max-w-3xl mt-1.5 leading-relaxed">
            Demostración empírica de conformidad técnica: cada Historia de Usuario se descompone en un Requisito Funcional, se detalla en especificaciones ERF, se plasma en un Mockup UI, se modela en diagramas UML, persiste en tablas relacionales de PostgreSQL 16 y se valida mediante Casos de Prueba formalizados.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1.5 p-1 bg-[#F8FAFC] rounded-md border border-slate-200 self-start md:self-auto font-mono text-xs">
          <button
            onClick={() => {
              sound.click();
              setViewMode('lineage');
            }}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              viewMode === 'lineage'
                ? 'bg-emerald-500/20 text-emerald-700 border border-emerald-500/40 shadow-sm'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            Linaje Causal Dinámico
          </button>
          <button
            onClick={() => {
              sound.click();
              setViewMode('matrix');
            }}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              viewMode === 'matrix'
                ? 'bg-emerald-500/20 text-emerald-700 border border-emerald-500/40 shadow-sm'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            Matriz Tabular Completa
          </button>
        </div>
      </div>

      {viewMode === 'lineage' ? (
        /* DYNAMIC CAUSAL LINEAGE EXPLORER */
        <div className="bg-[#F8FAFC] rounded-lg border border-slate-200 shadow-sm p-6 space-y-6">
          {/* Module Selector Ribbon */}
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-600 block mb-2">
              1. Selecciona un Módulo Funcional para Iniciar la Cadena Causal:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 font-mono">
              {TRACE_MODULES.map((m) => {
                const isSelected = selectedRF === m.rf;
                return (
                  <button
                    key={m.rf}
                    onClick={() => handleSelectRF(m.rf)}
                    className={`p-3 rounded-md border text-center transition flex flex-col items-center justify-center ${
                      isSelected
                        ? 'bg-emerald-500/20 text-emerald-700 border-emerald-500/50 shadow-md ring-1 ring-emerald-500/30'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-800'
                    }`}
                  >
                    <span className="text-xs font-bold">{m.rf}</span>
                    <span className="text-[10px] truncate w-full mt-0.5 opacity-80">{m.name.split(':')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Causal Chain Stage */}
          <div className="p-6 bg-white rounded-lg border border-slate-200/80 space-y-6">
            <div className="flex flex-wrap items-center justify-between border-b border-slate-200 pb-3 gap-2 font-mono">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase">
                  Cadena Activa: {activeModule.rf} — {activeModule.name}
                </span>
                <p className="text-xs text-slate-600 mt-0.5">
                  Origen de Requisito: <strong className="text-slate-900">{activeModule.hu}</strong>
                </p>
              </div>
              <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-700 border border-emerald-500/30 rounded-full text-[11px] font-bold">
                Trazabilidad 100% Conforme
              </span>
            </div>

            {/* Step-by-Step Causal Columns */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 font-mono">
              {/* Node 1: ERF Selection */}
              <div className="p-4 bg-[#F8FAFC] rounded-md border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Requisito ERF</span>
                </span>
                <div className="space-y-1 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
                  {activeModule.erfs.map((erfId) => {
                    const isERFSelected = selectedERF === erfId;
                    return (
                      <button
                        key={erfId}
                        onClick={() => handleSelectERF(erfId)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold transition ${
                          isERFSelected
                            ? 'bg-emerald-500/20 text-emerald-700 border border-emerald-500/40'
                            : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/60'
                        }`}
                      >
                        {erfId}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Node 2: Linked Mockup */}
              <div className="p-4 bg-[#F8FAFC] rounded-md border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1">
                  <ImageIcon className="w-3.5 h-3.5 text-cyan-700" />
                  <span>Mockup de UI/UX</span>
                </span>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
                  {activeModule.mockups.map((mId) => (
                    <div
                      key={mId}
                      onClick={() => {
                        sound.ping();
                        onOpenLightbox(`assets/mockups/${mId}.png`, `Mockup ${mId}`, `Pantalla oficial de ${activeModule.rf}`);
                      }}
                      className="cursor-pointer p-2 rounded-lg bg-white hover:bg-slate-100 text-cyan-700 border border-slate-200 hover:border-cyan-500/40 flex items-center justify-between text-xs font-semibold transition"
                    >
                      <span>{mId}.png</span>
                      <ExternalLink className="w-3 h-3 text-cyan-700" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Node 3: Linked UML Diagram */}
              <div className="p-4 bg-[#F8FAFC] rounded-md border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1">
                  <GitFork className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Diagramas UML</span>
                </span>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
                  {activeModule.diagrams.map((dId) => {
                    const file = findDiagramFile(dId);
                    return (
                      <div
                        key={dId}
                        onClick={() => {
                          sound.ping();
                          onOpenLightbox(`assets/diagrams/${file}`, `Diagrama ${dId}`, `Diagrama de ingeniería oficial para ${activeModule.rf}`);
                        }}
                        className="cursor-pointer p-2 rounded-lg bg-white hover:bg-slate-100 text-emerald-700 border border-slate-200 hover:border-emerald-500/40 flex items-center justify-between text-xs font-semibold transition"
                      >
                        <span>{dId}</span>
                        <Eye className="w-3 h-3 text-emerald-700" />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Node 4: PostgreSQL 16 Tables */}
              <div className="p-4 bg-[#F8FAFC] rounded-md border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1">
                  <Database className="w-3.5 h-3.5 text-amber-400" />
                  <span>Persistencia BD</span>
                </span>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
                  {activeModule.tables.map((tName) => (
                    <div
                      key={tName}
                      className="p-2 rounded-lg bg-white text-amber-300 border border-slate-200 text-xs font-medium"
                    >
                      <span>{tName}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Node 5: QA Test Cases */}
              <div className="p-4 bg-[#F8FAFC] rounded-md border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
                  <span>Casos de Prueba</span>
                </span>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
                  {activeModule.tests.map((cpId) => (
                    <div
                      key={cpId}
                      className="p-2 rounded-lg bg-white text-rose-300 border border-slate-200 text-xs font-bold flex items-center justify-between"
                    >
                      <span>{cpId}</span>
                      <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* FULL TABULAR MATRIX (Matching Table T089) */
        <div className="bg-[#F8FAFC] rounded-lg border border-slate-200 shadow-sm overflow-hidden font-mono">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-white text-slate-600 uppercase text-[11px] tracking-wider border-b border-slate-200">
                  <th className="py-3.5 px-4 font-semibold">Módulo RF</th>
                  <th className="py-3.5 px-4 font-semibold">Especificaciones ERF</th>
                  <th className="py-3.5 px-4 font-semibold">Mockups UI</th>
                  <th className="py-3.5 px-4 font-semibold">Diagramas UML</th>
                  <th className="py-3.5 px-4 font-semibold">Tablas PostgreSQL 16</th>
                  <th className="py-3.5 px-4 font-semibold">Pruebas QA</th>
                  <th className="py-3.5 px-4 font-semibold">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/80 text-slate-700">
                {TRACE_MODULES.map((row) => (
                  <tr key={row.rf} className="hover:bg-slate-100/60 transition">
                    <td className="py-3 px-4 font-bold text-slate-900">
                      <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded text-emerald-700">
                        {row.rf}
                      </span>
                      <div className="text-[11px] font-sans font-normal text-slate-600 mt-1">{row.name}</div>
                    </td>
                    <td className="py-3 px-4 text-emerald-700 font-semibold">
                      {row.erfs[0]} a {row.erfs[row.erfs.length - 1]} ({row.erfs.length} ERFs)
                    </td>
                    <td className="py-3 px-4 text-cyan-700">
                      {row.mockups[0]} a {row.mockups[row.mockups.length - 1]}
                    </td>
                    <td className="py-3 px-4 text-emerald-800">
                      {row.diagrams.join(', ')}
                    </td>
                    <td className="py-3 px-4 text-amber-300">
                      {row.tables.join(', ')}
                    </td>
                    <td className="py-3 px-4 text-rose-300 font-semibold">
                      {row.tests.join(', ')}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-700 border border-emerald-500/30">
                        <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                        <span>Verificado</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}
