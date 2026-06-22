/**
 * Utilidades de validación y sanitización para la API de waitlist.
 */

const EMAIL_MAX = 254;
const NAME_MAX = 100;

/** Valida formato de email con longitud máxima. */
export function isValidEmail(email) {
  if (typeof email !== 'string') return false;
  const trimmed = email.trim();
  if (trimmed.length === 0 || trimmed.length > EMAIL_MAX) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}

/** Sanitiza nombre: trim, quita tags HTML, limita longitud. */
export function sanitizeName(name) {
  if (typeof name !== 'string') return '';
  return name
    .trim()
    .replace(/<[^>]*>/g, '')
    .slice(0, NAME_MAX);
}

/** Normaliza email para almacenamiento. */
export function normalizeEmail(email) {
  return email.trim().toLowerCase();
}
