/**
 * Guía para padres — transición gradual de dispositivos convencionales a matIA.
 * Basada en Análisis Conductual Aplicado (ABA) con respaldo UNAM.
 */
import { motion } from 'framer-motion';
import { TrendingDown, Lock, Star, Lightbulb, GraduationCap, Smartphone } from 'lucide-react';
import SectionWrapper, { staggerContainer, staggerItem } from './SectionWrapper';

/** Principios ABA para facilitar el cambio de hábitos digitales. */
const PRINCIPLES = [
  {
    icon: TrendingDown,
    number: '01',
    title: 'Cambio gradual, no retiro abrupto',
    technique: 'Fading',
    description:
      'Los hábitos de pantalla no cambian de la noche a la mañana. La mejor estrategia es una transición progresiva: reducir gradualmente estímulos altos — brillo, color, animaciones, sonidos y tiempo total — mientras aumentas el uso de dispositivos educativos de baja estimulación, como lectores e-ink.',
    keyMessage: 'No quites de golpe; reemplaza paso a paso.',
  },
  {
    icon: Lock,
    number: '02',
    title: 'La pantalla se gana, no se improvisa',
    technique: 'Economía de acceso',
    description:
      'El acceso a pantallas debe seguir reglas claras y consistentes, no el aburrimiento ni la disponibilidad inmediata. El entorno debe hacer más fácil la mejor elección antes de que aparezca el conflicto.',
    keyMessage:
      'Lo que siempre está disponible se usa; lo que tiene reglas claras se usa con intención.',
  },
  {
    icon: Star,
    number: '03',
    title: 'Atrapa las buenas elecciones',
    technique: 'Refuerzo diferencial',
    description:
      'Cuando el niño elige por sí mismo la pantalla educativa, los padres deben reforzar de inmediato ese comportamiento con atención positiva, elogio específico, tiempo compartido o recompensas simples.',
    keyMessage:
      'El comportamiento que recibe atención positiva es el que más probablemente se repetirá.',
  },
];

/** Tarjeta individual de cada principio conductual. */
function PrincipleCard({ principle }) {
  const Icon = principle.icon;

  return (
    <motion.article
      variants={staggerItem}
      className="flex flex-col h-full bg-white/70 backdrop-blur-sm rounded-2xl p-5 sm:p-6 md:p-7 shadow-soft border border-navy/5"
    >
      <div className="flex items-start justify-between gap-3 mb-4 sm:mb-5">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-olive/15 flex items-center justify-center shrink-0">
            <Icon size={20} className="text-olive sm:w-[22px] sm:h-[22px]" strokeWidth={2.2} />
          </span>
          <span className="font-heading font-extrabold text-2xl sm:text-3xl text-navy/15 leading-none">
            {principle.number}
          </span>
        </div>
        <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-olive bg-mint/25 px-2.5 py-1 rounded-full shrink-0">
          {principle.technique}
        </span>
      </div>

      <h3 className="font-heading font-bold text-lg sm:text-xl text-navy mb-3 leading-snug">
        {principle.title}
      </h3>

      <p className="text-text/65 text-sm sm:text-base leading-relaxed flex-1 mb-5 sm:mb-6">
        {principle.description}
      </p>

      <div className="flex items-start gap-2.5 bg-mint/20 rounded-xl px-4 py-3 sm:py-3.5">
        <Lightbulb size={16} className="text-olive shrink-0 mt-0.5 sm:w-[18px] sm:h-[18px]" />
        <p className="text-olive text-sm sm:text-base font-medium leading-snug">
          {principle.keyMessage}
        </p>
      </div>
    </motion.article>
  );
}

export default function ParentsGuide() {
  return (
    <SectionWrapper
      id="guia-padres"
      className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-8 bg-gradient-to-br from-mint/20 via-mint/10 to-offwhite"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-14"
        >
          <p className="text-olive font-semibold text-xs sm:text-sm uppercase tracking-wide mb-2">
            Ayuda a los padres
          </p>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-navy mb-4 sm:mb-5 px-2">
            Cómo hacer la transición a{' '}
            <span className="text-gradient">matIA</span>
          </h2>
          <p className="text-text/60 text-sm sm:text-base max-w-2xl mx-auto px-2 leading-relaxed">
            Tres estrategias basadas en Análisis Conductual Aplicado para cambiar hábitos
            de pantalla sin conflictos innecesarios.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7"
        >
          {PRINCIPLES.map((principle) => (
            <PrincipleCard key={principle.number} principle={principle} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 sm:mt-14 flex flex-col items-center gap-4 sm:gap-5"
        >
          <div className="inline-flex items-center gap-2.5 sm:gap-3 border border-navy/15 bg-white/60 backdrop-blur-sm rounded-full px-4 sm:px-5 py-2.5 sm:py-3">
            <GraduationCap size={18} className="text-olive shrink-0 sm:w-5 sm:h-5" />
            <p className="text-xs sm:text-sm text-navy/70 leading-snug">
              Metodología basada en{' '}
              <span className="font-semibold text-navy">Análisis Conductual Aplicado</span>
              {' '}— respaldo sólido de investigadores de la{' '}
              <span className="font-semibold text-olive">UNAM</span>
            </p>
          </div>

          <p className="inline-flex items-center gap-2 text-sm sm:text-base text-navy/75 text-center px-2">
            <Smartphone size={18} className="text-coral shrink-0 sm:w-5 sm:h-5" />
            <span>
              Y muchos otros consejos más en la{' '}
              <span className="font-semibold text-olive">app para padres</span>.
            </span>
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
