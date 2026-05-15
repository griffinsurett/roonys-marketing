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

const StatusBar = ({ light = false }) => (
  <div style={{
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '8px 14px 4px', fontSize: 9,
    color: light ? '#000' : '#fff',
    background: 'transparent',
    position: 'relative', zIndex: 10,
  }}>
    <span>9:41</span>
    <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
      <span style={{ letterSpacing: -1 }}>▐▐▐</span>
      <span>WiFi 🔋</span>
    </div>
  </div>
);

// ─── Scene 1: TikTok — posting a video ───────────────────────────────────────

function TikTokUploadScene({ isActive }) {
  const [phase, setPhase] = useState('idle'); // idle | uploading | processing | done
  const timerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    if (!isActive) {
      setPhase('idle');
      setProgress(0);
      return;
    }

    timerRef.current = setTimeout(() => {
      setPhase('uploading');
      setProgress(0);
      const duration = 2200;
      startRef.current = performance.now();
      const tick = (now) => {
        const t = Math.min((now - startRef.current) / duration, 1);
        setProgress(Math.round(t * 100));
        if (t < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setPhase('processing');
          timerRef.current = setTimeout(() => setPhase('done'), 1200);
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    }, 600);

    return () => {
      clearTimeout(timerRef.current);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isActive]);

  return (
    <div style={{ ...PHONE_STYLE, background: '#000' }}>
      <StatusBar />

      {/* Header */}
      <div style={{ padding: '2px 14px 8px', borderBottom: '1px solid #222', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>Post</span>
        <div style={{ background: '#fe2c55', borderRadius: 4, padding: '3px 10px' }}>
          <span style={{ color: '#fff', fontSize: 9, fontWeight: 700 }}>
            {phase === 'done' ? 'Posted ✓' : 'Post'}
          </span>
        </div>
      </div>

      {/* Video preview thumbnail */}
      <div style={{
        margin: '10px 14px',
        height: 130, borderRadius: 10,
        background: 'linear-gradient(160deg, #1a0533, #7c1fa8, #c2185b)',
        position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* Fake video content */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.3 }}
          className="bg-[repeating-linear-gradient(45deg,transparent,transparent_6px,rgba(255,255,255,0.05)_6px,rgba(255,255,255,0.05)_7px)]" />
        <span style={{ fontSize: 28 }}>🎬</span>

        {/* TikTok logo watermark */}
        <div style={{ position: 'absolute', top: 6, right: 8, fontSize: 9, color: 'rgba(255,255,255,0.7)', fontWeight: 700 }}>TikTok</div>

        {/* Progress overlay */}
        {(phase === 'uploading' || phase === 'processing') && (
          <div style={{
            position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}>
            {phase === 'uploading' ? (
              <>
                <div style={{ color: '#fff', fontSize: 8, fontWeight: 700 }}>Uploading… {progress}%</div>
                <div style={{ width: 80, height: 3, background: '#333', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${progress}%`, background: '#fe2c55', borderRadius: 3, transition: 'width 0.1s linear' }} />
                </div>
              </>
            ) : (
              <div style={{ color: '#fff', fontSize: 8, fontWeight: 700 }}>Processing video…</div>
            )}
          </div>
        )}

        {phase === 'done' && (
          <div style={{
            position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ background: '#22c55e', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>✓</div>
          </div>
        )}
      </div>

      {/* Caption field */}
      <div style={{ padding: '0 14px 8px' }}>
        <div style={{ color: '#555', fontSize: 7, marginBottom: 4 }}>Caption</div>
        <div style={{
          background: '#111', borderRadius: 8, padding: '7px 10px',
          color: '#fff', fontSize: 8, lineHeight: 1.5,
        }}>
          This blew up overnight 🔥 #viral #fyp #beforeandafter #trending
        </div>
      </div>

      {/* Options */}
      {[
        { icon: '🔒', label: 'Who can watch', value: 'Everyone' },
        { icon: '💬', label: 'Allow comments', value: 'On' },
        { icon: '🔗', label: 'Add link in bio', value: 'yoursite.com' },
      ].map(row => (
        <div key={row.label} style={{
          padding: '5px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          borderTop: '1px solid #111',
        }}>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <span style={{ fontSize: 10 }}>{row.icon}</span>
            <span style={{ color: '#888', fontSize: 8 }}>{row.label}</span>
          </div>
          <span style={{ color: '#fe2c55', fontSize: 8, fontWeight: 600 }}>{row.value}</span>
        </div>
      ))}

      {/* Bottom nav */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 44,
        background: '#000', borderTop: '1px solid #222',
        display: 'flex', alignItems: 'center', justifyContent: 'space-around', paddingBottom: 6,
      }}>
        {['🎯', '🔍', null, '💬', '👤'].map((icon, i) =>
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
  );
}

// ─── Scene 2: Instagram Reel ──────────────────────────────────────────────────

function InstagramReelScene({ isActive }) {
  const [likes, setLikes] = useState(1842);
  const [liked, setLiked] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!isActive) {
      setLikes(1842);
      setLiked(false);
      return;
    }
    // Auto-like after a beat
    timerRef.current = setTimeout(() => {
      setLiked(true);
      setLikes(l => l + 1);
      setShowHeart(true);
      timerRef.current = setTimeout(() => setShowHeart(false), 900);
    }, 1800);
    return () => clearTimeout(timerRef.current);
  }, [isActive]);

  const IG_GRADIENT = 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)';

  return (
    <div style={{ ...PHONE_STYLE }}>
      {/* Full-screen video bg */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(160deg, #0d1117 0%, #1a0533 35%, #3d0066 65%, #c2185b 100%)',
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.12 }}
          className="bg-[repeating-linear-gradient(45deg,transparent,transparent_8px,rgba(255,255,255,0.05)_8px,rgba(255,255,255,0.05)_9px)]" />
      </div>

      <StatusBar />

      {/* Instagram top bar */}
      <div style={{
        position: 'absolute', top: 24, left: 0, right: 0,
        padding: '0 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10,
      }}>
        <svg viewBox="0 0 24 24" fill="white" style={{ width: 20, height: 20 }}>
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
        <span style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>Reels</span>
        <span style={{ fontSize: 18, color: '#fff' }}>📷</span>
      </div>

      {/* Double-tap heart */}
      {showHeart && (
        <div style={{
          position: 'absolute', top: '35%', left: '50%', transform: 'translate(-50%,-50%)',
          fontSize: 64, zIndex: 20,
          animation: 'heartPop 0.9s ease-out both',
        }}>❤️</div>
      )}

      {/* Right action buttons */}
      <div style={{
        position: 'absolute', right: 10, bottom: 100,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, zIndex: 10,
      }}>
        {/* Avatar */}
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: IG_GRADIENT, padding: 1.5,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            width: '100%', height: '100%', borderRadius: '50%',
            background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13,
          }}>🎯</div>
        </div>

        {/* Like */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <span style={{ fontSize: 24, filter: liked ? 'none' : 'grayscale(1)' }}>❤️</span>
          <span style={{ color: '#fff', fontSize: 8, fontWeight: 600 }}>{likes.toLocaleString()}</span>
        </div>

        {/* Comment */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <span style={{ fontSize: 22 }}>💬</span>
          <span style={{ color: '#fff', fontSize: 8, fontWeight: 600 }}>284</span>
        </div>

        {/* Share */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <span style={{ fontSize: 20 }}>↗️</span>
          <span style={{ color: '#fff', fontSize: 8, fontWeight: 600 }}>Share</span>
        </div>

        {/* Audio disc */}
        <div style={{
          width: 28, height: 28, borderRadius: '50%',
          background: 'linear-gradient(135deg, #111, #333)',
          border: '2px solid #555',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12,
        }}>🎵</div>
      </div>

      {/* Bottom info */}
      <div style={{
        position: 'absolute', bottom: 52, left: 12, right: 52, zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
          <div style={{
            width: 24, height: 24, borderRadius: '50%',
            background: IG_GRADIENT, padding: 1.5,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>🎯</div>
          </div>
          <span style={{ color: '#fff', fontSize: 9, fontWeight: 700 }}>your_brand</span>
          <div style={{ border: '1px solid #fff', borderRadius: 4, padding: '1px 6px' }}>
            <span style={{ color: '#fff', fontSize: 7, fontWeight: 700 }}>Follow</span>
          </div>
        </div>
        <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: 8, lineHeight: 1.4 }}>
          This blew up overnight 🔥 #viral #fyp #beforeandafter
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 5 }}>
          <span style={{ fontSize: 10 }}>🎵</span>
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 7 }}>Original audio · your_brand</span>
        </div>
      </div>

      {/* Bottom nav */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 48,
        background: 'rgba(0,0,0,0.6)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-around', paddingBottom: 6,
      }}>
        {['🎯', '🔍', '➕', '🎬', '👤'].map((icon, i) => (
          <span key={i} style={{ fontSize: i === 2 ? 22 : 16, color: i === 3 ? '#fff' : 'rgba(255,255,255,0.5)' }}>{icon}</span>
        ))}
      </div>

      <style>{`
        @keyframes heartPop {
          0%   { opacity: 0; transform: translate(-50%,-50%) scale(0.3); }
          40%  { opacity: 1; transform: translate(-50%,-50%) scale(1.2); }
          70%  { transform: translate(-50%,-50%) scale(0.9); }
          100% { opacity: 0; transform: translate(-50%,-50%) scale(1); }
        }
      `}</style>
    </div>
  );
}

// ─── Scene 3: YouTube Short ───────────────────────────────────────────────────

function YouTubeShortScene({ isActive }) {
  const [views, setViews] = useState(24800);
  const [subbed, setSubbed] = useState(false);
  const timerRef = useRef(null);
  const ivRef = useRef(null);

  useEffect(() => {
    if (!isActive) {
      setViews(24800);
      setSubbed(false);
      return;
    }
    ivRef.current = setInterval(() => {
      setViews(v => v + Math.floor(Math.random() * 8) + 3);
    }, 500);
    timerRef.current = setTimeout(() => setSubbed(true), 2200);
    return () => {
      clearInterval(ivRef.current);
      clearTimeout(timerRef.current);
    };
  }, [isActive]);

  const formatViews = (n) => n >= 1000 ? `${(n / 1000).toFixed(1)}K` : n;

  return (
    <div style={{ ...PHONE_STYLE }}>
      {/* Full-screen video bg */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(160deg, #0f0f0f 0%, #1a1a2e 30%, #16213e 60%, #0f3460 100%)',
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.1 }}
          className="bg-[repeating-linear-gradient(45deg,transparent,transparent_8px,rgba(255,255,255,0.05)_8px,rgba(255,255,255,0.05)_9px)]" />
      </div>

      <StatusBar />

      {/* YouTube logo */}
      <div style={{
        position: 'absolute', top: 26, left: 14, zIndex: 10,
        display: 'flex', alignItems: 'center', gap: 4,
      }}>
        <div style={{
          background: '#ff0000', borderRadius: 4, padding: '2px 5px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ color: '#fff', fontSize: 8, fontWeight: 900 }}>▶</span>
        </div>
        <span style={{ color: '#fff', fontSize: 9, fontWeight: 900 }}>Shorts</span>
      </div>

      {/* Swipe arrows */}
      <div style={{ position: 'absolute', top: '50%', right: 10, transform: 'translateY(-50%)', zIndex: 10, display: 'flex', flexDirection: 'column', gap: 30, alignItems: 'center' }}>
        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 18 }}>▲</span>
        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 18 }}>▼</span>
      </div>

      {/* Right actions */}
      <div style={{
        position: 'absolute', right: 10, bottom: 110,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, zIndex: 10,
      }}>
        {/* Avatar */}
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: 'linear-gradient(135deg, #ff0000, #ff6b6b)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
        }}>🎯</div>

        {/* Like */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <span style={{ fontSize: 22 }}>👍</span>
          <span style={{ color: '#fff', fontSize: 8, fontWeight: 600 }}>4.2K</span>
        </div>

        {/* Dislike */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <span style={{ fontSize: 22 }}>👎</span>
          <span style={{ color: '#fff', fontSize: 8 }}>Dislike</span>
        </div>

        {/* Comment */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <span style={{ fontSize: 20 }}>💬</span>
          <span style={{ color: '#fff', fontSize: 8, fontWeight: 600 }}>312</span>
        </div>

        {/* Share */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <span style={{ fontSize: 18 }}>↗️</span>
          <span style={{ color: '#fff', fontSize: 8 }}>Share</span>
        </div>
      </div>

      {/* Bottom info */}
      <div style={{ position: 'absolute', bottom: 52, left: 12, right: 56, zIndex: 10 }}>
        <div style={{ color: '#fff', fontSize: 9, fontWeight: 700, marginBottom: 4 }}>
          We filmed this in one take 🎬 #shorts #viral #fyp
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{
              width: 22, height: 22, borderRadius: '50%',
              background: 'linear-gradient(135deg, #ff0000, #ff6b6b)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10,
            }}>🎯</div>
            <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 8, fontWeight: 600 }}>your_brand</span>
          </div>
          <button
            style={{
              background: subbed ? '#333' : '#ff0000',
              color: '#fff', border: 'none', borderRadius: 4,
              padding: '3px 8px', fontSize: 7, fontWeight: 700, cursor: 'default',
              transition: 'background 0.3s',
            }}
          >
            {subbed ? 'Subscribed ✓' : 'Subscribe'}
          </button>
        </div>
        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 7, marginTop: 4 }}>
          👁 {formatViews(views)} views · Just posted
        </div>
      </div>

      {/* Progress bar */}
      <div style={{
        position: 'absolute', bottom: 48, left: 0, right: 0, height: 2, background: '#333', zIndex: 10,
      }}>
        <div style={{
          height: '100%', width: isActive ? '60%' : '0%',
          background: '#ff0000',
          transition: isActive ? 'width 8s linear' : 'none',
        }} />
      </div>

      {/* Bottom nav */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 44,
        background: 'rgba(0,0,0,0.8)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-around', paddingBottom: 6,
      }}>
        {['🎯', '🔍', '➕', '▶️', '👤'].map((icon, i) => (
          <span key={i} style={{ fontSize: i === 2 ? 20 : 15, color: i === 3 ? '#ff0000' : 'rgba(255,255,255,0.5)' }}>{icon}</span>
        ))}
      </div>
    </div>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────

export default function OnePlatformExample({ isActive = true }) {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <PhoneCarousel holdMs={4000} transMs={700}>
        <TikTokUploadScene isActive={isActive} />
        <InstagramReelScene isActive={isActive} />
        <YouTubeShortScene isActive={isActive} />
      </PhoneCarousel>
    </div>
  );
}
