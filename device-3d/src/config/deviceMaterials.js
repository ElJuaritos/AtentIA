/**
 * Configuración del prototipo 3D matIA — colores, escala y metadatos de piezas.
 * Basado en matIA_Prototipo_3D.html (AtentIA).
 */

/** Escala respecto al prototipo original (unidades Three.js del HTML) */
export const SCALE = 0.28;

export const COLORS = {
  navy: '#2A3C86',
  orange: '#FF7A14',
  dpad: '#2B3358',
  ss: '#9AA3B6',
  speaker: '#050709',
  knob: '#3A4775',
  knobGroove: '#2C3866',
  knobTop: '#5A66A0',
  port: '#0A1018',
  portRing: '#B2BAC4',
  usbInner: '#B8C0CA',
  panel: '#161F40',
  cartridge: '#E15A97',
  ptt: '#2E8B92',
  pttRing: '#10193A',
  back: '#243066',
  screw: '#9AA7B2',
  backLogo: '#4C5AA0',
};

/** Metadatos de piezas — usados en panel lateral y raycast */
export const PARTS = {
  pantalla: {
    label: 'Pantalla e-ink (sin luz, tipo Kindle)',
    color: '#8C887E',
    desc: 'Pantalla de tinta electrónica (e-ink) en escala de grises: NO emite luz, cuida la vista del niño y consume muy poca batería. Muestra a Mati y la lección del día como apoyo al audio.',
  },
  protecciones: {
    label: 'Esquineros de protección',
    color: COLORS.orange,
    desc: 'Esquineros de silicón en las 4 esquinas que abrazan el borde para soportar caídas y uso rudo.',
  },
  dpad: {
    label: 'Cruceta (D-pad)',
    color: COLORS.dpad,
    desc: 'Control direccional para navegar lecciones y juegos educativos.',
  },
  botones: {
    label: 'Botones A / B',
    color: COLORS.orange,
    desc: 'Botones de acción en silicón naranja: confirmar, responder, jugar.',
  },
  ss: {
    label: 'Start / Select',
    color: COLORS.ss,
    desc: 'Pulsadores tipo pastilla para iniciar y elegir.',
  },
  bocina: {
    label: 'Bocina (rejilla diagonal)',
    color: '#0A0C12',
    desc: 'Orificios negros en diagonal sobre la bocina, al frente.',
  },
  cartucho: {
    label: 'Cartucho / tarjeta de tema',
    color: COLORS.cartridge,
    desc: 'Tarjeta tipo cartucho que se inserta arriba: carga un tema (funciona offline, estilo Game Boy) y acota a la IA. Coleccionable y curado por los padres.',
  },
  perilla: {
    label: 'Perilla de volumen (esquina)',
    color: COLORS.knob,
    desc: 'Dial texturizado en la esquina superior derecha. Volumen con tope seguro.',
  },
  puertos: {
    label: 'Puertos (abajo): jack 3.5 + USB-C',
    color: '#0E1626',
    desc: 'Audífonos de 3.5 mm y carga USB-C en el borde inferior.',
  },
  carcasa: {
    label: 'Carcasa sellada · material',
    color: COLORS.navy,
    desc: 'ABS azul satinado, resistente a golpes y SELLADO (sin rejillas, para que no entren migajas ni líquidos). Disipa el calor con un disipador interno. Sin cámara.',
  },
  ptt: {
    label: 'Botón Push-to-Talk (privacidad)',
    color: COLORS.ptt,
    desc: 'El micrófono SOLO escucha mientras el niño mantiene presionado este botón. Sin escucha pasiva ni micrófono siempre encendido.',
  },
};

/** Dimensiones del cuerpo en unidades del prototipo (antes de escalar) */
export const BODY = {
  width: 4.7,
  height: 6.0,
  cornerRadius: 0.62,
  extrudeDepth: 1.0,
  bevelThickness: 0.26,
  bevelSize: 0.26,
  frontZ: 0.9,
  backZ: -0.9,
};

export const CAMERA = {
  position: [0, 0, 16 * SCALE],
  fov: 36,
  near: 0.1,
  far: 100,
};

export const ORBIT = {
  minDistance: 2.8,
  maxDistance: 7.5,
  minPolarAngle: Math.PI / 6,
  maxPolarAngle: Math.PI / 1.65,
  autoRotateSpeed: 0.35,
  initialRotation: [0.08, -0.3, 0],
};

/** Multiplica coordenadas del prototipo HTML por SCALE */
export function s(value) {
  return value * SCALE;
}
