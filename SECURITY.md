# Política de seguridad

Si encuentras una vulnerabilidad en este proyecto, repórtala de forma privada a:

**security@atentia.mx** (reemplaza con tu email real)

Por favor no abras un issue público con detalles de seguridad.

## Buenas prácticas en este repo

- No commitees archivos `.env` ni `server/waitlist.json`
- Rota `ALLOWED_ORIGINS` al cambiar de dominio
- Mantén dependencias actualizadas: `npm audit` en `client/` y `server/`
