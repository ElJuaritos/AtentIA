/**
 * Sección para padres — capturas reales de la app y beneficios con checkmarks.
 */
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import SectionWrapper, { staggerContainer, staggerItem } from './SectionWrapper';
import {
  appControlPadres,
  appDashboardPadres,
  appEstadisticasPadres,
} from '../assets/brandImages';

const FEATURES = [
  'Ve exactamente qué escuchó tu hijo hoy',
  'Sigue puntajes de comprensión y rachas',
  'Descarga contenido nuevo con un toque',
  'Configura límites de tiempo por categoría',
  'Recibe reportes semanales de aprendizaje',
];

/** Capturas de la app para padres con título descriptivo. */
const APP_SCREENS = [
  {
    src: appDashboardPadres,
    title: 'Panel familiar',
    alt: 'Panel familiar con racha, lecciones y actividad semanal',
  },
  {
    src: appEstadisticasPadres,
    title: 'Reportes',
    alt: 'Reportes de evolución por materia y conceptos dominados',
  },
  {
    src: appControlPadres,
    title: 'Controles parentales',
    alt: 'Controles parentales con límite diario y horarios permitidos',
  },
];

/** Tarjeta de captura con marco tipo teléfono. */
function AppScreenCard({ screen, index }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="shrink-0 w-[148px] xs:w-[168px] sm:w-[190px] md:w-[210px] lg:w-full snap-center"
    >
      <div className="rounded-[1.6rem] sm:rounded-[1.85rem] overflow-hidden border-[3px] border-navy/10 shadow-soft bg-white">
        <img
          src={screen.src}
          alt={screen.alt}
          loading="lazy"
          className="w-full h-auto object-cover object-top"
        />
      </div>
      <figcaption className="text-center text-xs sm:text-sm text-navy/60 mt-2.5 sm:mt-3 font-medium">
        {screen.title}
      </figcaption>
    </motion.figure>
  );
}

export default function ForParents() {
  return (
    <SectionWrapper id="padres" className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-8 bg-gradient-to-br from-coral/15 via-coral/10 to-olive/10">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-navy text-center mb-4 sm:mb-6 px-2"
        >
          Tú tienes el control. <span className="text-coral">Siempre.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-text/60 text-sm sm:text-base text-center max-w-2xl mx-auto mb-10 sm:mb-14 px-2"
        >
          La app para padres te muestra el progreso, los reportes y los límites de uso en un solo lugar.
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-14 items-center">
          {/* Capturas de la app */}
          <div className="order-2 lg:order-1">
            <div className="flex gap-4 sm:gap-5 md:gap-6 overflow-x-auto pb-3 snap-x snap-mandatory lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0 -mx-1 px-1">
              {APP_SCREENS.map((screen, index) => (
                <AppScreenCard key={screen.title} screen={screen} index={index} />
              ))}
            </div>
          </div>

          {/* Beneficios */}
          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-3 sm:space-y-4 order-1 lg:order-2"
          >
            {FEATURES.map((feature) => (
              <motion.li
                key={feature}
                variants={staggerItem}
                className="flex items-start gap-3 bg-white/60 backdrop-blur-sm rounded-2xl px-4 sm:px-5 py-3.5 sm:py-4"
              >
                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-mint/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={12} className="text-olive sm:w-3.5 sm:h-3.5" strokeWidth={3} />
                </span>
                <span className="text-navy font-medium text-sm sm:text-base leading-snug">{feature}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </SectionWrapper>
  );
}
