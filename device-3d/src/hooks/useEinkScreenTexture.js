/**
 * Hook — textura de pantalla e-ink (prototipo HTML, sin imagen externa).
 */
import { useMemo } from 'react';
import { createEinkScreenTexture } from '../utils/einkTextures';

export function useEinkScreenTexture() {
  const texture = useMemo(() => createEinkScreenTexture(), []);
  return texture;
}
