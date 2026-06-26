/**
 * Ruta POST /api/waitlist — registra emails con validación y persistencia en Supabase.
 * Ruta GET  /api/waitlist — devuelve el conteo total de la lista.
 */
import { Router } from 'express';
import { createClient } from '@supabase/supabase-js';
import { isValidEmail, sanitizeName, normalizeEmail } from '../utils/validation.js';
import { appendToGoogleSheet } from '../services/googleSheets.js';

const router = Router();

/** Cliente Supabase lazy — evita crash al arrancar si faltan variables en Render. */
function getSupabase() {
  const url = process.env.SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!url || !key) {
    throw new Error('Supabase no configurado: faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY');
  }

  return createClient(url, key);
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
    const supabase = getSupabase();

    // Verificar si el email ya existe
    const { data: existing, error: existingError } = await supabase
      .from('waitlist')
      .select('id')
      .eq('email', normalizedEmail)
      .maybeSingle();

    if (existingError) {
      console.error('Waitlist lookup error:', existingError.message);
      throw existingError;
    }

    if (existing) {
      return res.json({ success: true, position: existing.id, message: 'Ya estás en la lista.' });
    }

    // Insertar nuevo registro — id SERIAL = posición global persistente
    const { data: inserted, error } = await supabase
      .from('waitlist')
      .insert({ email: normalizedEmail, name: safeName })
      .select('id')
      .single();

    if (error) {
      console.error('Waitlist insert error:', error.message, error.code);
      throw error;
    }

    const { count } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true });

    await appendToGoogleSheet(
      { email: normalizedEmail, name: safeName, joinedAt: new Date().toISOString() },
      count,
    );

    console.log(`Waitlist: nuevo registro #${inserted.id} (${normalizedEmail})`);
    res.json({ success: true, position: inserted.id });
  } catch (error) {
    console.error('Waitlist error:', error.message);
    res.status(500).json({ success: false, message: 'Error al registrar.' });
  }
});

/** Solo expone el conteo, nunca emails ni datos personales. */
router.get('/', async (_req, res) => {
  try {
    const supabase = getSupabase();
    const { count, error } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true });

    if (error) throw error;

    res.json({ count });
  } catch (error) {
    console.error('Waitlist count error:', error.message);
    res.status(500).json({ success: false, message: 'Error al consultar.' });
  }
});

export default router;
