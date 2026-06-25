# Política de seguridad

Si encuentras una vulnerabilidad en este proyecto, repórtala de forma privada a:

**security@atentia.mx** (reemplaza con tu email real)

Por favor no abras un issue público con detalles de seguridad.

## Buenas prácticas en este repo

- No commitees archivos `.env` ni `server/waitlist.json`
- No commitees `GOOGLE_SHEETS_SECRET` ni la URL del webhook de Apps Script
- Rota `GOOGLE_SHEETS_SECRET` si se filtra
- Rota `ALLOWED_ORIGINS` al cambiar de dominio
- Mantén dependencias actualizadas: `npm audit` en `client/` y `server/`
