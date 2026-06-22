/**
 * Logo del producto Mati — usado en navbar y secciones del dispositivo.
 */
import { Sparkles } from 'lucide-react';

export default function Logo({ className = '', iconClassName = 'w-4 h-4 text-coral', showByline = false }) {
  return (
    <span className={`inline-flex flex-col ${className}`}>
      <span className="inline-flex items-center gap-1.5 font-heading font-extrabold">
        Mati
        <Sparkles className={iconClassName} strokeWidth={2.5} />
      </span>
      {showByline && (
        <span className="text-[10px] sm:text-xs font-body font-normal text-text/45 tracking-wide mt-0.5">
          por AtentIA
        </span>
      )}
    </span>
  );
}
