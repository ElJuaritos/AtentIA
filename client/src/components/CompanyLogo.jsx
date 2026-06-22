/**
 * Marca corporativa AtentIA — usada en footer y créditos legales.
 */
export default function CompanyLogo({ className = '' }) {
  return (
    <span className={`font-heading font-extrabold tracking-tight ${className}`}>
      Atent<span className="text-coral">IA</span>
    </span>
  );
}
