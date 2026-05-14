import { useState, useEffect } from 'react';
import VideoCard from '../components/cards/VideoCard';
import GeometricShapes from '../layouts/GeometricShapes';
import SectionHeading from '../components/SectionHeading';
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
import {
  Video,
  TrendingUp,
  Zap,
  Users,
  BarChart2,
  Clock,
} from 'lucide-react';

// ⚠️ DO NOT UNCOMMENT — keep hidden until further notice
// import SolarTrustLogo from '../assets/solartrustlogo.png';
// import PabloLogo from '../assets/pablo-logo-square.jpeg';

const portfolioVideos = [
  { id: 1, videoUrl: Pablo1,      thumbnail: ThumbPablo1,      title: "Pablo's Peak Roofing Reel",  orientation: "portrait" },
  { id: 2, videoUrl: Pablo2,      thumbnail: ThumbPablo2,      title: "Pablo's Peak — Brand Story", orientation: "portrait" },
  { id: 3, videoUrl: SolarTrust1, thumbnail: ThumbSolarTrust1, title: "SolarTrust — Explainer",      orientation: "portrait" },
  { id: 4, videoUrl: SolarTrust2, thumbnail: ThumbSolarTrust2, title: "SolarTrust — Field Reel",     orientation: "portrait" },
  { id: 5, videoUrl: SolarTrust3, thumbnail: ThumbSolarTrust3, title: "SolarTrust — Close Reel",     orientation: "portrait" },
];

const whyItems = [
  {
    icon: <Video className="w-6 h-6 text-yellow-400 flex-shrink-0" />,
    heading: 'Short-Form First',
    desc: 'We specialize in Reels, TikToks, and Shorts — the formats that stop thumbs and drive action.',
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-yellow-400 flex-shrink-0" />,
    heading: 'Proven Virality',
    desc: 'Our clients average 250% more reach within 90 days using scroll-stopping vertical video.',
  },
  {
    icon: <Zap className="w-6 h-6 text-yellow-400 flex-shrink-0" />,
    heading: 'Fast Turnaround',
    desc: 'From concept to published reel in days — not weeks. Speed is our competitive edge.',
  },
  {
    icon: <Users className="w-6 h-6 text-yellow-400 flex-shrink-0" />,
    heading: 'Audience-First Scripting',
    desc: "Every hook, cut, and caption is crafted around your ideal customer's scroll behavior.",
  },
  {
    icon: <BarChart2 className="w-6 h-6 text-yellow-400 flex-shrink-0" />,
    heading: 'Data-Backed Edits',
    desc: 'We analyze retention curves and engagement metrics to iterate every piece of content.',
  },
  {
    icon: <Clock className="w-6 h-6 text-yellow-400 flex-shrink-0" />,
    heading: 'Consistent Pipeline',
    desc: 'Regular content cadence keeps your brand top-of-mind and the algorithm happy.',
  },
];

const PortfolioSection = () => {
  const [index, setIndex] = useState(0);
  const total = portfolioVideos.length;

  const prev = () => setIndex(i => (i - 1 + total) % total);
  const next = () => setIndex(i => (i + 1) % total);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section id="portfolio" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-900 to-black">
        <GeometricShapes />
      </div>

      <div className="section-container relative z-10">
        {/* Section heading */}
        <SectionHeading
          eyebrow="Our Work"
          before="Short-Form"
          highlight="Showcase"
          beforeClass="text-white"
          highlightClass="text-yellow-400"
          titleClass="text-4xl md:text-6xl font-black uppercase"
          description="Real reels. Real results. See how short-form content turns views into customers."
          descriptionClass="text-xl max-w-3xl mx-auto font-medium text-white/90"
        />

        {/* Two-column layout */}
        <div className="mt-12 flex flex-col lg:flex-row gap-12 items-center">

          {/* Left — Why Choose Us icon list */}
          <div className="w-full lg:w-1/2 space-y-6">
            <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wide">
              Why Short-Form<br />
              <span className="text-yellow-400">Content Works</span>
            </h3>
            <div className="space-y-5">
              {whyItems.map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="mt-0.5 bg-black/40 rounded-xl p-2.5">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-bold text-white text-base leading-snug">{item.heading}</div>
                    <div className="text-white/70 text-sm mt-0.5 leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — 1-by-1 portrait carousel */}
          <div className="w-full lg:w-1/2 flex flex-col items-center gap-6">
            {/* Video frame */}
            <div className="w-full max-w-xs aspect-[9/16] max-h-[560px]">
              <VideoCard
                key={index}
                videoUrl={portfolioVideos[index].videoUrl}
                thumbnail={portfolioVideos[index].thumbnail}
                title={portfolioVideos[index].title}
                color="from-purple-600 to-pink-500"
              />
            </div>

            {/* Caption */}
            <p className="text-white/80 font-semibold text-sm tracking-wide text-center">
              {portfolioVideos[index].title}
            </p>

            {/* Nav dots + arrows */}
            <div className="flex items-center gap-4">
              <button
                onClick={prev}
                className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center font-bold transition-colors"
                aria-label="Previous"
              >←</button>
              <div className="flex gap-2">
                {portfolioVideos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`Reel ${i + 1}`}
                    className={`rounded-full transition-all duration-300 ${i === index ? 'w-7 h-3 bg-yellow-400' : 'w-3 h-3 bg-white/40 hover:bg-white/60'}`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="w-9 h-9 rounded-full bg-yellow-400 hover:bg-yellow-300 text-gray-900 flex items-center justify-center font-bold transition-colors"
                aria-label="Next"
              >→</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
