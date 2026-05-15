import { useEffect, useRef, useState } from 'react';

// Conversation: them = incoming (left), me = outgoing (right)
const CONVERSATION = [
  { side: 'them', text: 'Hey! Saw your reel — do you guys do roof replacements in NJ? 👀' },
  { side: 'me',   text: 'Yes we do! Where in NJ are you located?' },
  { side: 'them', text: 'Bergen County. We need a full replacement, maybe gutters too' },
  { side: 'me',   text: 'Perfect, we cover Bergen. Can send a free quote this week 🙌' },
  { side: 'them', text: 'That would be amazing. How soon can you come out?' },
  { side: 'me',   text: 'We have Thursday open — does that work?' },
  { side: 'them', text: 'Thursday is perfect! What info do you need from me?' },
];

const IG_GRADIENT = 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)';

export default function InstagramDMExample({ isActive = true }) {
  const [visibleCount, setVisibleCount] = useState(1);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);
  const timerRef  = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    const addNext = (index) => {
      if (index >= CONVERSATION.length) {
        // loop: reset after pause
        timerRef.current = setTimeout(() => {
          setVisibleCount(1);
          timerRef.current = setTimeout(() => addNext(1), 1400);
        }, 2000);
        return;
      }
      setTyping(true);
      timerRef.current = setTimeout(() => {
        setTyping(false);
        setVisibleCount(index + 1);
        timerRef.current = setTimeout(() => addNext(index + 1), 1400);
      }, 800);
    };

    timerRef.current = setTimeout(() => addNext(1), 1400);
    return () => clearTimeout(timerRef.current);
  }, [isActive]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [visibleCount, typing]);

  const shown = CONVERSATION.slice(0, visibleCount);
  const nextSide = CONVERSATION[visibleCount]?.side ?? 'them';

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
        <div className="flex justify-between items-center px-4 pt-3 pb-1"
          style={{ fontSize: 8, color: '#fff', background: '#000' }}>
          <span>9:41</span>
          <div className="flex gap-1 items-center">
            <span style={{ letterSpacing: -1 }}>▐▐▐</span>
            <span>WiFi 🔋</span>
          </div>
        </div>

        {/* Header: single convo */}
        <div style={{
          background: '#000', borderBottom: '1px solid #1a1a1a',
          padding: '4px 10px 6px',
          display: 'flex', alignItems: 'center', gap: 7,
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"
            style={{ width: 12, height: 12, flexShrink: 0 }}>
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          {/* Avatar */}
          <div style={{
            width: 26, height: 26, borderRadius: '50%',
            background: IG_GRADIENT, padding: 1.5, flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              width: '100%', height: '100%', borderRadius: '50%',
              background: '#3E2A1A', border: '1.5px solid #000',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11,
            }}>🔨</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ color: '#fff', fontSize: 9, fontWeight: 700 }}>mike_builds</div>
            <div style={{ color: '#888', fontSize: 7 }}>Active now</div>
          </div>
          {/* call / video icons */}
          <span style={{ fontSize: 13, color: '#fff' }}>📞</span>
          <span style={{ fontSize: 13, color: '#fff' }}>📹</span>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          style={{
            overflowY: 'scroll', height: 'calc(100% - 106px)',
            background: '#000', scrollbarWidth: 'none',
            padding: '8px 8px 4px',
            display: 'flex', flexDirection: 'column', gap: 5,
          }}
          className="[&::-webkit-scrollbar]:hidden"
        >
          {shown.map((msg, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: msg.side === 'me' ? 'flex-end' : 'flex-start',
              animation: 'igSlideIn 0.25s ease-out both',
            }}>
              {msg.side === 'them' && (
                <div style={{
                  width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                  background: '#3E2A1A', border: '1px solid #333', marginRight: 5, alignSelf: 'flex-end',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9,
                }}>🔨</div>
              )}
              <div style={{
                maxWidth: '72%',
                background: msg.side === 'me'
                  ? 'linear-gradient(135deg, #405de6, #833ab4, #c13584)'
                  : '#262626',
                borderRadius: msg.side === 'me'
                  ? '18px 18px 4px 18px'
                  : '18px 18px 18px 4px',
                padding: '6px 9px',
                color: '#fff', fontSize: 8, lineHeight: 1.4,
              }}>
                {msg.text}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {typing && (
            <div style={{ display: 'flex', justifyContent: nextSide === 'me' ? 'flex-end' : 'flex-start' }}>
              {nextSide === 'them' && (
                <div style={{
                  width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                  background: '#3E2A1A', marginRight: 5, alignSelf: 'flex-end',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9,
                }}>🔨</div>
              )}
              <div style={{
                background: nextSide === 'me'
                  ? 'linear-gradient(135deg, #405de6, #833ab4)'
                  : '#262626',
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

        {/* Input bar */}
        <div style={{
          position: 'absolute', bottom: 34, left: 0, right: 0,
          background: '#000', borderTop: '1px solid #1a1a1a',
          padding: '5px 8px',
          display: 'flex', alignItems: 'center', gap: 5,
        }}>
          <span style={{ fontSize: 12 }}>😊</span>
          <div style={{
            flex: 1, border: '1px solid #333', borderRadius: 16,
            padding: '3px 8px', color: '#555', fontSize: 7,
          }}>Message...</div>
          <span style={{ fontSize: 11 }}>🎤</span>
          <span style={{ fontSize: 11 }}>📷</span>
        </div>

        {/* Bottom nav */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 34,
          background: '#000', borderTop: '1px solid #1a1a1a',
          display: 'flex', alignItems: 'center', justifyContent: 'space-around',
          paddingBottom: 4,
        }}>
          {['🏠', '🔍', '➕', '🎬', '👤'].map((icon, i) => (
            <span key={i} style={{ fontSize: i === 2 ? 16 : 13, color: i === 4 ? '#fff' : '#555' }}>
              {icon}
            </span>
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
