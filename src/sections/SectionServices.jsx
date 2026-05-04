import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ── Card icon components (blue stroke) ──────────── */


export const CARDS = [
  { 
    id: 'uk-create',            
    title: ['UK', 'Create'],            
    iconTop: '/images/icons/scissors.png',
    iconBottom: '/images/icons/magic-wand.png' 
  },
  { 
    id: 'us-creative-services', 
    title: ['US Creative', 'Services'], 
    iconTop: '/images/icons/globe.png',
    iconBottom: '/images/icons/group.png'    
  },
  { 
    id: 'us-advisory-creative', 
    title: ['US Advisory', 'Creative'], 
    iconTop: '/images/icons/chart.png',
    iconBottom: '/images/icons/write.png'    
  },
  { 
    id: 'uk-learning-design',   
    title: ['UK Learning', 'Design'],   
    iconTop: '/images/icons/star.png',
    iconBottom: '/images/icons/create.png'     
  },
];

export const SectionServices = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  return (
    <section
      ref={sectionRef}
      style={{
        width: '100%',
        background: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 0', // Reduced padding
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="services-grid-responsive">
          {CARDS.map((card, i) => {
            return (
              <Link
                key={i}
                to={`/service/${card.id}`}
                ref={el => (cardRefs.current[i] = el)}
                style={{
                  width: '100%',
                  maxWidth: '350px',
                  height: 'clamp(450px, 55vh, 600px)', // Increased height
                  backgroundColor: '#00B8F5',
                  borderRadius: '0',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: 24,
                  position: 'relative',
                  justifySelf: 'center',
                  willChange: 'transform, opacity',
                  boxShadow: '0 10px 30px rgba(0, 184, 245, 0.15)',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 15px 40px rgba(0, 184, 245, 0.25)',
                  }
                }}
                className="hover:scale-[1.02] transition-transform duration-300"
              >
              {/* Top-left icon */}
              <div style={{ opacity: 0.8 }}>
                <img src={card.iconTop} alt={`${card.id}-top`} style={{ width: '28px', height: '28px' }} />
              </div>

              {/* Center text */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}
              >
                <h2
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                    fontWeight: 700,
                    textAlign: 'center',
                    lineHeight: 1.1,
                    color: '#FFFFFF', 
                    textTransform: 'none',
                  }}
                >
                  {card.title.map((line, j) => (
                    <span key={j} style={{ display: 'block', color: '#FFFFFF' }}>{line}</span>
                  ))}
                </h2>
              </div>

              {/* Bottom-right icon */}
              <div style={{ alignSelf: 'flex-end', opacity: 0.8 }}>
                <img src={card.iconBottom} alt={`${card.id}-bottom`} style={{ width: '28px', height: '28px' }} />
              </div>
            </Link>
          );
        })}
        </div>
      </div>
    </section>
  );
};
