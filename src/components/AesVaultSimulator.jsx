import React, { useState, useEffect } from 'react';
import { Lock, Unlock, Key, Eye, EyeOff, ShieldCheck, Database, Cpu } from 'lucide-react';

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
    setIsEncrypting(true);
    setTimeout(() => {
      // Generar IV pseudoaleatorio
      const newIv = Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      // Generar ciphertext simulado
      const encoded = btoa(`AES256-${plainKey}-${newIv}`);
      setIv(newIv);
      setCipherText(`$aes256$iv_${newIv.slice(0, 8)}$${encoded.slice(0, 24)}==`);
      setIsEncrypting(false);
      setIsRevealed(false);
      setCountdown(10);
    }, 400);
  };

  const handleReveal = () => {
    setIsRevealed(true);
    setCountdown(10);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-card space-y-5">
      {/* Header */}
      <div className="border-b border-slate-100 pb-4">
        <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 block mb-0.5">
          Simulador Criptográfico Interactivo
        </span>
        <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
          <Key className="w-5 h-5 text-emerald-500" />
          Bóveda Criptográfica AES-256-CBC y Visor Seguro Efímero
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Interactúa con el mecanismo real que protege las claves de activación en la base de datos PostgreSQL.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lado 1: Entrada y Cifrado */}
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Clave de Licencia en Claro (Entrada de Vendedor):
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={plainKey}
                onChange={(e) => setPlainKey(e.target.value)}
                placeholder="Ingresa una clave de prueba..."
                className="flex-1 px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg font-mono focus:outline-none focus:border-emerald-500 focus:bg-white"
              />
              <button
                onClick={handleSimulateEncrypt}
                disabled={isEncrypting}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-xs flex items-center gap-1.5 transition-colors disabled:opacity-50"
              >
                <Lock className="w-3.5 h-3.5" />
                {isEncrypting ? 'Cifrando...' : 'Cifrar AES-256'}
              </button>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600">
              <span className="flex items-center gap-1">
                <Database className="w-3.5 h-3.5 text-blue-600" />
                Almacenamiento en Base de Datos (PostgreSQL 16)
              </span>
              <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-mono">
                table: digital_keys
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] text-slate-500">Vector de Inicialización (IV 16 bytes):</span>
              <div className="text-xs font-mono text-slate-800 bg-white p-2 border border-slate-200 rounded break-all">
                {iv}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] text-slate-500">Texto Cifrado en Reposo (Ciphertext):</span>
              <div className="text-xs font-mono text-emerald-800 bg-emerald-50/50 p-2.5 border border-emerald-200 rounded break-all font-bold">
                {cipherText}
              </div>
            </div>

            <p className="text-[11px] text-slate-500 italic mt-2">
              🛡️ Aunque un atacante obtenga un volcado SQL de la base de datos, las claves son inútiles sin la llave maestra de 256 bits resguardada en el servidor.
            </p>
          </div>
        </div>

        {/* Lado 2: Despacho en RAM y Visor Seguro */}
        <div className="bg-slate-900 text-white rounded-xl p-5 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-slate-300">Visor Seguro de Claves (Frontend Efímero)</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                RAM Buffering
              </span>
            </div>

            <div className="space-y-3">
              <span className="text-xs text-slate-400 block">
                Visualización para el Comprador Legítimo:
              </span>

              <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 flex items-center justify-between">
                <div className="font-mono text-base font-bold tracking-wider text-emerald-300">
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

              <p className="text-xs text-slate-400 leading-relaxed">
                El visor solicita el descifrado directamente a la memoria RAM de PHP/Laravel únicamente tras validar la sesión activa del comprador propietario de la orden.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 mt-4 flex items-center justify-between">
            <button
              onClick={handleReveal}
              disabled={isRevealed}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-50"
            >
              <Eye className="w-3.5 h-3.5" />
              {isRevealed ? 'Clave Visible en RAM' : 'Revelar Clave (10s)'}
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
