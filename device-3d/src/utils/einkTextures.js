/**
 * Texturas canvas del prototipo — pantalla e-ink, etiquetas y cartucho.
 */
import { CanvasTexture, NearestFilter, SRGBColorSpace } from 'three';

function makeTex(canvas, nearest = false) {
  const tex = new CanvasTexture(canvas);
  tex.colorSpace = SRGBColorSpace;
  if (nearest) {
    tex.magFilter = NearestFilter;
    tex.minFilter = NearestFilter;
  }
  return tex;
}

/** Pantalla e-ink estilo Kindle — pixel art Mati + lección del día */
export function createEinkScreenTexture() {
  const W = 200;
  const H = 150;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  const PAPER = '#CFCBBF';
  const INK = '#2A2822';
  const INK2 = '#55514A';
  const GR = '#7C786F';
  const LT = '#9C988E';

  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, W, H);

  // Planeta con anillo
  ctx.fillStyle = GR;
  ctx.beginPath();
  ctx.arc(168, 30, 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = INK;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.ellipse(168, 30, 19, 6, 0.5, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = INK;
  ctx.font = "bold 18px 'Courier New', monospace";
  ctx.fillText('HOY:', 12, 30);
  ctx.fillText('LOS PLANETAS', 12, 52);

  // Mati pixel art
  const B = INK2;
  const P = LT;
  const E = '#1A1814';
  const Wpx = '#403C35';
  const px = 9;
  const ox = 120;
  const oy = 66;
  const mat = [
    '..BB.....',
    'B..BBB...',
    'B.BBBBBP.',
    '.BBBBBBPP',
    '.BBEBBBPP',
    '.BBBBBBP.',
    '..BBBBB..',
    '..B.B.B..',
  ];
  for (let r = 0; r < mat.length; r += 1) {
    for (let c = 0; c < mat[r].length; c += 1) {
      const ch = mat[r][c];
      if (ch === '.') continue;
      const col = ch === 'B' ? B : ch === 'P' ? P : ch === 'E' ? E : Wpx;
      ctx.fillStyle = col;
      ctx.fillRect(ox + c * px, oy + r * px, px, px);
    }
  }

  // Barra inferior
  ctx.fillStyle = GR;
  for (let i = 0; i < 10; i += 1) ctx.fillRect(i * 20, 140, 16, 10);
  ctx.fillStyle = INK2;
  ctx.font = "bold 12px 'Courier New', monospace";
  ctx.fillText('matIA', 150, 148);

  return makeTex(canvas, true);
}

/** Etiqueta de texto para logo o cartucho */
export function createLabelTexture(text, color = '#DDE6F2') {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 256, 64);
  ctx.fillStyle = color;
  ctx.font = "bold 30px 'Trebuchet MS', sans-serif";
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 128, 36);
  return makeTex(canvas);
}

// Alias para compatibilidad
export const createScreenTexture = createEinkScreenTexture;
export const createBezelLogoTexture = () => createLabelTexture('matIA', '#E7EEF3');
export const createCartridgeTexture = () => createLabelTexture('PLANETAS', '#FFFFFF');
