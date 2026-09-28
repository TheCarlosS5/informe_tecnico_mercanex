import React, { useMemo, useState } from 'react';
import { FileText, FolderOpen, ExternalLink, Search } from 'lucide-react';
import { driveItems, driveRoot } from '../data/driveAssets';

const children = new Map();
for (const item of driveItems) {
  const siblings = children.get(item.parent) || [];
  siblings.push(item);
  children.set(item.parent, siblings);
}
for (const siblings of children.values()) {
  siblings.sort((a, b) => a.type === b.type
    ? a.name.localeCompare(b.name, 'es', { numeric: true })
    : a.type === 'folder' ? -1 : 1);
}

function typeLabel(item) {
  if (item.type === 'folder') return 'Carpeta';
  const extension = item.name.split('.').pop();
  return extension && extension !== item.name ? extension.toUpperCase() : item.mime;
}

function Entry({ item, query, depth = 0 }) {
  const descendants = children.get(item.id) || [];
  const matches = !query || item.name.toLocaleLowerCase('es').includes(query);
  const visibleChildren = descendants.filter(child => matches || child.path.toLocaleLowerCase('es').includes(query) || driveItems.some(candidate => candidate.path.startsWith(child.path + '/') && candidate.name.toLocaleLowerCase('es').includes(query)));
  if (!matches && !visibleChildren.length) return null;
  if (item.type === 'folder') {
    return (
      <details open={Boolean(query) || depth < 2} className="group border-l border-slate-800 ml-2 pl-3">
        <summary className="cursor-pointer list-none flex items-center gap-2 py-2 text-slate-200 hover:text-emerald-300">
          <FolderOpen className="w-4 h-4 shrink-0 text-emerald-400" />
          <span className="font-semibold break-all">{item.name}</span>
          <span className="text-[10px] text-slate-500 font-mono">{descendants.length} elementos</span>
        </summary>
        <div className="space-y-1">
          {visibleChildren.map(child => <Entry key={child.id} item={child} query={query} depth={depth + 1} />)}
        </div>
      </details>
    );
  }
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg bg-[#06090F] border border-slate-800/80 px-3 py-2 ml-2 text-xs">
      <FileText className="w-4 h-4 shrink-0 text-cyan-400" />
      <span className="min-w-0 flex-1 break-all text-slate-200">{item.name}</span>
      <span className="font-mono text-[10px] text-slate-500">{typeLabel(item)}</span>
      <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-200 font-semibold">
        Abrir en Drive <ExternalLink className="w-3 h-3" />
      </a>
    </div>
  );
}

export default function EvidenceExplorer() {
  const [search, setSearch] = useState('');
  const query = useMemo(() => search.trim().toLocaleLowerCase('es'), [search]);
  return (
    <section id="evidencias" className="space-y-4">
      <div className="border-b border-slate-800 pb-4">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">Repositorio documental</span>
        <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2 mt-1">
          <FolderOpen className="w-6 h-6 text-emerald-400" /> Evidencias / Documentación
        </h2>
        <p className="text-sm text-slate-400 mt-1">Estructura y nombres de Google Drive. {driveItems.filter(item => item.type === 'file').length} archivos en {driveItems.filter(item => item.type === 'folder').length} carpetas.</p>
      </div>
      <label className="relative block max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input value={search} onChange={event => setSearch(event.target.value)} placeholder="Buscar archivos o carpetas" className="w-full pl-9 pr-3 py-2 bg-[#0B101B] border border-slate-700/80 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-emerald-400" />
      </label>
      <div className="rounded-2xl bg-[#0B101B] border border-slate-800 p-4 max-h-[680px] overflow-auto scrollbar-thin text-sm">
        <Entry item={driveRoot} query={query} />
      </div>
    </section>
  );
}
