/**
 * Marca corporativa AtentIA — imagen usada en footer y créditos legales.
 */
import { logoAtentia } from '../assets/brandImages';

export default function CompanyLogo({ className = '' }) {
  return (
    <img
      src={logoAtentia}
      alt="AtentIA"
      className={`h-6 w-auto object-contain inline-block align-middle ${className}`}
    />
  );
}
