import { useEffect, useRef, useState } from 'react';
import PhoneCarousel from './PhoneCarousel.jsx';
import AnimatedExample from './AnimatedExample.jsx';

// ─── Scene 1: TikTok Live ────────────────────────────────────────────────────

const GIFTS = [
  { emoji: '🌹', name: 'Rose',     coins: 1,    count: 0 },
  { emoji: '🦁', name: 'Lion',     coins: 29,   count: 0 },
  { emoji: '🌌', name: 'Universe', coins: 34999,count: 0 },
  { emoji: '👑', name: 'Crown',    coins: 500,  count: 0 },
  { emoji: '💎', name: 'Diamond',  coins: 200,  count: 0 },
];

const GIFT_STREAM = [
  { emoji: '🌹', user: 'mike_b',       coins: 1 },
  { emoji: '💎', user: 'sarah.home',   coins: 200 },
  { emoji: '🌹', user: 'xo_night',     coins: 1 },
  { emoji: '👑', user: 'jersey_re',    coins: 500 },
  { emoji: '🌹', user: 'dan_nj',       coins: 1 },
  { emoji: '🦁', user: 'hype.beast',   coins: 29 },
  { emoji: '💎', user: 'linda_r',      coins: 200 },
  { emoji: '👑', user: 'cozy.life',    coins: 500 },
  { emoji: '🦁', user: 'galaxy_b',     coins: 29 },
  { emoji: '💎', user: 'sunflower99',  coins: 200 },
];

function TikTokLiveScene({ isActive }) {
  const [gifts, setGifts]         = useState([]);
  const [total, setTotal]         = useState(847);
  const [ended, setEnded]         = useState(false);
  const [viewers, setViewers]     = useState(2847);
  const giftIndex = useRef(0);
  const timerRef  = useRef(null);

  useEffect(() => {
    if (!isActive) return;
    setGifts([]);
    setTotal(847);
    setEnded(false);
    giftIndex.current = 0;

    const addGift = () => {
      const g = GIFT_STREAM[giftIndex.current % GIFT_STREAM.length];
      giftIndex.current += 1;
      const id = Date.now() + Math.random();
      setGifts(prev => [...prev.slice(-5), { ...g, id }]);
      setTotal(prev => {
        const next = prev + Math.round(g.coins * 0.011 * 100) / 100;
        return next;
      });
      if (giftIndex.current < GIFT_STREAM.length) {
        timerRef.current = setTimeout(addGift, 480);
      } else {
        timerRef.current = setTimeout(() => setEnded(true), 800);
      }
    };

    timerRef.current = setTimeout(addGift, 600);
    return () => clearTimeout(timerRef.current);
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;
    const iv = setInterval(() => {
      setViewers(v => Math.max(2600, v + Math.floor(Math.random() * 11) - 5));
    }, 700);
    return () => clearInterval(iv);
  }, [isActive]);

  const displayTotal = `$${total.toFixed(2)}`;

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="relative mx-auto shrink-0" style={{
        width: 220, height: 440, background: '#000', borderRadius: 36,
        boxShadow: '0 0 0 6px #1a1a1a, 0 0 0 8px #333, 0 30px 60px rgba(0,0,0,0.6)',
        overflow: 'hidden', fontFamily: "'Helvetica Neue', Arial, sans-serif", userSelect: 'none',
      }}>
        {/* Video bg */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(160deg, #0d0d2b 0%, #1a0533 40%, #3d0066 80%, #6a0dad 100%)',
        }} />

        {/* Status bar */}
        <div className="flex justify-between items-center px-5 pt-3 pb-1"
          style={{ fontSize: 9, color: '#fff', position: 'relative', zIndex: 10 }}>
          <span>9:41</span>
          <div className="flex gap-1 items-center"><span style={{ letterSpacing: -1 }}>▐▐▐</span><span>WiFi 🔋</span></div>
        </div>

        {/* Top bar */}
        <div style={{ position: 'absolute', top: 28, left: 0, right: 0, padding: '0 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ background: '#fe2c55', borderRadius: 4, padding: '2px 6px', fontSize: 8, fontWeight: 900, color: '#fff', letterSpacing: 1 }}>LIVE</div>
            <span style={{ color: '#fff', fontSize: 8 }}>👁 {viewers.toLocaleString()}</span>
          </div>
          <div style={{ color: '#fff', fontSize: 8, fontWeight: 700 }}>@your_brand</div>
          <span style={{ fontSize: 16, color: '#fff' }}>✕</span>
        </div>

        {/* Gift stream */}
        <div style={{ position: 'absolute', bottom: 90, left: 10, zIndex: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {gifts.map(g => (
            <div key={g.id} style={{
              display: 'flex', alignItems: 'center', gap: 5,
              background: 'rgba(0,0,0,0.55)', borderRadius: 20, padding: '3px 8px',
              animation: 'giftSlideUp 0.35s ease-out both',
            }}>
              <span style={{ fontSize: 14 }}>{g.emoji}</span>
              <span style={{ color: '#fff', fontSize: 8, fontWeight: 600 }}>{g.user}</span>
              <span style={{ color: '#fbbf24', fontSize: 7 }}>+{g.coins}</span>
            </div>
          ))}
        </div>

        {/* Gifts total */}
        <div style={{
          position: 'absolute', bottom: 55, right: 10, zIndex: 10,
          background: 'rgba(0,0,0,0.6)', borderRadius: 20, padding: '4px 10px',
          display: 'flex', alignItems: 'center', gap: 4,
        }}>
          <span style={{ fontSize: 12 }}>🎁</span>
          <span style={{ color: '#fbbf24', fontSize: 10, fontWeight: 900 }}>{displayTotal}</span>
        </div>

        {/* Live ended overlay */}
        {ended && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 20,
            background: 'rgba(0,0,0,0.82)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
            animation: 'fadeIn 0.5s ease both',
          }}>
            <div style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>LIVE Ended</div>
            <div style={{ color: '#888', fontSize: 8 }}>Total gifts earned</div>
            <div style={{ color: '#fbbf24', fontSize: 28, fontWeight: 900 }}>{displayTotal}</div>
            <div style={{
              background: '#fe2c55', borderRadius: 20, padding: '5px 16px',
              color: '#fff', fontSize: 8, fontWeight: 700,
            }}>View summary</div>
          </div>
        )}

        {/* Bottom input area */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 50,
          background: 'rgba(0,0,0,0.5)', padding: '8px 12px',
          display: 'flex', alignItems: 'center', gap: 8, zIndex: 10,
        }}>
          <div style={{
            flex: 1, background: 'rgba(255,255,255,0.15)', borderRadius: 20,
            padding: '4px 10px', color: '#888', fontSize: 8,
          }}>Say something...</div>
          <span style={{ fontSize: 18 }}>🎁</span>
          <span style={{ fontSize: 18 }}>✋</span>
        </div>
      </div>

      <style>{`
        @keyframes giftSlideUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// ─── Scene 2: TikTok Creator Fund Dashboard ──────────────────────────────────

function TikTokCreatorFundScene({ isActive }) {
  const [balance, setBalance] = useState(847.32);

  useEffect(() => {
    if (!isActive) return;
    const iv = setInterval(() => {
      setBalance(b => Math.round((b + 0.07) * 100) / 100);
    }, 800);
    return () => clearInterval(iv);
  }, [isActive]);

  const bars = [38, 55, 42, 68, 74, 82, 91];
  const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'];

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="relative mx-auto shrink-0" style={{
        width: 220, height: 440, background: '#000', borderRadius: 36,
        boxShadow: '0 0 0 6px #1a1a1a, 0 0 0 8px #333, 0 30px 60px rgba(0,0,0,0.6)',
        overflow: 'hidden', fontFamily: "'Helvetica Neue', Arial, sans-serif", userSelect: 'none',
      }}>
        {/* Status bar */}
        <div className="flex justify-between items-center px-5 pt-3 pb-1"
          style={{ fontSize: 9, color: '#fff', background: '#000' }}>
          <span>9:41</span>
          <div className="flex gap-1 items-center"><span style={{ letterSpacing: -1 }}>▐▐▐</span><span>WiFi 🔋</span></div>
        </div>

        {/* Header */}
        <div style={{ background: '#000', padding: '4px 14px 8px', borderBottom: '1px solid #1a1a1a', display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" style={{ width: 14, height: 14 }}>
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          <span style={{ color: '#fff', fontSize: 11, fontWeight: 700, flex: 1, textAlign: 'center' }}>Creator Studio</span>
          <span style={{ fontSize: 14 }}>⚙️</span>
        </div>

        {/* Balance card */}
        <div style={{
          margin: '12px 12px 8px',
          background: 'linear-gradient(135deg, #1a0533, #3d0066)',
          borderRadius: 16, padding: '12px 14px',
          border: '1px solid rgba(255,255,255,0.08)',
        }}>
          <div style={{ color: '#888', fontSize: 8, marginBottom: 4 }}>Estimated balance</div>
          <div style={{ color: '#fbbf24', fontSize: 26, fontWeight: 900, letterSpacing: -1 }}>
            ${balance.toFixed(2)}
          </div>
          <div style={{ color: '#888', fontSize: 7, marginTop: 2 }}>Est. payout · May 15</div>
          <div style={{
            marginTop: 8, background: '#fe2c55', borderRadius: 20,
            padding: '4px 12px', display: 'inline-block',
            color: '#fff', fontSize: 7, fontWeight: 700,
          }}>Withdraw</div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 6, padding: '0 12px 10px' }}>
          {[['4.2M', 'Views'], ['$0.21', 'Per 1K'], ['22', 'Days left']].map(([val, label]) => (
            <div key={label} style={{
              flex: 1, background: '#111', borderRadius: 10, padding: '6px 4px', textAlign: 'center',
            }}>
              <div style={{ color: '#fff', fontSize: 10, fontWeight: 700 }}>{val}</div>
              <div style={{ color: '#555', fontSize: 7 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Bar chart */}
        <div style={{ padding: '0 14px' }}>
          <div style={{ color: '#888', fontSize: 8, marginBottom: 6 }}>Monthly earnings</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 60 }}>
            {bars.map((h, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <div style={{
                  width: '100%', height: `${h}%`,
                  background: i === bars.length - 1
                    ? 'linear-gradient(180deg, #fe2c55, #9333ea)'
                    : 'rgba(255,255,255,0.15)',
                  borderRadius: '3px 3px 0 0',
                  minHeight: 4,
                }} />
                <span style={{ color: '#555', fontSize: 5.5 }}>{months[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom nav */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 44,
          background: '#000', borderTop: '1px solid #222',
          display: 'flex', alignItems: 'center', justifyContent: 'space-around', paddingBottom: 6,
        }}>
          {['🏠', '🔍', null, '💬', '👤'].map((icon, i) =>
            i === 2 ? (
              <div key={i} style={{
                width: 32, height: 22, borderRadius: 6,
                background: 'linear-gradient(135deg, #69C9D0, #fff, #EE1D52)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: 13, color: '#fff', fontWeight: 900, textShadow: '0 0 4px #000' }}>+</span>
              </div>
            ) : (
              <span key={i} style={{ fontSize: 14, color: '#555' }}>{icon}</span>
            )
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Scene 3: Instagram Brand Deal DM ────────────────────────────────────────

const IG_GRADIENT = 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)';

const BRAND_CONVO = [
  { side: 'them', text: 'Hey! We\'ve been following your content and love what you\'re doing 🙌' },
  { side: 'them', text: 'We\'d love to partner on a reel this month. Our budget for this campaign is $2,500 — interested?' },
  { side: 'me',   text: 'Absolutely! I\'d love that. Sending you my media kit now 🙌' },
  { side: 'them', text: 'Amazing! We\'ll review and get a contract over by EOD 🎉' },
];

function InstagramBrandDealScene({ isActive }) {
  const [visibleCount, setVisibleCount] = useState(1);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);
  const timerRef  = useRef(null);

  useEffect(() => {
    if (!isActive) return;
    setVisibleCount(1);

    const addNext = (index) => {
      if (index >= BRAND_CONVO.length) {
        timerRef.current = setTimeout(() => {
          setVisibleCount(1);
          timerRef.current = setTimeout(() => addNext(1), 1400);
        }, 2500);
        return;
      }
      setTyping(true);
      timerRef.current = setTimeout(() => {
        setTyping(false);
        setVisibleCount(index + 1);
        timerRef.current = setTimeout(() => addNext(index + 1), 1600);
      }, 1000);
    };

    timerRef.current = setTimeout(() => addNext(1), 1400);
    return () => clearTimeout(timerRef.current);
  }, [isActive]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [visibleCount, typing]);

  const shown = BRAND_CONVO.slice(0, visibleCount);
  const nextSide = BRAND_CONVO[visibleCount]?.side ?? 'them';

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="relative mx-auto shrink-0" style={{
        width: 220, height: 440, background: '#000', borderRadius: 36,
        boxShadow: '0 0 0 6px #1a1a1a, 0 0 0 8px #333, 0 30px 60px rgba(0,0,0,0.6)',
        overflow: 'hidden', fontFamily: "'Helvetica Neue', Arial, sans-serif", userSelect: 'none',
      }}>
        {/* Status bar */}
        <div className="flex justify-between items-center px-5 pt-3 pb-1"
          style={{ fontSize: 9, color: '#fff', background: '#000' }}>
          <span>9:41</span>
          <div className="flex gap-1 items-center"><span style={{ letterSpacing: -1 }}>▐▐▐</span><span>WiFi 🔋</span></div>
        </div>

        {/* Header */}
        <div style={{
          background: '#000', borderBottom: '1px solid #1a1a1a',
          padding: '4px 10px 6px', display: 'flex', alignItems: 'center', gap: 7,
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" style={{ width: 12, height: 12, flexShrink: 0 }}>
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          {/* Verified brand avatar */}
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            background: IG_GRADIENT, padding: 1.5, flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              width: '100%', height: '100%', borderRadius: '50%',
              background: '#111', border: '1.5px solid #000',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13,
            }}>👟</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <span style={{ color: '#fff', fontSize: 9, fontWeight: 700 }}>nike_creators</span>
              {/* verified badge */}
              <svg viewBox="0 0 24 24" fill="#3897f0" style={{ width: 10, height: 10 }}>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5l-4-4 1.41-1.41L10 13.67l6.59-6.59L18 8.5l-8 8z" />
              </svg>
            </div>
            <div style={{ color: '#888', fontSize: 7 }}>Brand Partner · Active now</div>
          </div>
          <span style={{ fontSize: 13, color: '#fff' }}>📹</span>
        </div>

        {/* Messages */}
        <div ref={scrollRef} style={{
          overflowY: 'scroll', height: 'calc(100% - 106px)',
          background: '#000', scrollbarWidth: 'none',
          padding: '8px 8px 4px',
          display: 'flex', flexDirection: 'column', gap: 6,
        }} className="[&::-webkit-scrollbar]:hidden">
          {shown.map((msg, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: msg.side === 'me' ? 'flex-end' : 'flex-start',
              animation: 'igSlideIn 0.25s ease-out both',
            }}>
              {msg.side === 'them' && (
                <div style={{
                  width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                  background: '#111', marginRight: 5, alignSelf: 'flex-end',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9,
                }}>👟</div>
              )}
              <div style={{
                maxWidth: '75%',
                background: msg.side === 'me'
                  ? 'linear-gradient(135deg, #405de6, #833ab4, #c13584)'
                  : '#262626',
                borderRadius: msg.side === 'me' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                padding: '6px 10px',
                color: '#fff', fontSize: 8, lineHeight: 1.4,
              }}>
                {msg.text}
              </div>
            </div>
          ))}

          {typing && (
            <div style={{ display: 'flex', justifyContent: nextSide === 'me' ? 'flex-end' : 'flex-start' }}>
              {nextSide === 'them' && (
                <div style={{
                  width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                  background: '#111', marginRight: 5, alignSelf: 'flex-end',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9,
                }}>👟</div>
              )}
              <div style={{
                background: nextSide === 'me' ? 'linear-gradient(135deg, #405de6, #833ab4)' : '#262626',
                borderRadius: 18, padding: '7px 10px',
                display: 'flex', alignItems: 'center', gap: 3,
              }}>
                {[0, 1, 2].map(d => (
                  <div key={d} style={{
                    width: 4, height: 4, borderRadius: '50%', background: '#aaa',
                    animation: `igTypingDot 1s ease-in-out ${d * 0.2}s infinite`,
                  }} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div style={{
          position: 'absolute', bottom: 34, left: 0, right: 0,
          background: '#000', borderTop: '1px solid #1a1a1a',
          padding: '5px 8px', display: 'flex', alignItems: 'center', gap: 5,
        }}>
          <span style={{ fontSize: 12 }}>😊</span>
          <div style={{ flex: 1, border: '1px solid #333', borderRadius: 16, padding: '3px 8px', color: '#555', fontSize: 7 }}>Message...</div>
          <span style={{ fontSize: 11 }}>🎤</span>
        </div>

        {/* Bottom nav */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 34,
          background: '#000', borderTop: '1px solid #1a1a1a',
          display: 'flex', alignItems: 'center', justifyContent: 'space-around', paddingBottom: 4,
        }}>
          {['🏠', '🔍', '➕', '🎬', '👤'].map((icon, i) => (
            <span key={i} style={{ fontSize: i === 2 ? 16 : 13, color: i === 4 ? '#fff' : '#555' }}>{icon}</span>
          ))}
        </div>
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

// ─── Combined export ──────────────────────────────────────────────────────────

export default function CreatorMonetizeExample({ isActive = true }) {
  return (
    <PhoneCarousel holdMs={5500} transMs={600}>
      <TikTokLiveScene     isActive={isActive} />
      <TikTokCreatorFundScene isActive={isActive} />
      <InstagramBrandDealScene isActive={isActive} />
    </PhoneCarousel>
  );
}
