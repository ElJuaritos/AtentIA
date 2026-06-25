/**
 * Sección de problema — 4 estadísticas con count-up sobre fondo navy.
 * Datos: PROFECO 2018, niños 4–7 años.
 */
import { motion } from 'framer-motion';
import SectionWrapper, { staggerContainer, staggerItem } from './SectionWrapper';
import { useCountUp } from '../hooks/useCountUp';

const STATS = [
  {
    prefix: '',
    value: 2,
    suffix: ' de cada 3',
    decimal: false,
    label: 'ya usa pantallas antes de los 7 años.',
    source: 'PROFECO, 2018',
  },
  {
    prefix: '~',
    value: 68,
    suffix: '%',
    decimal: false,
    label: 'del tiempo frente a la pantalla a esta edad es pasivo: ver videos y jugar, no aprender.',
    source: 'PROFECO, 2018',
  },
  {
    prefix: '',
    value: 24,
    suffix: '%',
    decimal: false,
    label: 'solo 1 de cada 4 padres usa algún control parental para guiar ese uso temprano.',
    source: 'PROFECO, 2018',
  },
  {
    prefix: '',
    value: 34,
    suffix: '%',
    decimal: false,
    label: 'de los padres teme el contenido inapropiado — su mayor preocupación a esta edad.',
    source: 'PROFECO, 2018',
  },
];

function StatCard({ stat }) {
  const { value, ref } = useCountUp(stat.value, 2000);

  return (
    <motion.div
      ref={ref}
      variants={staggerItem}
      className="bg-white/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 border border-white/10 relative overflow-hidden flex flex-col"
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-coral rounded-t-2xl sm:rounded-t-3xl" />

      <p className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-white mb-2 sm:mb-3">
        {stat.prefix}
        {stat.decimal ? value.toFixed(1) : value}
        <span className="text-coral">{stat.suffix}</span>
      </p>

      <p className="text-white/70 text-xs sm:text-sm md:text-base leading-relaxed flex-1">
        {stat.label}
      </p>

      <p className="text-white/30 mt-3 sm:mt-4" style={{ fontSize: '11px' }}>
        {stat.source}
      </p>
    </motion.div>
  );
}

export default function Problem() {
  return (
    <SectionWrapper className="bg-navy py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white text-center mb-10 sm:mb-12 md:mb-16 max-w-3xl mx-auto leading-snug px-2"
        >
          Los niños no pueden dejar de mirar pantallas.{' '}
          <span className="text-coral">Construimos algo mejor.</span>
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6"
        >
          {STATS.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
