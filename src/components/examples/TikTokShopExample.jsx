import { useEffect, useRef, useState } from 'react';

const NOTIFICATIONS = [
  { icon: '🛒', text: 'Jordan M. just purchased', sub: 'Glow Serum Bundle' },
  { icon: '💳', text: 'New order — $84.00',       sub: 'via TikTok Shop' },
  { icon: '🛒', text: 'Priya S. just purchased',  sub: 'Starter Kit × 2' },
  { icon: '💳', text: 'New order — $129.00',      sub: 'via TikTok Shop' },
  { icon: '🛒', text: 'Marcus T. just purchased', sub: 'Limited Drop' },
  { icon: '💳', text: 'New order — $56.00',       sub: 'via TikTok Shop' },
];

const LIKES_PER_TICK = 7;
const CLICKS_PER_TICK = 3;

export default function TikTokShopExample({ isActive = true }) {
  const [notifIndex, setNotifIndex]   = useState(0);
  const [notifVisible, setNotifVisible] = useState(true);
  const [likes, setLikes]             = useState(48300);
  const [clicks, setClicks]           = useState(1241);
  const [watching, setWatching]       = useState(1847);
  const [soldOut, setSoldOut]         = useState(false);
  const tickRef = useRef(null);
  const notifRef = useRef(null);

  // Notification cycle
  useEffect(() => {
    if (!isActive) return;
    const cycle = () => {
      setNotifVisible(false);
      notifRef.current = setTimeout(() => {
        setNotifIndex(i => (i + 1) % NOTIFICATIONS.length);
        setNotifVisible(true);
        notifRef.current = setTimeout(cycle, 2200);
      }, 400);
    };
    notifRef.current = setTimeout(cycle, 2200);
    return () => clearTimeout(notifRef.current);
  }, [isActive]);

  // Counter ticks
  useEffect(() => {
    if (!isActive) return;
    tickRef.current = setInterval(() => {
      setLikes(l => l + LIKES_PER_TICK);
      setClicks(c => c + CLICKS_PER_TICK);
      setWatching(w => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.max(1800, w + delta);
      });
    }, 600);
    return () => clearInterval(tickRef.current);
  }, [isActive]);

  // Sold out flash at end of loop
  useEffect(() => {
    if (!isActive) return;
    if (notifIndex === NOTIFICATIONS.length - 1) {
      setSoldOut(true);
      const t = setTimeout(() => setSoldOut(false), 1800);
      return () => clearTimeout(t);
    }
  }, [notifIndex, isActive]);

  const notif = NOTIFICATIONS[notifIndex];

  return (
    <div
        className="relative mx-auto shrink-0"
        style={{
          width: 170, height: 360,
          background: '#000',
          borderRadius: 36,
          boxShadow: '0 0 0 6px #1a1a1a, 0 0 0 8px #333, 0 30px 60px rgba(0,0,0,0.6)',
          overflow: 'hidden',
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          userSelect: 'none',
        }}
      >
        {/* Status bar */}
        <div className="flex justify-between items-center px-5 pt-3 pb-1"
          style={{ fontSize: 9, color: '#fff', position: 'relative', zIndex: 10 }}>
          <span>9:41</span>
          <div className="flex gap-1 items-center">
            <span style={{ letterSpacing: -1 }}>▐▐▐</span>
            <span>WiFi</span>
            <span>🔋</span>
          </div>
        </div>

        {/* Full-screen video background */}
        <div
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(160deg, #1a0533 0%, #3d0066 40%, #7c1fa8 70%, #c2185b 100%)',
          }}
        >
          {/* Fake product image glow */}
          <div style={{
            position: 'absolute', top: '22%', left: '50%',
            transform: 'translateX(-50%)',
            width: 80, height: 80, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,200,100,0.35) 0%, transparent 70%)',
          }} />
          {/* Fake product bottle shape */}
          <div style={{
            position: 'absolute', top: '26%', left: '50%',
            transform: 'translateX(-50%)',
            width: 28, height: 52,
            background: 'linear-gradient(180deg, #ffe0b2, #ffb74d)',
            borderRadius: '8px 8px 4px 4px',
            boxShadow: '0 4px 20px rgba(255,180,50,0.5)',
          }}>
            <div style={{
              width: 18, height: 8, background: '#ffd54f',
              borderRadius: '4px 4px 0 0', margin: '0 auto',
            }} />
          </div>
        </div>

        {/* Right-side action buttons */}
        <div style={{
          position: 'absolute', right: 8, bottom: 120,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, zIndex: 10,
        }}>
          {/* Avatar */}
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            background: 'linear-gradient(135deg, #9333ea, #ec4899)',
            border: '2px solid #fff', fontSize: 12,
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700,
          }}>R</div>

          {/* Like */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <span style={{ fontSize: 20 }}>❤️</span>
            <span style={{ color: '#fff', fontSize: 8, fontWeight: 600 }}>
              {likes >= 1000 ? `${(likes / 1000).toFixed(1)}K` : likes}
            </span>
          </div>

          {/* Comment */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <span style={{ fontSize: 18 }}>💬</span>
            <span style={{ color: '#fff', fontSize: 8, fontWeight: 600 }}>3.2K</span>
          </div>

          {/* Share */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <span style={{ fontSize: 18 }}>↗️</span>
            <span style={{ color: '#fff', fontSize: 8, fontWeight: 600 }}>Save</span>
          </div>

          {/* TikTok Shop bag */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 8,
              background: 'linear-gradient(135deg, #ff6b35, #ff2d55)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
            }}>🛍️</div>
            <span style={{ color: '#fff', fontSize: 7, fontWeight: 600 }}>Shop</span>
          </div>
        </div>

        {/* Bottom info */}
        <div style={{
          position: 'absolute', bottom: 48, left: 10, right: 50, zIndex: 10,
        }}>
          <div style={{ color: '#fff', fontSize: 9, fontWeight: 700, marginBottom: 3 }}>@your_brand</div>
          <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: 8, lineHeight: 1.4, marginBottom: 6 }}>
            You need to try this ✨ link in bio 🔗
          </div>

          {/* Shop pill */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            background: 'rgba(255,45,85,0.85)', borderRadius: 20,
            padding: '3px 8px',
          }}>
            <span style={{ fontSize: 9 }}>🛍️</span>
            <span style={{ color: '#fff', fontSize: 8, fontWeight: 700 }}>Glow Serum Bundle</span>
          </div>

          {/* Stats row */}
          <div style={{
            display: 'flex', gap: 8, marginTop: 6, alignItems: 'center',
          }}>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 7 }}>
              👁 {watching.toLocaleString()} watching
            </span>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 7 }}>
              🔗 {clicks.toLocaleString()} clicks
            </span>
          </div>
        </div>

        {/* Purchase notification pill */}
        <div style={{
          position: 'absolute', top: 36, left: 10, right: 10, zIndex: 20,
          transition: 'opacity 0.35s ease, transform 0.35s ease',
          opacity: notifVisible ? 1 : 0,
          transform: notifVisible ? 'translateY(0)' : 'translateY(-6px)',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(8px)',
            borderRadius: 20, padding: '5px 10px',
            border: '1px solid rgba(255,255,255,0.12)',
          }}>
            <span style={{ fontSize: 13 }}>{notif.icon}</span>
            <div>
              <div style={{ color: '#fff', fontSize: 8, fontWeight: 700, lineHeight: 1.2 }}>{notif.text}</div>
              <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 7 }}>{notif.sub}</div>
            </div>
          </div>
        </div>

        {/* Sold out flash */}
        {soldOut && (
          <div style={{
            position: 'absolute', top: '42%', left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(255,45,85,0.92)',
            borderRadius: 12, padding: '8px 18px', zIndex: 30,
            animation: 'none',
          }}>
            <span style={{ color: '#fff', fontSize: 11, fontWeight: 900, letterSpacing: 1 }}>🔥 SOLD OUT</span>
          </div>
        )}

        {/* Bottom nav */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 44,
          background: '#000', borderTop: '1px solid #222',
          display: 'flex', alignItems: 'center', justifyContent: 'space-around',
          paddingBottom: 6, zIndex: 10,
        }}>
          {[
            { icon: '🏠', label: 'Home' },
            { icon: '🔍', label: 'Discover' },
            { icon: null, label: '' },
            { icon: '📦', label: 'Orders', active: true },
            { icon: '👤', label: 'Me' },
          ].map((item, i) =>
            i === 2 ? (
              <div key={i} style={{
                width: 32, height: 22, borderRadius: 6,
                background: 'linear-gradient(135deg, #69C9D0, #fff, #EE1D52)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: 13, color: '#fff', fontWeight: 900, textShadow: '0 0 4px #000' }}>+</span>
              </div>
            ) : (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                <span style={{ fontSize: 14, color: item.active ? '#fe2c55' : '#555' }}>{item.icon}</span>
                <span style={{ fontSize: 6, color: item.active ? '#fe2c55' : '#555' }}>{item.label}</span>
              </div>
            )
          )}
        </div>
      </div>
  );
}
