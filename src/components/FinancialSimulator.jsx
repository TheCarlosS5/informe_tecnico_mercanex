import React, { useState } from 'react';
import TechTerm from './TechTerm';
import { DollarSign, CheckCircle2, AlertTriangle, TrendingUp, Server, Shield } from 'lucide-react';

export default function FinancialSimulator({ onSelectTerm }) {
  const [gmv, setGmv] = useState(15000000); // 15 millones COP
  const [proStores, setProStores] = useState(10);
  const [plusBuyers, setPlusBuyers] = useState(25);

  const formatCOP = (num) => {
    return '$' + Math.round(num).toLocaleString('es-CO') + ' COP';
  };

  // Cálculos financieros
  const avgTicket = 60000;
  const estimatedTx = Math.max(1, Math.round(gmv / avgTicket));

  // ePayco Tarifa (2.68% + $900 + IVA sobre tarifa)
  const epaycoVariable = gmv * 0.0268;
  const epaycoFixed = estimatedTx * 900;
  const epaycoTotalFee = (epaycoVariable + epaycoFixed) * 1.19;

  // Mercanex cobra 0% de comisión sobre ventas
  const sellerNet = Math.max(0, gmv - epaycoTotalFee);

  // Ingresos SaaS Freemium de Mercanex
  const revPro = proStores * 59000;
  const revPlus = plusBuyers * 14900;
  const totalSaasRevenue = revPro + revPlus;

  // Costo fijo mensual del servidor (Opex: VPS $15k + Dominio $4.5k)
  const monthlyOpex = 19583;

  // Utilidad neta de la plataforma
  const netPlatformProfit = totalSaasRevenue - monthlyOpex;
  const isProfitable = netPlatformProfit >= 0;

  return (
    <section className="space-y-6" id="cap7-costos">
      <div className="border-b border-slate-200 pb-4">
        <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 block mb-0.5">
          Capítulo 07
        </span>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <DollarSign className="w-6 h-6 text-emerald-600" />
          Estudio Financiero, Costos (Capex vs Opex) y Calculadora de Viabilidad
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Evaluación de Costo Total de Propiedad (<TechTerm id="capex-opex" onSelectTerm={onSelectTerm}>Capex vs Opex</TechTerm>) y simulador en vivo del <TechTerm id="tco-breakeven" onSelectTerm={onSelectTerm}>Punto de Equilibrio</TechTerm> del modelo <TechTerm id="saas-freemium" onSelectTerm={onSelectTerm}>SaaS Freemium</TechTerm>.
        </p>
      </div>

      {/* Tabla de Infraestructura Capex / Opex */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
            Estructura de Costos de Infraestructura y Herramientas (1 Año)
          </h4>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
            Capex = $0 COP
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/75 text-slate-700 border-b border-slate-200">
              <tr>
                <th className="p-3.5 font-bold">Rubro / Recurso</th>
                <th className="p-3.5 font-bold">Especificación Técnica</th>
                <th className="p-3.5 font-bold">Costo Mensual</th>
                <th className="p-3.5 font-bold">Costo Anual</th>
                <th className="p-3.5 font-bold">Naturaleza Contable</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-600">
              <tr>
                <td className="p-3.5 font-bold text-slate-900">Hosting Cloud VPS Linux</td>
                <td className="p-3.5">2 vCPU, 4 GB RAM, 80 GB SSD NVMe, IP dedicada</td>
                <td className="p-3.5 font-mono">$15.000 COP</td>
                <td className="p-3.5 font-mono">$180.000 COP</td>
                <td className="p-3.5">Gasto Operativo (Opex)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-900">Dominio Web (.co / .com)</td>
                <td className="p-3.5">Registro DNS con WHOIS y certificado SSL Let's Encrypt</td>
                <td className="p-3.5 font-mono">$4.583 COP</td>
                <td className="p-3.5 font-mono">$55.000 COP</td>
                <td className="p-3.5">Gasto Operativo (Opex)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-900">Motor PostgreSQL 16</td>
                <td className="p-3.5">Instalación nativa con almacenamiento en bloque SSD</td>
                <td className="p-3.5 font-mono text-emerald-700 font-bold">$0 COP</td>
                <td className="p-3.5 font-mono text-emerald-700 font-bold">$0 COP</td>
                <td className="p-3.5">Open Source Comunitario</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-900">Pasarela ePayco Split</td>
                <td className="p-3.5">API REST de pagos agregados sin cobro mensual fijo</td>
                <td className="p-3.5 font-mono text-emerald-700 font-bold">$0 COP fijo</td>
                <td className="p-3.5 font-mono text-emerald-700 font-bold">$0 COP fijo</td>
                <td className="p-3.5">Tarifa transaccional variable</td>
              </tr>
              <tr className="bg-emerald-50/50 font-bold">
                <td className="p-3.5 text-emerald-900" colSpan="2">TOTAL COSTOS OPERATIVOS FIJOS (OPEX ANUAL):</td>
                <td className="p-3.5 font-mono text-emerald-800">~$19.583 COP/mes</td>
                <td className="p-3.5 font-mono text-emerald-800 text-sm">$235.000 COP/año</td>
                <td className="p-3.5 text-emerald-800">Alta Autosuficiencia</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* CALCULADORA FINANCIERA INTERACTIVA */}
      <div className="bg-white border-2 border-emerald-500 rounded-xl p-6 shadow-card space-y-6">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 block mb-0.5">
              Simulador Interactivo en Vivo
            </span>
            <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
              Calculadora de Punto de Equilibrio y Distribución de Fondos
            </h3>
          </div>
          <span className="text-xs font-bold text-slate-400">Ajusta los deslizadores</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controles */}
          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Ventas Brutas Mensuales Procesadas (GMV):
                </label>
                <span className="text-sm font-extrabold font-mono text-emerald-600">
                  {formatCOP(gmv)}
                </span>
              </div>
              <input
                type="range"
                min="1000000"
                max="60000000"
                step="500000"
                value={gmv}
                onChange={(e) => setGmv(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <span className="text-[11px] text-slate-400 block mt-1">
                Aproximadamente {estimatedTx.toLocaleString()} transacciones con ticket promedio de $60.000 COP.
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Comercios con Plan Profesional ($59.000 COP/mes):
                </label>
                <span className="text-sm font-extrabold font-mono text-emerald-600">
                  {proStores} tiendas
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="1"
                value={proStores}
                onChange={(e) => setProStores(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Compradores con Membresía Plus ($14.900 COP/mes):
                </label>
                <span className="text-sm font-extrabold font-mono text-emerald-600">
                  {plusBuyers} compradores
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="150"
                step="5"
                value={plusBuyers}
                onChange={(e) => setPlusBuyers(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>
          </div>

          {/* Resultados de la Simulación */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col justify-between space-y-3">
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Monto Bruto Recaudado (GMV):</span>
                <span className="font-mono font-bold text-slate-900">{formatCOP(gmv)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Tarifa Pasarela ePayco (2.68% + $900 + IVA):</span>
                <span className="font-mono font-bold text-red-600">-{formatCOP(epaycoTotalFee)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200 bg-emerald-50 p-1.5 rounded">
                <span className="text-emerald-900 font-bold">Comisión de Venta Mercanex:</span>
                <span className="font-mono font-extrabold text-emerald-700">$0 COP (0.0%)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Dispersión Neta a Comerciantes:</span>
                <span className="font-mono font-bold text-slate-800">{formatCOP(sellerNet)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Ingresos SaaS Freemium Mercanex:</span>
                <span className="font-mono font-bold text-emerald-700">+{formatCOP(totalSaasRevenue)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Costo Operativo Fijo Servidor:</span>
                <span className="font-mono font-bold text-slate-700">-{formatCOP(monthlyOpex)}</span>
              </div>
            </div>

            {/* Resultado Final y Badge de Break-Even */}
            <div className="pt-2 border-t border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold text-slate-700">UTILIDAD OPERACIONAL MERCANEX:</span>
                <span className={`text-lg font-mono font-extrabold ${isProfitable ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {netPlatformProfit >= 0 ? '+' : ''}{formatCOP(netPlatformProfit)} / mes
                </span>
              </div>

              <div className={`p-3 rounded-lg text-xs font-semibold flex items-center gap-2 border ${
                isProfitable
                  ? 'bg-emerald-100/70 border-emerald-300 text-emerald-900'
                  : 'bg-amber-100/70 border-amber-300 text-amber-900'
              }`}>
                {isProfitable ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertTriangle className="w-4 h-4 text-amber-600" />}
                {isProfitable ? (
                  <span>
                    <strong>PUNTO DE EQUILIBRIO SUPERADO:</strong> Los ingresos por planes SaaS cubren el 100% de los costos operativos del servidor.
                  </span>
                ) : (
                  <span>
                    <strong>DÉFICIT TEMPORAL:</strong> Faltan {formatCOP(Math.abs(netPlatformProfit))} para equilibrar los costos fijos.
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
