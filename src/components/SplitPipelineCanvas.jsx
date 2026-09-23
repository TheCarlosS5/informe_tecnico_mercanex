import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export default function SplitPipelineCanvas() {
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [stats, setStats] = useState({ processed: 284, dispersed: '$34.820.000 COP', feeMercanex: '$0 COP' });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Ajustar dimensiones internas
    const width = canvas.width = 960;
    const height = canvas.height = 360;

    // Nodos fijos
    const buyerNode = { x: 90, y: 180, label: "Comprador (Checkout)", color: "#0F172A", amount: "$180.000 COP" };
    const gatewayNode = { x: 440, y: 180, label: "ePayco Split 1:N", color: "#10B981", sub: "Modelo Agregador" };
    const stores = [
      { x: 830, y: 70, label: "Tienda Alpha (Steam)", amount: "$80.000 COP", color: "#2563EB", share: "$76.940 neto" },
      { x: 830, y: 180, label: "Tienda Beta (Windows 11)", amount: "$60.000 COP", color: "#7C3AED", share: "$57.480 neto" },
      { x: 830, y: 290, label: "Tienda Gamma (Xbox)", amount: "$40.000 COP", color: "#D97706", share: "$38.020 neto" }
    ];

    // Partículas
    const particles = [];
    const createParticle = () => {
      particles.push({
        x: buyerNode.x,
        y: buyerNode.y,
        progress: 0,
        phase: 1, // 1: Buyer -> Gateway, 2: Gateway -> Stores
        targetStoreIndex: Math.floor(Math.random() * stores.length),
        speed: 0.012 + Math.random() * 0.008,
        color: "#10B981"
      });
    };

    let tick = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Fondo sutil
      ctx.fillStyle = "#F8FAFC";
      ctx.fillRect(0, 0, width, height);

      // Dibujar líneas de conexión
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#E2E8F0";

      // Buyer -> Gateway
      ctx.beginPath();
      ctx.moveTo(buyerNode.x, buyerNode.y);
      ctx.lineTo(gatewayNode.x, gatewayNode.y);
      ctx.stroke();

      // Gateway -> Stores
      stores.forEach(store => {
        ctx.beginPath();
        ctx.moveTo(gatewayNode.x, gatewayNode.y);
        ctx.bezierCurveTo(600, gatewayNode.y, 660, store.y, store.x, store.y);
        ctx.stroke();
      });

      // Dibujar Partículas en Movimiento si está reproduciendo
      if (isPlaying) {
        tick++;
        if (tick % 16 === 0) createParticle();

        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.progress += p.speed;

          if (p.phase === 1) {
            p.x = buyerNode.x + (gatewayNode.x - buyerNode.x) * p.progress;
            p.y = buyerNode.y;

            if (p.progress >= 1) {
              p.phase = 2;
              p.progress = 0;
            }
          } else {
            const target = stores[p.targetStoreIndex];
            const t = p.progress;
            // Bezier curve interpolation
            const p0x = gatewayNode.x, p0y = gatewayNode.y;
            const p1x = 600, p1y = gatewayNode.y;
            const p2x = 660, p2y = target.y;
            const p3x = target.x, p3y = target.y;

            const cx = 3 * (p1x - p0x);
            const bx = 3 * (p2x - p1x) - cx;
            const ax = p3x - p0x - cx - bx;

            const cy = 3 * (p1y - p0y);
            const by = 3 * (p2y - p1y) - cy;
            const ay = p3y - p0y - cy - by;

            p.x = ax * Math.pow(t, 3) + bx * Math.pow(t, 2) + cx * t + p0x;
            p.y = ay * Math.pow(t, 3) + by * Math.pow(t, 2) + cy * t + p0y;

            if (p.progress >= 1) {
              particles.splice(i, 1);
              continue;
            }
          }

          // Dibujar partícula
          ctx.beginPath();
          ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
          ctx.fillStyle = p.phase === 1 ? "#059669" : stores[p.targetStoreIndex].color;
          ctx.shadowColor = ctx.fillStyle;
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // Dibujar Nodos

      // 1. Nodo Comprador
      drawNode(ctx, buyerNode.x, buyerNode.y, 48, "#FFFFFF", "#0F172A", "1 Pago Unico", buyerNode.amount);

      // 2. Nodo ePayco Gateway
      drawNode(ctx, gatewayNode.x, gatewayNode.y, 58, "#ECFDF5", "#059669", "ePayco Split", "0% Mercanex");

      // 3. Nodos Tiendas
      stores.forEach(store => {
        drawNode(ctx, store.x, store.y, 44, "#FFFFFF", store.color, store.label.split(" ")[1], store.share);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    function drawNode(ctx, x, y, r, bg, border, title, sub) {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = bg;
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = border;
      ctx.stroke();

      ctx.fillStyle = "#0F172A";
      ctx.font = "bold 11px Plus Jakarta Sans, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(title, x, y - 4);

      ctx.fillStyle = border;
      ctx.font = "bold 10px JetBrains Mono, monospace";
      ctx.fillText(sub, x, y + 12);
    }

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying]);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-card space-y-4">
      {/* Header del Componente */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 block mb-0.5">
            Motion Graphics Interactivo
          </span>
          <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <Zap className="w-5 h-5 text-emerald-500" />
            Pipeline Transaccional en Vivo: ePayco Pagos Divididos (Split 1:N)
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
              isPlaying ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' : 'bg-emerald-600 text-white hover:bg-emerald-700'
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isPlaying ? 'Pausar Simulación' : 'Reanudar Flujo'}
          </button>
        </div>
      </div>

      {/* Canvas Animado */}
      <div className="relative w-full overflow-x-auto bg-slate-50 border border-slate-200 rounded-xl p-2 flex justify-center">
        <canvas
          ref={canvasRef}
          className="max-w-full h-auto rounded-lg shadow-inner bg-[#F8FAFC]"
        />
      </div>

      {/* Métricas y Explicación en Tiempo Real */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
        <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 block">Comisión de Plataforma Mercanex</span>
            <span className="text-base font-extrabold text-emerald-700 font-mono">$0 COP (0.0%)</span>
          </div>
          <ShieldCheck className="w-6 h-6 text-emerald-600" />
        </div>

        <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 block">Retención por Dispersión ePayco</span>
            <span className="text-base font-extrabold text-blue-700 font-mono">2.68% + $900 + IVA</span>
          </div>
          <CheckCircle2 className="w-6 h-6 text-blue-600" />
        </div>

        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 block">Custodia de Fondos por Mercanex</span>
            <span className="text-base font-extrabold text-slate-900 font-mono">CERO CUSTODIA (Seguro)</span>
          </div>
          <span className="text-xs font-bold text-emerald-600 px-2 py-0.5 bg-emerald-100 rounded">
            PCI Compliant
          </span>
        </div>
      </div>
    </div>
  );
}
