import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ShoppingCart, Clock, Split, ShieldCheck, KeyRound, Download, 
  ArrowRight, Check, Code2, Database, Terminal, ChevronRight, Zap
} from 'lucide-react';
import { sound } from '../lib/soundSynthesizer';

gsap.registerPlugin(ScrollTrigger);

const pipelineStages = [
  {
    step: '01',
    id: 'cart',
    title: 'Carrito Multi-Vendedor Unificado',
    code: 'RF-02 • GESTIÓN DE CARRITO',
    shortDesc: 'Agrupación federada de productos digitales de distintos comerciantes en una sola orden atómica.',
    protocol: 'CART_PERSISTENCE_V3',
    latency: '14 ms',
    security: 'UUID_V4_VALIDATION',
    details: [
      'Almacenamiento reactivo local sincronizado con el backend mediante token de sesión.',
      'Partición lógica en sub-órdenes por cada vendedor identificado (vendor_id).',
      'Validación de unicidad de licencias en tiempo real para evitar colisiones de compra.'
    ],
    technicalPayload: {
      action: 'CART_CONSOLIDATE',
      cart_token: 'cart_9f81a7b3-c12e-4ef8',
      sub_orders: [
        { vendor_id: 'VEND_DEV_01', items_count: 2, subtotal: 120000 },
        { vendor_id: 'VEND_3D_02', items_count: 1, subtotal: 85000 }
      ],
      gross_total: 205000,
      currency: 'COP'
    }
  },
  {
    step: '02',
    id: 'ttl-lock',
    title: 'Bloqueo TTL de Inventario (15 Minutos)',
    code: 'RF-02 / RF-03 • CONTROL DE CONCURRENCIA',
    shortDesc: 'Reserva transaccional en PostgreSQL y Redis para garantizar exclusividad de seriales.',
    protocol: 'ROW_LEVEL_LOCKING',
    latency: '8 ms',
    security: 'REDIS_ATOMIC_TTL',
    details: [
      'Ejecución de SELECT ... FOR UPDATE en la tabla inventory_locks durante la apertura de sesión de pago.',
      'Temporizador regresivo de 900 segundos: liberación automática en caso de abandono de pasarela.',
      'Eliminación del riesgo de doble venta sobre licencias únicas o activaciones limitadas.'
    ],
    technicalPayload: {
      action: 'INVENTORY_RESERVE_TTL',
      lock_id: 'lock_77a90b4d',
      ttl_seconds: 900,
      expires_at: '2026-09-23T15:47:00Z',
      strategy: 'SELECT_FOR_UPDATE_NOWAIT',
      status: 'ACQUIRED_AND_HOLDING'
    }
  },
  {
    step: '03',
    id: 'epayco-split',
    title: 'Orquestación ePayco Split 1:N',
    code: 'RF-03 • SPLIT AUTOMATIZADO',
    shortDesc: 'Dispersión directa a subcuentas de los comerciantes con 0% de comisión para Mercanex.',
    protocol: 'REST_EPAYCO_SPLIT',
    latency: '110 ms',
    security: 'ZERO_CUSTODY_TRANSFER',
    details: [
      'Un único cobro consolidado al comprador mediante PSE, tarjeta de crédito o Nequi.',
      'Construcción del array split_receivers con los identificadores de subcuenta de ePayco.',
      'Mercanex cobra $0 COP de comisión directa por venta, sin retener fondos en cuentas intermedias.'
    ],
    technicalPayload: {
      endpoint: 'POST /v1/payment/process/split',
      split_app_id: 'EPAYCO_APP_9941',
      total_amount: 205000,
      mercanex_fee: 0,
      split_receivers: [
        { receiver_id: 'SUB_01_BANCOLOMBIA', amount: 120000, fee: 0 },
        { receiver_id: 'SUB_02_NEQUI', amount: 85000, fee: 0 }
      ]
    }
  },
  {
    step: '04',
    id: 'webhook-hmac',
    title: 'Webhook HMAC & Idempotencia',
    code: 'RF-08 • VALIDACIÓN Y SEGURIDAD',
    shortDesc: 'Confirmación asíncrona criptográficamente blindada contra falsificación y repetición.',
    protocol: 'HMAC_SHA256_VERIFY',
    latency: '32 ms',
    security: 'IDEMPOTENCY_KEY_ENFORCED',
    details: [
      'Validación de la firma digital x_signature comparando con hash_hmac(sha256) y llave P_KEY.',
      'Consulta en tabla webhook_events para prevenir procesamiento repetido (Replay Attacks).',
      'Transición de estado de la orden de PENDING a COMPLETED bajo transacción ACID única.'
    ],
    technicalPayload: {
      event: 'EPAYCO_PAYMENT_CONFIRMED',
      x_ref_payco: '984712093',
      x_transaction_state: 'Aceptada',
      signature_verified: true,
      idempotency_key: 'idemp_3490fd-984712093',
      execution_time_ms: 31.4
    }
  },
  {
    step: '05',
    id: 'vault-decrypt',
    title: 'Bóveda Criptográfica AES-256-CBC',
    code: 'RF-04 • BÓVEDA SEGURA',
    shortDesc: 'Desencriptación de seriales y archivos maestros bajo demanda (Just-in-Time).',
    protocol: 'AES_256_CBC_ENVELOPE',
    latency: '19 ms',
    security: 'KMS_SECRET_KEY_ISOLATED',
    details: [
      'Almacenamiento permanente en PostgreSQL únicamente en formato cifrado con sal única por registro.',
      'Cero persistencia de claves en memoria compartida; desencriptación en vuelo para la orden.',
      'Generación de registro de auditoría inmutable en access_audit_logs con IP y User-Agent.'
    ],
    technicalPayload: {
      action: 'DECRYPT_PAYLOAD_JIT',
      license_cipher: 'eyJpdiI6Ilp4Vm1...9hQ0UifQ==',
      algorithm: 'AES-256-CBC',
      key_source: 'AWS_KMS_ENV_MASTER',
      audit_logged: true,
      plaintext_status: 'ZEROED_OUT_AFTER_DISPATCH'
    }
  },
  {
    step: '06',
    id: 'signed-dispatch',
    title: 'Despacho Inmutable & URLs Firmadas',
    code: 'RF-04 / RF-08 • DESPACHO INMUTABLE',
    shortDesc: 'Emisión de enlaces temporales de descarga y notificación reactiva vía WebSockets.',
    protocol: 'SIGNED_HMAC_TEMPORARY_URL',
    latency: '24 ms',
    security: 'EXPIRES_24H_QUOTA_5',
    details: [
      'Generación de URL temporal con validez de 24 horas y cuota máxima de 5 descargas por archivo.',
      'Disparo de evento WebSocket Pusher/Soketi a la pantalla del comprador para desbloqueo inmediato.',
      'Envío de comprobante de compra con desglose legal conforme al Estatuto del Consumidor.'
    ],
    technicalPayload: {
      event: 'DISPATCH_FINALIZED',
      download_endpoint: 'https://vault.mercanex.co/dl/t_7f991?sig=e3b0c44298...',
      ttl_remaining_seconds: 86400,
      quota_remaining: 5,
      websocket_event: 'order.dispatched.order_9f81a7b3',
      delivery_mode: 'INSTANT_DIGITAL'
    }
  }
];

export default function HorizontalPipelineScroll() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [selectedStage, setSelectedStage] = useState(0);

  useGSAP(() => {
    const track = trackRef.current;
    if (!track) return;

    // Calculate total horizontal translation needed
    const totalScrollWidth = track.scrollWidth - window.innerWidth + 80;

    const tween = gsap.to(track, {
      x: () => -totalScrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${totalScrollWidth}`,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Calculate approximate active stage from scroll progress
          const index = Math.min(
            pipelineStages.length - 1,
            Math.floor(self.progress * pipelineStages.length)
          );
          setSelectedStage(index);
        }
      }
    });

  }, { scope: sectionRef });

  return (
    <div 
      ref={sectionRef} 
      id="horizontal-pipeline" 
      className="relative w-full h-screen overflow-hidden bg-[#06090F] border-y border-slate-800/80 flex flex-col justify-between py-6 select-none"
    >
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-grid-cyber opacity-35 pointer-events-none" />

      {/* Top Section Header & Telemetry Status HUD */}
      <div className="relative z-10 px-6 sm:px-12 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-widest font-semibold">
            <Zap className="w-3.5 h-3.5" />
            <span>Capítulo 04 • Pipeline Transaccional de Extremo a Extremo</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1 flex items-center gap-2">
            <span>Ciclo de Vida de una Transacción Atómica</span>
            <span className="text-xs font-mono font-normal px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              HORIZONTAL SCROLL PINNED
            </span>
          </h2>
        </div>

        {/* Global Pipeline Indicators */}
        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-slate-500">ETAPA ACTUAL:</span>
            <span className="text-emerald-400 font-bold">{selectedStage + 1} / {pipelineStages.length}</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300 font-semibold">{pipelineStages[selectedStage].protocol}</span>
          </div>
        </div>
      </div>

      {/* HORIZONTAL TRACK CONTAINER (Pinned and moved by GSAP ScrollTrigger) */}
      <div className="relative z-10 flex-1 flex items-center overflow-visible">
        <div 
          ref={trackRef} 
          className="flex gap-6 sm:gap-8 px-6 sm:px-12 will-change-transform"
          style={{ width: 'fit-content' }}
        >
          {pipelineStages.map((stage, idx) => {
            const isSelected = idx === selectedStage;

            return (
              <div
                key={stage.id}
                onClick={() => {
                  sound.click();
                  setSelectedStage(idx);
                }}
                className={`w-[85vw] sm:w-[480px] lg:w-[520px] flex-shrink-0 p-6 sm:p-7 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                  isSelected 
                    ? 'bg-[#0B101B] border-emerald-500/60 shadow-2xl shadow-emerald-950/30 ring-1 ring-emerald-500/30' 
                    : 'bg-[#0B101B]/70 border-slate-800/80 hover:border-slate-700 opacity-90'
                }`}
              >
                {/* Stage Header */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-black text-sm flex items-center justify-center">
                        {stage.step}
                      </span>
                      <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                        {stage.code}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-[11px]">
                      <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                        {stage.latency}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
                    {stage.title}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
                    {stage.shortDesc}
                  </p>

                  {/* Bullet Spec Points */}
                  <ul className="mt-4 space-y-2 text-xs text-slate-400">
                    {stage.details.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technical Payload Inspector Card */}
                <div className="mt-6 pt-4 border-t border-slate-800/80">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                      <Code2 className="w-3.5 h-3.5" />
                      <span>TELEMETRY_PAYLOAD</span>
                    </span>
                    <span className="text-[10px] text-slate-500 uppercase">{stage.security}</span>
                  </div>
                  
                  <div className="p-3 rounded-xl bg-[#06090F] border border-slate-800/80 font-mono text-[11px] text-slate-300 overflow-x-auto max-h-36">
                    <pre className="text-[10.5px] leading-relaxed">
                      <code>{JSON.stringify(stage.technicalPayload, null, 2)}</code>
                    </pre>
                  </div>
                </div>

                {/* Bottom Stage Progress Ribbon */}
                <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>ETAPA {idx + 1} DE {pipelineStages.length}</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <span>EXPLORAR</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Visual Scroll Timeline Bar */}
      <div className="relative z-10 px-6 sm:px-12 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/80 pt-3 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <span className="text-slate-500">CONTROL DE DESPLAZAMIENTO:</span>
          <span className="text-emerald-400 font-bold">Usa el Scroll Vertical para desplazar la cinta horizontalmente</span>
        </div>

        {/* Stage Dot Markers */}
        <div className="flex items-center gap-2">
          {pipelineStages.map((st, i) => (
            <button
              key={st.id}
              onClick={() => {
                sound.click();
                setSelectedStage(i);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === selectedStage 
                  ? 'w-8 bg-emerald-400' 
                  : 'w-2 bg-slate-800 hover:bg-slate-700'
              }`}
              title={`Etapa ${st.step}: ${st.title}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
