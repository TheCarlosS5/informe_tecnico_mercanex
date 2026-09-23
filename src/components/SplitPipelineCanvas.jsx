import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { sound } from '../lib/soundSynthesizer';

export default function SplitPipelineCanvas() {
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Internal canvas resolution
    const width = canvas.width = 960;
    const height = canvas.height = 360;

    // Fixed Nodes
    const buyerNode = { x: 90, y: 180, label: "Comprador", color: "#38BDF8", amount: "$180.000 COP" };
    const gatewayNode = { x: 440, y: 180, label: "ePayco Split 1:N", color: "#00F59B", sub: "Modelo Agregador" };
    const stores = [
      { x: 830, y: 70, label: "Tienda Alpha (Steam)", amount: "$80.000 COP", color: "#38BDF8", share: "$76.940 neto" },
      { x: 830, y: 180, label: "Tienda Beta (Windows 11)", amount: "$60.000 COP", color: "#A855F7", share: "$57.480 neto" },
      { x: 830, y: 290, label: "Tienda Gamma (Xbox)", amount: "$40.000 COP", color: "#F59E0B", share: "$38.020 neto" }
    ];

    // Particles
    const particles = [];
    const createParticle = () => {
      particles.push({
        x: buyerNode.x,
        y: buyerNode.y,
        progress: 0,
        phase: 1, // 1: Buyer -> Gateway, 2: Gateway -> Stores
        targetStoreIndex: Math.floor(Math.random() * stores.length),
        speed: 0.012 + Math.random() * 0.008,
        color: "#00F59B"
      });
    };

    let tick = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Dark cyber canvas background
      ctx.fillStyle = "#06090F";
      ctx.fillRect(0, 0, width, height);

      // Subtle cyber grid lines in canvas
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Connecting tracks
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = "#1E293B";

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

      // Flowing glow particles
      if (isPlaying) {
        tick++;
        if (tick % 14 === 0) createParticle();

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

          // Draw Glowing Particle
          ctx.beginPath();
          ctx.arc(p.x, p.y, 4.5, 0, Math.PI * 2);
          ctx.fillStyle = p.phase === 1 ? "#00F59B" : stores[p.targetStoreIndex].color;
          ctx.shadowColor = ctx.fillStyle;
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // Draw Nodes
      drawNode(ctx, buyerNode.x, buyerNode.y, 48, "#0B101B", buyerNode.color, "1 Pago Único", buyerNode.amount);
      drawNode(ctx, gatewayNode.x, gatewayNode.y, 58, "#0B101B", gatewayNode.color, "ePayco Split", "0% Mercanex");
      stores.forEach(store => {
        drawNode(ctx, store.x, store.y, 44, "#0B101B", store.color, store.label.split(" ")[1], store.share);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    function drawNode(ctx, x, y, r, bg, border, title, sub) {
      // Glow Ring
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = bg;
      ctx.fill();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = border;
      ctx.shadowColor = border;
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Text Labels
      ctx.fillStyle = "#FFFFFF";
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
    <div className="bg-[#0B101B] border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
      {/* Component Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 block mb-0.5">
            Motion Graphics Transaccional
          </span>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-emerald-400" />
            <span>Simulador de Flujo: ePayco Pagos Divididos (Split 1:N)</span>
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.click();
              setIsPlaying(!isPlaying);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition ${
              isPlaying 
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25' 
                : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30'
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Pausar Simulación' : 'Reanudar Flujo'}</span>
          </button>
        </div>
      </div>

      {/* Cyber Canvas Area */}
      <div className="relative w-full overflow-x-auto bg-[#06090F] border border-slate-800/80 rounded-2xl p-2 flex justify-center">
        <canvas
          ref={canvasRef}
          className="max-w-full h-auto rounded-xl shadow-2xl"
        />
      </div>

      {/* Real-time Telemetry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 font-mono text-xs">
        <div className="p-3 bg-[#06090F] border border-emerald-500/30 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Comisión Mercanex</span>
            <span className="text-sm font-bold text-emerald-400 font-mono mt-0.5 block">$0 COP (0.0%)</span>
          </div>
          <ShieldCheck className="w-6 h-6 text-emerald-400" />
        </div>

        <div className="p-3 bg-[#06090F] border border-slate-800 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Tarifa Pasarela ePayco</span>
            <span className="text-sm font-bold text-cyan-400 font-mono mt-0.5 block">2.68% + $900 + IVA</span>
          </div>
          <CheckCircle2 className="w-6 h-6 text-cyan-400" />
        </div>

        <div className="p-3 bg-[#06090F] border border-slate-800 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Custodia Mercanex</span>
            <span className="text-sm font-bold text-white font-mono mt-0.5 block">CERO CUSTODIA (Seguro)</span>
          </div>
          <span className="text-[11px] font-bold text-emerald-400 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 rounded-md">
            PCI Compliant
          </span>
        </div>
      </div>
    </div>
  );
}
