import React from 'react';
import TechTerm from './TechTerm';
import { ShieldAlert, CheckCircle2, Cpu, Zap, Lock, Terminal } from 'lucide-react';

export default function QualitySecuritySection({ onSelectTerm }) {
  return (
    <section className="space-y-6" id="cap9-qa">
      <div className="border-b border-slate-200 pb-4">
        <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 block mb-0.5">
          Capítulo 09
        </span>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <ShieldAlert className="w-6 h-6 text-emerald-600" />
          Ciberseguridad, Plan de Pruebas (QA) y Acuerdos de Nivel de Servicio (SLAs)
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Defensa en profundidad, pruebas de carga con latencia <TechTerm id="p95-latency" onSelectTerm={onSelectTerm}>P95</TechTerm> y control criptográfico contra ataques de fuerza bruta y manipulación de datos.
        </p>
      </div>

      {/* Tarjetas de Controles de Seguridad */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
              AUTH CREDENCIALES
            </span>
            <Lock className="w-4 h-4 text-emerald-600" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">
            <TechTerm id="argon2id" onSelectTerm={onSelectTerm}>Argon2id</TechTerm>
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Hashing resistente a ataques por hardware acelerado (GPU y ASIC) mediante consumo controlado de RAM y CPU.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
              DOBLE FACTOR
            </span>
            <Cpu className="w-4 h-4 text-blue-600" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">
            <TechTerm id="two-factor" onSelectTerm={onSelectTerm}>2FA TOTP (RFC 6238)</TechTerm>
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Códigos efímeros que caducan cada 30 segundos requeridos obligatoriamente para acceso de comerciantes y administradores.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
              FIRMA CRIPTOGRÁFICA
            </span>
            <Zap className="w-4 h-4 text-emerald-600" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">
            <TechTerm id="hmac-sha256" onSelectTerm={onSelectTerm}>HMAC-SHA256</TechTerm>
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Validación de integridad sobre el payload de cada Webhook entrante de ePayco para neutralizar peticiones apócrifas.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded">
              ANTI-DUPLICIDAD
            </span>
            <CheckCircle2 className="w-4 h-4 text-purple-600" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">
            <TechTerm id="idempotencia" onSelectTerm={onSelectTerm}>Idempotencia en Pagos</TechTerm>
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Garantiza que reintentos de red de la pasarela no provoquen doble despacho de claves ni dupliquen transacciones.
          </p>
        </div>
      </div>

      {/* Tabla de Acuerdos de Nivel de Servicio (SLAs de Rendimiento) */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
            Acuerdos de Nivel de Servicio (SLAs de Rendimiento Técnico)
          </h4>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
            Pruebas con Apache JMeter
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/75 text-slate-700 border-b border-slate-200">
              <tr>
                <th className="p-3.5 font-bold">Métrica / Operación</th>
                <th className="p-3.5 font-bold">Umbral Comprometido (SLA)</th>
                <th className="p-3.5 font-bold">Resultado Medido</th>
                <th className="p-3.5 font-bold text-emerald-800">Dictamen Técnico</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-600">
              <tr>
                <td className="p-3.5 font-bold text-slate-900">
                  Latencia de Búsqueda en Catálogo (<TechTerm id="p95-latency" onSelectTerm={onSelectTerm}>P95</TechTerm>)
                </td>
                <td className="p-3.5 font-mono">&le; 250 milisegundos</td>
                <td className="p-3.5 font-mono font-bold text-emerald-700">142 ms</td>
                <td className="p-3.5 font-bold text-emerald-600">✓ CUMPLE CON SOBREMEDIDA</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-900">
                  Latencia en Reserva de Checkout (<TechTerm id="p95-latency" onSelectTerm={onSelectTerm}>P95</TechTerm>)
                </td>
                <td className="p-3.5 font-mono">&le; 600 milisegundos</td>
                <td className="p-3.5 font-mono font-bold text-emerald-700">310 ms</td>
                <td className="p-3.5 font-bold text-emerald-600">✓ CUMPLE CON SOBREMEDIDA</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-900">
                  Latencia Mensajes Chat WebSockets (Reverb)
                </td>
                <td className="p-3.5 font-mono">&le; 100 milisegundos</td>
                <td className="p-3.5 font-mono font-bold text-emerald-700">38 ms</td>
                <td className="p-3.5 font-bold text-emerald-600">✓ CUMPLE CON SOBREMEDIDA</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-900">
                  Tasa de Fallos en 100 Usuarios Concurrentes
                </td>
                <td className="p-3.5 font-mono">&lt; 0.5% transacciones fallidas</td>
                <td className="p-3.5 font-mono font-bold text-emerald-700">0.0% fallos</td>
                <td className="p-3.5 font-bold text-emerald-600">✓ CUMPLE CON SOBREMEDIDA</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
