/**
 * Fondo aurora con círculos difuminados — escalado por breakpoint.
 */
import { motion } from 'framer-motion';

const circles = [
  { color: 'bg-mint/30', size: 'w-48 h-48 sm:w-72 sm:h-72', top: '10%', left: '5%', delay: 0 },
  { color: 'bg-coral/20', size: 'w-56 h-56 sm:w-96 sm:h-96', top: '40%', left: '55%', delay: 1 },
  { color: 'bg-gold/20', size: 'w-40 h-40 sm:w-64 sm:h-64', top: '70%', left: '15%', delay: 2 },
];

export default function AuroraBackground({ className = '' }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {circles.map((c, i) => (
        <motion.div
          key={i}
          className={`absolute ${c.size} ${c.color} rounded-full blur-3xl`}
          style={{ top: c.top, left: c.left }}
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: c.delay }}
        />
      ))}
    </div>
  );
}
