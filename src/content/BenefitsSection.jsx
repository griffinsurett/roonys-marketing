import { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const benefits = [
  {
    heading: 'PROVEN VIRALITY.\nNOT LUCK.',
    body: 'Viral content isn\'t a happy accident — it\'s engineered. We study what the algorithm rewards: watch-through rate, saves, shares, replays. Then we build every video around those exact signals so your content gets pushed, not buried.',
  },
  {
    heading: 'VIEWERS INTO\nLOYAL FOLLOWERS.',
    body: 'A view means nothing if they don\'t come back. We craft content with identity, personality, and a consistent voice that makes people hit follow because they don\'t want to miss what\'s next.',
  },
  {
    heading: 'FOLLOWERS INTO\nPAYING CUSTOMERS.',
    body: 'For businesses, attention is only the first step. Every script, CTA, and edit is built to move warm viewers down the funnel — from watching to clicking to buying.',
  },
  {
    heading: 'CREATORS BUILT\nTO MONETIZE.',
    body: 'Brand deals, platform payouts, digital products — they all require one thing: a loyal audience that watches till the end. We build the content strategy that gets you there.',
  },
  {
    heading: 'AGENCIES THAT\nNEED TO DELIVER.',
    body: 'White-label, NDA-friendly, and built to slot into your workflow invisibly. Your client gets scroll-stopping short-form content. You get the credit. We handle everything behind the scenes.',
  },
  {
    heading: 'BRANDS THAT WANT\nTO OWN THEIR NICHE.',
    body: 'Consistent short-form presence compounds. The brands that post well and often become the ones people think of first. We build the pipeline that keeps you visible, relevant, and impossible to ignore.',
  },
  {
    heading: 'ONE SHOOT.\nEVERY PLATFORM.',
    body: 'TikTok, Instagram Reels, YouTube Shorts — three algorithms, three audiences, three sets of rules. We repurpose, resize, and re-caption every piece of content so you dominate all three without doing triple the work.',
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
