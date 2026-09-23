import React, { useState } from 'react';
import TechTerm from './TechTerm';
import { ArrowRightLeft, ShieldCheck, Globe, CreditCard, Code, CheckCircle2 } from 'lucide-react';

export default function GatewayComparator({ onSelectTerm }) {
  const [activeTab, setActiveTab] = useState('comparative');

  return (
    <section className="space-y-6" id="cap3-arquitectura">
      <div className="border-b border-slate-200 pb-4">
        <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 block mb-0.5">
          Capítulo 03
        </span>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <ArrowRightLeft className="w-6 h-6 text-emerald-600" />
          Arquitectura del Sistema y Hoja de Ruta de Pasarelas de Pago
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Evolución arquitectónica: ePayco Pagos Divididos para Colombia (Fase 1) y Adyen for Platforms para la expansión internacional (Fase 2) desacopladas mediante el <TechTerm id="adapter-pattern" onSelectTerm={onSelectTerm}>Patrón Adapter</TechTerm>.
        </p>
      </div>

      {/* Tarjetas Comparativas Bento */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Fase 1: ePayco */}
        <div className="bg-white border-2 border-emerald-500 rounded-xl p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-1 text-xs font-extrabold text-emerald-800 bg-emerald-100 rounded-md">
              FASE 1: OPERATIVA ACTUAL (COLOMBIA)
            </span>
            <span className="text-xs font-mono font-bold text-slate-500">Moneda: COP</span>
          </div>

          <h3 className="text-xl font-extrabold text-slate-900">
            <TechTerm id="epayco-split" onSelectTerm={onSelectTerm}>ePayco Pagos Divididos (Split 1:N)</TechTerm>
          </h3>

          <p className="text-sm text-slate-600 leading-relaxed">
            Opera bajo el <TechTerm id="modelo-agregador" onSelectTerm={onSelectTerm}>Modelo Agregador</TechTerm> de ePayco. Permite a los compradores colombianos pagar mediante PSE, tarjetas de crédito/débito y efectivo (Efecty, Gana). En una única transacción, la pasarela fracciona el dinero y dispersa los saldos netos directamente a las subcuentas bancarias de los vendedores.
          </p>

          <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Comisión de Venta Mercanex:</span>
              <span className="font-extrabold text-emerald-600 text-sm">0% COP ($0)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Tarifa de Pasarela:</span>
              <span className="font-mono font-semibold text-slate-700">2.68% + $900 COP + IVA</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Onboarding Vendedores:</span>
              <span className="font-medium text-slate-700">RUT y Certificación Bancaria en backend</span>
            </div>
          </div>
        </div>

        {/* Fase 2: Adyen */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4 hover:border-blue-400 transition-colors">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-1 text-xs font-extrabold text-blue-800 bg-blue-100 rounded-md">
              FASE 2: EXPANSIÓN GLOBAL (HOJA DE RUTA)
            </span>
            <span className="text-xs font-mono font-bold text-slate-500">Multimoneda: USD, EUR, COP</span>
          </div>

          <h3 className="text-xl font-extrabold text-slate-900">
            <TechTerm id="adyen-platforms" onSelectTerm={onSelectTerm}>Adyen for Platforms</TechTerm>
          </h3>

          <p className="text-sm text-slate-600 leading-relaxed">
            Plataforma corporativa de nivel empresarial para operar en más de 30 países. Integra <TechTerm id="hosted-onboarding" onSelectTerm={onSelectTerm}>Hosted Onboarding</TechTerm> (delegación legal AML/KYC en la pasarela), <TechTerm id="balance-accounts" onSelectTerm={onSelectTerm}>Balance Accounts</TechTerm> virtuales y una <TechTerm id="liable-account" onSelectTerm={onSelectTerm}>Liable Balance Account</TechTerm> institucional contra contracargos.
          </p>

          <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Comisión de Venta Mercanex:</span>
              <span className="font-extrabold text-emerald-600 text-sm">0% (SaaS Freemium)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Tarifa de Pasarela:</span>
              <span className="font-mono font-semibold text-slate-700">Interchange++ (~0.6% + adquirencia)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Separación Patrimonial:</span>
              <span className="font-medium text-emerald-700">Subcuentas segregadas automáticas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla Técnica Formal */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="p-4 bg-slate-50 border-b border-slate-200">
          <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
            Matriz Comparativa de Ingeniería: ePayco vs Adyen for Platforms
          </h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/75 text-slate-700 border-b border-slate-200">
              <tr>
                <th className="p-3.5 font-bold w-1/4">Criterio Técnico</th>
                <th className="p-3.5 font-bold w-3/8 text-emerald-800">Fase 1: ePayco Pagos Divididos (Colombia)</th>
                <th className="p-3.5 font-bold w-3/8 text-blue-800">Fase 2: Adyen for Platforms (Expansión)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-600">
              <tr>
                <td className="p-3.5 font-bold text-slate-900">Cobertura Geográfica</td>
                <td className="p-3.5 font-medium">Colombia (Moneda nacional COP).</td>
                <td className="p-3.5 font-medium">Global (+30 países, multimoneda USD, EUR, GBP, COP).</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-900">Métodos Soportados</td>
                <td className="p-3.5">PSE, Tarjetas crédito/débito nacionales, Efecty, Gana.</td>
                <td className="p-3.5">Apple Pay, Google Pay, iDEAL, Klarna, Tarjetas globales.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-900">Proceso KYC / Onboarding</td>
                <td className="p-3.5">Carga de RUT y certificación bancaria verificada en Mercanex.</td>
                <td className="p-3.5">Hosted Onboarding 100% delegado en Adyen (cero datos bancarios en BD).</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-900">Segregación Contable</td>
                <td className="p-3.5">Dispersión bancaria directa vía ACH a la cuenta del vendedor.</td>
                <td className="p-3.5">Cuentas virtuales de saldo (Balance Accounts) con dispersión programada.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-900">Gestión de Reembolsos</td>
                <td className="p-3.5">Reversión manual o programada por suborden vía API ePayco.</td>
                <td className="p-3.5">Split Refunds nativos con débito exclusivo al vendedor infractor.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-900">Comisión Mercanex</td>
                <td className="p-3.5 font-bold text-emerald-600">0% Comisión de Venta</td>
                <td className="p-3.5 font-bold text-emerald-600">0% Comisión de Venta</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-900">Esfuerzo de Migración</td>
                <td className="p-3.5">100% Implementado y certificado en el proyecto.</td>
                <td className="p-3.5">0 cambios en base de datos; activación mediante Adapter en Laravel.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Código del Patrón Adapter */}
      <div className="bg-slate-900 rounded-xl p-5 text-white shadow-lg space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold font-mono text-emerald-300">
              app/Contracts/MarketplaceSplitGatewayInterface.php
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">
            Patrón Adapter (POO)
          </span>
        </div>

        <pre className="text-xs font-mono text-emerald-300 leading-relaxed overflow-x-auto p-2 bg-slate-950 rounded-lg">
{`interface MarketplaceSplitGatewayInterface {
    public function createSplitTransaction(Order $order, Collection $suborders): GatewayResponse;
    public function verifyWebhookSignature(Request $request): bool;
    public function processSplitRefund(Suborder $suborder, float $amount): RefundResult;
    public function getSellerOnboardingUrl(SellerProfile $seller): string;
}`}
        </pre>

        <p className="text-xs text-slate-400 leading-relaxed">
          El controlador de Checkout inyecta esta interfaz en el contenedor de dependencias de Laravel. Para alternar entre ePayco y Adyen basta con cambiar la variable de entorno <code className="text-emerald-300 font-mono">PAYMENT_GATEWAY_DRIVER=epayco</code> sin modificar la lógica transaccional.
        </p>
      </div>
    </section>
  );
}
