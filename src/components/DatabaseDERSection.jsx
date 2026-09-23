import React, { useState } from 'react';
import TechTerm from './TechTerm';
import { Database, Key, Shield, Layers, Eye } from 'lucide-react';

export default function DatabaseDERSection({ onSelectTerm, onOpenLightbox }) {
  const [selectedTable, setSelectedTable] = useState('orders');

  const tables = [
    {
      name: "orders",
      label: "orders (Orden Global)",
      desc: "Representa el pago único maestro realizado por el comprador a través de ePayco. Contiene el total consolidado en COP, estado general y token bancario.",
      pk: "id (UUID v4)",
      fk: "user_id -> users(id)",
      fields: ["id UUID PK", "user_id UUID FK", "total_amount NUMERIC(12,2)", "epayco_ref VARCHAR", "status VARCHAR", "created_at TIMESTAMP"]
    },
    {
      name: "suborders",
      label: "suborders (Subórdenes 1:N)",
      desc: "Contratos de venta individuales por cada comercio dentro del Carrito Multi-Vendedor. Permite aislamiento de garantías, estados independientes y dispersión de fondos.",
      pk: "id (UUID v4)",
      fk: "order_id -> orders(id), seller_id -> seller_profiles(id)",
      fields: ["id UUID PK", "order_id UUID FK", "seller_id UUID FK", "subtotal NUMERIC(12,2)", "status VARCHAR", "created_at TIMESTAMP"]
    },
    {
      name: "digital_keys",
      label: "digital_keys (Claves Cifradas)",
      desc: "Almacén criptográfico de claves y licencias. Los códigos están protegidos con cifrado simétrico AES-256-CBC con vector de inicialización único.",
      pk: "id (UUID v4)",
      fk: "product_id -> products(id), suborder_id -> suborders(id)",
      fields: ["id UUID PK", "product_id UUID FK", "encrypted_key TEXT (AES-256)", "iv VARCHAR(32)", "status VARCHAR (disponible/reservada/vendida)", "reserved_until TIMESTAMP"]
    },
    {
      name: "seller_profiles",
      label: "seller_profiles (Comercios)",
      desc: "Expediente del vendedor verificado con RUT saneado y subcuenta vinculada en la pasarela agregadora ePayco para transferencias ACH automáticas.",
      pk: "id (UUID v4)",
      fk: "user_id -> users(id)",
      fields: ["id UUID PK", "user_id UUID FK", "store_name VARCHAR", "rut_number VARCHAR", "epayco_subaccount_id VARCHAR", "status VARCHAR", "rating NUMERIC(3,2)"]
    },
    {
      name: "freemium_subscriptions",
      label: "freemium_subscriptions (SaaS)",
      desc: "Control de membresías de tiendas (Planes Gratis, Emprendedor y Profesional). Fuente principal de monetización del software.",
      pk: "id (UUID v4)",
      fk: "seller_id -> seller_profiles(id)",
      fields: ["id UUID PK", "seller_id UUID FK", "plan_type VARCHAR", "monthly_price NUMERIC(10,2)", "valid_until TIMESTAMP", "is_active BOOLEAN"]
    },
    {
      name: "claims",
      label: "claims (Reclamaciones 48h)",
      desc: "Módulo legal bajo el Estatuto del Consumidor (Ley 1480 de 2011). Permite abrir disputas dentro de las 48 horas post-compra.",
      pk: "id (UUID v4)",
      fk: "suborder_id -> suborders(id), buyer_id -> users(id)",
      fields: ["id UUID PK", "suborder_id UUID FK", "buyer_id UUID FK", "reason VARCHAR", "status VARCHAR", "resolved_at TIMESTAMP"]
    },
    {
      name: "audit_logs",
      label: "audit_logs (Trazabilidad Forense)",
      desc: "Registro inmutable de seguridad. Almacena IP, User-Agent y hash de operaciones sensibles para cumplir con la Ley 527 de 1999 (5 años de conservación).",
      pk: "id (BIGSERIAL / UUID)",
      fk: "user_id -> users(id) [nullable]",
      fields: ["id UUID PK", "user_id UUID FK", "action VARCHAR", "ip_address INET", "user_agent TEXT", "payload_hash VARCHAR(64)", "created_at TIMESTAMP"]
    }
  ];

  const activeTableData = tables.find(t => t.name === selectedTable) || tables[0];

  return (
    <section className="space-y-6" id="cap6-der">
      <div className="border-b border-slate-200 pb-4">
        <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 block mb-0.5">
          Capítulo 06
        </span>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <Database className="w-6 h-6 text-emerald-600" />
          Modelo de Base de Datos Relacional (PostgreSQL 16)
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Arquitectura relacional de 14 entidades en Tercera Forma Normal (3FN), con claves primarias <TechTerm id="uuid-v4" onSelectTerm={onSelectTerm}>UUID v4</TechTerm>, soporte transaccional <TechTerm id="postgresql-acid" onSelectTerm={onSelectTerm}>ACID</TechTerm> y control de concurrencia mediante <TechTerm id="select-for-update" onSelectTerm={onSelectTerm}>SELECT FOR UPDATE</TechTerm>.
        </p>
      </div>

      {/* Visor del Diagrama DER Maestro */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-card space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            D13: Diagrama Entidad-Relación PostgreSQL 16 (Resolución 300 DPI)
          </span>
          <button
            onClick={() => onOpenLightbox('assets/diagrams/D13_DER_Modelo_Entidad_Relacion_PostgreSQL16.png', 'D13: Modelo Entidad-Relación PostgreSQL 16 (DER)', 'Esquema relacional maestro de 14 tablas en 3FN con UUID v4, campos cifrados AES-256 e integridad referencial estricta.')}
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            <Eye className="w-4 h-4" />
            Ampliar Diagrama Completo
          </button>
        </div>

        <div 
          onClick={() => onOpenLightbox('assets/diagrams/D13_DER_Modelo_Entidad_Relacion_PostgreSQL16.png', 'D13: Modelo Entidad-Relación PostgreSQL 16 (DER)', 'Esquema relacional maestro de 14 tablas en 3FN con UUID v4, campos cifrados AES-256 e integridad referencial estricta.')}
          className="w-full h-80 bg-slate-950 rounded-lg p-2 flex items-center justify-center cursor-pointer group relative overflow-hidden"
        >
          <img
            src="assets/diagrams/D13_DER_Modelo_Entidad_Relacion_PostgreSQL16.png"
            alt="DER PostgreSQL 16 Mercanex"
            className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors" />
        </div>
      </div>

      {/* Inspector Interactivo de Tablas */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-600" />
            Explorador Interactivo de Entidades Transaccionales
          </h3>
          <span className="text-xs text-slate-400">Selecciona una tabla para ver atributos</span>
        </div>

        {/* Botones de Tablas */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {tables.map(t => (
            <button
              key={t.name}
              onClick={() => setSelectedTable(t.name)}
              className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg whitespace-nowrap transition-colors ${
                selectedTable === t.name
                  ? 'bg-slate-900 text-emerald-400 shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>

        {/* Ficha de la Tabla Seleccionada */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 border border-slate-200 rounded-xl p-5">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold font-mono text-slate-900">
                {activeTableData.label}
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {activeTableData.desc}
            </p>

            <div className="space-y-1.5 text-xs pt-2">
              <div>
                <span className="text-slate-400 font-bold block">Clave Primaria (PK):</span>
                <span className="font-mono font-semibold text-emerald-800">{activeTableData.pk}</span>
              </div>
              <div>
                <span className="text-slate-400 font-bold block">Claves Foráneas (FK):</span>
                <span className="font-mono font-semibold text-blue-800">{activeTableData.fk}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Atributos y Tipos de Datos (PostgreSQL 16):
            </span>
            <div className="bg-slate-900 rounded-lg p-3 space-y-1 font-mono text-xs">
              {activeTableData.fields.map((f, i) => (
                <div key={i} className="text-emerald-300">
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
