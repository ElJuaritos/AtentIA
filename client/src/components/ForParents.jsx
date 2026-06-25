/**
 * Sección para padres — mockup de app móvil y beneficios con checkmarks.
 */
import { motion } from 'framer-motion';
import { Check, Flame } from 'lucide-react';
import SectionWrapper, { staggerContainer, staggerItem } from './SectionWrapper';

const FEATURES = [
  'Ve exactamente qué escuchó tu hijo hoy',
  'Sigue puntajes de comprensión y rachas',
  'Descarga contenido nuevo con un toque',
  'Configura límites de tiempo por categoría',
  'Recibe reportes semanales de aprendizaje',
];

/** Mockup CSS de la app para padres en un teléfono. */
function PhoneMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[220px] xs:max-w-[240px] sm:max-w-[260px] md:max-w-[280px]">
      <div className="bg-navy rounded-[2rem] sm:rounded-[2.5rem] p-2.5 sm:p-3 shadow-soft">
        <div className="bg-offwhite rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden">
          <div className="bg-navy px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between">
            <span className="text-white font-heading font-bold text-xs sm:text-sm">Mati App</span>
            <span className="text-mint text-[10px] sm:text-xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-mint" /> En línea
            </span>
          </div>

          <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
            <div>
              <p className="text-[10px] sm:text-xs text-text/50 mb-1">Hoy — Sofía, 6 años</p>
              <div className="h-1.5 sm:h-2 bg-navy/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '72%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                  className="h-full bg-mint rounded-full"
                />
              </div>
              <p className="text-[10px] sm:text-xs text-text/60 mt-1">72% meta diaria</p>
            </div>

            <div className="flex gap-2 sm:gap-3">
              <div className="flex-1 bg-coral/10 rounded-lg sm:rounded-xl p-2 sm:p-3 text-center">
                <p className="font-heading font-extrabold text-xl sm:text-2xl text-coral">12</p>
                <p className="text-[9px] sm:text-[10px] text-text/50 flex items-center justify-center gap-0.5">
                  días de racha <Flame size={10} className="text-coral" />
                </p>
              </div>
              <div className="flex-1 bg-mint/10 rounded-lg sm:rounded-xl p-2 sm:p-3 text-center">
                <p className="font-heading font-extrabold text-xl sm:text-2xl text-mint">3</p>
                <p className="text-[9px] sm:text-[10px] text-text/50">cuentos hoy</p>
              </div>
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              {['El principito', 'Sumas divertidas', 'Animales del bosque'].map((item) => (
                <div key={item} className="flex items-center gap-2 bg-white rounded-lg px-2.5 sm:px-3 py-1.5 sm:py-2 shadow-sm">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-mint shrink-0" />
                  <span className="text-[10px] sm:text-xs text-text/70 truncate">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
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
          className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-navy text-center mb-10 sm:mb-14 px-2"
        >
          Tú tienes el control. <span className="text-coral">Siempre.</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <PhoneMockup />
          </motion.div>

          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-3 sm:space-y-4"
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
