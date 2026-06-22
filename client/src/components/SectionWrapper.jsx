/**
 * Wrapper reutilizable con fade-in-up al hacer scroll (Framer Motion).
 */
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function SectionWrapper({
  children,
  className = '',
  id,
  delay = 0,
  as: Tag = 'section',
}) {
  const MotionTag = motion[Tag] || motion.section;

  return (
    <MotionTag
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={fadeUp}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </MotionTag>
  );
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
