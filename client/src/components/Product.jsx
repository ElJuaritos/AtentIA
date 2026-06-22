/**
 * Sección producto — ilustración del dispositivo y lista de características.
 */
import { motion } from 'framer-motion';
import {
  Headphones, Bot, Download, Smartphone, Shield, WifiOff,
} from 'lucide-react';
import SectionWrapper, { staggerContainer, staggerItem } from './SectionWrapper';
import { mvpProducto } from '../assets/brandImages';
import IconBox from './IconBox';

const FEATURES = [
  { icon: Headphones, title: 'Audio sin pantalla', desc: 'Sin luz azul. Sin feeds adictivos.', color: 'bg-coral/10 text-coral' },
  { icon: Bot, title: 'IA que escucha', desc: 'Tu hijo pregunta. Mati responde.', color: 'bg-mint/20 text-mint' },
  { icon: Download, title: 'Contenido descargable', desc: 'Cuentos, matemáticas, ciencia, idiomas.', color: 'bg-gold/20 text-navy' },
  { icon: Smartphone, title: 'App para padres', desc: 'Sigue el progreso, descarga contenido y configura horarios.', color: 'bg-navy/5 text-navy' },
  { icon: Shield, title: 'Privacidad primero', desc: 'La voz se queda en el dispositivo. Siempre.', color: 'bg-coral/10 text-coral' },
  { icon: WifiOff, title: 'Funciona sin wifi', desc: 'No necesitas internet para aprender.', color: 'bg-mint/20 text-mint' },
];

export default function Product() {
  return (
    <SectionWrapper id="producto" className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-8 bg-offwhite">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-14"
        >
          <p className="text-mint font-semibold text-xs sm:text-sm uppercase tracking-wide mb-2">Conoce Mati</p>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-navy px-2">
            Aprendizaje que se escucha, no se scrollea
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex justify-center order-1 md:order-none"
          >
            <img
              src={mvpProducto}
              alt="Dispositivo MatIA — aprendizaje sin pantalla"
              className="w-full max-w-[16rem] sm:max-w-xs md:max-w-sm lg:max-w-md h-auto object-contain drop-shadow-lg"
            />
          </motion.div>

          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="space-y-3 sm:space-y-4 md:space-y-5"
          >
            {FEATURES.map((f) => (
              <motion.li
                key={f.title}
                variants={staggerItem}
                className="flex gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-white shadow-soft hover:shadow-md transition-shadow"
              >
                <IconBox icon={f.icon} className={f.color} />
                <div className="min-w-0">
                  <h3 className="font-heading font-bold text-navy text-base sm:text-lg">{f.title}</h3>
                  <p className="text-text/60 text-sm sm:text-base mt-0.5 leading-relaxed">{f.desc}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </SectionWrapper>
  );
}
