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
  { user: 'sarah.m',        avatar: '👩', color: '#7c3aed', delay: 600,  text: 'LINK please!! 🙏' },
  { user: 'mike_builds',    avatar: '🔨', color: '#1d4ed8', delay: 1800, text: 'LINK 👀' },
  { user: 'cozy.cottage',   avatar: '🏡', color: '#065f46', delay: 3000, text: 'omg LINK me!!' },
  { user: 'hype.beast99',   avatar: '👟', color: '#92400e', delay: 4200, text: 'LINK 🔥🔥' },
  { user: 'xo_nightfall',   avatar: '🌙', color: '#1e1b4b', delay: 5400, text: 'sending LINK to my friends too' },
];

// ─── Screen 1: Comment section flooding with trigger word ─────────────────────

function CommentFloodScreen({ isActive }) {
  const [visible, setVisible] = useState([]);
  const [notif, setNotif] = useState(null); // index of latest notif
  const timers = useRef([]);

  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (!isActive) { setVisible([]); setNotif(null); return; }
    COMMENTS.forEach((c, i) => {
      timers.current.push(setTimeout(() => {
        setVisible(prev => [...prev, i]);
        setNotif(i);
        // hide notif after 900ms
        timers.current.push(setTimeout(() => setNotif(null), 900));
      }, c.delay));
    });
    return () => timers.current.forEach(clearTimeout);
  }, [isActive]);

  const IG_GRADIENT = 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)';

  return (
    <div style={{ ...PHONE_STYLE, background: '#111', display: 'flex', flexDirection: 'column' }}>

      {/* ── DM notification banner ── */}
      <div style={{
        position: 'absolute', top: 10, left: 10, right: 10, zIndex: 50,
        background: 'rgba(30,30,30,0.95)', backdropFilter: 'blur(12px)',
        borderRadius: 14, padding: '8px 12px',
        display: 'flex', alignItems: 'center', gap: 8,
        boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
        opacity: notif !== null ? 1 : 0,
        transform: notif !== null ? 'translateY(0)' : 'translateY(-14px)',
        transition: 'opacity 0.25s ease, transform 0.25s ease',
        pointerEvents: 'none',
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: 8, flexShrink: 0,
          background: IG_GRADIENT,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
        }}>📩</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 6.5, marginBottom: 1 }}>Instagram · Auto DM ⚡</div>
          <div style={{ color: '#fff', fontSize: 7.5, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {notif !== null ? `DM sent to ${COMMENTS[notif].user}` : ''}
          </div>
        </div>
        <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 6.5, flexShrink: 0 }}>now</div>
      </div>

      {/* ── Top: video thumbnail ── */}
      <div style={{
        height: 180, flexShrink: 0, position: 'relative',
        background: 'linear-gradient(160deg, #0d1117 0%, #1a0533 50%, #7c1fa8 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* play icon */}
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: 14, marginLeft: 2 }}>▶</span>
        </div>
        {/* drag handle */}
        <div style={{
          position: 'absolute', bottom: 6, left: '50%', transform: 'translateX(-50%)',
          width: 32, height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.3)',
        }} />
      </div>

      {/* ── Post info ── */}
      <div style={{ padding: '10px 12px 6px', borderBottom: '1px solid #222' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <div style={{
            width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
            background: IG_GRADIENT, padding: 1.5,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#1a0533', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>🎯</div>
          </div>
          <span style={{ color: '#fff', fontSize: 9, fontWeight: 700 }}>your_brand</span>
          <div style={{
            marginLeft: 'auto', border: '1px solid #fff', borderRadius: 6,
            padding: '2px 8px', color: '#fff', fontSize: 7, fontWeight: 700,
          }}>Follow</div>
        </div>
        <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: 7.5, lineHeight: 1.5 }}>
          Comment{' '}
          <span style={{
            background: 'rgba(251,191,36,0.15)', border: '1px solid #fbbf24',
            borderRadius: 4, padding: '1px 5px',
            color: '#fbbf24', fontWeight: 900,
          }}>"{TRIGGER}"</span>
          {' '}and I'll DM you the free guide instantly 👇
        </div>
        <div style={{ color: '#555', fontSize: 7, marginTop: 4 }}>2 hours ago</div>
      </div>

      {/* ── Comments list ── */}
      <div style={{ flex: 1, overflowY: 'hidden', padding: '6px 12px', display: 'flex', flexDirection: 'column', gap: 7 }}>
        {COMMENTS.map((c, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            opacity: visible.includes(i) ? 1 : 0,
            transform: visible.includes(i) ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}>
            <div style={{
              width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
              background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12,
            }}>{c.avatar}</div>
            <div style={{ flex: 1 }}>
              <span style={{ color: '#fff', fontSize: 7.5, fontWeight: 700 }}>{c.user} </span>
              <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 7.5 }}>{c.text}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Comment input ── */}
      <div style={{
        padding: '6px 12px 8px', borderTop: '1px solid #222',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <div style={{
          width: 24, height: 24, borderRadius: '50%', background: '#333',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0,
        }}>👤</div>
        <div style={{
          flex: 1, background: '#1a1a1a', borderRadius: 16,
          padding: '5px 10px', color: '#555', fontSize: 7,
        }}>Join the conversation...</div>
        <span style={{ fontSize: 12 }}>🎁</span>
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
  const timers = useRef([]);

  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (!isActive) { setVisible(0); setTyping(false); return; }

    const addNext = (i) => {
      if (i >= DM_MESSAGES.length) return;
      setTyping(true);
      const t1 = setTimeout(() => {
        setTyping(false);
        setVisible(i + 1);
        const t2 = setTimeout(() => addNext(i + 1), 1200);
        timers.current.push(t2);
      }, 900);
      timers.current.push(t1);
    };

    const t0 = setTimeout(() => addNext(0), 400);
    timers.current.push(t0);
    return () => { timers.current.forEach(clearTimeout); timers.current = []; };
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
  const [slide, setSlide] = useState(0);

  return (
    <div className="flex items-center justify-center w-full h-full">
      <PhoneCarousel holdMs={6000} transMs={700} onSlideChange={setSlide}>
        <CommentFloodScreen isActive={isActive && slide === 0} />
        <AutoDMScreen isActive={isActive && slide === 1} />
      </PhoneCarousel>
    </div>
  );
}
