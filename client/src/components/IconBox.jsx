/**
 * Contenedor de icono Lucide con estilo consistente en toda la landing.
 */
export default function IconBox({
  icon: Icon,
  size = 20,
  className = 'bg-navy/5 text-navy',
  iconClassName = '',
}) {
  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 rounded-xl w-10 h-10 sm:w-11 sm:h-11 ${className}`}
    >
      <Icon size={size} className={iconClassName} strokeWidth={2} />
    </span>
  );
}
