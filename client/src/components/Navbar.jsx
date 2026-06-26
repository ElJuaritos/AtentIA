/**
 * Navbar sticky con blur, menú hamburguesa móvil/tablet y CTA principal.
 */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const NAV_LINKS = [
  { label: 'Producto', href: '#producto' },
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Aprende', href: '#contenido' },
  { label: 'Para padres', href: '#padres' },
  { label: 'Guía de transición', href: '#guia-padres' },
  { label: 'Precios', href: '#precios' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollTo = (href) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen ? 'bg-offwhite/90 backdrop-blur-lg shadow-soft' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 h-14 sm:h-16 md:h-20 flex items-center justify-between gap-4">
        <a
          href="#"
          className="font-heading font-extrabold text-lg sm:text-xl md:text-2xl text-navy shrink-0"
        >
          <Logo iconClassName="w-3.5 h-3.5 sm:w-4 sm:h-4 text-coral" showByline />
        </a>

        <ul className="hidden xl:flex items-center gap-6 2xl:gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => scrollTo(link.href)}
                className="text-sm font-medium text-text/70 hover:text-navy transition-colors whitespace-nowrap"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden xl:block shrink-0">
          <button
            onClick={() => scrollTo('#waitlist')}
            className="bg-olive text-white px-5 md:px-6 py-2 md:py-2.5 rounded-full text-sm font-semibold hover:shadow-olive transition-shadow whitespace-nowrap"
          >
            Lista de espera
          </button>
        </div>

        <button
          className="xl:hidden p-2 -mr-2 text-navy shrink-0"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} className="sm:w-6 sm:h-6" /> : <Menu size={22} className="sm:w-6 sm:h-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-offwhite/98 backdrop-blur-lg border-t border-navy/5 overflow-hidden max-h-[calc(100dvh-3.5rem)] overflow-y-auto"
          >
            <ul className="flex flex-col px-4 sm:px-6 py-4 gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-base font-medium text-text/80 w-full text-left py-3 px-2 rounded-xl hover:bg-navy/5 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li className="pt-2 pb-1">
                <button
                  onClick={() => scrollTo('#waitlist')}
                  className="w-full bg-olive text-white px-6 py-3.5 rounded-full font-semibold text-base"
                >
                  Lista de espera
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
