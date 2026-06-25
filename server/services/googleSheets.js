/**
 * Envía registros de waitlist a Google Sheets vía Apps Script Web App.
 * Si las variables de entorno no están configuradas, no hace nada.
 */

const WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim();
const SECRET = process.env.GOOGLE_SHEETS_SECRET?.trim();

/**
 * Añade una fila a la hoja de cálculo. No lanza errores al caller.
 * @param {{ email: string, name: string, joinedAt: string }} entry
 * @param {number} position
 */
export async function appendToGoogleSheet(entry, position) {
  if (!WEBHOOK_URL || !SECRET) return;

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: SECRET,
        email: entry.email,
        name: entry.name,
        joinedAt: entry.joinedAt,
        position,
      }),
    });

    if (!res.ok) {
      console.error('Google Sheets webhook error:', res.status, await res.text());
    }
  } catch (err) {
    console.error('Google Sheets webhook failed:', err.message);
  }
}
