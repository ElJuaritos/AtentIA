/**
 * URL base de la API — proxy local en dev y variable de entorno en producción.
 */
const API_BASE = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || '';

/** Indica si el frontend apunta a un backend externo (requerido en GitHub Pages). */
export const isApiConfigured = Boolean(API_BASE);

export function apiUrl(path) {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE}${normalized}`;
}

/** Mensaje de error legible cuando la waitlist no puede conectarse. */
export function getWaitlistErrorMessage(status) {
  if (status === 405) {
    return import.meta.env.DEV
      ? 'El servidor API no acepta POST. Ejecuta npm run dev desde la carpeta AtentIA (cliente + API).'
      : 'El formulario no está conectado al backend. Configura VITE_API_URL en GitHub Secrets y redespliega.';
  }

  if (status === 429) {
    return 'Demasiados intentos desde tu conexión. Espera unos minutos e intenta de nuevo.';
  }

  if (status >= 500) {
    return import.meta.env.DEV
      ? 'No pudimos conectar con la API local (puerto 3001). ¿Está corriendo el servidor?'
      : 'El servidor no respondió. Intenta de nuevo en unos minutos.';
  }

  return 'No pudimos conectar. Intenta de nuevo.';
}
