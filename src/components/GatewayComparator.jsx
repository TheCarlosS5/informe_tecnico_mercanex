import React, { useState } from 'react';
import TechTerm from './TechTerm';
import { ArrowRightLeft, ShieldCheck, Globe, CreditCard, Code, CheckCircle2, Layers, Table, FileCode } from 'lucide-react';
import { sound } from '../lib/soundSynthesizer';

export default function GatewayComparator({ onSelectTerm }) {
  const [activeTab, setActiveTab] = useState('all');

  const handleTabChange = (tab) => {
    sound.click();
    setActiveTab(tab);
  };

  return (
    <section className="space-y-6" id="cap3-arquitectura">
      <div className="border-b border-slate-200 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 block mb-0.5">
              Capítulo 03 • Pasarelas de Pago
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <ArrowRightLeft className="w-6 h-6 text-emerald-700" />
              <span>Arquitectura y Hoja de Ruta de Pasarelas de Pago</span>
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Evolución arquitectónica: ePayco Pagos Divididos para Colombia (Fase 1) y Adyen for Platforms para la expansión internacional (Fase 2) desacopladas mediante el <TechTerm id="adapter-pattern" onSelectTerm={onSelectTerm}>Patrón Adapter</TechTerm>.
            </p>
          </div>

          {/* Selector de Pestañas / Filtro de Vistas */}
          <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-md self-start sm:self-center font-mono text-xs">
            <button
              onClick={() => handleTabChange('all')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'all'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Todo</span>
            </button>
            <button
              onClick={() => handleTabChange('cards')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'cards'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Tarjetas</span>
            </button>
            <button
              onClick={() => handleTabChange('matrix')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'matrix'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>Matriz Técnica</span>
            </button>
            <button
              onClick={() => handleTabChange('adapter')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'adapter'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Adapter POO</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tarjetas Comparativas Bento */}
      {(activeTab === 'all' || activeTab === 'cards') && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
          {/* Fase 1: ePayco */}
          <div className="bg-[#F8FAFC] border border-emerald-500/40 rounded-lg p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 text-xs font-mono font-bold text-emerald-700 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                FASE 1: OPERATIVA ACTUAL (COLOMBIA)
              </span>
              <span className="text-xs font-mono font-bold text-slate-600">Moneda: COP</span>
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              <TechTerm id="epayco-split" onSelectTerm={onSelectTerm}>ePayco Pagos Divididos (Split 1:N)</TechTerm>
            </h3>

            <p className="text-sm text-slate-700 leading-relaxed">
              Opera bajo el <TechTerm id="modelo-agregador" onSelectTerm={onSelectTerm}>Modelo Agregador</TechTerm> de ePayco. Permite a los compradores colombianos pagar mediante PSE, tarjetas de crédito/débito y efectivo (Efecty, Gana). En una única transacción, la pasarela fracciona el dinero y dispersa los saldos netos directamente a las subcuentas bancarias de los vendedores.
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-200 text-xs font-mono">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Comisión de Venta Mercanex:</span>
                <span className="font-extrabold text-emerald-700 text-sm">0% COP ($0)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Tarifa de Pasarela:</span>
                <span className="font-semibold text-slate-800">2.68% + $900 COP + IVA</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Onboarding Vendedores:</span>
                <span className="font-medium text-slate-800">RUT y Certificación Bancaria en backend</span>
              </div>
            </div>
          </div>

          {/* Fase 2: Adyen */}
          <div className="bg-[#F8FAFC] border border-slate-200 rounded-lg p-6 shadow-sm space-y-4 hover:border-cyan-500/40 transition-colors">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 text-xs font-mono font-bold text-cyan-700 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                FASE 2: EXPANSIÓN GLOBAL (HOJA DE RUTA)
              </span>
              <span className="text-xs font-mono font-bold text-slate-600">Multimoneda: USD, EUR, COP</span>
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              <TechTerm id="adyen-platforms" onSelectTerm={onSelectTerm}>Adyen for Platforms</TechTerm>
            </h3>

            <p className="text-sm text-slate-700 leading-relaxed">
              Plataforma corporativa de nivel empresarial para operar en más de 30 países. Integra <TechTerm id="hosted-onboarding" onSelectTerm={onSelectTerm}>Hosted Onboarding</TechTerm> (delegación legal AML/KYC en la pasarela), <TechTerm id="balance-accounts" onSelectTerm={onSelectTerm}>Balance Accounts</TechTerm> virtuales y una <TechTerm id="liable-account" onSelectTerm={onSelectTerm}>Liable Balance Account</TechTerm> institucional contra contracargos.
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-200 text-xs font-mono">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Comisión de Venta Mercanex:</span>
                <span className="font-extrabold text-emerald-700 text-sm">0% (SaaS Freemium)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Tarifa de Pasarela:</span>
                <span className="font-semibold text-slate-800">Interchange++ (~0.6% + adquirencia)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Separación Patrimonial:</span>
                <span className="font-medium text-emerald-700">Subcuentas segregadas automáticas</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tabla Técnica Formal */}
      {(activeTab === 'all' || activeTab === 'matrix') && (
        <div className="bg-[#F8FAFC] border border-slate-200 rounded-lg overflow-hidden shadow-sm animate-fadeIn">
          <div className="p-4 bg-white border-b border-slate-200">
            <h4 className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
              Matriz Comparativa de Ingeniería: ePayco vs Adyen for Platforms
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/80 text-slate-600 border-b border-slate-200 font-mono">
                <tr>
                  <th className="p-3.5 font-bold w-1/4">Criterio Técnico</th>
                  <th className="p-3.5 font-bold w-3/8 text-emerald-700">Fase 1: ePayco Pagos Divididos (Colombia)</th>
                  <th className="p-3.5 font-bold w-3/8 text-cyan-700">Fase 2: Adyen for Platforms (Expansión)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/80 text-slate-700">
                <tr>
                  <td className="p-3.5 font-bold text-slate-900 font-mono">Cobertura Geográfica</td>
                  <td className="p-3.5 font-medium">Colombia (Moneda nacional COP).</td>
                  <td className="p-3.5 font-medium">Global (+30 países, multimoneda USD, EUR, GBP, COP).</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-900 font-mono">Métodos Soportados</td>
                  <td className="p-3.5">PSE, Tarjetas crédito/débito nacionales, Efecty, Gana.</td>
                  <td className="p-3.5">Apple Pay, Google Pay, iDEAL, Klarna, Tarjetas globales.</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-900 font-mono">Proceso KYC / Onboarding</td>
                  <td className="p-3.5">Carga de RUT y certificación bancaria verificada en Mercanex.</td>
                  <td className="p-3.5">Hosted Onboarding 100% delegado en Adyen (cero datos bancarios en BD).</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-900 font-mono">Segregación Contable</td>
                  <td className="p-3.5">Dispersión bancaria directa vía ACH a la cuenta del vendedor.</td>
                  <td className="p-3.5">Cuentas virtuales de saldo (Balance Accounts) con dispersión programada.</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-900 font-mono">Gestión de Reembolsos</td>
                  <td className="p-3.5">Reversión manual o programada por suborden vía API ePayco.</td>
                  <td className="p-3.5">Split Refunds nativos con débito exclusivo al vendedor infractor.</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-900 font-mono">Comisión Mercanex</td>
                  <td className="p-3.5 font-bold text-emerald-700">0% Comisión de Venta</td>
                  <td className="p-3.5 font-bold text-emerald-700">0% Comisión de Venta</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-900 font-mono">Esfuerzo de Migración</td>
                  <td className="p-3.5">100% Implementado y certificado en el proyecto.</td>
                  <td className="p-3.5">0 cambios en base de datos; activación mediante Adapter en Laravel.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Código del Patrón Adapter */}
      {(activeTab === 'all' || activeTab === 'adapter') && (
        <div className="bg-[#F8FAFC] border border-slate-200 rounded-lg p-5 text-slate-900 shadow-sm space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-emerald-700" />
              <span className="text-xs font-bold font-mono text-emerald-800">
                app/Contracts/MarketplaceSplitGatewayInterface.php
              </span>
            </div>
            <span className="text-[10px] text-slate-600 font-mono">
              Patrón Adapter (POO)
            </span>
          </div>

          <pre className="text-xs font-mono text-emerald-800 leading-relaxed overflow-x-auto p-3 bg-white border border-slate-200/80 rounded-md">
{`interface MarketplaceSplitGatewayInterface {
    public function createSplitTransaction(Order $order, Collection $suborders): GatewayResponse;
    public function verifyWebhookSignature(Request $request): bool;
    public function processSplitRefund(Suborder $suborder, float $amount): RefundResult;
    public function getSellerOnboardingUrl(SellerProfile $seller): string;
}`}
          </pre>

          <p className="text-xs text-slate-600 leading-relaxed font-mono">
            El controlador de Checkout inyecta esta interfaz en el contenedor de dependencias de Laravel. Para alternar entre ePayco y Adyen basta con cambiar la variable de entorno <code className="text-emerald-700 font-mono">PAYMENT_GATEWAY_DRIVER=epayco</code> sin modificar la lógica transaccional.
          </p>
        </div>
      )}
    </section>
  );
}
