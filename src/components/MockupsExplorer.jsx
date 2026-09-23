import React, { useState, useRef, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Search, LayoutGrid, Eye } from 'lucide-react';
import { MOCKUPS_DATA } from '../data/mockupsData';
import { sound } from '../lib/soundSynthesizer';

export default function MockupsExplorer({ onOpenLightbox }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const trackRef = useRef(null);

  const categories = [
    { id: 'all', label: 'Todos (72)' },
    { id: 'auth', label: 'Autenticación (M01-M08)' },
    { id: 'tiendas', label: 'Tiendas & Vendedores (M09-M18)' },
    { id: 'productos', label: 'Productos & Claves (M19-M28)' },
    { id: 'catalogo', label: 'Catálogo & Búsqueda (M29-M36)' },
    { id: 'carrito', label: 'Carrito & Checkout (M37-M46)' },
    { id: 'chat', label: 'Entrega & Chat (M47-M56)' },
    { id: 'reclamos', label: 'Garantías & Reclamos (M57-M64)' },
    { id: 'admin', label: 'Backoffice & Auditoría (M65-M72)' },
  ];

  const filteredMockups = useMemo(() => {
    return MOCKUPS_DATA.filter((m) => {
      const matchCat = activeCategory === 'all' || m.cat === activeCategory;
      const matchSearch =
        searchQuery === '' ||
        m.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleScroll = (direction) => {
    sound.click();
    if (trackRef.current) {
      const scrollAmount = direction === 'left' ? -420 : 420;
      trackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="space-y-4" id="cap4-mockups">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 block mb-0.5">
            Capítulo 06 • Interfaces de Usuario UI/UX
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <LayoutGrid className="w-6 h-6 text-emerald-400" />
            <span>Catálogo Completo de Mockups UI/UX (72 Pantallas)</span>
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Diseño de interfaces en alta definición organizadas por módulos funcionales del SRS.
          </p>
        </div>

        {/* Buscador de Mockups */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar pantalla (ej: 2FA, Carrito, RUT)..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-[#0B101B] border border-slate-700/80 rounded-xl text-white font-mono placeholder:text-slate-500 focus:outline-none focus:border-emerald-400 shadow-inner"
          />
        </div>
      </div>

      {/* Barra de Filtros y Controles de Scroll */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none flex-1 font-mono">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                sound.click();
                setActiveCategory(cat.id);
                if (trackRef.current) trackRef.current.scrollTo({ left: 0, behavior: 'smooth' });
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition ${
                activeCategory === cat.id
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm'
                  : 'bg-[#0B101B] border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => handleScroll('left')}
            className="p-2 bg-[#0B101B] border border-slate-800 hover:bg-slate-900 text-slate-300 rounded-xl transition"
            title="Desplazar a la izquierda"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleScroll('right')}
            className="p-2 bg-[#0B101B] border border-slate-800 hover:bg-slate-900 text-slate-300 rounded-xl transition"
            title="Desplazar a la derecha"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Track Horizontal de Mockups */}
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto pb-4 pt-1 scroll-smooth scrollbar-thin"
      >
        {filteredMockups.length === 0 ? (
          <div className="w-full py-16 text-center text-slate-500 font-mono text-sm bg-[#0B101B] rounded-2xl border border-slate-800">
            No se encontraron pantallas para este filtro o criterio de búsqueda.
          </div>
        ) : (
          filteredMockups.map((mockup) => (
            <div
              key={mockup.id}
              onClick={() => {
                sound.ping();
                onOpenLightbox(`assets/mockups/${mockup.file}`, `${mockup.id}: ${mockup.title}`, mockup.desc);
              }}
              className="flex-none w-[320px] bg-[#0B101B] border border-slate-800 rounded-2xl overflow-hidden shadow-xl hover:border-emerald-500/60 hover:shadow-2xl hover:shadow-emerald-950/20 transition-all duration-300 cursor-pointer group flex flex-col"
            >
              {/* Thumbnail */}
              <div className="w-full h-44 bg-black overflow-hidden relative">
                <img
                  src={`assets/mockups/${mockup.file}`}
                  alt={mockup.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B101B] via-transparent to-transparent opacity-80" />
                <div className="absolute top-2 right-2 p-1.5 bg-black/70 border border-slate-700 text-emerald-400 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Información de la Tarjeta */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5 font-mono">
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                      {mockup.id}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">
                      {mockup.catName}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-1">
                    {mockup.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {mockup.desc}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-emerald-400 font-mono font-bold">
                  <span>Ver a Pantalla Completa</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-3 bg-[#0B101B] border border-slate-800 rounded-xl text-xs font-mono text-slate-300 flex flex-wrap items-center justify-between gap-2">
        <span className="flex items-center gap-1.5 text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          Haz clic en cualquier pantalla para abrirla en el Lightbox 300 DPI con zoom e información del requerimiento.
        </span>
        <span className="font-bold text-emerald-400">
          Mostrando {filteredMockups.length} de {MOCKUPS_DATA.length} pantallas
        </span>
      </div>
    </section>
  );
}
