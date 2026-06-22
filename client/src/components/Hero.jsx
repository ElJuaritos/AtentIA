/**
 * Hero principal — titular animado, dispositivo flotante y badges responsivos.
 */
import { motion } from 'framer-motion';
import { Mic, BookOpen, Globe, BarChart3 } from 'lucide-react';
import { mvpProducto } from '../assets/brandImages';
import AuroraBackground from './AuroraBackground';
import IconBox from './IconBox';

const HEADLINE = 'El primer compañero de aprendizaje que te responde.';
const BADGES = [
  { icon: Mic, text: 'Voz con IA', color: 'bg-coral/10 text-coral' },
  { icon: BookOpen, text: '500+ historias', color: 'bg-gold/20 text-navy' },
  { icon: Globe, text: 'Multi-idioma', color: 'bg-mint/20 text-mint' },
  { icon: BarChart3, text: 'Seguimiento', color: 'bg-navy/5 text-navy' },
];

const badgePositions = [
  'md:top-4 md:-left-4 lg:-left-12',
  'md:top-1/4 md:-right-4 lg:-right-16',
  'md:bottom-1/4 md:-left-6 lg:-left-20',
  'md:bottom-8 md:-right-2 lg:-right-10',
];

function BadgeChip({ badge, className = '' }) {
  const Icon = badge.icon;
  return (
    <div
      className={`bg-white rounded-2xl px-3 py-2.5 sm:px-4 shadow-soft text-xs sm:text-sm font-medium text-navy flex items-center gap-2 ${className}`}
    >
      <IconBox icon={Icon} size={16} className={`w-8 h-8 sm:w-9 sm:h-9 ${badge.color}`} />
      <span className="whitespace-nowrap">{badge.text}</span>
    </div>
  );
}

export default function Hero() {
  const words = HEADLINE.split(' ');

  return (
    <section className="relative min-h-[100dvh] flex items-center pt-20 sm:pt-24 pb-12 sm:pb-16 overflow-hidden bg-gradient-to-b from-offwhite via-offwhite to-mint/10">
      <AuroraBackground />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-8 w-full grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
        <div className="order-2 lg:order-1 text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-coral font-semibold text-xs sm:text-sm md:text-base mb-3 sm:mb-4 tracking-wide uppercase"
          >
            Learn out loud.
          </motion.p>

          <h1 className="font-heading font-extrabold text-[1.65rem] leading-[1.15] xs:text-3xl sm:text-4xl md:text-[2.75rem] lg:text-5xl xl:text-6xl text-navy mb-4 sm:mb-6">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                className="inline-block mr-[0.25em] mb-[0.1em]"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="text-text/70 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0"
          >
            Mati es un dispositivo sin pantalla que lee cuentos, responde las preguntas
            de tu hijo con IA y crece con él — desde historias para dormir hasta matemáticas,
            idiomas y mucho más.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
          >
            <a
              href="#waitlist"
              className="inline-flex justify-center bg-coral text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-sm sm:text-base font-semibold hover:shadow-coral transition-shadow w-full xs:w-auto"
            >
              Acceso anticipado
            </a>
            <a
              href="#como-funciona"
              className="inline-flex justify-center border-2 border-navy/20 text-navy px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-sm sm:text-base font-semibold hover:border-navy/40 transition-colors w-full xs:w-auto"
            >
              Ver cómo funciona
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="order-1 lg:order-2 relative flex flex-col items-center"
        >
          <div className="relative flex justify-center w-full max-w-[280px] sm:max-w-none">
            <motion.img
              src={mvpProducto}
              alt="Dispositivo MatIA — aprendizaje sin pantalla"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="w-full max-w-[16rem] sm:max-w-xs md:max-w-sm lg:max-w-md h-auto object-contain drop-shadow-lg"
            />

            {BADGES.map((badge, i) => (
              <motion.div
                key={badge.text}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.6 + i * 0.15 }}
                className={`hidden md:block absolute ${badgePositions[i]}`}
              >
                <BadgeChip badge={badge} />
              </motion.div>
            ))}
          </div>

          {/* Badges en grid para móvil e iPad portrait */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            className="md:hidden grid grid-cols-2 gap-2 sm:gap-3 mt-6 sm:mt-8 w-full max-w-sm"
          >
            {BADGES.map((badge) => (
              <BadgeChip key={badge.text} badge={badge} className="justify-start" />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
