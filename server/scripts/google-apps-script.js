/**
 * Google Apps Script — copiar en Extensiones → Apps Script de tu hoja.
 *
 * 1. Cambia SHEET_SECRET por el mismo valor que GOOGLE_SHEETS_SECRET en Render
 * 2. Implementar → Nueva implementación → Aplicación web
 * 3. Ejecutar como: Yo | Acceso: Cualquier persona
 * 4. Copia la URL /exec a GOOGLE_SHEETS_WEBHOOK_URL en Render
 */

// Debe coincidir EXACTAMENTE con GOOGLE_SHEETS_SECRET en Render
const SHEET_SECRET = 'CAMBIA_ESTE_SECRET';

/** Crea la fila de encabezados si la hoja está vacía. */
function ensureHeaders(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Email', 'Nombre', 'Fecha (UTC)', 'Posición']);
    sheet.getRange(1, 1, 1, 4).setFontWeight('bold');
  }
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    if (data.secret !== SHEET_SECRET) {
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, message: 'Unauthorized' })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    ensureHeaders(sheet);
    sheet.appendRow([
      data.email || '',
      data.name || '',
      data.joinedAt || new Date().toISOString(),
      data.position || '',
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ success: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, message: err.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
