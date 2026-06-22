/**
 * Ruta POST /api/waitlist — registra emails con validación y escritura atómica.
 */
import { Router } from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { isValidEmail, sanitizeName, normalizeEmail } from '../utils/validation.js';

const router = Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WAITLIST_PATH = path.join(__dirname, '..', 'waitlist.json');

/** Lee la lista de espera desde disco. */
async function readWaitlist() {
  try {
    const data = await fs.readFile(WAITLIST_PATH, 'utf-8');
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}

/** Persiste la lista con escritura atómica para evitar corrupción. */
async function writeWaitlist(entries) {
  const tmpPath = `${WAITLIST_PATH}.tmp`;
  await fs.writeFile(tmpPath, JSON.stringify(entries, null, 2), 'utf-8');
  await fs.rename(tmpPath, WAITLIST_PATH);
}

router.post('/', async (req, res) => {
  try {
    const { email, name, website } = req.body;

    // Honeypot anti-bots: campo oculto que los bots suelen llenar
    if (website) {
      return res.json({ success: true, position: 1 });
    }

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ success: false, message: 'Email inválido.' });
    }

    const normalizedEmail = normalizeEmail(email);
    const safeName = sanitizeName(name);

    const waitlist = await readWaitlist();
    const exists = waitlist.some((entry) => entry.email === normalizedEmail);

    if (exists) {
      const position = waitlist.findIndex((e) => e.email === normalizedEmail) + 1;
      return res.json({ success: true, position, message: 'Ya estás en la lista.' });
    }

    const entry = {
      email: normalizedEmail,
      name: safeName,
      joinedAt: new Date().toISOString(),
    };

    waitlist.push(entry);
    await writeWaitlist(waitlist);

    res.json({ success: true, position: waitlist.length });
  } catch (error) {
    console.error('Waitlist error:', error.message);
    res.status(500).json({ success: false, message: 'Error al registrar.' });
  }
});

/** Solo expone el conteo, nunca emails ni datos personales. */
router.get('/', async (_req, res) => {
  try {
    const waitlist = await readWaitlist();
    res.json({ count: waitlist.length });
  } catch {
    res.status(500).json({ success: false, message: 'Error al consultar.' });
  }
});

export default router;
