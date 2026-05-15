import { useEffect, useRef, useState } from 'react';

const METRICS = [
  { label: 'Niche match',    key: 'niche', color: '#a855f7', suffix: '%' },
  { label: 'Eng. rate',      key: 'eng',   color: '#ec4899', suffix: '%', decimal: true },
  { label: 'Avg watch time', key: 'watch', color: '#f97316', suffix: '%' },
  { label: 'Saves & shares', key: 'saves', color: '#06b6d4', suffix: '%' },
];

const ACCOUNTS = [
  {
    handle: '@inflated_brand',
    followers: '482K',
    label: 'Big audience',
    scores: { niche: 18, eng: 0.3, watch: 22, saves: 9 },
    quality: 2.1,
    badge: { text: 'LOW QUALITY', color: '#ef4444' },
    avatarColor: '#374151',
    avatarLetter: 'I',
  },
  {
    handle: '@your_brand',
    followers: '9.4K',
    label: 'Right audience',
    scores: { niche: 94, eng: 8.2, watch: 87, saves: 73 },
    quality: 9.4,
    badge: { text: 'HIGH QUALITY', color: '#22c55e' },
    avatarColor: 'linear-gradient(135deg, #9333ea, #ec4899)',
    avatarLetter: 'Y',
  },
];

function BarRow({ label, value, color, suffix, decimal, animating }) {
  const pct = Math.min(value, 100);
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
        <span style={{ color: '#888', fontSize: 7 }}>{label}</span>
        <span style={{ color: '#fff', fontSize: 7, fontWeight: 700 }}>
          {decimal ? value.toFixed(1) : Math.round(value)}{suffix}
        </span>
      </div>
      <div style={{ height: 4, background: '#222', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${pct}%`,
          background: color,
          borderRadius: 4,
          transition: animating ? 'width 1.2s cubic-bezier(0.4,0,0.2,1)' : 'none',
          boxShadow: `0 0 5px ${color}88`,
        }} />
      </div>
    </div>
  );
}

function PhoneScreen({ account, isActive, delay = 0 }) {
  const [values, setValues] = useState({ niche: 0, eng: 0, watch: 0, saves: 0 });
  const [quality, setQuality] = useState(0);
  const [started, setStarted] = useState(false);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    if (!isActive) {
      setValues({ niche: 0, eng: 0, watch: 0, saves: 0 });
      setQuality(0);
      setStarted(false);
      return;
    }

    const t = setTimeout(() => {
      setStarted(true);
      setValues(account.scores);

      const duration = 1400;
      startRef.current = performance.now();
      const tick = (now) => {
        const elapsed = now - startRef.current;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setQuality(+(account.quality * eased).toFixed(1));
        if (progress < 1) rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(t);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isActive, account, delay]);

  const W = 170, H = 360;

  return (
    <div
      className="shrink-0"
      style={{
        position: 'relative',
        width: W, height: H,
        background: '#0a0a0a',
        borderRadius: 30,
        boxShadow: '0 0 0 5px #1a1a1a, 0 0 0 7px #333, 0 20px 50px rgba(0,0,0,0.7)',
        overflow: 'hidden',
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        userSelect: 'none',
        flexShrink: 0,
      }}
    >
      {/* Status bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px 4px', fontSize: 7, color: '#fff', background: '#0a0a0a' }}>
        <span>9:41</span>
        <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
          <span style={{ letterSpacing: -1 }}>▐▐▐</span>
          <span>WiFi 🔋</span>
        </div>
      </div>

      {/* App header */}
      <div style={{ background: '#0a0a0a', padding: '2px 12px 6px', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ color: '#fff', fontSize: 9, fontWeight: 700, textAlign: 'center' }}>Audience Insights</div>
      </div>

      {/* Account row */}
      <div style={{ padding: '8px 12px 4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{
            width: 24, height: 24, borderRadius: '50%',
            background: account.avatarColor,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 10, color: '#fff', fontWeight: 900, flexShrink: 0,
          }}>
            {account.avatarLetter}
          </div>
          <div>
            <div style={{ color: '#fff', fontSize: 8, fontWeight: 700 }}>{account.handle}</div>
            <div style={{ color: '#555', fontSize: 6.5 }}>{account.followers} · {account.label}</div>
          </div>
        </div>
        <div style={{
          background: account.badge.color + '20',
          border: `1px solid ${account.badge.color}`,
          borderRadius: 5, padding: '2px 5px',
          color: account.badge.color, fontSize: 5.5, fontWeight: 800, letterSpacing: 0.3,
          whiteSpace: 'nowrap',
        }}>
          {account.badge.text}
        </div>
      </div>

      {/* Quality score card */}
      <div style={{
        margin: '4px 12px',
        background: 'linear-gradient(135deg, #1a0533, #0f172a)',
        borderRadius: 12, padding: '8px 12px',
        border: '1px solid rgba(255,255,255,0.07)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ color: '#666', fontSize: 6, marginBottom: 2 }}>Quality score</div>
          <div style={{ color: '#fff', fontSize: 24, fontWeight: 900, letterSpacing: -1, lineHeight: 1 }}>
            {quality.toFixed(1)}
            <span style={{ fontSize: 9, color: '#444', fontWeight: 500 }}> / 10</span>
          </div>
        </div>
        <svg viewBox="0 0 40 40" style={{ transform: 'rotate(-90deg)', width: 38, height: 38, flexShrink: 0 }}>
          <circle cx="20" cy="20" r="15" fill="none" stroke="#222" strokeWidth="3.5" />
          <circle
            cx="20" cy="20" r="15" fill="none"
            stroke={account.badge.color}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 15}`}
            strokeDashoffset={`${2 * Math.PI * 15 * (1 - quality / 10)}`}
            style={{ transition: started ? 'stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1)' : 'none' }}
          />
        </svg>
      </div>

      {/* Bars */}
      <div style={{ padding: '6px 12px 0' }}>
        {METRICS.map(m => (
          <BarRow
            key={m.key}
            label={m.label}
            value={values[m.key]}
            color={m.color}
            suffix={m.suffix}
            decimal={m.decimal}
            animating={started}
          />
        ))}
      </div>

      {/* Bottom nav */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 36,
        background: '#0a0a0a', borderTop: '1px solid #1a1a1a',
        display: 'flex', alignItems: 'center', justifyContent: 'space-around',
        paddingBottom: 4,
      }}>
        {['🏠', '🔍', null, '📊', '👤'].map((icon, i) =>
          i === 2 ? (
            <div key={i} style={{
              width: 26, height: 18, borderRadius: 5,
              background: 'linear-gradient(135deg, #69C9D0, #fff, #EE1D52)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: 11, color: '#fff', fontWeight: 900, textShadow: '0 0 4px #000' }}>+</span>
            </div>
          ) : (
            <span key={i} style={{ fontSize: 12, color: i === 3 ? '#a855f7' : '#555' }}>{icon}</span>
          )
        )}
      </div>
    </div>
  );
}

export default function AudienceQualityExample({ isActive = true }) {
  return (
    <div className="ae-dual-phone" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16,
      width: '100%',
      height: '100%',
    }}>
      <PhoneScreen account={ACCOUNTS[0]} isActive={isActive} delay={200} />
      <PhoneScreen account={ACCOUNTS[1]} isActive={isActive} delay={500} />
    </div>
  );
}
