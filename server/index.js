/**
 * Servidor Express de Mati (AtentIA) — API segura con CORS, helmet y rate limiting.
 */
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import waitlistRouter from './routes/waitlist.js';

const app = express();
const PORT = process.env.PORT || 3001;
const isProd = process.env.NODE_ENV === 'production';

const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173,http://127.0.0.1:5173')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

if (isProd) {
  app.set('trust proxy', 1);
}

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Origen no permitido por CORS'));
    }
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json({ limit: '16kb' }));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isProd ? 30 : 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Demasiadas solicitudes. Intenta más tarde.' },
});

const waitlistLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: isProd ? 5 : 50,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Límite de registros alcanzado. Intenta en una hora.' },
});

app.use('/api', apiLimiter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'mati-api' });
});

app.use('/api/waitlist', waitlistLimiter, waitlistRouter);

app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Ruta no encontrada.' });
});

app.use((err, _req, res, next) => {
  if (err.message === 'Origen no permitido por CORS') {
    return res.status(403).json({ success: false, message: 'Acceso denegado.' });
  }
  next(err);
});

app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({ success: false, message: 'Error interno del servidor.' });
});

app.listen(PORT, () => {
  const sheetsReady = Boolean(
    process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim()
    && process.env.GOOGLE_SHEETS_SECRET?.trim(),
  );
  console.log(`Mati API (AtentIA) running on port ${PORT} [${isProd ? 'production' : 'development'}]`);
  console.log(`Google Sheets: ${sheetsReady ? 'conectado' : 'no configurado (solo waitlist.json)'}`);
});
