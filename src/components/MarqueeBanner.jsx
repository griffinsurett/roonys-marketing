const items = [
  'STOP THE SCROLL',
  'OWN THE FEED',
  'REELS THAT CONVERT',
  'TIKTOKS THAT SELL',
  'SHORT-FORM CONTENT',
  'GROW YOUR BRAND',
  'VIRAL BY DESIGN',
  'HOOKS THAT HIT',
];

const MarqueeBanner = () => {
  const repeated = [...items, ...items];

  return (
    <>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee 14s linear infinite;
          will-change: transform;
        }
      `}</style>

      <div
        className="relative overflow-hidden"
        className="py-10 lg:py-20"
        style={{
          background: 'rgba(255,255,255,0.12)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        }}
      >
        <div className="marquee-track flex items-center whitespace-nowrap gap-0">
          {repeated.map((item, i) => (
            <span key={i} className="flex items-center">
              <span className="text-white font-black text-2xl lg:text-6xl uppercase tracking-widest px-5 lg:px-10">
                {item}
              </span>
              <span className="text-yellow-400 text-xl lg:text-3xl select-none">✦</span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default MarqueeBanner;
