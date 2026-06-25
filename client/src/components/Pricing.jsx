/**
 * Precios — tres opciones: dispositivo MatIA, suscripción y lecciones por tema.
 */
import { motion } from 'framer-motion';
import SectionWrapper, { staggerContainer, staggerItem } from './SectionWrapper';
import { Check, Star, Info } from 'lucide-react';

const PLANS = [
  {
    name: 'MatIA',
    price: 1999,
    priceNote: 'dispositivo',
    badge: '1 mes de suscripción gratis',
    popular: true,
    features: [
      'Dispositivo MatIA',
      '1 mes gratis de suscripción incluido',
      'Contenido ilimitado',
      'Preguntas ilimitadas a Mati',
      'Insights de todas las lecciones',
    ],
    freeMonthNote:
      'Durante el mes gratis solo se guarda una lección iniciada; las demás temáticas se compran por separado.',
  },
  {
    name: 'Suscripción',
    price: 179,
    priceNote: '/mes',
    popular: false,
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-navy mb-3 sm:mb-4 px-2">
            Precios simples. Sin sorpresas.
          </h2>
          <p className="text-text/60 text-sm sm:text-base max-w-2xl mx-auto px-2">
            Elige el dispositivo con mes gratis, la suscripción completa o una lección individual por tema.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-8 sm:mb-10"
        >
          {PLANS.map((plan) => (
            <motion.div
              key={plan.name}
              variants={staggerItem}
              whileHover={{ y: -4 }}
              className={`relative flex flex-col bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 shadow-soft border-2 transition-shadow hover:shadow-lg ${
                plan.popular ? 'border-coral lg:scale-[1.02]' : 'border-transparent'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-olive text-white text-xs font-bold px-3 sm:px-4 py-1 rounded-full flex items-center gap-1 whitespace-nowrap">
                  <Star size={12} fill="white" /> Recomendado
                </span>
              )}

              {plan.badge && (
                <span className="inline-block self-start bg-coral/10 text-coral text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  {plan.badge}
                </span>
              )}

              <h3 className="font-heading font-bold text-lg sm:text-xl text-navy mb-1">{plan.name}</h3>

              {plan.subtitle && (
                <p className="text-text/50 text-xs sm:text-sm mb-3">{plan.subtitle}</p>
              )}

              <div className="mb-5 sm:mb-6">
                <p className="font-heading font-extrabold text-2xl sm:text-3xl text-navy">
                  {formatPrice(plan.price)}
                </p>
                <p className="text-text/50 text-sm mt-1">{plan.priceNote}</p>
              </div>

              <ul className="space-y-2.5 sm:space-y-3 mb-4 sm:mb-5 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-xs sm:text-sm text-text/70">
                    <Check size={16} className="text-olive shrink-0 mt-0.5" strokeWidth={3} />
                    {feature}
                  </li>
                ))}
              </ul>

              {plan.freeMonthNote && (
                <p className="flex items-start gap-2 text-xs text-text/55 bg-navy/5 rounded-xl p-3 mb-4 sm:mb-5">
                  <Info size={14} className="text-coral shrink-0 mt-0.5" />
                  {plan.freeMonthNote}
                </p>
              )}

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
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
