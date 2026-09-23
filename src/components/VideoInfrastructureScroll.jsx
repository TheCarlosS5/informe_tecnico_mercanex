import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Server, Shield, Database, Cpu, Network, Terminal, CheckCircle2, 
  Layers, ExternalLink, Code2, Lock, ArrowUpRight
} from 'lucide-react';
import TechTerm from './TechTerm';
import { sound } from '../lib/soundSynthesizer';
import { scrollToAnchor } from '../lib/smoothScroll';

gsap.registerPlugin(ScrollTrigger);

const infrastructureLayers = [
  {
    id: 'layer-edge',
    level: 'CAPA 01',
    name: 'Borde de Red, Reverse Proxy & Seguridad Perimetral',
    tech: 'Nginx 1.25 + Cloudflare TLS 1.3',
    role: 'Defensa perimetral contra DDoS, terminación SSL y rate limiting.',
    metrics: {
      sslHandshake: '12 ms',
      rateLimit: '60 req/min/IP',
      firewallWAF: 'ACTIVO (OWASP Top 10)'
    },
    specs: [
      'Terminación TLS 1.3 con cifrado ECDSA y curvas elípticas P-256.',
      'Políticas de Content Security Policy (CSP) estrictas y HSTS activado a 1 año.',
      'Rate limiting configurado en Nginx para mitigar fuerza bruta sobre endpoints sensibles (/api/v1/auth, /api/v1/checkout).'
    ],
    configSnippet: `# /etc/nginx/conf.d/mercanex.conf
limit_req_zone $binary_remote_addr zone=checkout_limit:10m rate=15r/m;

server {
    listen 443 ssl http2;
    server_name api.mercanex.co;
    ssl_certificate /etc/ssl/mercanex_ecc.crt;
    ssl_protocols TLSv1.2 TLSv1.3;
    
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
}`
  },
  {
    id: 'layer-backend',
    level: 'CAPA 02',
    name: 'Motor Backend & Arquitectura Limpia',
    tech: 'PHP 8.2 + Laravel 11 (Alpine Docker)',
    role: 'Lógica transaccional de negocio, Repositorios, Servicios y RBAC.',
    metrics: {
      phpWorkerTime: '38 ms',
      memoryPerWorker: '24 MB',
      architecture: 'Clean / Hexagonal Light'
    },
    specs: [
      'Desacople estricto entre controladores HTTP, servicios de dominio y persistencia.',
      'Autenticación stateless mediante Laravel Sanctum con tokens Bearer revocables.',
      'Control de Acceso Basado en Roles (RBAC) con 4 roles auditados: SuperAdmin, Administrador, Vendedor y Comprador.'
    ],
    configSnippet: `// app/Services/Marketplace/SplitPaymentService.php
namespace App\\Services\\Marketplace;

class SplitPaymentService {
    public function __construct(
        private MarketplaceSplitGatewayInterface $gateway,
        private OrderRepositoryInterface $orders,
        private LicenseVaultInterface $vault
    ) {}

    public function processCheckout(Order $order): SplitPaymentResult {
        return DB::transaction(function () use ($order) {
            $lock = $this->orders->acquireInventoryLock($order);
            return $this->gateway->dispatchSplit($order, $lock);
        });
    }
}`
  },
  {
    id: 'layer-database',
    level: 'CAPA 03',
    name: 'Persistencia Relacional & Concurrencia Transaccional',
    tech: 'PostgreSQL 16 (Engine ACID)',
    role: 'Almacenamiento de 15 tablas en 3FN con bloqueos pesimistas para control de stock.',
    metrics: {
      acidCompliance: '100% SERIALIZABLE/READ_COMMITTED',
      indexEngine: 'B-Tree & Hash Indexes',
      avgQueryTime: '2.4 ms'
    },
    specs: [
      'Esquema relacional de 15 tablas estrictamente normalizadas en Tercera Forma Normal (3FN).',
      'Índices B-Tree optimizados en claves foráneas (vendor_id, order_id, sub_account_id).',
      'Bloqueos pesimistas SELECT ... FOR UPDATE en la tabla inventory_locks para evitar sobreventa concurrente.'
    ],
    configSnippet: `-- Migración de Bloqueo Concurrente con TTL
CREATE TABLE inventory_locks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_license_id UUID NOT NULL REFERENCES product_licenses(id),
    order_id UUID NOT NULL REFERENCES orders(id),
    locked_until TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'RELEASED', 'COMMITTED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_inventory_locks_active ON inventory_locks(locked_until) WHERE status = 'ACTIVE';`
  },
  {
    id: 'layer-async',
    level: 'CAPA 04',
    name: 'Colas Asíncronas & Sincronización en Tiempo Real',
    tech: 'Redis 7 + Laravel Horizon + WebSockets Soketi',
    role: 'Procesamiento en segundo plano de webhooks, TTLs de carritos y eventos push.',
    metrics: {
      queueThroughput: '1,400 jobs/sec',
      wsBroadcastLatency: '< 30 ms',
      ttlTimerPrecision: '100 ms'
    },
    specs: [
      'Cola de mensajería Redis dedicada al procesamiento de webhooks de ePayco con reintentos automáticos.',
      'Eventos WebSockets disparados a la UI del comprador para actualizar el estado del pedido sin recargar.',
      'Eliminación periódica de carritos abandonados al expirar el TTL de 15 minutos.'
    ],
    configSnippet: `// app/Jobs/ProcessEpaycoWebhookJob.php
class ProcessEpaycoWebhookJob implements ShouldQueue {
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    public $tries = 5;
    public $backoff = [10, 30, 90, 300];

    public function handle(EpaycoSignatureValidator $validator): void {
        $validator->validate($this->payload);
        event(new OrderStatusChangedEvent($this->payload['order_id'], 'PAID'));
    }
}`
  },
  {
    id: 'layer-fintech',
    level: 'CAPA 05',
    name: 'Orquestador Fintech & Patrón Adapter Multipasarela',
    tech: 'ePayco Split API ➔ Adyen for Platforms Adapter',
    role: 'Abstracción de pasarelas para expansión internacional sin modificar la capa de negocio.',
    metrics: {
      mercanexCut: '0% COP ($0)',
      adapterInterface: 'MarketplaceSplitGatewayInterface',
      multiCurrencyReady: 'COP / USD / EUR'
    },
    specs: [
      'Implementación de ePayco Pagos Divididos para el mercado colombiano (Fase 1).',
      'Diseño bajo el Patrón Adapter: permite conectar Adyen for Platforms o Stripe Connect (Fase 2).',
      'Cumplimiento de la Circular Básica Jurídica CE 029 de la Superintendencia Financiera de Colombia.'
    ],
    configSnippet: `// app/Contracts/MarketplaceSplitGatewayInterface.php
interface MarketplaceSplitGatewayInterface {
    public function createSplitTransaction(Order $order, array $receivers): GatewaySplitResponse;
    public function verifyWebhookSignature(Request $request): bool;
    public function querySubAccountBalance(string $subAccountId): BalanceDto;
}
// Conexión intercambiable en runtime mediante contenedor IoC de Laravel`
  }
];

export default function VideoInfrastructureScroll({ onSelectTerm }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [activeLayerIndex, setActiveLayerIndex] = useState(0);

  const activeLayer = infrastructureLayers[activeLayerIndex];

  useGSAP(() => {
    // ScrollTrigger to cycle active layers as the user scrolls
    const layerTriggers = gsap.utils.toArray('.infrastructure-trigger');

    layerTriggers.forEach((trigger, idx) => {
      ScrollTrigger.create({
        trigger: trigger,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => {
          setActiveLayerIndex(idx);
          sound.focus();
        },
        onEnterBack: () => {
          setActiveLayerIndex(idx);
          sound.click();
        }
      });
    });
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      id="video-infrastructure-scroll" 
      className="relative py-12 border-t border-slate-800/80 bg-[#06090F] overflow-hidden"
    >
      {/* Background Cyber Video Loop with Multi-layer Gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-25 filter contrast-125 brightness-75"
        >
          <source src="assets/videos/cyber_server_scroll.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#06090F]/80 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-grid-cyber opacity-30" />
      </div>

      <div className="relative z-10 space-y-10">
        {/* Section Header */}
        <div className="px-4 sm:px-6">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-widest font-semibold">
            <Server className="w-4 h-4" />
            <span>Capítulo 03 • Infraestructura & Stack Tecnológico Integral</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1 flex items-center gap-2">
            <span>Arquitectura en Capas: Del Borde Nginx a la Base PostgreSQL</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mt-1">
            Inspección profunda de las 5 capas de software y hardware que sustentan la plataforma Mercanex V3.0 con alta disponibilidad, concurrencia ACID y cero custodia de fondos.
          </p>
        </div>

        {/* 2-Column Split: Sticky Interactive Layer Inspector on Left, Scroll Triggers on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start px-4 sm:px-6">
          
          {/* LEFT: Pinned Dynamic Layer Inspector HUD (Sticky on Desktop) */}
          <div className="lg:col-span-6 lg:sticky lg:top-24 z-20 space-y-4">
            <div className="p-6 rounded-2xl bg-[#0B101B]/95 border border-emerald-500/40 shadow-2xl backdrop-blur-md space-y-5">
              
              {/* Header Badges */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <Cpu className="w-3.5 h-3.5" />
                  {activeLayer.level} • {activeLayer.tech}
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  NIVEL {activeLayerIndex + 1} DE {infrastructureLayers.length}
                </span>
              </div>

              {/* Layer Title & Mission */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {activeLayer.name}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm mt-1.5 leading-relaxed">
                  {activeLayer.role}
                </p>
              </div>

              {/* Dynamic Telemetry Metric Chips */}
              <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                {Object.entries(activeLayer.metrics).map(([k, v]) => (
                  <div key={k} className="p-2.5 rounded-xl bg-[#06090F] border border-slate-800">
                    <span className="text-[10px] text-slate-500 block uppercase tracking-wider">{k}</span>
                    <span className="text-emerald-400 font-bold text-[11px] truncate block mt-0.5">{v}</span>
                  </div>
                ))}
              </div>

              {/* Live Config / Code Snippet */}
              <div className="rounded-xl bg-[#06090F] border border-slate-800 p-3 font-mono text-[11px] overflow-hidden">
                <div className="flex items-center justify-between text-slate-500 pb-2 mb-2 border-b border-slate-800/80 text-[10px]">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>config_spec.sys</span>
                  </span>
                  <span className="text-emerald-400">PRODUCTION_READY</span>
                </div>
                <pre className="text-slate-300 overflow-x-auto p-1 leading-relaxed max-h-56 text-[10.5px]">
                  <code>{activeLayer.configSnippet}</code>
                </pre>
              </div>

              {/* Interactive Layer Tab Selectors */}
              <div className="pt-2 flex flex-wrap gap-2">
                {infrastructureLayers.map((l, i) => (
                  <button
                    key={l.id}
                    onClick={() => {
                      sound.click();
                      setActiveLayerIndex(i);
                      scrollToAnchor(`#trigger-${l.id}`);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition ${
                      i === activeLayerIndex 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                        : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {l.level}
                  </button>
                ))}
              </div>

            </div>
          </div>

          {/* RIGHT: Scrolling Content Cards (ScrollTriggers) */}
          <div className="lg:col-span-6 space-y-16">
            {infrastructureLayers.map((layer, index) => {
              const isActive = index === activeLayerIndex;

              return (
                <div
                  key={layer.id}
                  id={`trigger-${layer.id}`}
                  className={`infrastructure-trigger p-6 sm:p-7 rounded-2xl border transition-all duration-300 ${
                    isActive 
                      ? 'bg-[#0B101B] border-emerald-500/50 shadow-xl shadow-emerald-950/20 ring-1 ring-emerald-500/20' 
                      : 'bg-[#0B101B]/50 border-slate-800/80 opacity-70 hover:opacity-90'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                      {layer.level}
                    </span>
                    <span className="text-xs font-mono text-slate-500">{layer.tech}</span>
                  </div>

                  <h4 className="text-xl font-bold text-white tracking-tight">
                    {layer.name}
                  </h4>
                  <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
                    {layer.role}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-800 space-y-2.5">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                      Especificaciones de Ingeniería Oficiales:
                    </span>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {layer.specs.map((spec, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
