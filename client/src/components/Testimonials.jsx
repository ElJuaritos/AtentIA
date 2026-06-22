/**
 * Testimonios — marquee horizontal infinito con avatares CSS.
 */
import { motion } from 'framer-motion';
import SectionWrapper from './SectionWrapper';

const TESTIMONIALS = [
  {
    name: 'Mariana R.',
    city: 'Ciudad de México',
    initials: 'MR',
    color: 'bg-coral',
    quote: 'Por fin algo que no compite con la tablet. Mi hija de 5 años le pregunta cosas a Mati como si fuera su amiga.',
  },
  {
    name: 'Carlos V.',
    city: 'Monterrey',
    initials: 'CV',
    color: 'bg-mint',
    quote: 'Lo probamos en el piloto y mi hijo pidió "otro cuento" tres veces seguidas. Eso nunca pasa con YouTube.',
  },
  {
    name: 'Lucía M.',
    city: 'Guadalajara',
    initials: 'LM',
    color: 'bg-gold',
    quote: 'Me encanta ver en la app qué escuchó y cuánto entendió. Siento que sí estoy presente en su aprendizaje.',
  },
  {
    name: 'Andrea S.',
    city: 'Puebla',
    initials: 'AS',
    color: 'bg-navy',
    quote: 'Sin pantallas, sin culpa. Mati llegó justo cuando estábamos buscando alternativas sanas para las tardes.',
  },
  {
    name: 'Roberto H.',
    city: 'Querétaro',
    initials: 'RH',
    color: 'bg-coral',
    quote: 'La parte de idiomas es increíble. Mi niña repite frases en inglés sin que yo tenga que estar encima.',
  },
  {
    name: 'Patricia G.',
    city: 'Mérida',
    initials: 'PG',
    color: 'bg-mint',
    quote: 'Es caro comparado con apps gratis, pero vale cada peso. Es un dispositivo, no otra suscripción más al celular.',
  },
];

function TestimonialCard({ t }) {
  return (
    <div className="flex-shrink-0 w-[280px] xs:w-[300px] sm:w-[340px] md:w-[380px] bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-soft mx-2 sm:mx-3">
      <div className="flex items-center gap-3 mb-3 sm:mb-4">
        <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full ${t.color} flex items-center justify-center text-white font-heading font-bold text-xs sm:text-sm shrink-0`}>
          {t.initials}
        </div>
        <div className="min-w-0">
          <p className="font-heading font-bold text-navy text-sm truncate">{t.name}</p>
          <p className="text-text/50 text-xs truncate">{t.city}</p>
        </div>
      </div>
      <p className="text-text/70 text-xs sm:text-sm leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
    </div>
  );
}

export default function Testimonials() {
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <SectionWrapper className="py-16 sm:py-20 md:py-28 bg-white overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-heading font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-navy text-center mb-8 sm:mb-12 px-4"
      >
        A las familias del piloto les encantó
      </motion.h2>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee hover:[animation-play-state:paused] will-change-transform">
          {doubled.map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} t={t} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
