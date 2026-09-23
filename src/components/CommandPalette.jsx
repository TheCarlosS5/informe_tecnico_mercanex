import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X, Layers, Image as ImageIcon, GitFork, Database, CheckCircle2, BookOpen, ArrowRight, CornerDownLeft } from 'lucide-react';
import { sound } from '../lib/soundSynthesizer';
import semanticData from '../data/mercanex_semantic_inventory.json';
import { MOCKUPS_DATA } from '../data/mockupsData';
import { DIAGRAMS_DATA } from '../data/diagramsData';
import { TECH_DICTIONARY } from '../data/dictionaryData';

export default function CommandPalette({
  isOpen,
  onClose,
  onSelectERF,
  onOpenLightbox,
  onSelectTerm,
  onNavigateSection
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Build unified search index
  const allItems = useMemo(() => {
    const items = [];

    // 1. ERFs (72)
    semanticData.erfs.forEach(erf => {
      items.push({
        id: erf.id,
        type: 'erf',
        typeLabel: 'Requisito ERF',
        icon: Layers,
        badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        title: `${erf.id} — ${erf.title}`,
        subtitle: `Actor: ${erf['actor(es)'] || 'N/A'} • Prioridad: ${erf.prioridad || 'Alta'}`,
        raw: erf
      });
    });

    // 2. Mockups (72)
    MOCKUPS_DATA.forEach(mockup => {
      items.push({
        id: mockup.id,
        type: 'mockup',
        typeLabel: 'Mockup UI',
        icon: ImageIcon,
        badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
        title: `${mockup.id}: ${mockup.title}`,
        subtitle: mockup.desc,
        file: mockup.file,
        raw: mockup
      });
    });

    // 3. Diagrams (16)
    DIAGRAMS_DATA.forEach(diag => {
      items.push({
        id: diag.id,
        type: 'diagram',
        typeLabel: 'Diagrama UML',
        icon: GitFork,
        badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
        title: diag.title,
        subtitle: diag.desc,
        file: diag.file,
        raw: diag
      });
    });

    // 4. DB Tables (15)
    semanticData.db_tables.forEach(t => {
      items.push({
        id: t.table,
        type: 'database',
        typeLabel: 'Tabla BD',
        icon: Database,
        badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
        title: `Tabla: ${t.table}`,
        subtitle: `Campos: ${t.fields.slice(0, 70)}...`,
        targetSection: 'der-section',
        raw: t
      });
    });

    // 5. Test Cases (20)
    semanticData.test_cases.forEach(cp => {
      items.push({
        id: cp.id,
        type: 'test',
        typeLabel: 'Caso de Prueba',
        icon: CheckCircle2,
        badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
        title: `${cp.id}: ${cp.title}`,
        subtitle: `Ref: ${cp.reference} • Resultado: ${cp.expected_result}`,
        targetSection: 'qa-section',
        raw: cp
      });
    });

    // 6. Glossary terms (31)
    TECH_DICTIONARY.forEach(term => {
      items.push({
        id: term.id,
        type: 'term',
        typeLabel: 'Glosario',
        icon: BookOpen,
        badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
        title: term.term,
        subtitle: term.definition,
        raw: term
      });
    });

    return items;
  }, []);

  // Filter items
  const filtered = useMemo(() => {
    const cleanQ = query.trim().toLowerCase();
    if (!cleanQ) return allItems.slice(0, 15);

    return allItems
      .filter(item => {
        return (
          item.id.toLowerCase().includes(cleanQ) ||
          item.title.toLowerCase().includes(cleanQ) ||
          item.subtitle.toLowerCase().includes(cleanQ) ||
          item.typeLabel.toLowerCase().includes(cleanQ)
        );
      })
      .slice(0, 20);
  }, [allItems, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      sound.playChime(650, 0.15);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Global Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled by parent or state
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSelect = (item) => {
    sound.playClick();
    onClose();

    if (item.type === 'erf') {
      if (onSelectERF) onSelectERF(item.raw);
    } else if (item.type === 'mockup') {
      if (onOpenLightbox) {
        onOpenLightbox(`/assets/mockups/${item.file}`, item.title, item.subtitle);
      }
    } else if (item.type === 'diagram') {
      if (onOpenLightbox) {
        onOpenLightbox(`/assets/diagrams/${item.file}`, item.title, item.subtitle);
      }
    } else if (item.type === 'term') {
      if (onSelectTerm) onSelectTerm(item.raw);
    } else if (item.targetSection) {
      if (onNavigateSection) onNavigateSection(item.targetSection);
    }
  };

  const handleListKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      e.preventDefault();
      handleSelect(filtered[selectedIndex]);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 px-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleListKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 gap-3">
          <Search className="w-5 h-5 text-emerald-600 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            className="w-full bg-transparent text-slate-800 placeholder-slate-400 text-base focus:outline-none"
            placeholder="Buscar por ID (ERF-05.04, M12, D04, CP-03), término o concepto..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
              aria-label="Limpiar búsqueda"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-mono font-medium text-slate-500 bg-slate-100 rounded border border-slate-200">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div ref={listRef} className="overflow-y-auto flex-1 p-2 space-y-1 divide-y divide-slate-50">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <Search className="w-8 h-8 mx-auto mb-2 stroke-1 opacity-50" />
              <p className="text-sm">No se encontraron artefactos para "{query}"</p>
              <p className="text-xs text-slate-400 mt-1">Prueba con "ERF", "Split", "PostgreSQL", "M39", o "Habeas Data"</p>
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={`${item.type}-${item.id}-${idx}`}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition text-left ${
                    isSelected ? 'bg-emerald-50/80 text-emerald-950' : 'hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-3">
                    <div className={`p-2 rounded-lg shrink-0 ${isSelected ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold truncate">{item.title}</span>
                        <span className={`px-2 py-0.5 text-[10px] font-mono uppercase font-semibold rounded-md border shrink-0 ${item.badgeColor}`}>
                          {item.typeLabel}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 truncate mt-0.5">{item.subtitle}</p>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="flex items-center gap-1 text-emerald-600 text-xs font-medium shrink-0">
                      <span>Abrir</span>
                      <CornerDownLeft className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer Hint */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-3">
            <span><kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded">↑</kbd> <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded">↓</kbd> Navegar</span>
            <span><kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded">↵</kbd> Seleccionar</span>
          </div>
          <span>Total: 72 ERFs • 72 Mockups • 16 Diagramas • 15 Tablas • 20 Casos QA</span>
        </div>
      </div>
    </div>
  );
}
