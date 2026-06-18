import React, { useState, useRef, useEffect } from 'react';

export const SectionVideoIntro = ({ onComplete }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const handleMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    const handleMouseEnter = () => setShowTooltip(true);
    const handleMouseLeave = () => setShowTooltip(false);
    section.addEventListener('mousemove', handleMouseMove);
    section.addEventListener('mouseenter', handleMouseEnter);
    section.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
      section.removeEventListener('mouseenter', handleMouseEnter);
      section.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="h-screen w-full relative overflow-hidden bg-[#0C233C]"
      onClick={toggleMute}
      style={{ cursor: 'none' }}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="feature-video.mp4"
        autoPlay
        muted
        playsInline
        onEnded={onComplete}
      />

      {/* Custom cursor + floating tooltip — follows mouse when muted */}
      {isMuted && showTooltip && (
        <div
          style={{
            position: 'absolute',
            left: mousePos.x,
            top: mousePos.y,
            zIndex: 50,
            pointerEvents: 'none',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {/* Cursor dot */}
          <div style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: '#fff',
            flexShrink: 0,
            boxShadow: '0 0 8px rgba(255,255,255,0.6)',
          }} />
          {/* Tooltip text */}
          <div style={{
            color: '#fff',
            fontSize: '0.6rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-body)',
            textAlign: 'center',
            lineHeight: '1.3',
            animation: 'tooltipFadeIn 0.2s ease',
            textShadow: '0 2px 4px rgba(0,0,0,0.6)',
          }}>
            Unmute for<br />better experience
          </div>
        </div>
      )}

      {/* Custom cursor dot when unmuted */}
      {!isMuted && showTooltip && (
        <div style={{
          position: 'absolute',
          left: mousePos.x,
          top: mousePos.y,
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.7)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 50,
          transition: 'transform 0.1s ease',
        }} />
      )}

      {/* Mute toggle button — bottom left */}
      <button
        onClick={(e) => { e.stopPropagation(); toggleMute(); }}
        title={isMuted ? 'Unmute' : 'Mute'}
        className="absolute bottom-8 left-8 z-10 flex items-center gap-2 text-white/50 hover:text-white transition-colors lowercase tracking-widest text-sm"
      >
        {isMuted ? (
          /* Muted icon */
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <line x1="23" y1="9" x2="17" y2="15"/>
            <line x1="17" y1="9" x2="23" y2="15"/>
          </svg>
        ) : (
          /* Unmuted icon */
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
          </svg>
        )}
        {isMuted ? 'unmute' : 'mute'}
      </button>

      {/* Skip button */}
      <button
        onClick={(e) => { e.stopPropagation(); onComplete(); }}
        className="absolute bottom-8 right-8 z-10 text-white/50 hover:text-white transition-colors lowercase tracking-widest text-sm"
      >
        skip intro
      </button>

      <style>{`
        @keyframes pulseHint {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1; }
        }
      `}</style>
    </section>
  );
};
