import React, { useState, useMemo } from 'react';
import { X, Search, Volume2, BookOpen, ChevronRight, Layers } from 'lucide-react';
import { TECH_DICTIONARY } from '../data/dictionaryData';
import { sound } from '../lib/soundSynthesizer';

export default function DictionaryDrawer({ isOpen, onClose, onSelectTerm }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('todos');

  const categories = [
    { id: 'todos', label: 'Todos' },
    { id: 'pagos', label: 'Pasarela & Pagos' },
    { id: 'arquitectura', label: 'Arquitectura' },
    { id: 'seguridad', label: 'Ciberseguridad' },
    { id: 'bd', label: 'Base de Datos' },
    { id: 'legal', label: 'Marco Legal' },
  ];

  const filteredTerms = useMemo(() => {
    return TECH_DICTIONARY.filter((item) => {
      const matchCat = activeCategory === 'todos' || item.category === activeCategory;
      const matchSearch =
        searchQuery === '' ||
        item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.analogy.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleSpeak = (e, text) => {
    e.stopPropagation();
    sound.ping();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      window.speechSynthesis.speak(utterance);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F8FAFC] border-l border-slate-200 shadow-sm flex flex-col animate-slideLeft">

          {/* Header */}
          <div className="p-5 border-b border-slate-200 bg-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 rounded-md">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-black text-slate-900 font-mono">Glosario Técnico</h2>
                <p className="text-[11px] text-slate-600 font-mono">31 conceptos formales de ingeniería y leyes</p>
              </div>
            </div>
            <button
              onClick={() => {
                sound.click();
                onClose();
              }}
              className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search & Filters */}
          <div className="p-4 border-b border-slate-200 bg-[#F8FAFC] space-y-3 font-mono">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar tecnología, ley, o concepto..."
                className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-slate-300/80 rounded-md text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-400 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-900"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Categorías */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    sound.click();
                    setActiveCategory(cat.id);
                  }}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg whitespace-nowrap transition ${
                    activeCategory === cat.id
                      ? 'bg-emerald-500/20 text-emerald-700 border border-emerald-500/40 shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Lista de Términos */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2.5 font-mono">
            {filteredTerms.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs">
                No se encontraron términos que coincidan con la búsqueda.
              </div>
            ) : (
              filteredTerms.map((term) => (
                <div
                  key={term.id}
                  onClick={() => {
                    sound.ping();
                    onSelectTerm(term);
                  }}
                  className="p-3.5 rounded-md border border-slate-200 hover:border-emerald-500/50 bg-white cursor-pointer transition group shadow-sm"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                      {term.categoryName}
                    </span>
                    <button
                      onClick={(e) => handleSpeak(e, `${term.term}. ${term.summary}`)}
                      className="text-slate-500 hover:text-emerald-700 p-1 rounded hover:bg-slate-200 transition"
                      title="Pronunciar término"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 group-hover:text-emerald-800 flex items-center justify-between mt-1">
                    {term.term}
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-transform" />
                  </h3>
                  <p className="text-[11px] text-slate-600 mt-1 line-clamp-2 leading-relaxed font-sans">
                    {term.summary}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Footer Info */}
          <div className="p-3 bg-white border-t border-slate-200 text-center text-xs text-slate-500 font-mono">
            Mostrando {filteredTerms.length} de {TECH_DICTIONARY.length} conceptos clave
          </div>
        </div>
      </div>
    </div>
  );
}
