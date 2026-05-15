import { useRef, useEffect, useState } from 'react';
import VideoCard from '../components/cards/VideoCard';
import Pablo1 from '../assets/pablo1.MP4';
import Pablo2 from '../assets/pablo2.MP4';
import SolarTrust1 from '../assets/solartrust1.MP4';
import SolarTrust2 from '../assets/solartrust2.MP4';
import SolarTrust3 from '../assets/solartrust3.mp4';
import ThumbPablo1 from '../assets/thumbnails/pablo1.jpg';
import ThumbPablo2 from '../assets/thumbnails/pablo2.jpg';
import ThumbSolarTrust1 from '../assets/thumbnails/solartrust1.jpg';
import ThumbSolarTrust2 from '../assets/thumbnails/solartrust2.jpg';
import ThumbSolarTrust3 from '../assets/thumbnails/solartrust3.jpg';

const reels = [
  { id: 1, videoUrl: Pablo1,      thumbnail: ThumbPablo1,      title: "Pablo's Peak — Roofing Reel" },
  { id: 2, videoUrl: Pablo2,      thumbnail: ThumbPablo2,      title: "Pablo's Peak — Brand Story" },
  { id: 3, videoUrl: SolarTrust1, thumbnail: ThumbSolarTrust1, title: "SolarTrust — Explainer" },
  { id: 4, videoUrl: SolarTrust2, thumbnail: ThumbSolarTrust2, title: "SolarTrust — Field Reel" },
  { id: 5, videoUrl: SolarTrust3, thumbnail: ThumbSolarTrust3, title: "SolarTrust — Close Reel" },
  { id: 6, videoUrl: Pablo1,      thumbnail: ThumbPablo1,      title: "Pablo's Peak — Roofing Reel" },
  { id: 7, videoUrl: Pablo2,      thumbnail: ThumbPablo2,      title: "Pablo's Peak — Brand Story" },
];

const getVisible = (w) => {
  if (w >= 1024) return 5;
  if (w >= 640)  return 3;
  return 1;
};

const PortfolioSection = () => {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(null);

  useEffect(() => {
    const onResize = () => setVisible(getVisible(window.innerWidth));
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      if (scrollable <= 0) { setProgress(0); return; }
      setProgress(Math.max(0, Math.min(-rect.top / scrollable, 1)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  const scrollCards = Math.max(reels.length - visible, 0);
  // Each hidden card gets 100vh of scroll travel
  const sectionHeight = scrollCards > 0 ? `${scrollCards * 100 + 100}vh` : 'auto';
  const steps = progress * scrollCards;

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      style={{ height: sectionHeight }}
    >
      {/* Sticky viewport — clips overflow so off-screen cards are invisible */}
      <div
        className="sticky top-0 flex flex-col justify-center"
        style={{ height: '100vh', overflow: 'hidden' }}
      >
        {/* Rail — full strip of all cards side by side */}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            padding: '0 1.5rem',
            transform: visible === 1
              ? `translateX(calc(-${steps} * (100vw - 3rem) - ${steps}rem))`
              : `translateX(calc(-${steps * (100 / visible)}vw))`,
            transition: 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            willChange: 'transform',
          }}
        >
          {reels.map((reel) => {
            const cardW = visible === 1
              ? 'calc(100vw - 3rem)'
              : `calc(${100 / visible}vw - ${(visible - 1) / visible}rem - ${2 * 1.5 / visible}rem)`;
            const cardH = visible === 1 ? '80vh' : undefined;
            return (
              <div key={reel.id} style={{ flexShrink: 0, width: cardW, height: cardH }}>
                <div style={{ width: '100%', height: '100%', aspectRatio: visible === 1 ? undefined : '9/16' }}>
                  <VideoCard
                    videoUrl={reel.videoUrl}
                    thumbnail={reel.thumbnail}
                    title={reel.title}
                    color="from-purple-600 to-pink-500"
                  />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default PortfolioSection;
