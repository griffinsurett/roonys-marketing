import { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const benefits = [
  {
    heading: 'SHORT-FORM CONTENT\nTHAT STOPS THE SCROLL.',
    body: 'We live and breathe Reels, TikToks, and Shorts. Every frame is engineered to interrupt the swipe, hook the viewer in 2 seconds flat, and keep them watching until the very end.',
  },
  {
    heading: 'PROVEN VIRALITY.\nNOT LUCK.',
    body: 'Our clients average 250% more reach within 90 days. We reverse-engineer what the algorithm rewards — retention, saves, shares — and build every video around those signals.',
  },
  {
    heading: 'CONCEPT TO POSTED\nIN 48 HOURS.',
    body: 'Speed is your unfair advantage. From the first hook idea to a live post on every platform, we move fast without cutting corners — because consistency is what feeds the algorithm.',
  },
  {
    heading: 'SCRIPTED FOR YOUR\nIDEAL CUSTOMER.',
    body: 'Every hook, cut, caption, and call-to-action is written around your buyer\'s exact scroll behavior. We don\'t make content that looks good — we make content that converts.',
  },
  {
    heading: 'ORGANIC GROWTH.\nPAID REACH. BOTH.',
    body: 'Great content earns views organically. Smart ads pour fuel on the fire. We run the full short-form playbook — TikTok, Instagram, and YouTube Shorts — so you dominate every feed.',
  },
  {
    heading: 'DATA AFTER EVERY\nSINGLE POST.',
    body: 'We track retention curves, watch-through rates, saves, and shares after every upload — then use that data to make the next video outperform the last. Every post gets smarter.',
  },
];

const BenefitCard = ({ benefit, index }) => {
  const isEven = index % 2 === 0;
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
          // Above viewport (scrolled past) → exit upward; below → exit downward
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
      <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-stretch`}>

        {/* Media side — 2/3 width, Discord-style large rounded square */}
        <div className="w-full lg:w-2/3 flex items-center justify-center p-6 lg:p-8">
          <div
            className="w-full aspect-[4/3] rounded-[3rem]"
            style={{
              background: 'rgba(0,0,0,0.25)',
            }}
          />
        </div>

        {/* Text side — 1/3 width */}
        <div className="w-full lg:w-1/3 flex flex-col justify-center p-8 lg:p-14 gap-6">
          <h3 className="text-2xl lg:text-3xl xl:text-4xl font-black text-white uppercase leading-tight tracking-tight whitespace-pre-line">
            {benefit.heading}
          </h3>

          <p className="text-white/90 text-lg lg:text-xl leading-relaxed font-medium">
            {benefit.body}
          </p>
        </div>

      </div>
    </motion.div>
  );
};

const BenefitsSection = () => (
  <section
    id="benefits"
    className="relative py-24 lg:py-32"
  >
    <div className="section-container relative z-10 space-y-60">

      {benefits.map((benefit, i) => (
        <BenefitCard key={i} benefit={benefit} index={i} />
      ))}
    </div>
  </section>
);

export default BenefitsSection;
