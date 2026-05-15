import { useEffect, useRef, useState } from 'react';
import PhoneCarousel from './PhoneCarousel.jsx';

const PHONE_STYLE = {
  position: 'relative',
  width: 220, height: 440,
  background: '#000',
  borderRadius: 36,
  boxShadow: '0 0 0 6px #1a1a1a, 0 0 0 8px #333, 0 30px 60px rgba(0,0,0,0.6)',
  overflow: 'hidden',
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
  userSelect: 'none',
};

const StatusBar = ({ light }) => (
  <div style={{
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '8px 14px 4px', fontSize: 9,
    color: light ? '#000' : '#fff',
    position: 'relative', zIndex: 10,
  }}>
    <span>9:41</span>
    <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
      <span style={{ letterSpacing: -1 }}>▐▐▐</span>
      <span>WiFi 🔋</span>
    </div>
  </div>
);

// ─── Trigger word + commenter data ───────────────────────────────────────────

const TRIGGER = 'LINK';

const COMMENTS = [
  { user: 'sarah.m',        avatar: '👩', color: '#7c3aed', delay: 600  },
  { user: 'mike_builds',    avatar: '🔨', color: '#1d4ed8', delay: 1800 },
  { user: 'cozy.cottage',   avatar: '🏡', color: '#065f46', delay: 3000 },
  { user: 'hype.beast99',   avatar: '👟', color: '#92400e', delay: 4200 },
  { user: 'xo_nightfall',   avatar: '🌙', color: '#1e1b4b', delay: 5400 },
];

// ─── Screen 1: Comment section flooding with trigger word ─────────────────────

function CommentFloodScreen({ isActive }) {
  const [visible, setVisible] = useState([]);
  const timers = useRef([]);

  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (!isActive) { setVisible([]); return; }

    COMMENTS.forEach((c, i) => {
      timers.current.push(setTimeout(() => {
        setVisible(prev => [...prev, i]);
      }, c.delay));
    });

    return () => timers.current.forEach(clearTimeout);
  }, [isActive]);

  const IG_GRADIENT = 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)';

  return (
    <div style={{ ...PHONE_STYLE }}>
      {/* Video bg */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(160deg, #0d1117 0%, #1a0533 40%, #7c1fa8 80%, #c2185b 100%)',
      }} />

      <StatusBar />

      {/* IG top bar */}
      <div style={{
        position: 'absolute', top: 24, left: 0, right: 0,
        padding: '0 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10,
      }}>
        <svg viewBox="0 0 24 24" fill="white" style={{ width: 18, height: 18 }}>
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
        <span style={{ color: '#fff', fontSize: 10, fontWeight: 700 }}>Reels</span>
        <span style={{ fontSize: 16 }}>📷</span>
      </div>

      {/* Caption with trigger CTA */}
      <div style={{
        position: 'absolute', top: 110, left: 12, right: 50, zIndex: 10,
      }}>
        <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: 8, lineHeight: 1.5 }}>
          <span style={{ fontWeight: 700 }}>@your_brand</span>
          {'  '}Drop a{' '}
          <span style={{
            background: 'rgba(255,255,255,0.15)', borderRadius: 4, padding: '1px 5px',
            color: '#fbbf24', fontWeight: 900, letterSpacing: 0.5,
          }}>"{TRIGGER}"</span>
          {' '}in the comments and we'll send you the link instantly 👇
        </div>
      </div>

      {/* Comments flooding in */}
      <div style={{
        position: 'absolute', bottom: 56, left: 0, right: 0, zIndex: 10,
        padding: '0 12px',
        display: 'flex', flexDirection: 'column', gap: 5,
      }}>
        {COMMENTS.map((c, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 7,
            opacity: visible.includes(i) ? 1 : 0,
            transform: visible.includes(i) ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}>
            <div style={{
              width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
              background: c.color, border: '1.5px solid #333',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11,
            }}>{c.avatar}</div>
            <div style={{
              background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)',
              borderRadius: 12, padding: '4px 9px',
              display: 'flex', alignItems: 'center', gap: 5,
            }}>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 7 }}>{c.user}</span>
              <span style={{
                background: 'rgba(251,191,36,0.2)', border: '1px solid #fbbf24',
                borderRadius: 4, padding: '1px 5px',
                color: '#fbbf24', fontSize: 7, fontWeight: 900, letterSpacing: 0.5,
              }}>{TRIGGER}</span>
            </div>
            {/* Instant DM sent indicator */}
            {visible.includes(i) && (
              <div style={{
                background: IG_GRADIENT, borderRadius: 10, padding: '2px 6px',
                color: '#fff', fontSize: 6, fontWeight: 700, flexShrink: 0,
                animation: 'dmPop 0.35s ease-out both',
              }}>DM sent ⚡</div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom nav */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 44,
        background: 'rgba(0,0,0,0.7)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-around', paddingBottom: 6,
      }}>
        {['🏠', '🔍', '➕', '🎬', '👤'].map((icon, i) => (
          <span key={i} style={{ fontSize: i === 2 ? 20 : 15, color: i === 3 ? '#fff' : 'rgba(255,255,255,0.4)' }}>{icon}</span>
        ))}
      </div>

      <style>{`
        @keyframes dmPop {
          from { opacity: 0; transform: scale(0.7); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

// ─── Screen 2: The DM that fires back ────────────────────────────────────────

const DM_MESSAGES = [
  { side: 'bot', text: 'Hey! 👋 Thanks for commenting — here\'s the link you asked for:' },
  { side: 'bot', text: '🔗 yoursite.com/offer\n\nThis deal expires in 24hrs so don\'t sleep on it 🔥' },
  { side: 'them', text: 'Omg thank you!! Just clicked it 🙌' },
  { side: 'bot', text: 'Amazing! Let us know if you have any questions 💬' },
];

function AutoDMScreen({ isActive }) {
  const [visible, setVisible] = useState(0);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current.forEach?.(clearTimeout);
    if (!isActive) { setVisible(0); setTyping(false); return; }

    const addNext = (i) => {
      if (i >= DM_MESSAGES.length) return;
      setTyping(true);
      timerRef.current = setTimeout(() => {
        setTyping(false);
        setVisible(i + 1);
        timerRef.current = setTimeout(() => addNext(i + 1), 1200);
      }, 900);
    };

    timerRef.current = setTimeout(() => addNext(0), 400);
    return () => clearTimeout(timerRef.current);
  }, [isActive]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [visible, typing]);

  const IG_GRADIENT = 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)';

  return (
    <div style={{ ...PHONE_STYLE, background: '#000' }}>
      <StatusBar />

      {/* DM header */}
      <div style={{
        background: '#000', borderBottom: '1px solid #1a1a1a',
        padding: '4px 12px 8px', display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" style={{ width: 12, height: 12, flexShrink: 0 }}>
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        <div style={{
          width: 28, height: 28, borderRadius: '50%',
          background: IG_GRADIENT, padding: 1.5, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            width: '100%', height: '100%', borderRadius: '50%',
            background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13,
          }}>🎯</div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ color: '#fff', fontSize: 9, fontWeight: 700 }}>your_brand</span>
            <div style={{
              background: 'rgba(251,191,36,0.15)', border: '1px solid #fbbf24',
              borderRadius: 4, padding: '1px 4px',
              color: '#fbbf24', fontSize: 5.5, fontWeight: 800, letterSpacing: 0.3,
            }}>AUTO ⚡</div>
          </div>
          <div style={{ color: '#555', fontSize: 7 }}>Automated reply · Just now</div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} style={{
        overflowY: 'scroll', height: 'calc(100% - 110px)',
        background: '#000', scrollbarWidth: 'none',
        padding: '10px 10px 4px',
        display: 'flex', flexDirection: 'column', gap: 7,
      }} className="[&::-webkit-scrollbar]:hidden">

        {/* Trigger context chip */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
          <div style={{
            background: '#111', borderRadius: 20, padding: '3px 10px',
            color: '#555', fontSize: 6.5,
          }}>
            💬 Triggered by comment: <span style={{ color: '#fbbf24', fontWeight: 700 }}>"{TRIGGER}"</span>
          </div>
        </div>

        {DM_MESSAGES.slice(0, visible).map((msg, i) => (
          <div key={i} style={{
            display: 'flex',
            justifyContent: msg.side === 'them' ? 'flex-end' : 'flex-start',
            animation: 'igSlideIn 0.25s ease-out both',
          }}>
            {msg.side === 'bot' && (
              <div style={{
                width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                background: IG_GRADIENT, padding: 1, marginRight: 5, alignSelf: 'flex-end',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9,
              }}>
                <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🎯</div>
              </div>
            )}
            <div style={{
              maxWidth: '75%',
              background: msg.side === 'them'
                ? 'linear-gradient(135deg, #405de6, #833ab4, #c13584)'
                : '#1a1a1a',
              borderRadius: msg.side === 'them' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
              padding: '7px 10px',
              color: '#fff', fontSize: 8, lineHeight: 1.5,
              whiteSpace: 'pre-line',
            }}>
              {msg.text}
            </div>
          </div>
        ))}

        {typing && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{
              width: 20, height: 20, borderRadius: '50%',
              background: IG_GRADIENT, padding: 1, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9,
            }}>
              <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🎯</div>
            </div>
            <div style={{
              background: '#1a1a1a', borderRadius: 18, padding: '7px 10px',
              display: 'flex', alignItems: 'center', gap: 3,
            }}>
              {[0, 1, 2].map(d => (
                <div key={d} style={{
                  width: 4, height: 4, borderRadius: '50%', background: '#555',
                  animation: `igTypingDot 1s ease-in-out ${d * 0.2}s infinite`,
                }} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input bar */}
      <div style={{
        position: 'absolute', bottom: 34, left: 0, right: 0,
        background: '#000', borderTop: '1px solid #1a1a1a',
        padding: '5px 10px', display: 'flex', alignItems: 'center', gap: 5,
      }}>
        <span style={{ fontSize: 12 }}>😊</span>
        <div style={{ flex: 1, border: '1px solid #222', borderRadius: 16, padding: '3px 8px', color: '#333', fontSize: 7 }}>Message...</div>
        <span style={{ fontSize: 11 }}>🎤</span>
      </div>

      {/* Bottom nav */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 34,
        background: '#000', borderTop: '1px solid #1a1a1a',
        display: 'flex', alignItems: 'center', justifyContent: 'space-around', paddingBottom: 4,
      }}>
        {['🏠', '🔍', '➕', '🎬', '👤'].map((icon, i) => (
          <span key={i} style={{ fontSize: i === 2 ? 16 : 13, color: i === 4 ? '#fff' : '#333' }}>{icon}</span>
        ))}
      </div>

      <style>{`
        @keyframes igSlideIn {
          from { opacity: 0; transform: translateY(5px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes igTypingDot {
          0%, 80%, 100% { transform: scale(1); opacity: 0.4; }
          40%           { transform: scale(1.3); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────

export default function AutoDMExample({ isActive = true }) {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <PhoneCarousel holdMs={6000} transMs={700}>
        <CommentFloodScreen isActive={isActive} />
        <AutoDMScreen isActive={isActive} />
      </PhoneCarousel>
    </div>
  );
}
