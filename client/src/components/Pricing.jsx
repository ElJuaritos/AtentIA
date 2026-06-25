/**
 * Precios — bloque dispositivo MatIA con imagen + suscripciones y add-ons.
 */
import { motion } from 'framer-motion';
import SectionWrapper, { staggerContainer, staggerItem } from './SectionWrapper';
import { Check, Star, Info } from 'lucide-react';
import { matIAProducto } from '../assets/brandImages';

/** Información del dispositivo */
const DEVICE = {
  price: 1999,
  badge: '1 mes de suscripción gratis',
  features: [
    'Dispositivo MatIA',
    '1 mes gratis de suscripción incluido',
  ],
  freeMonthNote:
    'Durante el mes gratis solo se guarda una lección iniciada; las demás temáticas se compran por separado.',
};

/** Planes de suscripción y add-ons */
const SUBSCRIPTIONS = [
  {
    name: 'Suscripción',
    price: 179,
    priceNote: '/mes',
    popular: true,
    features: [
      'Contenido ilimitado',
      'Preguntas ilimitadas a Mati',
      'Insights de todas las lecciones',
    ],
  },
  {
    name: 'Lección por tema',
    price: 89,
    priceNote: 'por tema',
    subtitle: 'Ej. solo matemáticas',
    popular: false,
    features: [
      'Contenido del tema elegido',
      'Preguntas limitadas a Mati del tema',
      'Insights solo de las lecciones compradas',
    ],
  },
];

function formatPrice(value) {
  return `$${value.toLocaleString('es-MX')} MXN`;
}

export default function Pricing() {
  return (
    <SectionWrapper id="precios" className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-8 bg-offwhite">
      <div className="max-w-6xl mx-auto">

        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-navy mb-3 sm:mb-4 px-2">
            Precios simples. Sin sorpresas.
          </h2>
          <p className="text-text/60 text-sm sm:text-base max-w-2xl mx-auto px-2">
            El dispositivo incluye un mes de suscripción. Después elige el plan que mejor se adapte.
          </p>
        </motion.div>

        {/* Bloque 1 — Dispositivo MatIA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mt-5 sm:mt-6 mb-6 sm:mb-8"
        >
          <span className="absolute -top-3.5 left-1/2 lg:left-[75%] -translate-x-1/2 z-10 bg-olive text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center justify-center w-max max-w-[calc(100%-2rem)]">
            <Star size={12} fill="white" className="shrink-0 mr-1" /> Recomendado
          </span>

          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-soft border-2 border-coral overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-stretch">

              {/* Imagen */}
              <div className="bg-gradient-to-br from-mint/20 to-offwhite flex items-center justify-center p-10 sm:p-12 md:p-14 min-h-[280px] sm:min-h-[340px] lg:min-h-[420px]">
                <motion.img
                  src={matIAProducto}
                  alt="Dispositivo MatIA"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-full max-w-[220px] sm:max-w-[280px] lg:max-w-[320px] h-auto object-contain drop-shadow-lg"
                />
              </div>

              {/* Info dispositivo */}
              <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10 lg:p-12 lg:py-14">
                <span className="inline-block self-start bg-coral/10 text-coral text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                  {DEVICE.badge}
                </span>

                <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-navy mb-1">
                  MatIA
                </h3>
                <p className="text-text/50 text-sm mb-6">Dispositivo educativo audio-first</p>

                <div className="mb-6">
                  <p className="font-heading font-extrabold text-3xl sm:text-4xl text-navy leading-tight">
                    {formatPrice(DEVICE.price)}
                  </p>
                  <p className="text-text/50 text-sm mt-1.5">pago único</p>
                </div>

                <ul className="space-y-3 mb-5">
                  {DEVICE.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm sm:text-base text-text/70">
                      <Check size={16} className="text-olive shrink-0 mr-2" strokeWidth={3} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <p className="flex items-start text-xs sm:text-sm text-text/55 bg-navy/5 rounded-xl p-3.5 sm:p-4 mb-6 leading-relaxed">
                  <Info size={15} className="text-coral shrink-0 mt-0.5 mr-2" />
                  {DEVICE.freeMonthNote}
                </p>

                <a
                  href="#waitlist"
                  className="block text-center bg-olive text-white py-3.5 sm:py-4 rounded-full font-semibold text-sm sm:text-base hover:shadow-olive transition-shadow"
                >
                  Lista de espera
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bloque 2 — Suscripciones y add-ons */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-text/50 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-5 sm:mb-6"
        >
          Complementa con
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-8 sm:mb-10 pt-2"
        >
          {SUBSCRIPTIONS.map(( plan) => (
            <motion.div
              key={ plan.name}
              variants={staggerItem}
              whileHover={{ y: -4 }}
              className={`relative flex flex-col bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 shadow-soft border-2 transition-shadow hover:shadow-lg ${
                plan.popular ? 'border-coral mt-4 sm:mt-0' : 'border-transparent'
              }`}
            >
              { plan.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-olive text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center whitespace-nowrap">
                  <Star size={12} fill="white" className="shrink-0 mr-1" /> Popular
                </span>
              )}

              <h3 className="font-heading font-bold text-lg sm:text-xl text-navy mb-1 mt-2 sm:mt-1">
                { plan.name}
              </h3>

              { plan.subtitle && (
                <p className="text-text/50 text-xs sm:text-sm mb-3">{ plan.subtitle}</p>
              )}

              <div className="mb-5 sm:mb-6">
                <p className="font-heading font-extrabold text-2xl sm:text-3xl text-navy">
                  {formatPrice( plan.price)}
                </p>
                <p className="text-text/50 text-sm mt-1">{ plan.priceNote}</p>
              </div>

              <ul className="space-y-2.5 sm:space-y-3 mb-5 flex-1">
                { plan.features.map((feature) => (
                  <li key={feature} className="flex items-start text-xs sm:text-sm text-text/70">
                    <Check size={16} className="text-olive shrink-0 mt-0.5 mr-2" strokeWidth={3} />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#waitlist"
                className={`block text-center py-3 rounded-full font-semibold text-sm transition-shadow mt-auto ${
                  plan.popular
                    ? 'bg-olive text-white hover:shadow-olive'
                    : 'bg-navy/5 text-navy hover:bg-navy/10'
                }`}
              >
                Lista de espera
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA final */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center px-4"
        >
          <a
            href="#waitlist"
            className="inline-flex items-center justify-center bg-navy text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-semibold text-sm sm:text-base hover:bg-navy/90 transition-colors"
          >
            Entra a la lista de espera
          </a>
          <p className="mt-4 sm:mt-5 text-navy font-semibold text-sm sm:text-base">
            Los primeros 100 en la lista de espera ganan{' '}
            <span className="text-coral">3 meses gratis</span> de suscripción
          </p>
        </motion.div>

      </div>
    </SectionWrapper>
  );
}
