import { useEffect, useRef, useState } from 'react';

export default function AnimatedExample({ children, label = 'Animated demonstration' }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const active = isVisible && !prefersReduced;

  return (
    <div
      ref={ref}
      role="img"
      aria-label={label}
      className="w-full h-full flex items-center justify-center"
    >
      {typeof children === 'function' ? children(active) : children}
    </div>
  );
}
