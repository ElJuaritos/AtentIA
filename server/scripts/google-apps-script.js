/**
 * Google Apps Script — copiar en Extensiones → Apps Script de tu hoja.
 *
 * 1. Cambia SHEET_SECRET por el mismo valor que GOOGLE_SHEETS_SECRET en .env
 * 2. Implementar → Nueva implementación → Aplicación web
 * 3. Ejecutar como: Yo | Acceso: Cualquier persona
 * 4. Copia la URL /exec a GOOGLE_SHEETS_WEBHOOK_URL
 */

const SHEET_SECRET = 'AtentIA-Mati-2026-k7Xm9pQ2vL8nR4tW6yH1zF5';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    if (data.secret !== SHEET_SECRET) {
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, message: 'Unauthorized' })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
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
