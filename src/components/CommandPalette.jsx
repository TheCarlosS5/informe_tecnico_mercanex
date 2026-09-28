import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X, Layers, Image as ImageIcon, GitFork, Database, CheckCircle2, BookOpen, ArrowRight, CornerDownLeft } from 'lucide-react';
import { sound } from '../lib/soundSynthesizer';
import semanticData from '../data/mercanex_semantic_inventory.json';
import { MOCKUPS_DATA } from '../data/mockupsData';
import { DIAGRAMS_DATA } from '../data/diagramsData';
import { TECH_DICTIONARY } from '../data/dictionaryData';
import { driveItems } from '../data/driveAssets';

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
        badgeColor: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30',
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
        badgeColor: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30',
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
        badgeColor: 'bg-blue-500/10 text-blue-400 border border-blue-500/30',
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
        badgeColor: 'bg-amber-500/10 text-amber-400 border border-amber-500/30',
        title: `Tabla: ${t.table}`,
        subtitle: `Campos: ${t.fields.slice(0, 70)}...`,
        targetSection: 'cap6-der',
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
        badgeColor: 'bg-rose-500/10 text-rose-400 border border-rose-500/30',
        title: `${cp.id}: ${cp.title}`,
        subtitle: `Ref: ${cp.reference} • Resultado: ${cp.expected_result}`,
        targetSection: 'cap9-qa',
        raw: cp
      });
    });

    // 6. Glossary terms (31)
    TECH_DICTIONARY.forEach(term => {
      items.push({
        id: term.id,
        type: 'term',
        typeLabel: 'Concepto Clave',
        icon: BookOpen,
        badgeColor: 'bg-purple-500/10 text-purple-400 border border-purple-500/30',
        title: term.term,
        subtitle: term.summary,
        raw: term
      });
    });

    driveItems.forEach(item => {
      items.push({
        id: item.id,
        type: 'evidence',
        typeLabel: item.type === 'folder' ? 'Carpeta Drive' : 'Archivo Drive',
        icon: item.type === 'folder' ? Layers : BookOpen,
        badgeColor: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30',
        title: item.name,
        subtitle: item.path,
        raw: item,
      });
    });

    return items;
  }, []);

  // Filter items based on user query
  const filtered = useMemo(() => {
    if (!query.trim()) return allItems.slice(0, 20); // Top 20 when empty

    const q = query.toLowerCase().trim();
    return allItems.filter(item => {
      return (
        item.id.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.typeLabel.toLowerCase().includes(q)
      );
    }).slice(0, 40); // Max 40 results
  }, [allItems, query]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      sound.ping();
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
      setQuery('');
    }
  }, [isOpen]);

  // Handle global shortcut (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
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
    sound.click();
    onClose();

    if (item.type === 'erf') {
      if (onSelectERF) onSelectERF(item.raw);
    } else if (item.type === 'mockup') {
      if (onOpenLightbox) {
        onOpenLightbox(`assets/mockups/${item.file}`, item.title, item.subtitle);
      }
    } else if (item.type === 'diagram') {
      if (onOpenLightbox) {
        onOpenLightbox(`assets/diagrams/${item.file}`, item.title, item.subtitle);
      }
    } else if (item.type === 'evidence') {
      window.open(item.raw.url, '_blank', 'noopener,noreferrer');
    } else if (item.type === 'term') {
      if (onSelectTerm) onSelectTerm(item.raw);
    } else if (item.targetSection) {
      if (onNavigateSection) onNavigateSection(item.targetSection);
    }
  };

  const handleListKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      sound.focus();
      setSelectedIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      sound.focus();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      e.preventDefault();
      handleSelect(filtered[selectedIndex]);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 px-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-2xl bg-[#0B101B] rounded-2xl shadow-2xl border border-slate-800 overflow-hidden flex flex-col max-h-[80vh] font-mono animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleListKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 gap-3 bg-[#06090F]">
          <Search className="w-5 h-5 text-emerald-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            className="w-full bg-transparent text-white placeholder-slate-500 text-sm focus:outline-none font-mono"
            placeholder="Buscar por ID (ERF-05.04, M12, D04, CP-03), término o concepto..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition"
              aria-label="Limpiar búsqueda"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-900 rounded border border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div ref={listRef} className="overflow-y-auto flex-1 p-2 space-y-1 divide-y divide-slate-800/60 scrollbar-thin">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-40 text-slate-400" />
              <p className="text-xs">No se encontraron artefactos para "{query}"</p>
              <p className="text-[11px] text-slate-600 mt-1">Prueba con "ERF", "Split", "PostgreSQL", "M39", o "Habeas Data"</p>
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
                  className={`p-3 rounded-xl cursor-pointer transition flex items-center justify-between gap-3 ${
                    isSelected 
                      ? 'bg-emerald-500/15 border border-emerald-500/40 text-white shadow-sm' 
                      : 'hover:bg-slate-900/60 text-slate-300 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-2 rounded-lg shrink-0 ${isSelected ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-900 text-slate-400 border border-slate-800'}`}>
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${item.badgeColor}`}>
                          {item.typeLabel}
                        </span>
                        <h4 className={`text-xs font-bold truncate ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5 font-sans">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-1 text-slate-500">
                    {isSelected && (
                      <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold">
                        <span>ABRIR</span>
                        <CornerDownLeft className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Navigation Hints */}
        <div className="px-4 py-2.5 bg-[#06090F] border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-400">↑↓</kbd> Navegar
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-400">↵</kbd> Seleccionar
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-400">ESC</kbd> Cerrar
            </span>
          </div>
          <div>
            <span className="text-emerald-400 font-bold">{filtered.length}</span> resultados indexados
          </div>
        </div>
      </div>
    </div>
  );
}
