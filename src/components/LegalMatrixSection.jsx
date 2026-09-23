import React from 'react';
import TechTerm from './TechTerm';
import { Scale, FileText, ShieldCheck, Check, AlertOctagon } from 'lucide-react';

export default function LegalMatrixSection({ onSelectTerm }) {
  return (
    <section className="space-y-6" id="cap8-legal">
      <div className="border-b border-slate-200 pb-4">
        <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 block mb-0.5">
          Capítulo 08
        </span>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <Scale className="w-6 h-6 text-emerald-600" />
          Licenciamiento del Software y Marco Legal Colombiano
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Gobernanza de propiedad intelectual, protección de datos personales (<TechTerm id="ley-1581" onSelectTerm={onSelectTerm}>Habeas Data</TechTerm>) y garantías comerciales bajo el Estatuto del Consumidor.
        </p>
      </div>

      {/* Triple Dimensión de Licenciamiento */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
              DIMENSIÓN 01
            </span>
            <FileText className="w-4 h-4 text-emerald-600" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            Mercanex como SaaS Propietario
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            El código fuente es propiedad intelectual exclusiva del equipo de aprendices del SENA. Los usuarios aceptan un acuerdo <TechTerm id="eula-tos" onSelectTerm={onSelectTerm}>EULA / ToS</TechTerm> de uso del servicio en la nube sin transferencia de derechos patrimoniales sobre el software.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-mono text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
              DIMENSIÓN 02
            </span>
            <ShieldCheck className="w-4 h-4 text-blue-600" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            Librerías Open Source Permisivas
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            El stack base (PHP 8.2+, Laravel 11, Tailwind CSS, Alpine.js, PostgreSQL 16) opera bajo licencias libres permisivas (MIT y PostgreSQL License), autorizando el uso comercial sin pago de regalías ni obligaciones copyleft.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
              DIMENSIÓN 03
            </span>
            <Scale className="w-4 h-4 text-emerald-600" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            Software Comercial Comercializado
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Cumplimiento riguroso de la <TechTerm id="ley-603" onSelectTerm={onSelectTerm}>Ley 603 de 2000</TechTerm>. Se prohíbe de forma absoluta la venta de claves crackeadas, activadores o cuentas compartidas, exigiendo procedencia legítima de mayoristas oficiales.
          </p>
        </div>
      </div>

      {/* Matriz de Normatividad Colombiana */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="p-4 bg-slate-50 border-b border-slate-200">
          <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
            Matriz de Cumplimiento de la Legislación Colombiana
          </h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/75 text-slate-700 border-b border-slate-200">
              <tr>
                <th className="p-3.5 font-bold w-1/4">Norma Legal</th>
                <th className="p-3.5 font-bold w-1/3">Materia Regulada</th>
                <th className="p-3.5 font-bold w-5/12 text-emerald-800">Mecanismo Técnico de Cumplimiento en Mercanex</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-600">
              <tr>
                <td className="p-3.5 font-bold text-slate-900">
                  <TechTerm id="ley-1581" onSelectTerm={onSelectTerm}>Ley 1581 de 2012</TechTerm> (Habeas Data)
                </td>
                <td className="p-3.5">Protección de datos personales y derecho de supresión.</td>
                <td className="p-3.5 font-medium">
                  Protocolo de anonimización: purga de credenciales, secretos 2FA y correos de contacto, manteniendo las transacciones bajo un identificador seudonimizado.
                </td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-900">
                  <TechTerm id="ley-527" onSelectTerm={onSelectTerm}>Ley 527 de 1999</TechTerm> (Comercio Electrónico)
                </td>
                <td className="p-3.5">Validez jurídica de mensajes de datos y deber de conservación por 5 años.</td>
                <td className="p-3.5 font-medium">
                  Conservación inmutable de tablas <code className="text-emerald-700 font-mono">orders</code> y <code className="text-emerald-700 font-mono">suborders</code> durante 60 meses en base de datos para responder a requerimientos contables y tributarios de la DIAN.
                </td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-900">
                  <TechTerm id="ley-1480" onSelectTerm={onSelectTerm}>Ley 1480 de 2011</TechTerm> (Estatuto del Consumidor)
                </td>
                <td className="p-3.5">Garantía legal sobre bienes defectuosos y derecho a reclamo post-venta.</td>
                <td className="p-3.5 font-medium">
                  Ventana formal de 48 horas post-entrega para radicar reclamos por clave inválida, activando la sustitución automática de la clave o la reversión económica vía <TechTerm id="split-refunds" onSelectTerm={onSelectTerm}>Split Refund</TechTerm>.
                </td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-900">
                  <TechTerm id="ley-603" onSelectTerm={onSelectTerm}>Ley 603 de 2000</TechTerm> (Antipiratería de Software)
                </td>
                <td className="p-3.5">Obligatoriedad de cumplir normas sobre derechos de autor y software legítimo.</td>
                <td className="p-3.5 font-medium">
                  Prohibición explícita de cuentas compartidas o activadores en los Términos de Servicio, moderación de catálogo previa publicación y expulsión inmediata de infractores.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
