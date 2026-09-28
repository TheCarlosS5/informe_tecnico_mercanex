import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  AlertTriangle, Shield, CheckCircle2, Terminal, Cpu, FileCode2,
  Lock, ArrowRight, Layers, DollarSign, Database, Server
} from 'lucide-react';
import TechTerm from './TechTerm';
import { sound } from '../lib/soundSynthesizer';
import { scrollToAnchor } from '../lib/smoothScroll';

gsap.registerPlugin(ScrollTrigger);

const narrativeStations = [
  {
    id: 'problema',
    stepNumber: '01.1',
    badge: 'DIAGNÓSTICO TÉCNICO',
    title: 'La Crisis de la Monetización Digital en Colombia',
    subtitle: 'Costos abusivos, intermediación opaca y desprotección bancaria',
    problemQuote: 'Los desarrolladores y artistas digitales en Colombia pierden hasta el 35% de su facturación en comisiones extranjeras y retenciones de más de 45 días.',
    content: [
      'En el ecosistema tradicional de comercio electrónico, los creadores de software, plugins y assets 3D en Colombia se ven forzados a recurrir a plataformas extranjeras (Gumroad, Envato, Turbosquid) que imponen retenciones de capital de hasta 60 días hábiles y aplican retenciones tributarias internacionales complejas.',
      'Por otro lado, los marketplaces locales generalistas exigen logística física pesada, desconociendo por completo la naturaleza instantánea, inmaterial y criptográfica de las licencias de software.',
      'La dispersión manual de fondos en carritos de múltiples vendedores representa un riesgo operativo crítico: conciliaciones propensas a errores, fraude por devolución extemporánea y el grave peligro regulatorio de incurrir en captación masiva no autorizada de recursos del público.'
    ],
    telemetry: {
      phase: 'VULNERABILITY_ANALYSIS',
      status: 'CRITICAL_FRICTION',
      commissionLoss: '30% - 35%',
      holdingPeriod: '45 - 60 Días',
      complianceRisk: 'ALTO (Superfinanciera CE 029/2014)'
    },
    codeSnippet: `// ❌ PROBLEMA TRADICIONAL: CUSTODIA ILEGAL Y DISPERSIÓN MANUAL
class UnsafeTraditionalMarketplace {
  public function checkout(Order $order) {
    // RIESGO: El dinero ingresa a la cuenta de la plataforma
    $payment = $gateway->charge($order->total_cents);
    $this->bankAccount->deposit($payment->amount);

    // PELIGRO: Mercanex se convierte en captador de dinero
    // Retención manual, conciliación en hojas de cálculo y 30% comisión
    Queue::push(new ManualVendorPayoutJob($order));
  }
}`
  },
  {
    id: 'alcance',
    stepNumber: '01.2',
    badge: 'DELIMITACIÓN ESTRICTA',
    title: '100% Bienes Digitales: Exclusión Radical de Logística Física',
    subtitle: 'Arquitectura inmaterial de cero bodegas y entrega criptográfica sub-segundo',
    problemQuote: 'Mercanex no vende mercancía tangible. Cada byte transferido es auditado mediante hashes criptográficos y tokens efímeros.',
    content: [
      'El alcance del sistema delimitado formalmente en el Informe Técnico V3.0 excluye de manera categórica cualquier componente de logística física, bodegas, paquetería o despachos de mensajería (Servientrega, Interrapidísimo, etc.).',
      'El catálogo de Mercanex procesa exclusivamente cuatro categorías inmateriales: (1) Licencias y llaves de activación de software, (2) Modelos 3D y assets paramétricos (OBJ, FBX, BLEND), (3) Plugins, scripts y plantillas de código fuente, y (4) Cursos técnicos y documentación especializada.',
      'La entrega es 100% automatizada e instantánea: el comprador recibe URLs de descarga con firma criptográfica HMAC con tiempo de expiración estricto de 24 horas y cuota máxima de 5 reintentos, garantizando la protección de los derechos de autor de los vendedores.'
    ],
    telemetry: {
      phase: 'SCOPE_ENFORCEMENT',
      status: 'STRICT_DIGITAL_BOUNDARY',
      physicalStorageCost: '$0 COP (0 Bodegas)',
      dispatchLatency: '< 180 ms',
      tokenTTL: '86400s (24 Horas)'
    },
    codeSnippet: `// 🔒 ALCANCE: DESPACHO CRIPTOGRÁFICO JUST-IN-TIME (RF-04)
class DigitalDeliveryService {
  public function generateSecureDownload(License $license, User $buyer): SignedUrl {
    // Expiración estricta de 24h y máximo 5 descargas
    $payload = [
      'license_id' => $license->uuid,
      'buyer_id'   => $buyer->id,
      'exp'        => now()->addHours(24)->timestamp,
      'quota'      => 5
    ];
    $token = Crypt::signPayload($payload, config('app.hmac_secret'));
    return SignedUrl::from("https://vault.mercanex.co/download/{$token}");
  }
}`
  },
  {
    id: 'solucion',
    stepNumber: '02.1',
    badge: 'ARQUITECTURA DE SOLUCIÓN',
    title: 'Orquestación ePayco Split 1:N & Desacople de Custodia',
    subtitle: 'Dispersión atómica a subcuentas con 0% de comisión Mercanex en la venta',
    problemQuote: 'Mercanex no toca el dinero de los vendedores. La pasarela fracciona y transfiere en tiempo real a N cuentas bancarias.',
    content: [
      'Para resolver el dilema de intermediación y cumplimiento legal colombiano, la arquitectura Mercanex V3.0 implementa el servicio de Pagos Divididos (Split 1:N) provisto por ePayco.',
      'Bajo este paradigma, el comprador efectúa un único pago en su moneda local (COP) a través de PSE, tarjetas de crédito o billeteras virtuales (Nequi, Daviplata). El motor de Mercanex orquesta los metadatos de la orden generando un arreglo con el desglose exacto de montos por cada vendedor.',
      'ePayco actúa como entidad vigilada y dispersa de forma atómica y directa los fondos hacia las subcuentas bancarias de cada comerciante. Mercanex cobra $0 COP de comisión por transacción, sustentando su modelo en suscripciones SaaS Freemium.'
    ],
    telemetry: {
      phase: 'SPLIT_ORCHESTRATION',
      status: 'ATOMIC_DISPERSION',
      platformCommission: '0% COP ($0)',
      paymentMethods: 'PSE, Tarjetas, Nequi, Daviplata',
      regulatoryCompliance: 'Circular Básica Jurídica CE 029'
    },
    codeSnippet: `// ⚡ SOLUCIÓN: ARREGLO DE DISPERSIÓN EPAYCO SPLIT 1:N (RF-03)
$splitPayload = [
  'split_app_id' => env('EPAYCO_APP_ID'),
  'split_merchant_id' => env('EPAYCO_MERCHANT_ID'),
  'split_rule' => 'multiple',
  'split_receivers' => [
    ['id' => 'SUB_VENDOR_A', 'total' => 120000, 'fee' => 0], // $0 comisión
    ['id' => 'SUB_VENDOR_B', 'total' => 85000,  'fee' => 0]  // $0 comisión
  ]
];
// Mercanex NUNCA retiene los fondos en cuentas propias.`
  },
  {
    id: 'objetivos',
    stepNumber: '02.2',
    badge: 'INGENIERÍA AUDITABLE',
    title: 'Objetivos de Ingeniería & Métricas de Desempeño',
    subtitle: 'Estándar IEEE 830, arquitectura modular y SLAs de alta exigencia',
    problemQuote: 'Un informe técnico no es una maqueta: es un contrato de ingeniería con métricas empíricamente verificables.',
    content: [
      'Objetivo General: Diseñar e implementar la plataforma transaccional Mercanex bajo arquitectura en capas y estándares IEEE 830, permitiendo la comercialización de activos digitales con dispersión automatizada de fondos.',
      'Objetivos Específicos: (1) Construir un catálogo reactivo con tiempo de renderizado < 200ms y carrito multitienda con TTL de 15 minutos. (2) Implementar el módulo de orquestación de pagos divididos con idempotencia HMAC-SHA256 para evitar pagos dobles ante fallos de red.',
      '(3) Desarrollar la bóveda criptográfica con cifrado de llaves AES-256-CBC en reposo. (4) Validar el 100% de los 72 Requisitos Funcionales Especificados (ERF) con una suite de pruebas automatizadas y cobertura superior al 80%.'
    ],
    telemetry: {
      phase: 'SLA_VERIFICATION',
      status: 'FULL_CONFORMANCE',
      catalogLatency: '< 200 ms',
      testCoverage: '> 80%',
      verifiedERFs: '72 / 72 (100%)'
    },
    codeSnippet: `// 🎯 VERIFICACIÓN DE OBJETIVOS & IDEMPOTENCIA HMAC (RF-08)
class WebhookSecurityVerification {
  public function verifyEpaycoSignature(Request $request): bool {
    $calculated = hash_hmac('sha256',
      $request->x_ref_payco . '^' . $request->x_transaction_id . '^' . $request->x_amount,
      config('services.epayco.p_key')
    );
    // Prevención de Replay Attacks e inyección de eventos falsos
    return hash_equals($calculated, $request->x_signature);
  }
}`
  }
];

export default function ScrollytellingSection({ onSelectTerm }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [activeStationIndex, setActiveStationIndex] = useState(0);

  const activeStation = narrativeStations[activeStationIndex];

  useGSAP(() => {
    // Setup ScrollTriggers for each narrative station
    const stations = gsap.utils.toArray('.narrative-station');

    stations.forEach((station, i) => {
      ScrollTrigger.create({
        trigger: station,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => {
          setActiveStationIndex(i);
          sound.focus();
        },
        onEnterBack: () => {
          setActiveStationIndex(i);
          sound.click();
        }
      });
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="scrollytelling-narrative"
      className="relative py-12 border-t border-slate-200/80 bg-white"
    >
      {/* Chapter Marker */}
      <div className="mb-10 px-4">
        <div className="flex items-center gap-2 text-emerald-700 font-mono text-xs uppercase tracking-widest font-semibold">
          <Terminal className="w-4 h-4" />
          <span>Capítulos 01 & 02 • Scrollytelling Arquitectónico</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
          De la Falla del Mercado a la Solución de Ingeniería
        </h2>
        <p className="text-slate-600 text-sm max-w-2xl mt-1">
          Desplázate verticalmente para inspeccionar la transición causal entre el problema económico de los creadores y el diseño de la arquitectura ePayco Split.
        </p>
      </div>

      {/* Main 2-Column Scrollytelling Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">

        {/* LEFT COLUMN: Pinned Cyber Telemetry & Live Video Terminal (Sticky on Desktop) */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 z-20 space-y-4">
          <div className="relative rounded-lg overflow-hidden border border-emerald-500/30 bg-[#F8FAFC] shadow-sm backdrop-blur-md">

            {/* Background Cyber Code Video Stream */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-black">
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-60 filter contrast-125 brightness-90"
              >
                <source src="assets/videos/digital_code_stream.mp4" type="video/mp4" />
              </video>

              {/* Scanline & Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B101B] via-transparent to-[#0B101B]/70" />
              <div className="absolute inset-0 bg-grid-cyber opacity-30" />

              {/* Top Floating HUD Status Bar */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/80 border border-emerald-500/40 text-[11px] font-mono text-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  HUD_NODE: {activeStation.telemetry.phase}
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-100/90 text-slate-600 text-[10px] font-mono border border-slate-200">
                  ESTACIÓN {activeStation.stepNumber}
                </span>
              </div>

              {/* Bottom Overlaid Metric Badge */}
              <div className="absolute bottom-3 left-3 right-3 z-10 p-2.5 rounded-md bg-white/85 border border-slate-200/80 backdrop-blur-sm">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-600">ESTADO PROTOCOLO:</span>
                  <span className="text-emerald-700 font-bold">{activeStation.telemetry.status}</span>
                </div>
              </div>
            </div>

            {/* Bottom Terminal Body: Dynamic Telemetry & Code Stream */}
            <div className="p-4 sm:p-5 space-y-4">
              {/* Telemetry Metric Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                {Object.entries(activeStation.telemetry).map(([key, val]) => {
                  if (key === 'phase' || key === 'status') return null;
                  return (
                    <div key={key} className="p-2 rounded-lg bg-white border border-slate-200/80">
                      <span className="text-[10px] text-slate-500 block uppercase tracking-wider">{key}</span>
                      <span className="text-emerald-700 font-semibold text-[11px] truncate block">{val}</span>
                    </div>
                  );
                })}
              </div>

              {/* Dynamic Reactive Code Inspector */}
              <div className="rounded-md bg-white border border-slate-200 p-3 relative font-mono text-[11px] overflow-hidden">
                <div className="flex items-center justify-between text-slate-500 pb-2 mb-2 border-b border-slate-200/60 text-[10px]">
                  <span className="flex items-center gap-1.5 text-slate-600">
                    <FileCode2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>kernel_verification.php</span>
                  </span>
                  <span className="text-emerald-500/80">SYNCHRONIZED</span>
                </div>
                <pre className="text-slate-700 overflow-x-auto p-1 leading-relaxed max-h-44 text-[10.5px]">
                  <code>{activeStation.codeSnippet}</code>
                </pre>
              </div>

              {/* Stepper Progress Indicator */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-200/80 text-[11px] font-mono text-slate-600">
                <span>FASE {activeStationIndex + 1} DE {narrativeStations.length}</span>
                <div className="flex gap-1.5">
                  {narrativeStations.map((st, idx) => (
                    <button
                      key={st.id}
                      onClick={() => {
                        sound.click();
                        scrollToAnchor(`#station-${st.id}`);
                      }}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        idx === activeStationIndex ? 'w-6 bg-emerald-400' : 'w-2 bg-slate-200 hover:bg-slate-700'
                      }`}
                      title={`Ir a Estación ${st.stepNumber}: ${st.title}`}
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: Scrolling Narrative Stations */}
        <div className="lg:col-span-7 space-y-16">
          {narrativeStations.map((station, index) => {
            const isActive = index === activeStationIndex;

            return (
              <div
                key={station.id}
                id={`station-${station.id}`}
                className={`narrative-station p-6 sm:p-8 rounded-lg border transition-all duration-500 ${
                  isActive
                    ? 'bg-[#F8FAFC] border-emerald-500/50 shadow-sm shadow-emerald-950/20 ring-1 ring-emerald-500/20'
                    : 'bg-[#F8FAFC]/50 border-slate-200/80 opacity-70 hover:opacity-90'
                }`}
              >
                {/* Step Metadata Header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {station.badge} • PASO {station.stepNumber}
                  </span>
                  <span className="text-xs font-mono text-slate-500">MERCANEX_DOC_V3.0</span>
                </div>

                {/* Station Title */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                  {station.title}
                </h3>
                <p className="text-emerald-700/90 font-mono text-xs sm:text-sm mt-1">
                  {station.subtitle}
                </p>

                {/* Callout Quote */}
                <div className="my-6 p-4 rounded-md bg-slate-100/90 border-l-4 border-emerald-400 text-slate-700 text-sm italic">
                  "{station.problemQuote}"
                </div>

                {/* Narrative Body Paragraphs */}
                <div className="space-y-4 text-slate-700 text-sm leading-relaxed">
                  {station.content.map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
                </div>

                {/* Interactive Action Hook */}
                <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500">
                    Sincronizado con nodo de telemetría lateral
                  </span>
                  <button
                    onClick={() => {
                      sound.ping();
                      const next = (index + 1) % narrativeStations.length;
                      scrollToAnchor(`#station-${narrativeStations[next].id}`);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-700 hover:text-emerald-800 transition"
                  >
                    <span>Siguiente fase</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
