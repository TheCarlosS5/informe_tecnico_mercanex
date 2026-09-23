import React, { useState } from 'react';
import { Film, Play, ChevronLeft, ChevronRight, CheckCircle2, Lock, ShoppingCart, CreditCard, MessageSquare, Terminal } from 'lucide-react';

export default function InteractiveFrameScrubber() {
  const [currentFrame, setCurrentFrame] = useState(0);

  const frames = [
    {
      id: "f01",
      step: "01 / 05",
      title: "Agrupación en Carrito Multi-Tienda",
      status: "SESIÓN ACTIVA",
      icon: ShoppingCart,
      color: "emerald",
      badge: "Frontend & Caché",
      desc: "El comprador agrega 3 licencias digitales provenientes de 3 comercios diferentes. El motor agrupa los ítems por seller_id y calcula subtotales individuales sin fragmentar la cesta de compra.",
      sqlLog: "SELECT * FROM cart_items WHERE session_id = 'sess_99a' ORDER BY seller_id;",
      visual: {
        buyer: "Cliente logueado con sesión persistente",
        items: ["Juego Steam (Tienda A: $80.000)", "Windows 11 (Tienda B: $60.000)", "Juego Xbox (Tienda C: $40.000)"],
        total: "$180.000 COP"
      }
    },
    {
      id: "f02",
      step: "02 / 05",
      title: "Bloqueo Pesimista en PostgreSQL (SELECT FOR UPDATE)",
      status: "TRANSACCIÓN ABIERTA",
      icon: Lock,
      color: "amber",
      badge: "Base de Datos ACID",
      desc: "Al pulsar 'Continuar al Pago', la base de datos ejecuta cerrojos a nivel de fila sobre las claves seleccionadas y asigna un TTL de 15 minutos. Si otro usuario intenta comprar la misma clave, el sistema responde que está reservada.",
      sqlLog: "BEGIN; SELECT * FROM digital_keys WHERE id = ? FOR UPDATE; UPDATE digital_keys SET status = 'reservada', reserved_until = NOW() + INTERVAL '15 min';",
      visual: {
        status: "Inventario: RESERVADA (3 unidades)",
        ttl: "14:59 min restantes para completar pago",
        isolation: "Aislamiento: Read Committed"
      }
    },
    {
      id: "f03",
      step: "03 / 05",
      title: "Pago en ePayco & Validación Criptográfica HMAC",
      status: "WEBHOOK RECIBIDO",
      icon: CreditCard,
      color: "blue",
      badge: "Pasarela Split 1:N",
      desc: "El comprador paga $180.000 COP vía PSE. ePayco envía un Webhook seguro a Mercanex. El backend valida la firma HMAC-SHA256 con el P_KEY secreto y corrobora que la petición no haya sido procesada previamente (Idempotencia).",
      sqlLog: "$calculatedHmac = hash_hmac('sha256', $payload, env('EPAYCO_SECRET_KEY')); if (hash_equals($signature, $calculatedHmac)) { // Aprobado }",
      visual: {
        paymentStatus: "Aprobada por Red Adquirente",
        signatureMatch: "HMAC-SHA256: VALIDADA",
        idempotencyCheck: "x_idempotency_key = 'TX_9981' (Nuevo)"
      }
    },
    {
      id: "f04",
      step: "04 / 05",
      title: "Generación Atómica de Orden y Subórdenes (1:N)",
      status: "COMMIT EXITOSO",
      icon: CheckCircle2,
      color: "emerald",
      badge: "Lógica de Negocio",
      desc: "Dentro de un bloque transaccional atómico, Mercanex genera 1 Orden Global (pago maestro) y 3 Subórdenes independientes. Cada vendedor queda vinculado únicamente a su suborden para aislamiento de garantías y reclamos.",
      sqlLog: "DB::transaction(function() { $order = Order::create(...); Suborder::createMany([...]); DigitalKey::markAsSold([...]); });",
      visual: {
        orderMaster: "ORD-2026-9921 ($180.000 COP)",
        suborders: ["SUB-01 (Tienda A: $80.000)", "SUB-02 (Tienda B: $60.000)", "SUB-03 (Tienda C: $40.000)"]
      }
    },
    {
      id: "f05",
      step: "05 / 05",
      title: "Despacho Criptográfico en RAM & WebSockets Reverb",
      status: "DESPACHO FINALIZADO",
      icon: MessageSquare,
      color: "purple",
      badge: "Tiempo Real & Visor Seguro",
      desc: "Las claves son descifradas en memoria RAM usando AES-256-CBC y desplegadas al comprador en el Visor Seguro. Al mismo tiempo, Laravel Reverb abre los canales de chat WebSockets WSS para cada subpedido.",
      sqlLog: "broadcast(new KeyReleasedEvent($suborder)); broadcast(new OrderCompletedEvent($order));",
      visual: {
        keysRevealed: "3 Claves Descifradas en RAM",
        webSocketsChannel: "private-chat.suborder.SUB-01 (Conectado)",
        slaLatency: "Tiempo total: 310 ms"
      }
    }
  ];

  const current = frames[currentFrame];
  const IconComponent = current.icon;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-card space-y-5" id="interactive-motion">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 block mb-0.5">
            Descomposición Fotograma a Fotograma
          </span>
          <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <Film className="w-5 h-5 text-emerald-500" />
            Motion Scrubber: Ciclo Transaccional Completo de Mercanex
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentFrame(prev => Math.max(0, prev - 1))}
            disabled={currentFrame === 0}
            className="p-2 border border-slate-200 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent text-slate-700 transition-colors"
            title="Fotograma anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-bold text-slate-700 px-2 font-mono">
            {current.step}
          </span>
          <button
            onClick={() => setCurrentFrame(prev => Math.min(frames.length - 1, prev + 1))}
            disabled={currentFrame === frames.length - 1}
            className="p-2 border border-slate-200 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent text-slate-700 transition-colors"
            title="Fotograma siguiente"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Barra de Progreso del Scrubber */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500">
          <span>INICIO DE COMPRA</span>
          <span className="text-emerald-600 font-extrabold">{current.title}</span>
          <span>DESPACHO SEGURO</span>
        </div>
        <div className="grid grid-cols-5 gap-1.5">
          {frames.map((f, i) => (
            <button
              key={f.id}
              onClick={() => setCurrentFrame(i)}
              className={`h-2.5 rounded-full transition-all duration-200 ${
                i === currentFrame
                  ? 'bg-emerald-600 shadow-xs'
                  : i < currentFrame
                  ? 'bg-emerald-300'
                  : 'bg-slate-200 hover:bg-slate-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Contenido del Fotograma Activo */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-50 border border-slate-200 rounded-xl p-5">
        {/* Columna Izquierda: Explicación y Estado */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-xs font-bold text-emerald-800 bg-emerald-100 rounded-full border border-emerald-300">
              {current.badge}
            </span>
            <span className="px-2 py-0.5 text-[11px] font-mono font-bold text-slate-600 bg-white border border-slate-200 rounded">
              {current.status}
            </span>
          </div>

          <h4 className="text-xl font-bold text-slate-900 leading-snug flex items-center gap-2">
            <IconComponent className="w-5 h-5 text-emerald-600" />
            {current.title}
          </h4>

          <p className="text-sm text-slate-600 leading-relaxed">
            {current.desc}
          </p>

          {/* Consola de Código / SQL Log */}
          <div className="bg-slate-900 rounded-lg p-3 text-xs text-emerald-300 font-mono overflow-x-auto shadow-inner">
            <div className="flex items-center gap-1.5 text-slate-400 text-[10px] mb-1.5 border-b border-slate-800 pb-1">
              <Terminal className="w-3 h-3 text-emerald-400" />
              <span>Registro de Evento en Backend</span>
            </div>
            <pre className="whitespace-pre-wrap">{current.sqlLog}</pre>
          </div>
        </div>

        {/* Columna Derecha: Representación Visual de Datos */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Estado de Memoria y Entidades Transaccionales
          </span>

          <div className="space-y-2.5">
            {current.visual.items && (
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-700">Ítems Multi-Vendedor:</span>
                {current.visual.items.map((it, idx) => (
                  <div key={idx} className="p-2 bg-slate-50 border border-slate-200 rounded text-xs font-medium text-slate-800 flex items-center justify-between">
                    <span>{it}</span>
                    <span className="text-emerald-600 font-bold">✓</span>
                  </div>
                ))}
              </div>
            )}

            {current.visual.status && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded text-xs text-amber-900 font-medium">
                <strong>{current.visual.status}</strong>
                <div className="text-[11px] text-amber-700 mt-1">{current.visual.ttl}</div>
              </div>
            )}

            {current.visual.signatureMatch && (
              <div className="space-y-1.5">
                <div className="p-2.5 bg-blue-50 border border-blue-200 rounded text-xs text-blue-900 font-mono">
                  {current.visual.signatureMatch}
                </div>
                <div className="text-xs text-slate-500 font-mono">
                  {current.visual.idempotencyCheck}
                </div>
              </div>
            )}

            {current.visual.suborders && (
              <div className="space-y-1">
                <span className="text-xs font-bold text-emerald-800">Subórdenes Creadas:</span>
                {current.visual.suborders.map((sub, idx) => (
                  <div key={idx} className="p-2 bg-emerald-50 border border-emerald-200 rounded text-xs font-mono font-bold text-emerald-900">
                    {sub}
                  </div>
                ))}
              </div>
            )}

            {current.visual.keysRevealed && (
              <div className="space-y-2">
                <div className="p-3 bg-purple-50 border border-purple-200 rounded text-xs text-purple-900 font-bold">
                  ✓ {current.visual.keysRevealed}
                </div>
                <div className="text-xs text-slate-600 flex items-center justify-between font-mono">
                  <span>Canal WSS:</span>
                  <span className="text-emerald-600 font-bold">{current.visual.webSocketsChannel}</span>
                </div>
                <div className="text-xs text-slate-500">
                  Latencia P95: <strong>{current.visual.slaLatency}</strong>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span>Mercanex State Engine v3.0</span>
            <span className="font-bold text-emerald-600">Paso {currentFrame + 1} de 5</span>
          </div>
        </div>
      </div>
    </div>
  );
}
