import manifest from './driveManifest.json';

const technical = 'Mercanex/Evidencias Informe Tecnico/';
const byPath = new Map(manifest.map(item => [item.path, item]));

export const driveItems = manifest;
export const driveRoot = {
  id: '1Ln1rwdwVSWwGS86i81mLwv_Ftd4G18Il',
  name: 'E5',
  url: 'https://drive.google.com/drive/folders/1Ln1rwdwVSWwGS86i81mLwv_Ftd4G18Il',
  type: 'folder',
};

export function driveAsset(kind, filename) {
  const folder = kind === 'mockups' ? '4. Mockup' : '3. Diagramas';
  return byPath.get(`${technical}${folder}/${filename}`) || null;
}

export function driveImage(kind, filename, size = 1600) {
  const item = driveAsset(kind, filename);
  return item ? `https://drive.google.com/thumbnail?id=${encodeURIComponent(item.id)}&sz=w${size}` : '';
}

export function resolveDriveImage(src) {
  const match = src?.match(/(?:^|\/)assets\/(mockups|diagrams)\/([^/?#]+)$/);
  if (!match) return { image: src, url: src };
  const item = driveAsset(match[1], match[2]);
  return { image: item ? driveImage(match[1], match[2], 2400) : '', url: item?.url || '' };
}
