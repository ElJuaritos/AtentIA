# Mati — Landing Page

Landing de **Mati**, dispositivo de aprendizaje sin pantalla con IA para niños.  
Producto de **AtentIA**.

## Stack

| Capa | Tecnología |
|------|------------|
| Frontend | React 18 + Vite + Tailwind + Framer Motion |
| Backend | Node.js + Express |
| Deploy frontend | GitHub Pages (automático) |
| Deploy API | Render / Railway / Fly.io |

## Desarrollo local

```bash
# Instalar dependencias
npm run install:all

# Arrancar frontend + API
npm run dev
```

- Frontend: http://localhost:5173  
- API: http://localhost:3001  

Copia los archivos de ejemplo antes de configurar:

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

## Subir a GitHub

Este proyecto vive en el repo [ElJuaritos/AtentIA](https://github.com/ElJuaritos/AtentIA.git).

```bash
git add .
git commit -m "Landing Mati — producto AtentIA"
git push -u origin main
```

Luego en GitHub:

1. **Settings → Pages → Build and deployment → Source:** GitHub Actions  
2. **Settings → Secrets and variables → Actions**, agrega:
   - `VITE_API_URL` — URL de tu API en producción (ej. `https://mati-api.onrender.com`)
   - `VITE_BASE_PATH` — (opcional) `/` si usas dominio propio; si no, déjalo vacío y se usará `/AtentIA/`

## Desplegar la API (waitlist)

GitHub Pages solo sirve archivos estáticos. La API debe hospedarse aparte.

### Render (recomendado)

1. Sube el repo a GitHub  
2. En [render.com](https://render.com) → **New → Blueprint** → conecta el repo  
3. Configura `ALLOWED_ORIGINS` con tu URL de Pages:
   ```
   https://tu-usuario.github.io,https://mati.mx
   ```
4. Copia la URL del servicio → pégala en el secret `VITE_API_URL` de GitHub  

### Datos de waitlist

El archivo `server/waitlist.json` **no se sube a GitHub** (contiene emails).  
En producción se crea automáticamente. Para empezar local:

```bash
cp server/waitlist.json.example server/waitlist.json
```

## Seguridad implementada

- **Helmet** — headers HTTP de seguridad  
- **Rate limiting** — 5 registros/hora por IP en waitlist  
- **CORS** — solo orígenes permitidos vía `ALLOWED_ORIGINS`  
- **Honeypot** — campo oculto anti-bots en el formulario  
- **Validación** — email, longitud máxima, sanitización de nombre  
- **Escritura atómica** — waitlist.json no se corrompe en escrituras concurrentes  
- **GET /api/waitlist** — solo devuelve `{ count }`, nunca emails  
- **`.gitignore`** — excluye `.env`, `waitlist.json` y `node_modules`  

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Frontend + API en paralelo |
| `npm run dev:client` | Solo Vite |
| `npm run dev:server` | Solo Express |
| `npm run build --prefix client` | Build de producción |

## Estructura

```
mati/
├── client/          → React (GitHub Pages)
├── server/          → Express API
├── .github/         → CI/CD Pages
└── render.yaml      → Blueprint API en Render
```

## Licencia

Privado — © AtentIA
