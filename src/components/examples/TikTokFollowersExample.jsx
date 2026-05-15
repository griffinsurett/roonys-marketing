import { useEffect, useRef } from 'react';

const followers = [
  { user: 'molly_and_bubba',      avatar: '🐶', color: '#8B5E3C', action: 'started following you.' },
  { user: 'draco_simp72',         avatar: '🧙', color: '#2D2D4E', action: 'started following you.' },
  { user: 'chvrsbutterflies_',    avatar: '🦋', color: '#3B6E8C', action: 'started following you.' },
  { user: 'cringeforlifebois',    avatar: '🎮', color: '#2E4E2E', action: 'started following you.' },
  { user: 'baddie_imvu_outfitsss',avatar: '✨', color: '#4E2E4E', action: 'started following you.' },
  { user: 'playcod6',             avatar: '🎯', color: '#4E3A2E', action: 'started following you.' },
  { user: 'carahuevo2',           avatar: '🌮', color: '#3A3A3A', action: 'started following you.' },
  { user: 'sunflower.vibes99',    avatar: '🌻', color: '#5C4A00', action: 'started following you.' },
  { user: 'xo_nightfall',         avatar: '🌙', color: '#1A1A3E', action: 'started following you.' },
  { user: 'cozy.cottage.life',    avatar: '🏡', color: '#4E3A2A', action: 'started following you.' },
  { user: 'hype.beast.fits',      avatar: '👟', color: '#1A3A4E', action: 'started following you.' },
  { user: 'galaxybrain_irl',      avatar: '🌌', color: '#2A1A4E', action: 'started following you.' },
];

const AvatarCircle = ({ emoji, color, size = 36 }) => (
  <div
    style={{
      width: size, height: size, borderRadius: '50%',
      background: color, flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.45, border: '1.5px solid #333',
    }}
  >
    {emoji}
  </div>
);

export default function TikTokFollowersExample({ isActive = true }) {
  const scrollRef = useRef(null);
  const posRef    = useRef(0);
  const animRef   = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const tick = () => {
      if (isActive) {
        const max = el.scrollHeight - el.clientHeight;
        posRef.current += 0.5;
        if (posRef.current >= max) posRef.current = 0;
        el.scrollTop = posRef.current;
      }
      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [isActive]);

  return (
    <div
        className="relative mx-auto select-none shrink-0"
        style={{
          width: 220, height: 440,
          background: '#000',
          borderRadius: 36,
          boxShadow: '0 0 0 6px #1a1a1a, 0 0 0 8px #333, 0 30px 60px rgba(0,0,0,0.6)',
          overflow: 'hidden',
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
        }}
      >
        {/* Status bar */}
        <div className="flex justify-between items-center px-5 pt-3 pb-1" style={{ fontSize: 9, color: '#fff', background: '#000' }}>
          <span>9:41</span>
          <div className="flex gap-1 items-center">
            <span style={{ letterSpacing: -1 }}>▐▐▐</span>
            <span>WiFi</span>
            <span>🔋</span>
          </div>
        </div>

        {/* Inbox header */}
        <div style={{ background: '#000', padding: '4px 14px 8px', borderBottom: '1px solid #222' }}>
          <div style={{ color: '#fff', fontSize: 13, fontWeight: 700, textAlign: 'center' }}>Inbox</div>
          {/* Tabs */}
          <div className="flex gap-3 mt-2">
            {['All activity', 'Mentions', 'Comments'].map((tab, i) => (
              <span
                key={tab}
                style={{
                  fontSize: 9, color: i === 0 ? '#fff' : '#555', fontWeight: i === 0 ? 700 : 400,
                  borderBottom: i === 0 ? '2px solid #fe2c55' : 'none',
                  paddingBottom: 3, whiteSpace: 'nowrap',
                }}
              >
                {tab}
              </span>
            ))}
          </div>
        </div>

        {/* Scrolling notifications */}
        <div
          ref={scrollRef}
          style={{
            overflowY: 'scroll', height: 'calc(100% - 94px)',
            scrollbarWidth: 'none', background: '#000',
          }}
          className="[&::-webkit-scrollbar]:hidden"
        >
          {/* Duplicate list for seamless loop */}
          {[...followers, ...followers].map((f, i) => (
            <div
              key={i}
              style={{
                display: 'flex', alignItems: 'center',
                padding: '6px 12px', gap: 8,
                borderBottom: '1px solid #111',
              }}
            >
              <AvatarCircle emoji={f.avatar} color={f.color} size={36} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 9, lineHeight: 1.3 }}>
                  <span style={{ color: '#fff', fontWeight: 700 }}>{f.user}</span>
                  <span style={{ color: '#888' }}> {f.action}</span>
                </div>
                <div style={{ color: '#555', fontSize: 8, marginTop: 2 }}>Just now</div>
              </div>
              <button
                style={{
                  background: '#fe2c55', color: '#fff', border: 'none',
                  borderRadius: 4, padding: '4px 8px', fontSize: 8, fontWeight: 700,
                  cursor: 'default', whiteSpace: 'nowrap', flexShrink: 0,
                }}
              >
                Follow back
              </button>
            </div>
          ))}
        </div>

        {/* Bottom nav */}
        <div
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 44,
            background: '#000', borderTop: '1px solid #222',
            display: 'flex', alignItems: 'center', justifyContent: 'space-around',
            paddingBottom: 6,
          }}
        >
          {[
            { icon: '🏠', label: 'Home' },
            { icon: '🔍', label: 'Discover' },
            { icon: null, label: '' },
            { icon: '💬', label: 'Inbox', badge: '99+', active: true },
            { icon: '👤', label: 'Me' },
          ].map((item, i) =>
            i === 2 ? (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <div style={{
                  width: 32, height: 22, borderRadius: 6,
                  background: 'linear-gradient(135deg, #69C9D0, #fff, #EE1D52)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontSize: 13, color: '#fff', fontWeight: 900, textShadow: '0 0 4px #000' }}>+</span>
                </div>
              </div>
            ) : (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, position: 'relative' }}>
                <span style={{ fontSize: 14, color: item.active ? '#fff' : '#555' }}>{item.icon}</span>
                {item.badge && (
                  <div style={{
                    position: 'absolute', top: -4, right: -6,
                    background: '#fe2c55', color: '#fff',
                    borderRadius: 8, padding: '1px 3px', fontSize: 6, fontWeight: 700, lineHeight: 1,
                  }}>
                    {item.badge}
                  </div>
                )}
                <span style={{ fontSize: 6, color: item.active ? '#fff' : '#555' }}>{item.label}</span>
              </div>
            )
          )}
        </div>
      </div>
  );
}
