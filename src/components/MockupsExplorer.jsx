import React, { useState, useRef, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Search, LayoutGrid, Eye } from 'lucide-react';
import { MOCKUPS_DATA } from '../data/mockupsData';

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
    if (trackRef.current) {
      const scrollAmount = direction === 'left' ? -420 : 420;
      trackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="space-y-4" id="cap4-mockups">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 block mb-0.5">
            Capítulo 04
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <LayoutGrid className="w-6 h-6 text-emerald-600" />
            Catálogo Completo de Mockups UI/UX (72 Pantallas)
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Diseño de interfaces en alta definición organizadas por módulos funcionales del SRS.
          </p>
        </div>

        {/* Buscador de Mockups */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar pantalla (ej: 2FA, Carrito, RUT)..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Barra de Filtros y Controles de Scroll */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none flex-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                if (trackRef.current) trackRef.current.scrollTo({ left: 0, behavior: 'smooth' });
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-full whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => handleScroll('left')}
            className="p-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg shadow-xs transition-colors"
            title="Desplazar a la izquierda"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleScroll('right')}
            className="p-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg shadow-xs transition-colors"
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
          <div className="w-full py-16 text-center text-slate-400 text-sm bg-white rounded-xl border border-slate-200">
            No se encontraron pantallas para este filtro o criterio de búsqueda.
          </div>
        ) : (
          filteredMockups.map((mockup) => (
            <div
              key={mockup.id}
              onClick={() => onOpenLightbox(`assets/mockups/${mockup.file}`, `${mockup.id}: ${mockup.title}`, mockup.desc)}
              className="flex-none w-[320px] bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs hover:shadow-card hover:border-emerald-500 transition-all duration-200 cursor-pointer group flex flex-col"
            >
              {/* Thumbnail */}
              <div className="w-full h-44 bg-slate-900 overflow-hidden relative">
                <img
                  src={`assets/mockups/${mockup.file}`}
                  alt={mockup.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors" />
                <div className="absolute top-2 right-2 p-1.5 bg-slate-900/60 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Información de la Tarjeta */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      {mockup.id}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {mockup.catName}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                    {mockup.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {mockup.desc}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-emerald-600 font-bold">
                  <span>Ver en Pantalla Completa</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg text-xs text-emerald-900 flex items-center justify-between">
        <span>
          💡 <strong>Tip de Navegación:</strong> Puedes hacer clic sobre cualquier pantalla para abrirla en alta definición a pantalla completa con zoom y detalles.
        </span>
        <span className="font-mono font-bold text-emerald-800">
          Mostrando {filteredMockups.length} de {MOCKUPS_DATA.length} pantallas
        </span>
      </div>
    </section>
  );
}
