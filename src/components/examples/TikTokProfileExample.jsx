import { useEffect, useRef, useState } from 'react';

const AVATAR_INITIALS = 'R';

const videos = [
  { views: '2.4M', label: 'Morning routine', gradient: 'from-pink-500 to-purple-600' },
  { views: '847K', label: 'Day in the life',  gradient: 'from-purple-600 to-indigo-600' },
  { views: '1.1M', label: 'Behind the scenes', gradient: 'from-orange-500 to-pink-600' },
  { views: '312K', label: 'Product reveal',   gradient: 'from-cyan-500 to-blue-600' },
  { views: '94K',  label: 'Quick tips',       gradient: 'from-rose-500 to-orange-500' },
  { views: '3.8M', label: 'Viral moment',     gradient: 'from-violet-600 to-pink-500' },
  { views: '510K', label: 'Story time',       gradient: 'from-emerald-500 to-cyan-500' },
  { views: '1.7M', label: 'Brand collab',     gradient: 'from-amber-500 to-rose-500' },
  { views: '228K', label: 'Trending sound',   gradient: 'from-indigo-500 to-purple-600' },
];

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4 drop-shadow-md">
    <path d="M8 5v14l11-7z" />
  </svg>
);

export default function TikTokProfileExample({ isActive }) {
  const scrollRef = useRef(null);
  const animRef  = useRef(null);
  const posRef   = useRef(0);
  const dirRef   = useRef(1);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const maxScroll = el.scrollHeight - el.clientHeight;

    const tick = () => {
      if (!isActive) { animRef.current = requestAnimationFrame(tick); return; }

      posRef.current += dirRef.current * 0.6;

      if (posRef.current >= maxScroll) { posRef.current = maxScroll; dirRef.current = -1; }
      if (posRef.current <= 0)         { posRef.current = 0;         dirRef.current = 1;  }

      el.scrollTop = posRef.current;
      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [isActive]);

  return (
    <div
      className="relative mx-auto select-none flex-shrink-0"
      style={{
        width: 220,
        height: 440,
        background: '#000',
        borderRadius: 36,
        boxShadow: '0 0 0 6px #1a1a1a, 0 0 0 8px #333, 0 30px 60px rgba(0,0,0,0.6)',
        overflow: 'hidden',
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
      }}
    >
      {/* Status bar */}
      <div className="flex justify-between items-center px-5 pt-3 pb-1" style={{ fontSize: 9, color: '#fff' }}>
        <span>9:41</span>
        <div className="flex gap-1 items-center">
          <span>▐▐▐</span>
          <span>WiFi</span>
          <span>🔋</span>
        </div>
      </div>

      {/* TikTok top bar */}
      <div className="flex items-center justify-between px-4 pb-2" style={{ color: '#fff' }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-5 h-5"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
        <div className="flex items-center gap-1" style={{ fontSize: 13, fontWeight: 700 }}>
          <span>Your Name</span>
          <svg viewBox="0 0 24 24" fill="white" className="w-3 h-3"><path d="M7 10l5 5 5-5z" /></svg>
        </div>
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-5 h-5">
          <circle cx="12" cy="5" r="1" fill="white" /><circle cx="12" cy="12" r="1" fill="white" /><circle cx="12" cy="19" r="1" fill="white" />
        </svg>
      </div>

      {/* Scrollable body */}
      <div
        ref={scrollRef}
        style={{ overflowY: 'scroll', height: 'calc(100% - 90px)', scrollbarWidth: 'none' }}
        className="[&::-webkit-scrollbar]:hidden"
      >
        {/* Profile header */}
        <div className="flex flex-col items-center pt-2 pb-3 px-4" style={{ background: '#000' }}>
          {/* Avatar */}
          <div
            className="flex items-center justify-center rounded-full text-white font-black mb-2"
            style={{
              width: 64, height: 64, fontSize: 24,
              background: 'linear-gradient(135deg, #9333ea, #ec4899, #f97316)',
              border: '2px solid #333',
            }}
          >
            {AVATAR_INITIALS}
          </div>

          <span style={{ color: '#fff', fontSize: 11, fontWeight: 600 }}>@your_brand</span>

          {/* Stats row */}
          <div className="flex gap-4 my-2">
            {[['14', 'Following'], ['1.9K', 'Followers'], ['46K', 'Likes']].map(([val, label]) => (
              <div key={label} className="flex flex-col items-center">
                <span style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>{val}</span>
                <span style={{ color: '#888', fontSize: 8 }}>{label}</span>
              </div>
            ))}
          </div>

          {/* Follow button */}
          <button
            style={{
              background: '#fe2c55', color: '#fff', border: 'none',
              borderRadius: 4, padding: '5px 40px', fontSize: 11, fontWeight: 700,
              cursor: 'default', width: '80%',
            }}
          >
            Follow
          </button>

          {/* Bio */}
          <p style={{ color: '#fff', fontSize: 9, textAlign: 'center', marginTop: 6, lineHeight: 1.4 }}>
            Short-form content that actually converts 🔥<br />Results-driven video production
          </p>

          {/* Tab bar */}
          <div className="flex gap-6 mt-3 border-b border-gray-700 w-full justify-center pb-1">
            {['⊞', '🔒', '♥'].map((icon, i) => (
              <span
                key={i}
                style={{
                  fontSize: 14, color: i === 0 ? '#fff' : '#555',
                  borderBottom: i === 0 ? '2px solid #fff' : 'none',
                  paddingBottom: 4,
                }}
              >
                {icon}
              </span>
            ))}
          </div>
        </div>

        {/* Video grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 1,
            background: '#111',
          }}
        >
          {videos.map((v, i) => (
            <div
              key={i}
              style={{ aspectRatio: '9/16', position: 'relative', overflow: 'hidden' }}
              className={`bg-gradient-to-br ${v.gradient}`}
            >
              {/* Fake thumbnail texture */}
              <div style={{ position: 'absolute', inset: 0, opacity: 0.15 }}
                className="bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(255,255,255,0.1)_4px,rgba(255,255,255,0.1)_5px)]" />

              {/* Play icon + view count */}
              <div style={{
                position: 'absolute', bottom: 3, left: 3,
                display: 'flex', alignItems: 'center', gap: 2,
              }}>
                <PlayIcon />
                <span style={{ color: '#fff', fontSize: 7.5, fontWeight: 700, textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                  {v.views}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom nav bar */}
      <div
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 44,
          background: '#000', borderTop: '1px solid #222',
          display: 'flex', alignItems: 'center', justifyContent: 'space-around',
          paddingBottom: 6,
        }}
      >
        {['🏠', '🔍', '', '💬', '👤'].map((icon, i) =>
          i === 2 ? (
            <div
              key={i}
              style={{
                width: 36, height: 24, borderRadius: 6,
                background: 'linear-gradient(135deg, #69C9D0, #fff, #EE1D52)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <span style={{ fontSize: 14, color: '#fff', fontWeight: 900, textShadow: '0 0 4px #000' }}>+</span>
            </div>
          ) : (
            <span key={i} style={{ fontSize: i === 4 ? 14 : 16, color: i === 4 ? '#fe2c55' : '#888' }}>
              {icon}
            </span>
          )
        )}
      </div>
    </div>
  );
}
