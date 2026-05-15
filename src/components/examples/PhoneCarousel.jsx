import { useState, useEffect, useRef } from 'react';

export default function PhoneCarousel({ children, holdMs = 4000, transMs = 600, onSlideChange }) {
  const phones = Array.isArray(children) ? children : [children];
  const [current, setCurrent] = useState(0);
  const [next, setNext]       = useState(null);
  const [phase, setPhase]     = useState('idle'); // idle | exit | enter
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(startTransition, holdMs);
    return () => clearTimeout(timerRef.current);
  }, [current]);

  const startTransition = () => {
    const nextIndex = (current + 1) % phones.length;
    setNext(nextIndex);
    setPhase('exit');
    timerRef.current = setTimeout(() => {
      setPhase('enter');
      timerRef.current = setTimeout(() => {
        setCurrent(nextIndex);
        setNext(null);
        setPhase('idle');
        onSlideChange?.(nextIndex);
      }, transMs);
    }, transMs);
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Current — fades out, takes up natural height */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: `opacity ${transMs}ms ease`,
        opacity: phase === 'exit' ? 0 : 1,
      }}>
        {phones[current]}
      </div>

      {/* Incoming — absolutely overlaid, fades in */}
      {next !== null && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: phase === 'enter' ? `opacity ${transMs}ms ease` : 'none',
          opacity: phase === 'enter' ? 1 : 0,
        }}>
          {phones[next]}
        </div>
      )}
    </div>
  );
}
