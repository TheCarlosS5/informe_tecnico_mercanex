import React, { useState, useMemo } from 'react';
import { X, Search, Volume2, BookOpen, ChevronRight, Layers } from 'lucide-react';
import { TECH_DICTIONARY } from '../data/dictionaryData';

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
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-slate-200 shadow-2xl flex flex-col animate-slideLeft">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Glosario Técnico</h2>
                <p className="text-xs text-slate-500">31 términos de arquitectura, pasarelas y leyes</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Buscador & Filtros */}
          <div className="p-4 border-b border-slate-200 bg-white space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar tecnología, ley, o concepto..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
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
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-full whitespace-nowrap transition-colors ${
                    activeCategory === cat.id
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Lista de Términos */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
            {filteredTerms.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-sm">
                No se encontraron términos que coincidan con la búsqueda.
              </div>
            ) : (
              filteredTerms.map((term) => (
                <div
                  key={term.id}
                  onClick={() => {
                    onSelectTerm(term);
                  }}
                  className="p-3.5 rounded-lg border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/40 bg-white cursor-pointer transition-all duration-150 group shadow-xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded">
                      {term.categoryName}
                    </span>
                    <button
                      onClick={(e) => handleSpeak(e, `${term.term}. ${term.summary}`)}
                      className="text-slate-400 hover:text-emerald-600 p-1 rounded hover:bg-emerald-100/50"
                      title="Pronunciar término"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-800 flex items-center justify-between">
                    {term.term}
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-transform" />
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {term.summary}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Footer Info */}
          <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-400 font-medium">
            Mostrando {filteredTerms.length} de {TECH_DICTIONARY.length} conceptos clave
          </div>
        </div>
      </div>
    </div>
  );
}
