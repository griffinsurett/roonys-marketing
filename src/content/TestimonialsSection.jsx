import { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import RoonyLogo from '../assets/roony-logo.png';

const testimonials = [
  {
    quote: "We went from 400 views per reel to over 180K in 6 weeks. The hooks they write are just different.",
    handle: "@marcustrends",
    role: "E-commerce Brand Owner",
    stars: 5,
  },
  {
    quote: "Our TikTok went from dead to 12K followers in 60 days. We're now getting inbound DMs every single day.",
    handle: "@priyaswellness",
    role: "Wellness Creator",
    stars: 5,
  },
  {
    quote: "They ran our ad creative alongside organic and our cost per lead dropped from $18 to $4.70.",
    handle: "@dereksolarceo",
    role: "Solar Company CEO",
    stars: 5,
  },
  {
    quote: "I was posting consistently but getting nothing. One month in and my first viral reel hit 2.3M views.",
    handle: "@janellefitness",
    role: "Fitness Coach",
    stars: 5,
  },
  {
    quote: "Concept approved Monday, live on Instagram Wednesday. Every single time. The speed is unreal.",
    handle: "@carloseatsnj",
    role: "Restaurant Owner",
    stars: 5,
  },
  {
    quote: "Our YouTube Shorts channel hit monetization in under 90 days. I didn't think that was even possible.",
    handle: "@aidentech",
    role: "Tech Creator",
    stars: 5,
  },
];

const left  = [testimonials[0], testimonials[1], testimonials[2]];
const right = [testimonials[3], testimonials[4], testimonials[5]];

const GoogleBadge = () => (
  <div
    className="flex items-center gap-3 px-5 py-3 rounded-2xl"
    style={{
      background: 'rgba(255,255,255,0.08)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      boxShadow: '0 24px 80px rgba(0,0,0,0.1)',
    }}
  >
    <svg className="w-8 h-8 shrink-0" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
    <div className="text-left">
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400 text-lg">★</span>)}
      </div>
      <div className="text-white font-bold text-sm">Rated 5 Stars on Google</div>
    </div>
  </div>
);

const Heading = () => (
  <div>
    <p className="text-white font-black text-3xl lg:text-4xl uppercase leading-tight tracking-tight">
      Real Clients.
    </p>
    <p className="text-yellow-400 font-black text-3xl lg:text-4xl uppercase leading-tight tracking-tight">
      Real Results.
    </p>
  </div>
);

const Stars = ({ count }) => (
  <div className="flex gap-1">
    {Array.from({ length: count }).map((_, i) => (
      <span key={i} className="text-yellow-400 text-2xl">★</span>
    ))}
  </div>
);

const TestimonialCard = ({ t, side }) => {
  const ref = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start({ opacity: 1, x: 0, y: 0, transition: { duration: 0.6, ease: 'easeOut' } });
        } else {
          const exitY = entry.boundingClientRect.top < 0 ? -80 : 80;
          controls.start({ opacity: 0, x: 0, y: exitY, transition: { duration: 0.5, ease: 'easeIn' } });
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [controls, side]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: side === 'left' ? -80 : 80, y: 0 }}
      animate={controls}
      className="w-full rounded-[3rem] overflow-hidden p-8 lg:p-10 space-y-5"
      style={{
        background: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: '0 24px 80px rgba(0,0,0,0.1)',
      }}
    >
      <Stars count={t.stars} />
      <p className="text-white/90 text-lg lg:text-xl leading-relaxed font-medium">"{t.quote}"</p>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-white/20 shrink-0" />
        <div>
          <div className="text-yellow-400 font-black text-lg lg:text-xl tracking-wide">{t.handle}</div>
          <div className="text-white/50 text-sm">{t.role}</div>
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialsSection = () => {
  const logoSrc = typeof RoonyLogo === 'object' && RoonyLogo?.src ? RoonyLogo.src : RoonyLogo;
  const sectionRef = useRef(null);
  const centerRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const center = centerRef.current;
    if (!section || !center) return;

    const update = () => {
      const sectionRect = section.getBoundingClientRect();
      const centerH = center.offsetHeight;
      const vh = window.innerHeight;

      // Ideal position: center of viewport
      const ideal = vh / 2 - centerH / 2;
      // Minimum: don't go above section top edge
      const minTop = Math.max(sectionRect.top, 0);
      // Clamp: start at section top edge, settle to center once section is high enough
      const clamped = Math.max(ideal, minTop);

      center.style.top = `${clamped}px`;
    };

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32" style={{ isolation: 'isolate' }}>
      <div className="section-container relative z-10">

        {/* Mobile: stacked */}
        <div className="flex flex-col gap-8 lg:hidden">
          <div className="flex flex-col items-center gap-6 text-center">
            <GoogleBadge />
            <Heading />
            <img src={logoSrc} alt="Roony's Marketing" className="w-48 h-48 object-contain drop-shadow-2xl" />
          </div>
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} side={i % 2 === 0 ? 'left' : 'right'} />
          ))}
        </div>

        {/* Desktop: JS-driven sticky center, scrolling side columns */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_300px_1fr] gap-12 items-start">

          {/* Left cards */}
          <div className="space-y-8 py-24">
            {left.map((t, i) => (
              <TestimonialCard key={i} t={t} side="left" />
            ))}
          </div>

          {/* Center — position:sticky with JS-clamped top */}
          <div
            ref={centerRef}
            className="sticky flex flex-col items-center gap-6 text-center py-8"
          >
            <GoogleBadge />
            <Heading />
            <img
              src={logoSrc}
              alt="Roony's Marketing"
              className="w-48 h-48 lg:w-64 lg:h-64 object-contain drop-shadow-2xl"
            />
          </div>

          {/* Right cards */}
          <div className="space-y-8 py-24">
            {right.map((t, i) => (
              <TestimonialCard key={i} t={t} side="right" />
            ))}
          </div>

        </div>

        {/* CTA */}
        <div className="mt-16 lg:mt-20 text-center space-y-6">
          <h2 className="text-4xl md:text-6xl font-black uppercase text-white leading-tight tracking-tight">
            Ready to stop being<br />
            <span className="text-yellow-400">invisible online?</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <a
              href="#contact"
              className="px-12 py-5 rounded-full font-black text-xl uppercase flex items-center gap-3 shadow-2xl transition-all duration-300 hover:scale-105 bg-yellow-400 hover:bg-yellow-300 text-gray-900"
            >
              <span>Get Started</span>
              <ArrowRight className="w-6 h-6" />
            </a>
            <a
              href="#portfolio"
              className="px-12 py-5 rounded-full font-black text-xl uppercase flex items-center gap-3 shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-white text-white hover:bg-white hover:text-gray-900"
            >
              <span>Watch Our Reels</span>
              <Play className="w-6 h-6" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
