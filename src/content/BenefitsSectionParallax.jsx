import { useRef, useEffect, useState } from 'react';
import TikTokProfileExample from '../components/examples/TikTokProfileExample.jsx';

const benefits = [
  {
    heading: 'PROVEN VIRALITY.\nNOT LUCK.',
    body: 'Viral content isn\'t a happy accident — it\'s engineered. We study what the algorithm rewards: watch-through rate, saves, shares, replays. Then we build every video around those exact signals so your content gets pushed, not buried.',
    example: (isActive) => <TikTokProfileExample isActive={isActive} />,
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

const BenefitsSection = () => {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.max(0, Math.min(-rect.top / scrollable, 1));
      const idx = Math.min(Math.floor(progress * benefits.length), benefits.length - 1);
      setActiveIndex(idx);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      id="benefits"
      ref={sectionRef}
      style={{ height: `${benefits.length * 100 + 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="section-container w-full">
          <div className="relative w-full">
            {benefits.map((benefit, i) => {
              const isEven = i % 2 === 0;
              return (
                <div
                  key={i}
                  style={{
                    position: i === 0 ? 'relative' : 'absolute',
                    inset: 0,
                    opacity: i === activeIndex ? 1 : 0,
                    transition: 'opacity 0.6s ease',
                    pointerEvents: i === activeIndex ? 'auto' : 'none',
                  }}
                >
                  <div
                    className="w-full rounded-[4rem] overflow-hidden"
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                      boxShadow: '0 24px 80px rgba(0,0,0,0.1)',
                    }}
                  >
                    <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-stretch`}>

                      {/* Media side */}
                      <div className="w-full lg:w-2/3 flex items-center justify-center p-6 lg:p-8">
                        {benefit.example ? (
                          benefit.example(i === activeIndex)
                        ) : (
                          <div
                            className="w-full aspect-4/3 rounded-[3rem]"
                            style={{ background: 'rgba(0,0,0,0.25)' }}
                          />
                        )}
                      </div>

                      {/* Text side */}
                      <div className="w-full lg:w-1/3 flex flex-col justify-center p-8 lg:p-14 gap-6">
                        <h3 className="text-2xl lg:text-3xl xl:text-4xl font-black text-white uppercase leading-tight tracking-tight whitespace-pre-line">
                          {benefit.heading}
                        </h3>
                        <p className="text-white/90 text-lg lg:text-xl leading-relaxed font-medium">
                          {benefit.body}
                        </p>
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
