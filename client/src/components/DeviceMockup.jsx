/**
 * Ilustración CSS/SVG del dispositivo Mati — cubo redondeado con pantalla pixel.
 */
import { motion } from 'framer-motion';

export default function DeviceMockup({
  size = 'lg',
  floating = true,
  glow = false,
  className = '',
}) {
  const sizes = {
    sm: 'w-28 h-28 sm:w-32 sm:h-32',
    md: 'w-36 h-36 sm:w-44 sm:h-44',
    lg: 'w-44 h-44 sm:w-52 sm:h-52 md:w-56 md:h-56 lg:w-64 lg:h-64',
    xl: 'w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72',
  };

  return (
    <motion.div
      className={`relative ${sizes[size]} ${className}`}
      animate={floating ? { y: [0, -15, 0] } : {}}
      transition={floating ? { duration: 3, repeat: Infinity, ease: 'easeInOut' } : {}}
    >
      {glow && (
        <div
          className="absolute inset-0 rounded-[1.5rem] sm:rounded-[2rem] opacity-60 blur-2xl animate-pulse"
          style={{
            background: 'conic-gradient(from 0deg, #FFAEB2, #658E74, #B2D7C8, #FFAEB2)',
          }}
        />
      )}

      <div className="relative w-full h-full rounded-[1.5rem] sm:rounded-[2rem] bg-navy shadow-soft border border-white/10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55%] h-[35%] rounded-lg sm:rounded-xl bg-[#1a2838] border-2 border-mint/30 shadow-glow">
          <div className="grid grid-cols-5 grid-rows-3 gap-[2px] sm:gap-[3px] p-1.5 sm:p-2 h-full">
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className="rounded-[1px] sm:rounded-[2px]"
                style={{
                  backgroundColor: ['#B2D7C8', '#658E74', '#FFAEB2', '#B2D7C8'][i % 4],
                  opacity: [1, 0.7, 0.9, 0.5, 1][i % 5],
                }}
              />
            ))}
          </div>
        </div>

        <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-1.5 sm:w-2 h-6 sm:h-8 rounded-full bg-coral/80" />

        <div className="absolute top-3 sm:top-4 left-1/2 -translate-x-1/2 flex gap-1 sm:gap-1.5">
          <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-mint animate-pulse" />
          <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-olive/60" />
        </div>

        <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 w-8 sm:w-12 h-1 sm:h-1.5 rounded-full bg-white/10" />
      </div>
    </motion.div>
  );
}
