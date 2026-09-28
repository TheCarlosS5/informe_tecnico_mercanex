import React, { useState, useMemo } from 'react';
import TechTerm from './TechTerm';
import { ShieldAlert, CheckCircle2, Cpu, Zap, Lock, Terminal, Search, CheckSquare, ChevronRight, Layers, FileCheck } from 'lucide-react';
import inventory from '../data/mercanex_semantic_inventory.json';
import { sound } from '../lib/soundSynthesizer';

export default function QualitySecuritySection({ onSelectTerm }) {
  const [qaSearch, setQaSearch] = useState('');
  const [selectedTestCase, setSelectedTestCase] = useState(null);

  const testCases = inventory.test_cases || [];

  const filteredTestCases = useMemo(() => {
    return testCases.filter((tc) => {
      const q = qaSearch.toLowerCase();
      return (
        tc.id.toLowerCase().includes(q) ||
        tc.title.toLowerCase().includes(q) ||
        tc.reference.toLowerCase().includes(q) ||
        tc.expected_result.toLowerCase().includes(q)
      );
    });
  }, [testCases, qaSearch]);

  const handleSelectTC = (tc) => {
    sound.click();
    setSelectedTestCase(tc);
  };

  return (
    <section className="space-y-6" id="cap9-qa">
      <div className="border-b border-slate-200 pb-4">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 block mb-0.5">
          Capítulo 12 • Aseguramiento de Calidad y Ciberseguridad
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <ShieldAlert className="w-6 h-6 text-emerald-700" />
          <span>Ciberseguridad, Plan de Pruebas (QA) y Acuerdos de Nivel de Servicio (SLAs)</span>
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Defensa en profundidad, pruebas de carga con latencia <TechTerm id="p95-latency" onSelectTerm={onSelectTerm}>P95</TechTerm> y control criptográfico contra ataques de fuerza bruta y manipulación de datos.
        </p>
      </div>

      {/* Tarjetas de Controles de Seguridad */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#F8FAFC] border border-slate-200 rounded-lg p-4 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
              AUTH CREDENCIALES
            </span>
            <Lock className="w-4 h-4 text-emerald-700" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">
            <TechTerm id="argon2id" onSelectTerm={onSelectTerm}>Argon2id</TechTerm>
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Hashing resistente a ataques por hardware acelerado (GPU y ASIC) mediante consumo controlado de RAM y CPU.
          </p>
        </div>

        <div className="bg-[#F8FAFC] border border-slate-200 rounded-lg p-4 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-cyan-700 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded">
              DOBLE FACTOR
            </span>
            <Cpu className="w-4 h-4 text-cyan-700" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">
            <TechTerm id="two-factor" onSelectTerm={onSelectTerm}>2FA TOTP (RFC 6238)</TechTerm>
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Códigos efímeros que caducan cada 30 segundos requeridos obligatoriamente para acceso de comerciantes y administradores.
          </p>
        </div>

        <div className="bg-[#F8FAFC] border border-slate-200 rounded-lg p-4 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
              FIRMA CRIPTOGRÁFICA
            </span>
            <Zap className="w-4 h-4 text-emerald-700" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">
            <TechTerm id="hmac-sha256" onSelectTerm={onSelectTerm}>HMAC-SHA256</TechTerm>
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Validación de integridad sobre el payload de cada Webhook entrante de ePayco para neutralizar peticiones apócrifas.
          </p>
        </div>

        <div className="bg-[#F8FAFC] border border-slate-200 rounded-lg p-4 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded">
              ANTI-DUPLICIDAD
            </span>
            <CheckCircle2 className="w-4 h-4 text-purple-400" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">
            <TechTerm id="idempotencia" onSelectTerm={onSelectTerm}>Idempotencia en Pagos</TechTerm>
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Garantiza que reintentos de red de la pasarela no provoquen doble despacho de claves ni dupliquen transacciones.
          </p>
        </div>
      </div>

      {/* Tabla de Acuerdos de Nivel de Servicio (SLAs de Rendimiento) */}
      <div className="bg-[#F8FAFC] border border-slate-200 rounded-lg overflow-hidden shadow-sm">
        <div className="p-4 bg-white border-b border-slate-200 flex items-center justify-between">
          <h4 className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
            Acuerdos de Nivel de Servicio (SLAs de Rendimiento Técnico)
          </h4>
          <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
            Pruebas con Apache JMeter
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/80 text-slate-600 border-b border-slate-200 font-mono">
              <tr>
                <th className="p-3.5 font-bold">Métrica / Operación</th>
                <th className="p-3.5 font-bold">Umbral Comprometido (SLA)</th>
                <th className="p-3.5 font-bold">Resultado Medido</th>
                <th className="p-3.5 font-bold text-emerald-700">Dictamen Técnico</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              <tr>
                <td className="p-3.5 font-bold text-slate-900 font-mono">
                  Latencia de Búsqueda en Catálogo (<TechTerm id="p95-latency" onSelectTerm={onSelectTerm}>P95</TechTerm>)
                </td>
                <td className="p-3.5 font-mono text-slate-600">&le; 250 milisegundos</td>
                <td className="p-3.5 font-mono font-bold text-emerald-700">142 ms</td>
                <td className="p-3.5 font-bold text-emerald-700 font-mono">✓ CUMPLE CON SOBREMEDIDA</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-900 font-mono">
                  Latencia en Reserva de Checkout (<TechTerm id="p95-latency" onSelectTerm={onSelectTerm}>P95</TechTerm>)
                </td>
                <td className="p-3.5 font-mono text-slate-600">&le; 600 milisegundos</td>
                <td className="p-3.5 font-mono font-bold text-emerald-700">310 ms</td>
                <td className="p-3.5 font-bold text-emerald-700 font-mono">✓ CUMPLE CON SOBREMEDIDA</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-900 font-mono">
                  Latencia Mensajes Chat WebSockets (Reverb)
                </td>
                <td className="p-3.5 font-mono text-slate-600">&le; 100 milisegundos</td>
                <td className="p-3.5 font-mono font-bold text-emerald-700">38 ms</td>
                <td className="p-3.5 font-bold text-emerald-700 font-mono">✓ CUMPLE CON SOBREMEDIDA</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-900 font-mono">
                  Tasa de Fallos en 100 Usuarios Concurrentes
                </td>
                <td className="p-3.5 font-mono text-slate-600">&lt; 0.5% transacciones fallidas</td>
                <td className="p-3.5 font-mono font-bold text-emerald-700">0.0% fallos</td>
                <td className="p-3.5 font-bold text-emerald-700 font-mono">✓ CUMPLE CON SOBREMEDIDA</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* PLAN OFICIAL DE PRUEBAS DE CALIDAD (QA) • 20 CASOS DE PRUEBA (CP-01 a CP-20) */}
      <div className="bg-[#F8FAFC] border border-slate-200 rounded-lg overflow-hidden shadow-sm space-y-4 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-emerald-700" />
              <h3 className="text-lg font-bold text-slate-900">
                Plan Oficial de Pruebas de Calidad (QA) • 20 Casos de Prueba (CP-01 a CP-20)
              </h3>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Matriz completa de verificación funcional y no funcional definida en la especificación técnica SRS de Mercanex.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={qaSearch}
              onChange={(e) => setQaSearch(e.target.value)}
              placeholder="Buscar caso (ej: CP-06, 2FA, Split)..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-300/80 rounded-md text-slate-900 font-mono placeholder:text-slate-400 focus:outline-none focus:border-emerald-400 shadow-inner"
            />
          </div>
        </div>

        {/* Tabla Interactiva de Casos de Prueba */}
        <div className="overflow-x-auto rounded-md border border-slate-200/80">
          <table className="w-full text-left text-xs">
            <thead className="bg-white text-slate-600 font-mono border-b border-slate-200">
              <tr>
                <th className="p-3 font-bold w-20">ID</th>
                <th className="p-3 font-bold w-1/4">Título del Caso</th>
                <th className="p-3 font-bold w-1/5 text-emerald-700">Requerimiento Vinculado</th>
                <th className="p-3 font-bold">Resultado Esperado / Criterio de Aceptación</th>
                <th className="p-3 font-bold w-28 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/60 text-slate-700">
              {filteredTestCases.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-slate-500 font-mono">
                    No se encontraron casos de prueba para el criterio "{qaSearch}".
                  </td>
                </tr>
              ) : (
                filteredTestCases.map((tc) => (
                  <tr
                    key={tc.id}
                    onClick={() => handleSelectTC(tc)}
                    className="hover:bg-slate-200/40 cursor-pointer transition-colors group"
                  >
                    <td className="p-3 font-mono font-bold text-emerald-700 group-hover:text-emerald-800">
                      {tc.id}
                    </td>
                    <td className="p-3 font-bold text-slate-900 font-sans">
                      {tc.title}
                    </td>
                    <td className="p-3 font-mono text-cyan-700 text-[11px]">
                      {tc.reference}
                    </td>
                    <td className="p-3 text-slate-700 text-xs">
                      {tc.expected_result}
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectTC(tc);
                        }}
                        className="px-2.5 py-1 text-[11px] font-mono font-bold bg-emerald-500/10 text-emerald-700 border border-emerald-500/30 rounded-lg hover:bg-emerald-500/20 transition"
                      >
                        Examinar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between text-xs font-mono text-slate-600 pt-2">
          <span>Mostrando {filteredTestCases.length} de {testCases.length} Casos de Prueba Formales</span>
          <span className="text-emerald-700 font-bold">Cobertura SRS: 100% (20/20 Casos)</span>
        </div>
      </div>

      {/* Modal Inspector de Caso de Prueba */}
      {selectedTestCase && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedTestCase(null)}
        >
          <div
            className="bg-[#F8FAFC] border border-emerald-500/40 rounded-lg max-w-lg w-full p-6 shadow-sm space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 font-mono font-black text-xs text-emerald-700 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                  {selectedTestCase.id}
                </span>
                <h4 className="text-base font-bold text-slate-900">
                  {selectedTestCase.title}
                </h4>
              </div>
              <button
                onClick={() => setSelectedTestCase(null)}
                className="text-slate-600 hover:text-slate-900 p-1 rounded-lg text-lg leading-none"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 bg-white border border-slate-200 rounded-md space-y-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Requerimiento SRS Asociado:</span>
                <span className="text-sm font-bold text-cyan-700">{selectedTestCase.reference}</span>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-md space-y-1 font-sans">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-mono block">Resultado Esperado / Aceptación:</span>
                <p className="text-sm text-slate-800 leading-relaxed">{selectedTestCase.expected_result}</p>
              </div>

              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-md flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-emerald-700 uppercase tracking-wider block">Estado de Especificación:</span>
                  <span className="text-xs font-bold text-emerald-800">Auditado y Verificado en SRS V3.0</span>
                </div>
                <CheckCircle2 className="w-5 h-5 text-emerald-700" />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedTestCase(null)}
                className="px-4 py-1.5 text-xs font-mono font-bold bg-slate-200 hover:bg-slate-700 text-slate-800 rounded-md transition"
              >
                Cerrar Ficha
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
