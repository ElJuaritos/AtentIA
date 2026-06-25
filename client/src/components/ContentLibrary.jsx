/**
 * Biblioteca de contenido — grid de categorías con hover animado.
 */
import { motion } from 'framer-motion';
import {
  BookOpen, Calculator, Languages, FlaskConical, Music, Brain,
} from 'lucide-react';
import SectionWrapper, { staggerContainer, staggerItem } from './SectionWrapper';
import IconBox from './IconBox';

const CATEGORIES = [
  {
    icon: BookOpen,
    title: 'Cuentos y leyendas',
    desc: 'Historias clásicas y nuevas aventuras para cada edad.',
    gradient: 'from-coral/20 to-coral/5',
    accent: 'text-coral',
    iconBg: 'bg-coral/15 text-coral',
  },
  {
    icon: Calculator,
    title: 'Aventuras matemáticas',
    desc: 'Números, formas y lógica jugando en voz alta.',
    gradient: 'from-olive/30 to-olive/5',
    accent: 'text-olive',
    iconBg: 'bg-olive/25 text-navy',
  },
  {
    icon: Languages,
    title: 'Idiomas',
    desc: 'Español, inglés y francés con pronunciación guiada.',
    gradient: 'from-mint/30 to-mint/5',
    accent: 'text-olive',
    iconBg: 'bg-mint/20 text-olive',
  },
  {
    icon: FlaskConical,
    title: 'Curiosidades científicas',
    desc: 'El universo, animales y experimentos explicados simple.',
    gradient: 'from-blue-200/40 to-blue-50',
    accent: 'text-blue-600',
    iconBg: 'bg-blue-100 text-blue-600',
  },
  {
    icon: Music,
    title: 'Música y ritmo',
    desc: 'Canciones, ritmos y juegos de escucha activa.',
    gradient: 'from-purple-200/40 to-purple-50',
    accent: 'text-purple-600',
    iconBg: 'bg-purple-100 text-purple-600',
  },
  {
    icon: Brain,
    title: 'Memoria y lógica',
    desc: 'Retos mentales que fortalecen el pensamiento crítico.',
    gradient: 'from-navy/10 to-navy/5',
    accent: 'text-navy',
    iconBg: 'bg-navy/10 text-navy',
  },
];

export default function ContentLibrary() {
  return (
    <SectionWrapper id="contenido" className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-offwhite to-mint/5">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-navy mb-3 sm:mb-4 px-2">
            Un universo de aprendizaje, sin internet
          </h2>
          <p className="text-text/60 text-sm sm:text-base max-w-2xl mx-auto px-2">
            Contenido curado por educadores y expertos en desarrollo infantil.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6"
        >
          {CATEGORIES.map((cat) => (
            <motion.div
              key={cat.title}
              variants={staggerItem}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className={`bg-gradient-to-br ${cat.gradient} rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 shadow-soft cursor-default`}
            >
              <IconBox icon={cat.icon} className={`mb-3 sm:mb-4 ${cat.iconBg}`} />
              <h3 className={`font-heading font-bold text-base sm:text-lg ${cat.accent} mb-1.5 sm:mb-2`}>{cat.title}</h3>
              <p className="text-text/60 text-sm leading-relaxed">{cat.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-text/50 text-xs sm:text-sm md:text-base mt-8 sm:mt-10 px-4"
        >
          Nuevo contenido cada semana, creado por educadores y expertos en desarrollo infantil.
        </motion.p>
      </div>
    </SectionWrapper>
  );
}
