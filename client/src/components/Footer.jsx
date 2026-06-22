/**
 * Footer — producto Mati, empresa AtentIA, enlaces y créditos.
 */
import { Instagram, Linkedin } from 'lucide-react';
import Logo from './Logo';
import CompanyLogo from './CompanyLogo';

const PRODUCT_LINKS = ['Producto', 'Precios', 'Contenido', 'Para padres'];
const COMPANY_LINKS = ['Nosotros', 'Blog', 'Privacidad', 'Términos'];

/** Icono TikTok simplificado en SVG. */
function TikTokIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.75a8.16 8.16 0 0 0 4.77 1.52V6.84a4.85 4.85 0 0 1-1-.15z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-navy text-white/70 py-12 sm:py-14 px-4 sm:px-6 md:px-8 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">
          <div className="col-span-2 md:col-span-1">
            <p className="font-heading font-extrabold text-xl sm:text-2xl text-white mb-1">
              <Logo iconClassName="w-3.5 h-3.5 sm:w-4 sm:h-4 text-coral" />
            </p>
            <p className="text-xs sm:text-sm italic text-white/50 mb-3">Learn out loud.</p>
            <p className="text-xs text-white/40">
              Un producto de <CompanyLogo className="text-sm text-white/70 inline" />
            </p>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white text-xs sm:text-sm mb-3 sm:mb-4">Mati</h4>
            <ul className="space-y-2">
              {PRODUCT_LINKS.map((link) => (
                <li key={link}>
                  <a href="#" className="text-xs sm:text-sm hover:text-coral transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white text-xs sm:text-sm mb-3 sm:mb-4">
              <CompanyLogo className="text-xs sm:text-sm text-white" />
            </h4>
            <ul className="space-y-2">
              {COMPANY_LINKS.map((link) => (
                <li key={link}>
                  <a href="#" className="text-xs sm:text-sm hover:text-coral transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h4 className="font-heading font-bold text-white text-xs sm:text-sm mb-3 sm:mb-4">Síguenos</h4>
            <div className="flex gap-4">
              <a href="#" aria-label="Instagram AtentIA" className="hover:text-coral transition-colors p-1">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="TikTok AtentIA" className="hover:text-coral transition-colors p-1">
                <TikTokIcon />
              </a>
              <a href="#" aria-label="LinkedIn AtentIA" className="hover:text-coral transition-colors p-1">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] sm:text-xs text-white/40 text-center sm:text-left">
          <p>Hecho en México por <CompanyLogo className="text-white/50 inline text-[11px] sm:text-xs" /></p>
          <p>
            © {new Date().getFullYear()}{' '}
            <CompanyLogo className="text-white/50 inline text-[11px] sm:text-xs" />.
            Mati es una marca de AtentIA.
          </p>
        </div>
      </div>
    </footer>
  );
}
