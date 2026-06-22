/**
 * Precios — dos planes con toggle mensual/anual y hover lift.
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper, { staggerContainer, staggerItem } from './SectionWrapper';
import { Check, Star } from 'lucide-react';

const PLANS = [
  {
    name: 'Mati Starter',
    devicePrice: 1499,
    monthlyPrice: 149,
    features: ['50 cuentos incluidos', '1 paquete de idioma', 'App para padres básica'],
    popular: false,
  },
  {
    name: 'Mati Unlimited',
    devicePrice: 1499,
    monthlyPrice: 299,
    features: [
      'Contenido ilimitado',
      'Todos los idiomas',
      'Modo tutor IA avanzado',
      'Soporte prioritario',
    ],
    popular: true,
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  const getMonthlyDisplay = (price) => {
    if (!annual) return price;
    return Math.round((price * 10) / 12);
  };

  return (
    <SectionWrapper id="precios" className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-8 bg-offwhite">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-navy mb-5 sm:mb-6 px-2">
            Precios simples. Sin sorpresas.
          </h2>

          <div className="inline-flex flex-col xs:flex-row items-stretch xs:items-center gap-2 xs:gap-3 bg-white rounded-2xl xs:rounded-full p-2 sm:p-1.5 shadow-soft w-full xs:w-auto max-w-xs xs:max-w-none mx-auto">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 sm:px-5 py-2.5 sm:py-2 rounded-xl xs:rounded-full text-sm font-semibold transition-colors ${
                !annual ? 'bg-navy text-white' : 'text-text/60 hover:bg-navy/5'
              }`}
            >
              Mensual
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-4 sm:px-5 py-2.5 sm:py-2 rounded-xl xs:rounded-full text-sm font-semibold transition-colors ${
                annual ? 'bg-navy text-white' : 'text-text/60 hover:bg-navy/5'
              }`}
            >
              Anual
              <span className="block xs:inline xs:ml-1 text-xs text-mint font-bold mt-0.5 xs:mt-0">
                2 meses gratis
              </span>
            </button>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-8 sm:mb-10"
        >
          {PLANS.map((plan) => (
            <motion.div
              key={plan.name}
              variants={staggerItem}
              whileHover={{ y: -4 }}
              className={`relative bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 shadow-soft border-2 transition-shadow hover:shadow-lg ${
                plan.popular ? 'border-coral' : 'border-transparent'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-coral text-white text-xs font-bold px-3 sm:px-4 py-1 rounded-full flex items-center gap-1 whitespace-nowrap">
                  <Star size={12} fill="white" /> Popular
                </span>
              )}

              <h3 className="font-heading font-bold text-lg sm:text-xl text-navy mb-3 sm:mb-4 mt-1">{plan.name}</h3>

              <div className="mb-5 sm:mb-6">
                <p className="text-text/60 text-xs sm:text-sm">
                  Dispositivo{' '}
                  <span className="font-bold text-navy">${plan.devicePrice.toLocaleString('es-MX')} MXN</span>
                </p>
                <p className="mt-2">
                  <span className="font-heading font-extrabold text-2xl sm:text-3xl text-navy">
                    ${getMonthlyDisplay(plan.monthlyPrice).toLocaleString('es-MX')}
                  </span>
                  <span className="text-text/50 text-sm"> /mes</span>
                </p>
                {annual && (
                  <p className="text-mint text-xs font-semibold mt-1">
                    Facturado anualmente — ahorras 2 meses
                  </p>
                )}
              </div>

              <ul className="space-y-2.5 sm:space-y-3 mb-5 sm:mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs sm:text-sm text-text/70">
                    <Check size={16} className="text-mint shrink-0 mt-0.5" strokeWidth={3} />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#waitlist"
                className={`block text-center py-3 rounded-full font-semibold text-sm transition-shadow ${
                  plan.popular
                    ? 'bg-coral text-white hover:shadow-coral'
                    : 'bg-navy/5 text-navy hover:bg-navy/10'
                }`}
              >
                Reservar ahora
              </a>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-navy font-semibold text-sm sm:text-base px-4"
        >
          Pre-orden ahora — Las primeras 100 familias reciben{' '}
          <span className="text-coral">3 meses gratis</span>
        </motion.p>
      </div>
    </SectionWrapper>
  );
}
