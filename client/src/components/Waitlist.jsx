/**
 * Waitlist final — formulario con honeypot y conexión segura a la API.
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import DeviceMockup from './DeviceMockup';
import { apiUrl, getWaitlistErrorMessage, isApiConfigured } from '../config/api';

const NAME_MAX = 100;
const EMAIL_MAX = 254;

/** Patrón sutil de estrellas/constelación en CSS. */
function StarPattern() {
  const stars = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    top: `${(i * 17 + 5) % 95}%`,
    left: `${(i * 23 + 11) % 95}%`,
    size: i % 3 === 0 ? 3 : 2,
    delay: (i % 5) * 0.4,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      {stars.map((s) => (
        <motion.span
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{ top: s.top, left: s.left, width: s.size, height: s.size }}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, delay: s.delay }}
        />
      ))}
    </div>
  );
}

export default function Waitlist() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      if (import.meta.env.PROD && !isApiConfigured) {
        setStatus({
          type: 'error',
          message: 'El formulario aún no está conectado al backend. Configura VITE_API_URL en GitHub Secrets.',
        });
        return;
      }

      const res = await fetch(apiUrl('/api/waitlist'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().slice(0, EMAIL_MAX),
          name: name.trim().slice(0, NAME_MAX),
          website: honeypot,
        }),
      });

      if (!res.ok) {
        setStatus({ type: 'error', message: getWaitlistErrorMessage(res.status) });
        return;
      }

      const data = await res.json();

      if (data.success) {
        setStatus({
          type: 'success',
          message: `¡Listo! Eres el #${data.position} en la lista de espera.`,
        });
        setEmail('');
        setName('');
      } else {
        setStatus({ type: 'error', message: data.message || 'Algo salió mal.' });
      }
    } catch {
      setStatus({ type: 'error', message: 'No pudimos conectar. Intenta de nuevo.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="waitlist" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 bg-navy overflow-hidden">
      <StarPattern />

      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10 hidden md:block pointer-events-none">
        <DeviceMockup size="xl" floating />
      </div>

      <div className="relative max-w-xl sm:max-w-2xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gradient mb-6 sm:mb-8 leading-tight px-2"
        >
          Dale a tu hijo una voz que aprende con él
        </motion.h2>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 w-full mb-4"
          noValidate
        >
          {/* Honeypot oculto — no completar */}
          <input
            type="text"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute opacity-0 h-0 w-0 pointer-events-none"
          />

          <input
            type="text"
            placeholder="Tu nombre (opcional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={NAME_MAX}
            autoComplete="name"
            className="w-full px-5 py-3 sm:py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-coral text-sm sm:text-base"
          />
          <div className="flex flex-col xs:flex-row gap-3">
            <input
              type="email"
              required
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={EMAIL_MAX}
              autoComplete="email"
              className="flex-1 w-full px-5 py-3 sm:py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-coral text-sm sm:text-base min-w-0"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full xs:w-auto shrink-0 bg-olive text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-semibold text-sm sm:text-base hover:shadow-olive transition-shadow disabled:opacity-60 whitespace-nowrap"
            >
              {loading ? 'Enviando...' : 'Unirme a la lista'}
            </button>
          </div>
        </motion.form>

        {status.message && (
          <p className={`text-xs sm:text-sm mb-4 px-2 ${status.type === 'success' ? 'text-mint' : 'text-coral'}`}>
            {status.message}
          </p>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-white/50 text-xs sm:text-sm flex flex-col xs:flex-row items-center justify-center gap-1 xs:gap-2 px-2"
        >
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-white/40 shrink-0" />
            Sin spam. Cancela cuando quieras.
          </span>
          <span className="hidden xs:inline text-white/30">·</span>
          <span className="text-white/70 text-center xs:text-left font-medium">
            Únete a las familias en espera.
          </span>
        </motion.p>
      </div>
    </section>
  );
}
