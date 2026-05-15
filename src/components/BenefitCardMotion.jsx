import { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function BenefitCardMotion({ children }) {
  const ref = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start({ opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } });
        } else {
          const exitY = entry.boundingClientRect.top < 0 ? -60 : 60;
          controls.start({ opacity: 0, y: exitY, transition: { duration: 0.5, ease: 'easeIn' } });
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [controls]);

  return (
    <motion.div
      ref={ref}
      className="w-full rounded-[4rem] overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: '0 24px 80px rgba(0,0,0,0.1)',
      }}
      initial={{ opacity: 0, y: 60 }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
}
