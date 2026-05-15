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

const StatusBar = () => (
  <div style={{
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '8px 14px 4px', fontSize: 9, color: '#fff',
    position: 'relative', zIndex: 10,
  }}>
    <span>9:41</span>
    <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
      <span style={{ letterSpacing: -1 }}>▐▐▐</span>
      <span>WiFi 🔋</span>
    </div>
  </div>
);

// ─── Screen 1: Internal / Behind the scenes ───────────────────────────────────

const STEPS = [
  { label: 'Brief received',       done: true,  time: 'Mon 9:02am' },
  { label: 'Script approved',      done: true,  time: 'Mon 11:14am' },
  { label: 'Shoot completed',      done: true,  time: 'Tue 3:30pm' },
  { label: 'Edit & caption pass',  done: true,  time: 'Wed 10:05am' },
  { label: 'White-label export',   done: false, time: 'In progress…' },
  { label: 'Delivered to agency',  done: false, time: 'Pending' },
];

function BehindTheScenesScreen({ isActive }) {
  const [stepsDone, setStepsDone] = useState(4);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!isActive) { setStepsDone(4); return; }

    timerRef.current = setTimeout(() => {
      setStepsDone(5);
      timerRef.current = setTimeout(() => setStepsDone(6), 1400);
    }, 900);

    return () => clearTimeout(timerRef.current);
  }, [isActive]);

  return (
    <div style={{ ...PHONE_STYLE }}>
      <StatusBar />

      {/* Header */}
      <div style={{ padding: '2px 14px 8px', borderBottom: '1px solid #1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>Production</span>
        <div style={{
          background: '#a855f722', border: '1px solid #a855f7',
          borderRadius: 5, padding: '2px 7px',
          display: 'flex', alignItems: 'center', gap: 4,
        }}>
          <span style={{ fontSize: 8 }}>🔒</span>
          <span style={{ color: '#a855f7', fontSize: 7, fontWeight: 800, letterSpacing: 0.3 }}>NDA PROTECTED</span>
        </div>
      </div>

      {/* Client + project info */}
      <div style={{ padding: '10px 14px 6px' }}>
        <div style={{ color: '#555', fontSize: 7, marginBottom: 2 }}>Delivering for</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <div style={{
            width: 26, height: 26, borderRadius: 8,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13,
          }}>🏢</div>
          <div>
            <div style={{ color: '#fff', fontSize: 9, fontWeight: 700 }}>Apex Creative Agency</div>
            <div style={{ color: '#555', fontSize: 7 }}>3 reels · Due Friday</div>
          </div>
          <div style={{
            marginLeft: 'auto',
            background: '#f97316' + '22', border: '1px solid #f97316',
            borderRadius: 5, padding: '2px 6px',
            color: '#f97316', fontSize: 6.5, fontWeight: 800,
          }}>IN PROGRESS</div>
        </div>
      </div>

      {/* Step tracker */}
      <div style={{ padding: '6px 14px', flex: 1 }}>
        <div style={{ color: '#555', fontSize: 7, marginBottom: 8 }}>Production pipeline</div>
        {STEPS.map((step, i) => {
          const isDone = i < stepsDone;
          const isActive_ = i === stepsDone;
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
              {/* Dot + line */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{
                  width: 14, height: 14, borderRadius: '50%',
                  background: isDone ? '#22c55e' : isActive_ ? '#f97316' : '#1a1a1a',
                  border: `2px solid ${isDone ? '#22c55e' : isActive_ ? '#f97316' : '#333'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.4s ease',
                  fontSize: 7,
                }}>
                  {isDone ? '✓' : ''}
                </div>
                {i < STEPS.length - 1 && (
                  <div style={{
                    width: 2, height: 16, marginTop: 2,
                    background: isDone ? '#22c55e44' : '#1a1a1a',
                    transition: 'background 0.4s ease',
                  }} />
                )}
              </div>
              {/* Label */}
              <div style={{ paddingTop: 1 }}>
                <div style={{
                  color: isDone ? '#fff' : isActive_ ? '#f97316' : '#333',
                  fontSize: 8, fontWeight: isDone ? 600 : 400,
                  transition: 'color 0.4s ease',
                }}>{step.label}</div>
                <div style={{ color: isDone ? '#555' : '#2a2a2a', fontSize: 6.5, marginTop: 1 }}>{step.time}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Roony's watermark — internal only */}
      <div style={{
        position: 'absolute', bottom: 50, left: 0, right: 0,
        display: 'flex', justifyContent: 'center',
      }}>
        <div style={{
          background: '#111', border: '1px solid #222',
          borderRadius: 20, padding: '4px 12px',
          display: 'flex', alignItems: 'center', gap: 5,
        }}>
          <span style={{ fontSize: 8 }}>⚡</span>
          <span style={{ color: '#444', fontSize: 7 }}>Powered by Roony's · Internal only</span>
        </div>
      </div>

      {/* Bottom nav */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 44,
        background: '#0a0a0a', borderTop: '1px solid #1a1a1a',
        display: 'flex', alignItems: 'center', justifyContent: 'space-around', paddingBottom: 6,
      }}>
        {['📋', '📁', '💬', '📊', '👤'].map((icon, i) => (
          <span key={i} style={{ fontSize: 14, color: i === 0 ? '#a855f7' : '#333' }}>{icon}</span>
        ))}
      </div>
    </div>
  );
}

// ─── Screen 2: Client-facing / Agency branded ─────────────────────────────────

const STATS = [
  { label: 'Total views',    value: '2.4M',  delta: '+340%', color: '#22c55e' },
  { label: 'New followers',  value: '+8.2K', delta: '+18%',  color: '#a855f7' },
  { label: 'Avg eng. rate',  value: '9.1%',  delta: '+4.2%', color: '#ec4899' },
  { label: 'Link clicks',    value: '3,841', delta: '+220%', color: '#f97316' },
];

function ClientFacingScreen({ isActive }) {
  const [revealed, setRevealed] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!isActive) { setRevealed(0); return; }
    let i = 0;
    const reveal = () => {
      i += 1;
      setRevealed(i);
      if (i < STATS.length) timerRef.current = setTimeout(reveal, 350);
    };
    timerRef.current = setTimeout(reveal, 600);
    return () => clearTimeout(timerRef.current);
  }, [isActive]);

  return (
    <div style={{ ...PHONE_STYLE, background: '#fff' }}>
      {/* Colored header band */}
      <div style={{
        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        padding: '8px 14px 14px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 9, color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>
          <span>9:41</span>
          <div style={{ display: 'flex', gap: 3 }}>
            <span style={{ letterSpacing: -1 }}>▐▐▐</span>
            <span>WiFi 🔋</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 10,
            background: 'rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
          }}>🏢</div>
          <div>
            <div style={{ color: '#fff', fontSize: 11, fontWeight: 800 }}>Apex Creative</div>
            <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 7 }}>Monthly Content Report · May 2025</div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '12px 14px', background: '#fff' }}>
        <div style={{ color: '#111', fontSize: 9, fontWeight: 700, marginBottom: 2 }}>
          Client: Northside Home Co.
        </div>
        <div style={{ color: '#888', fontSize: 7, marginBottom: 12 }}>
          3 short-form videos · TikTok + Reels + Shorts
        </div>

        {/* Stat cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {STATS.map((s, i) => (
            <div key={i} style={{
              background: i < revealed ? '#fafafa' : '#f0f0f0',
              border: `1px solid ${i < revealed ? s.color + '33' : '#eee'}`,
              borderRadius: 10, padding: '8px 10px',
              transition: 'all 0.35s ease',
              opacity: i < revealed ? 1 : 0.3,
            }}>
              <div style={{ color: '#999', fontSize: 6.5, marginBottom: 3 }}>{s.label}</div>
              <div style={{ color: '#111', fontSize: 16, fontWeight: 900, letterSpacing: -0.5, lineHeight: 1 }}>{s.value}</div>
              <div style={{ color: s.color, fontSize: 7, fontWeight: 700, marginTop: 3 }}>↑ {s.delta} this month</div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: '#eee', margin: '12px 0' }} />

        {/* Prepared by — agency brand only, no Roony's */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ color: '#aaa', fontSize: 6.5, marginBottom: 2 }}>Prepared by</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{
                width: 20, height: 20, borderRadius: 6,
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10,
              }}>🏢</div>
              <span style={{ color: '#111', fontSize: 8, fontWeight: 700 }}>Apex Creative Agency</span>
            </div>
          </div>
          <div style={{
            background: '#22c55e' + '15', border: '1px solid #22c55e',
            borderRadius: 6, padding: '3px 8px',
            color: '#22c55e', fontSize: 6.5, fontWeight: 800,
          }}>DELIVERED ✓</div>
        </div>
      </div>

      {/* Bottom nav */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 44,
        background: '#fff', borderTop: '1px solid #eee',
        display: 'flex', alignItems: 'center', justifyContent: 'space-around', paddingBottom: 6,
      }}>
        {['📊', '📋', '💬', '🔔', '👤'].map((icon, i) => (
          <span key={i} style={{ fontSize: 14, color: i === 0 ? '#6366f1' : '#ccc' }}>{icon}</span>
        ))}
      </div>
    </div>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────

export default function AgencyWhiteLabelExample({ isActive = true }) {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <PhoneCarousel holdMs={4500} transMs={700}>
        <BehindTheScenesScreen isActive={isActive} />
        <ClientFacingScreen isActive={isActive} />
      </PhoneCarousel>
    </div>
  );
}
