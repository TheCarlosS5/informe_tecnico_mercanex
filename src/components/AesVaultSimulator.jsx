import React, { useState, useEffect } from 'react';
import { Lock, Unlock, Key, Eye, EyeOff, ShieldCheck, Database, Cpu } from 'lucide-react';
import { sound } from '../lib/soundSynthesizer';

export default function AesVaultSimulator() {
  const [plainKey, setPlainKey] = useState('WIN11-PRO-OEM-9921-XK88');
  const [iv, setIv] = useState('e8f9a12c4b7d301e');
  const [cipherText, setCipherText] = useState('U2FsdGVkX1+mZ7B...89xXWqL99+vO0=');
  const [isRevealed, setIsRevealed] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [isEncrypting, setIsEncrypting] = useState(false);

  useEffect(() => {
    let timer;
    if (isRevealed && countdown > 0) {
      timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
    } else if (countdown === 0) {
      setIsRevealed(false);
      setCountdown(10);
    }
    return () => clearInterval(timer);
  }, [isRevealed, countdown]);

  const handleSimulateEncrypt = () => {
    sound.click();
    setIsEncrypting(true);
    setTimeout(() => {
      sound.success();
      // Generate pseudo-random IV
      const newIv = Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      // Generate simulated ciphertext
      const encoded = btoa(`AES256-${plainKey}-${newIv}`);
      setIv(newIv);
      setCipherText(`$aes256$iv_${newIv.slice(0, 8)}$${encoded.slice(0, 24)}==`);
      setIsEncrypting(false);
      setIsRevealed(false);
      setCountdown(10);
    }, 400);
  };

  const handleReveal = () => {
    sound.ping();
    setIsRevealed(true);
    setCountdown(10);
  };

  return (
    <div className="bg-[#F8FAFC] border border-slate-200 rounded-lg p-6 shadow-sm space-y-5">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 block mb-0.5">
          Simulador Criptográfico Interactivo
        </span>
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Key className="w-5 h-5 text-emerald-700" />
          <span>Bóveda Criptográfica AES-256-CBC y Visor Seguro Efímero</span>
        </h3>
        <p className="text-xs text-slate-600 mt-1 font-mono">
          Interactúa con el mecanismo real que protege las licencias y seriales en la base de datos PostgreSQL 16.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Input & Encryption */}
        <div className="space-y-4">
          <div>
            <label className="text-xs font-mono font-bold text-slate-700 block mb-1">
              Clave de Licencia en Claro (Entrada de Vendedor):
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={plainKey}
                onChange={(e) => setPlainKey(e.target.value)}
                placeholder="Ingresa una clave de prueba..."
                className="flex-1 px-3 py-2 text-sm bg-white border border-slate-300 rounded-md font-mono text-slate-900 focus:outline-none focus:border-emerald-400"
              />
              <button
                onClick={handleSimulateEncrypt}
                disabled={isEncrypting}
                className="px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-700 border border-emerald-500/40 text-xs font-mono font-bold rounded-md shadow-sm flex items-center gap-1.5 transition disabled:opacity-50"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{isEncrypting ? 'Cifrando...' : 'Cifrar AES-256'}</span>
              </button>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-md p-4 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5 text-cyan-700">
                <Database className="w-3.5 h-3.5" />
                <span>Persistencia en PostgreSQL 16</span>
              </span>
              <span className="text-[10px] text-emerald-700 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">
                table: digital_keys
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Vector de Inicialización (IV 16 bytes):</span>
              <div className="text-xs font-mono text-slate-700 bg-[#F8FAFC] p-2 border border-slate-200 rounded-lg break-all">
                {iv}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Texto Cifrado en Reposo (Ciphertext):</span>
              <div className="text-xs font-mono text-emerald-700 bg-[#F8FAFC] p-2.5 border border-emerald-500/30 rounded-lg break-all font-bold">
                {cipherText}
              </div>
            </div>

            <p className="text-[11px] text-slate-600 italic mt-2">
              🛡️ Aunque un atacante obtenga un volcado SQL de la base de datos, las claves son ilegibles sin la llave maestra de 256 bits resguardada en el hardware KMS.
            </p>
          </div>
        </div>

        {/* Right: RAM Buffering & Ephemeral Viewer */}
        <div className="bg-white border border-slate-200 text-slate-900 rounded-md p-5 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-700" />
                <span className="text-xs font-bold text-slate-800 font-mono">Visor Seguro de Claves (Frontend Efímero)</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                RAM Buffering
              </span>
            </div>

            <div className="space-y-3 font-mono">
              <span className="text-xs text-slate-600 block">
                Visualización para el Comprador Autenticado:
              </span>

              <div className="bg-[#F8FAFC] border border-slate-200 rounded-md p-4 flex items-center justify-between">
                <div className="font-mono text-base font-bold tracking-wider text-emerald-700">
                  {isRevealed ? plainKey : '••••-••••-••••-••••-••••'}
                </div>
                {isRevealed ? (
                  <span className="text-xs text-amber-400 font-bold font-mono">
                    Auto-bloqueo: {countdown}s
                  </span>
                ) : (
                  <EyeOff className="w-4 h-4 text-slate-500" />
                )}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                El visor solicita el descifrado directamente a la memoria RAM de PHP/Laravel únicamente tras validar la sesión activa del comprador propietario de la orden.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 mt-4 flex items-center justify-between font-mono">
            <button
              onClick={handleReveal}
              disabled={isRevealed}
              className="px-4 py-2 bg-emerald-500 text-slate-950 font-bold text-xs rounded-md transition hover:bg-emerald-400 flex items-center gap-1.5 disabled:opacity-50"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{isRevealed ? 'Clave Visible en RAM' : 'Revelar Clave (10s)'}</span>
            </button>

            <span className="text-[11px] text-slate-500 font-mono">
              RFC 2898 / NIST Compliant
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
