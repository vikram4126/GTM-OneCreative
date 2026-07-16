import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import scrollData from '../data/scroll_pillars.json';

gsap.registerPlugin(ScrollTrigger);

export const SectionScrollPillars = () => {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const rightItems = gsap.utils.toArray('.sp-right-item');

      // First right item visible, rest hidden below
      gsap.set(rightItems[0], { autoAlpha: 1, yPercent: -50, y: 0 });
      gsap.set(rightItems.slice(1), { autoAlpha: 0, yPercent: -50, y: 24 });

      // ── Build the Timeline ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          pin: false,
          onUpdate: (self) => {
            // progress is 0 to 1. We have 4 steps.
            const idx = Math.min(Math.floor(self.progress * 4), 3);
            if (idx !== activeRef.current) {
              activeRef.current = idx;
              setActiveIndex(idx);
            }
          },
        },
      });

      // Helper function to animate transition between categories (Right cards ONLY)
      const transition = (from, to) => {
        // Fade out previous right content, fade in next
        tl.to(rightItems[from], { autoAlpha: 0, y: -24, duration: 0.4, ease: 'power2.in'  }, `step${to}`)
          .to(rightItems[to],   { autoAlpha: 1, y:   0, duration: 0.5, ease: 'power2.out' }, `step${to}+=0.1`);
      };

      // 0 - 25% : Design (hold)
      tl.to({}, { duration: 1 });
      // 25%     : Design -> Digital
      transition(0, 1);
      // 25-50%  : Digital (hold)
      tl.to({}, { duration: 1 });
      // 50%     : Digital -> Development
      transition(1, 2);
      // 50-75%  : Development (hold)
      tl.to({}, { duration: 1 });
      // 75%     : Development -> Learning
      transition(2, 3);
      // 75-100% : Learning (hold)
      tl.to({}, { duration: 1 });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="scroll-pillars"
      style={{
        position: 'relative',
        width: '100%',
        height: '400vh',
        overflow: 'visible',
        backgroundColor: '#00B8F5',
      }}
    >
      {/* ── STICKY PANEL ── */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          backgroundImage: 'url(images/pillars-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          /* Removed alignItems: 'center' to allow child to stretch to full 100vh */
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(0,184,245,0.88) 0%, rgba(0,184,245,0.25) 100%)',
            zIndex: 1,
          }}
        />

        <div className="container mx-auto px-6 relative z-10 w-full h-full flex" style={{ maxWidth: '1200px' }}>
          <div className="flex flex-col md:flex-row items-center justify-between w-full h-full">

            {/* LEFT: Navigation with Active Class Management */}
            <div className="w-full md:w-5/12 h-full flex flex-col justify-center" style={{ gap: '2rem' }}>
              {scrollData.map((item, i) => {
                const isActive = activeIndex === i;
                return (
                  <div 
                    key={item.id} 
                    className={`sp-left-item ${isActive ? 'active' : ''}`}
                    style={{
                      transformOrigin: 'left center',
                      transform: isActive 
                        ? 'scale(1.05) translate(16px, 0px)' 
                        : 'scale(0.92) translate(0, 10px)',
                      opacity: isActive ? 1 : 0.25,
                      filter: isActive ? 'blur(0px)' : 'blur(4px)',
                      transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.6s ease, filter 0.6s ease',
                      willChange: 'transform, opacity, filter'
                    }}
                  >
                    <h2
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(2.8rem, 4.5vw, 5rem)',
                        fontWeight: 900,
                        margin: 0,
                        lineHeight: 1.1,
                        color: '#fff',
                      }}
                    >
                      {item.title}
                    </h2>
                    
                    {/* Expandable Description (p tag) */}
                    <div
                      style={{
                        maxHeight: isActive ? '120px' : '0px',
                        opacity: isActive ? 1 : 0,
                        overflow: 'hidden',
                        transition: 'max-height 0.5s ease, opacity 0.5s ease, margin-top 0.5s ease',
                        marginTop: isActive ? '12px' : '0px',
                      }}
                    >
                      <p
                        style={{
                          margin: 0,
                          fontSize: '1.1rem',
                          color: 'rgba(255, 255, 255, 0.85)',
                          lineHeight: 1.5,
                          fontFamily: 'var(--font-body)',
                        }}
                      >
                        {item.leftDesc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT: Content Cards */}
            <div className="w-full md:w-6/12 h-full flex items-center justify-end">
              <div style={{ width: '100%', maxWidth: '480px', position: 'relative', height: '100%' }}>
                {scrollData.map((item) => (
                  <div
                    key={item.id}
                    className="sp-right-item"
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: 0,
                      width: '100%',
                      willChange: 'transform, opacity',
                      visibility: 'hidden', // GSAP will manage visibility
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        border: '1px solid rgba(255,255,255,0.25)',
                        padding: '2.5rem',
                        backgroundColor: 'rgba(255,255,255,0.06)',
                        backdropFilter: 'blur(12px)',
                        boxShadow: '0 24px 48px rgba(0,0,0,0.2)',
                      }}
                    >
                      <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.65, marginBottom: '1.75rem', fontFamily: 'var(--font-body)' }}>
                        {item.intro}
                      </p>
                      <div style={{ marginBottom: '1.5rem' }}>
                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                          Services
                        </p>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                          {item.services.map((srv, idx) => (
                            <li key={idx} style={{ color: '#fff', fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.4rem', fontFamily: 'var(--font-heading)' }}>
                              {srv}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div style={{ height: '1px', background: 'rgba(255,255,255,0.18)', marginBottom: '1.5rem' }} />
                      <div>
                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                          Highlights
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.25rem' }}>
                          <span style={{ fontSize: '3.25rem', fontWeight: 900, color: '#fff', lineHeight: 1, marginRight: '0.75rem' }}>{item.mainHighlight.number}</span>
                          <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', lineHeight: 1.3, whiteSpace: 'pre-line', fontWeight: 600 }}>{item.mainHighlight.label}</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.75rem' }}>
                          {item.subHighlights.map((sub, idx) => (
                            <div key={idx} style={{ border: '1px solid rgba(255,255,255,0.18)', padding: '1rem 0.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', backgroundColor: 'rgba(255,255,255,0.04)' }}>
                              <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginBottom: '0.2rem' }}>{sub.number}</span>
                              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.3, whiteSpace: 'pre-line' }}>{sub.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

