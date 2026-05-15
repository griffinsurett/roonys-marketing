import { useEffect, useRef, useState } from 'react';
import PhoneCarousel from './PhoneCarousel.jsx';

const PHONE_STYLE = {
  position: 'relative',
  width: 220, height: 440,
  background: '#0a0a0a',
  borderRadius: 36,
  boxShadow: '0 0 0 6px #1a1a1a, 0 0 0 8px #333, 0 30px 60px rgba(0,0,0,0.6)',
  overflow: 'hidden',
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
  userSelect: 'none',
};

const NOTIFS = [
  { app: '📱', color: '#ec4899', title: 'TikTok',     body: '@your_brand reel hit 48K views',         time: '3:12 AM' },
  { app: '💰', color: '#22c55e', title: 'Stripe',     body: 'Payment received · $197.00',              time: '3:24 AM' },
  { app: '📸', color: '#a855f7', title: 'Instagram',  body: '847 new followers since last night',      time: '3:41 AM' },
  { app: '💰', color: '#22c55e', title: 'Stripe',     body: 'Payment received · $97.00',               time: '4:03 AM' },
  { app: '🔔', color: '#f97316', title: 'YouTube',    body: 'Your Short is trending in Discover',      time: '4:17 AM' },
  { app: '💰', color: '#22c55e', title: 'Stripe',     body: 'Payment received · $297.00',              time: '5:58 AM' },
];

// ─── Screen 1: Lock screen notifications rolling in at night ─────────────────

function LockScreenNotifs({ isActive }) {
  const [shown, setShown] = useState(0);
  const timers = useRef([]);

  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (!isActive) { setShown(0); return; }

    NOTIFS.forEach((_, i) => {
      timers.current.push(setTimeout(() => setShown(i + 1), 600 + i * 900));
    });

    return () => timers.current.forEach(clearTimeout);
  }, [isActive]);

  return (
    <div style={{ ...PHONE_STYLE }}>
      {/* Dark sky background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, #020617 0%, #0f0a2e 50%, #1a0533 100%)',
      }} />

      {/* Stars */}
      {[...Array(18)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: i % 3 === 0 ? 2 : 1.5,
          height: i % 3 === 0 ? 2 : 1.5,
          borderRadius: '50%',
          background: '#fff',
          opacity: 0.4 + (i % 4) * 0.15,
          top: `${5 + (i * 17) % 45}%`,
          left: `${(i * 23) % 90}%`,
        }} />
      ))}

      {/* Time */}
      <div style={{
        position: 'absolute', top: 40, left: 0, right: 0, textAlign: 'center', zIndex: 10,
      }}>
        <div style={{ color: '#fff', fontSize: 36, fontWeight: 200, letterSpacing: -1 }}>3:12</div>
        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 9 }}>Thursday, May 15</div>
      </div>

      {/* 💤 sleeping indicator */}
      <div style={{
        position: 'absolute', top: 108, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 10,
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.08)', borderRadius: 20, padding: '3px 12px',
          display: 'flex', alignItems: 'center', gap: 5,
        }}>
          <span style={{ fontSize: 10 }}>😴</span>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 7 }}>You're asleep. Your content isn't.</span>
        </div>
      </div>

      {/* Notifications */}
      <div style={{
        position: 'absolute', top: 138, left: 0, right: 0, bottom: 0,
        padding: '0 12px', display: 'flex', flexDirection: 'column', gap: 7, zIndex: 10,
        overflowY: 'hidden',
      }}>
        {NOTIFS.slice(0, shown).map((n, i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(12px)',
            borderRadius: 16, padding: '8px 12px',
            display: 'flex', alignItems: 'center', gap: 9,
            animation: 'notifSlide 0.35s cubic-bezier(0.34,1.56,0.64,1) both',
            borderLeft: `3px solid ${n.color}`,
          }}>
            <span style={{ fontSize: 16, flexShrink: 0 }}>{n.app}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 7, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.3 }}>{n.title}</span>
                <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 6.5 }}>{n.time}</span>
              </div>
              <div style={{ color: '#fff', fontSize: 8, lineHeight: 1.4, fontWeight: n.title === 'Stripe' ? 700 : 400 }}>
                {n.title === 'Stripe'
                  ? <span style={{ color: '#22c55e' }}>{n.body}</span>
                  : n.body}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes notifSlide {
          from { opacity: 0; transform: translateY(-12px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}

// ─── Screen 2: Morning earnings summary ──────────────────────────────────────

const MORNING_STATS = [
  { label: 'Revenue while you slept',   value: '$591',   icon: '💰', color: '#22c55e' },
  { label: 'New followers',             value: '+1,204', icon: '📈', color: '#a855f7' },
  { label: 'Total video views',         value: '96.4K',  icon: '▶️',  color: '#ec4899' },
  { label: 'New DM leads',              value: '38',     icon: '💬', color: '#f97316' },
];

function MorningSummaryScreen({ isActive }) {
  const [revealed, setRevealed] = useState(0);
  const timers = useRef([]);

  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (!isActive) { setRevealed(0); return; }

    MORNING_STATS.forEach((_, i) => {
      timers.current.push(setTimeout(() => setRevealed(i + 1), 400 + i * 450));
    });

    return () => timers.current.forEach(clearTimeout);
  }, [isActive]);

  return (
    <div style={{ ...PHONE_STYLE, background: '#0a0a0a' }}>
      {/* Status bar */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '8px 14px 4px', fontSize: 9, color: '#fff',
      }}>
        <span>8:00 AM</span>
        <div style={{ display: 'flex', gap: 3 }}>
          <span style={{ letterSpacing: -1 }}>▐▐▐</span>
          <span>WiFi 🔋</span>
        </div>
      </div>

      {/* Header */}
      <div style={{ padding: '8px 16px 12px', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 7, marginBottom: 3 }}>Good morning ☀️ Here's what happened while you slept</div>
        <div style={{ color: '#fff', fontSize: 14, fontWeight: 800 }}>Last night's report</div>
        <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 7, marginTop: 2 }}>11:00 PM → 8:00 AM · 9 hrs of autopilot</div>
      </div>

      {/* Stat cards */}
      <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {MORNING_STATS.map((s, i) => (
          <div key={i} style={{
            background: i < revealed ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.02)',
            border: `1px solid ${i < revealed ? s.color + '44' : '#1a1a1a'}`,
            borderRadius: 14, padding: '10px 14px',
            display: 'flex', alignItems: 'center', gap: 12,
            opacity: i < revealed ? 1 : 0.25,
            transform: i < revealed ? 'translateX(0)' : 'translateX(-8px)',
            transition: 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
          }}>
            <span style={{ fontSize: 20, flexShrink: 0 }}>{s.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 6.5, marginBottom: 3 }}>{s.label}</div>
              <div style={{ color: s.color, fontSize: 20, fontWeight: 900, letterSpacing: -0.5, lineHeight: 1 }}>{s.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        position: 'absolute', bottom: 44, left: 0, right: 0,
        padding: '0 16px',
        display: 'flex', justifyContent: 'center',
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.05)', border: '1px solid #222',
          borderRadius: 20, padding: '4px 14px',
          display: 'flex', alignItems: 'center', gap: 5,
        }}>
          <span style={{ fontSize: 8 }}>⚡</span>
          <span style={{ color: '#444', fontSize: 7 }}>Powered by Chik Chak · Content on autopilot</span>
        </div>
      </div>

      {/* Bottom nav */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 44,
        background: '#0a0a0a', borderTop: '1px solid #1a1a1a',
        display: 'flex', alignItems: 'center', justifyContent: 'space-around', paddingBottom: 6,
      }}>
        {['📊', '📋', '💬', '🔔', '👤'].map((icon, i) => (
          <span key={i} style={{ fontSize: 14, color: i === 0 ? '#a855f7' : '#333' }}>{icon}</span>
        ))}
      </div>
    </div>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────

export default function SleepIncomeExample({ isActive = true }) {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <PhoneCarousel holdMs={5000} transMs={700}>
        <LockScreenNotifs isActive={isActive} />
        <MorningSummaryScreen isActive={isActive} />
      </PhoneCarousel>
    </div>
  );
}
