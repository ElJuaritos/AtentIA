/**
 * Cómo funciona — timeline de 3 pasos con línea SVG animada.
 */
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Layers, Volume2, MessageCircle } from 'lucide-react';
import SectionWrapper, { staggerContainer, staggerItem } from './SectionWrapper';

const STEPS = [
  {
    icon: Layers,
    title: 'Elige un módulo',
    desc: 'Descarga lecciones, paquetes de matemáticas o unidades de idiomas desde la app.',
  },
  {
    icon: Volume2,
    title: 'Mati empieza a enseñar',
    desc: 'El dispositivo narra, explica, reta y se adapta al ritmo de tu hijo.',
  },
  {
    icon: MessageCircle,
    title: 'Tu hijo pregunta lo que quiera',
    desc: 'La IA responde en tiempo real sobre el cuento o la lección, directo en el dispositivo.',
  },
];

export default function HowItWorks() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const lineProgress = useTransform(scrollYProgress, [0.1, 0.7], [0, 1]);

  return (
    <SectionWrapper id="como-funciona" className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-16"
        >
          <p className="text-coral font-semibold text-xs sm:text-sm uppercase tracking-wide mb-2">Simple y poderoso</p>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-navy">
            Cómo funciona
          </h2>
        </motion.div>

        <div className="relative">
          {/* Línea vertical móvil / iPad portrait */}
          <div className="md:hidden absolute left-[1.35rem] sm:left-6 top-0 bottom-0 w-0.5 bg-navy/10">
            <motion.div
              className="w-full bg-coral origin-top"
              style={{ scaleY: lineProgress, height: '100%' }}
            />
          </div>

          {/* Línea horizontal tablet landscape / desktop */}
          <div className="hidden md:block absolute top-6 lg:top-12 left-[12%] right-[12%] h-1">
            <svg className="w-full h-1" preserveAspectRatio="none">
              <line x1="0" y1="2" x2="100%" y2="2" stroke="rgba(13,27,42,0.1)" strokeWidth="3" />
              <motion.line
                x1="0"
                y1="2"
                x2="100%"
                y2="2"
                stroke="#FF6B6B"
                strokeWidth="3"
                strokeLinecap="round"
                style={{ pathLength: lineProgress }}
              />
            </svg>
          </div>

          <motion.ol
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 sm:gap-10 md:gap-6 lg:gap-8"
          >
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.li
                  key={step.title}
                  variants={staggerItem}
                  className="relative pl-14 sm:pl-16 md:pl-0 md:text-center"
                >
                  <div className="absolute left-0 md:relative md:mx-auto md:mb-5 lg:mb-6 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-navy text-white flex items-center justify-center shadow-soft md:left-auto">
                    <Icon size={20} strokeWidth={2} />
                  </div>
                  <span className="hidden md:block font-heading font-bold text-coral text-xs sm:text-sm mb-2">
                    Paso {i + 1}
                  </span>
                  <span className="md:hidden font-heading font-bold text-coral text-xs mb-1 block">
                    Paso {i + 1}
                  </span>
                  <h3 className="font-heading font-bold text-lg sm:text-xl text-navy mb-1.5 sm:mb-2">{step.title}</h3>
                  <p className="text-text/60 text-sm sm:text-base leading-relaxed">{step.desc}</p>
                </motion.li>
              );
            })}
          </motion.ol>
        </div>
      </div>
    </SectionWrapper>
  );
}
