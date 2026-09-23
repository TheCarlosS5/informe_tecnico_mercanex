import React from 'react';
import TechTerm from './TechTerm';
import { AlertCircle, Target, CheckCircle2, Shield, Layers } from 'lucide-react';

export default function ChapterOneTwo({ onSelectTerm }) {
  return (
    <div className="space-y-12">
      {/* ==========================================================================
           CAPÍTULO 1: PLANTEAMIENTO DEL PROBLEMA Y JUSTIFICACIÓN
           ========================================================================== */}
      <section className="space-y-6" id="cap1-problema">
        <div className="border-b border-slate-200 pb-4">
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 block mb-0.5">
            Capítulo 01
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-emerald-600" />
            Planteamiento del Problema y Justificación del Sistema
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Diagnóstico de la informalidad en la compraventa de software digital en Colombia y formulación de la solución tecnológica.
          </p>
        </div>

        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          <p>
            En Colombia, el comercio electrónico de software y videojuegos digitales se encuentra gravemente distorsionado por la intermediación informal en redes sociales y foros no regulados. En este entorno, los compradores se exponen a estafas frecuentes, licencias revendidas múltiples veces (duplicadas), falta de garantías legales y desprotección frente a fallos de activación.
          </p>
          <p>
            Por otra parte, los marketplaces tradicionales imponen comisiones abusivas (entre el 12% y el 20%) y obligan a los compradores a realizar compras fragmentadas: si un usuario desea comprar tres programas de diferentes proveedores, debe realizar tres pagos bancarios separados, generando costos por transacciones múltiples y fricción en la experiencia de usuario.
          </p>
        </div>

        {/* Comparativa Bento: Informal vs Mercanex */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-red-200 rounded-xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-red-700 uppercase tracking-wider">
                Comercio Informal Actual (Problema)
              </span>
              <span className="text-xs font-bold text-red-600">68% Incidentes</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">✗</span>
                <span><strong>Sin Garantía Legal:</strong> Inexistencia de mecanismos de reclamación bajo el Estatuto del Consumidor (<TechTerm id="ley-1480" onSelectTerm={onSelectTerm}>Ley 1480 de 2011</TechTerm>).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">✗</span>
                <span><strong>Fuga Criptográfica:</strong> Almacenamiento de claves en texto plano en hojas de cálculo o bases de datos no cifradas.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">✗</span>
                <span><strong>Fricción de Pago:</strong> Imposibilidad de pagar una cesta combinada de diferentes tiendas en un solo débito bancario.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">✗</span>
                <span><strong>Comisiones Excesivas:</strong> Plataformas tradicionales cobran comisiones que ahogan el margen de microempresarios de TI.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white border-2 border-emerald-500 rounded-xl p-5 shadow-card space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                Solución Mercanex V3.0
              </span>
              <span className="text-xs font-bold text-emerald-600">Arquitectura Conforme</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Despacho Seguro:</strong> Revelado de licencias en memoria RAM mediante el <TechTerm id="visor-seguro" onSelectTerm={onSelectTerm}>Visor Seguro de Claves</TechTerm> tras confirmar el pago.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>0% Comisión Propia:</strong> La plataforma cobra $0 por venta a terceros; monetiza con suscripciones opcionales (<TechTerm id="saas-freemium" onSelectTerm={onSelectTerm}>SaaS Freemium</TechTerm>).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Dispersión Automática 1:N:</strong> Un único checkout bancario fraccionado automáticamente por <TechTerm id="epayco-split" onSelectTerm={onSelectTerm}>ePayco Pagos Divididos</TechTerm>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Garantía Estricta 48h:</strong> Módulo de Reclamaciones con sustitución automática o ejecución de <TechTerm id="split-refunds" onSelectTerm={onSelectTerm}>Split Refunds</TechTerm>.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs text-emerald-900 leading-relaxed">
          <strong>Cumplimiento de Software Legal:</strong> En estricto cumplimiento de la <TechTerm id="ley-603" onSelectTerm={onSelectTerm}>Ley 603 de 2000</TechTerm>, Mercanex prohíbe terminantemente la comercialización de activadores, cracks, cuentas compartidas o licencias apócrifas. Todos los comerciantes deben certificar la procedencia legal de sus inventarios durante el onboarding documental.
        </div>
      </section>

      {/* ==========================================================================
           CAPÍTULO 2: OBJETIVOS Y ALCANCE
           ========================================================================== */}
      <section className="space-y-6" id="cap2-objetivos">
        <div className="border-b border-slate-200 pb-4">
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 block mb-0.5">
            Capítulo 02
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Target className="w-6 h-6 text-emerald-600" />
            Objetivos del Proyecto y Alcance del Software
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Metas de desarrollo y delimitación funcional conforme a los 17 Requisitos Funcionales del SRS.
          </p>
        </div>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Objetivo General</h3>
          <p className="text-sm font-semibold text-slate-900 leading-relaxed">
            Diseñar, desarrollar e implementar una plataforma web de comercio electrónico tipo Marketplace bajo arquitectura de Software como Servicio (<TechTerm id="saas-freemium" onSelectTerm={onSelectTerm}>SaaS Freemium</TechTerm>), que automatice la publicación, compraventa, pago dividido multi-vendedor y entrega criptográficamente segura de licencias digitales de software y videojuegos en Colombia.
          </p>
        </div>

        {/* Tabla de Objetivos Específicos */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <div className="p-4 bg-slate-50 border-b border-slate-200">
            <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              Objetivos Específicos y Resultados Tangibles
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/75 text-slate-700 border-b border-slate-200">
                <tr>
                  <th className="p-3.5 font-bold w-1/6">Código</th>
                  <th className="p-3.5 font-bold w-5/12">Objetivo Específico</th>
                  <th className="p-3.5 font-bold w-5/12 text-emerald-800">Resultado Tangible en el Software</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-600">
                <tr>
                  <td className="p-3.5 font-bold text-slate-900">OE-01</td>
                  <td className="p-3.5">Implementar el módulo de autenticación robusta y gestión de identidades.</td>
                  <td className="p-3.5 font-medium">Registro dual, hashing con <TechTerm id="argon2id" onSelectTerm={onSelectTerm}>Argon2id</TechTerm> y <TechTerm id="two-factor" onSelectTerm={onSelectTerm}>2FA TOTP</TechTerm> (RFC 6238).</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-900">OE-02</td>
                  <td className="p-3.5">Desarrollar el Carrito Multi-Vendedor persistente y orquestación transaccional.</td>
                  <td className="p-3.5 font-medium">Agrupación por tienda, checkout unificado y generación de <TechTerm id="orden-global-suborden" onSelectTerm={onSelectTerm}>Orden Global con N Subórdenes</TechTerm>.</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-900">OE-03</td>
                  <td className="p-3.5">Integrar la pasarela de pagos agregadora con dispersión 1:N.</td>
                  <td className="p-3.5 font-medium">Conexión con <TechTerm id="epayco-split" onSelectTerm={onSelectTerm}>ePayco Pagos Divididos</TechTerm> con 0% de comisión propia y verificación HMAC-SHA256.</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-900">OE-04</td>
                  <td className="p-3.5">Garantizar la protección de inventario digital y control de concurrencia.</td>
                  <td className="p-3.5 font-medium">Cifrado <TechTerm id="aes-256" onSelectTerm={onSelectTerm}>AES-256-CBC</TechTerm>, <TechTerm id="select-for-update" onSelectTerm={onSelectTerm}>SELECT FOR UPDATE</TechTerm> y <TechTerm id="ttl-reserva" onSelectTerm={onSelectTerm}>TTL de 15 minutos</TechTerm>.</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-900">OE-05</td>
                  <td className="p-3.5">Construir canales de comunicación bidireccionales y resolución de garantías.</td>
                  <td className="p-3.5 font-medium">Chat WebSockets con <TechTerm id="laravel-reverb" onSelectTerm={onSelectTerm}>Laravel Reverb</TechTerm> y módulo de disputas SLA 48h con <TechTerm id="split-refunds" onSelectTerm={onSelectTerm}>Split Refunds</TechTerm>.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Matriz Resumen de los 17 Requisitos Funcionales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs space-y-1">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
              RF-01 al RF-06
            </span>
            <h4 className="text-sm font-bold text-slate-900 pt-1">Identidad, Tiendas & Onboarding</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Registro, verificación SMTP, 2FA TOTP, postulación comercial con RUT y vinculación de subcuenta bancaria ePayco.
            </p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs space-y-1">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
              RF-07 al RF-12
            </span>
            <h4 className="text-sm font-bold text-slate-900 pt-1">Catálogo, Carrito & Split 1:N</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Búsqueda facetada indexada, carrito multi-tienda, reserva pesimista con TTL y checkout ePayco con firma HMAC.
            </p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs space-y-1">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
              RF-13 al RF-17
            </span>
            <h4 className="text-sm font-bold text-slate-900 pt-1">Despacho, Chat, Garantías & Log</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Visor seguro en RAM, chat en vivo sobre WebSockets Reverb, disputas 48h bajo Ley 1480 y log inmutable forense.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
