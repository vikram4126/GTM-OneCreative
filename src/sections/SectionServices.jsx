import React, { useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const CARDS = [
  {
    id: 'uk-create',
    title: ['UK', 'Create'],
    icon: 'images/icons/create.png'
  },
  {
    id: 'uk-learning-design',
    title: ['UK Learning', 'Design'],
    icon: 'images/icons/star.png'
  },
  {
    id: 'us-advisory-creative',
    title: ['US Advisory', 'Creative'],
    icon: 'images/icons/globe.png'
  },
  {
    id: 'us-creative-services',
    title: ['US Creative', 'Services'],
    icon: 'images/icons/write.png'
  },
];

export const SectionServices = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const contentRefs = useRef([]);
  const tlRef = useRef(null);
  const playedRef = useRef(false);
  const location = useLocation();

  useEffect(() => {
    if (!cardRefs.current.length) return;

    const ctx = gsap.context(() => {
      // 1. Pre-calculate the exact offsets to the section's absolute center
      const container = sectionRef.current;
      const containerRect = container.getBoundingClientRect();
      const containerCenterX = containerRect.width / 2;
      const containerCenterY = containerRect.height / 2;

      const offsets = cardRefs.current.map(card => {
        const cardRect = card.getBoundingClientRect();
        const cardCenterX = (cardRect.left - containerRect.left) + cardRect.width / 2;
        const cardCenterY = (cardRect.top - containerRect.top) + cardRect.height / 2;
        return {
          x: containerCenterX - cardCenterX,
          y: containerCenterY - cardCenterY
        };
      });

      // 2. Create the timeline (paused)
      const tl = gsap.timeline({
        paused: true,
        onStart: () => {
          console.log('Services Animation Sequence Started');
          playedRef.current = true;
        },
        onComplete: () => {
          // Enable transform transition for hover effects only AFTER entrance animation completes
          cardRefs.current.forEach(card => {
            if (card) {
              card.style.transition = 'background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease, transform 0.3s ease';
            }
          });
        }
      });
      tlRef.current = tl;

      // --- STEP 1: Initial State ---
      gsap.set(cardRefs.current, {
        opacity: 0,
        x: (i) => offsets[i].x,
        y: -600,
        scale: 1,
        transformOrigin: "center center"
      });

      gsap.set(contentRefs.current, { opacity: 0 });

      // --- STEP 2: Vertical Drop to Center ---
      tl.to(cardRefs.current, {
        y: (i) => offsets[i].y,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        stagger: 0.1
      });

      // --- STEP 3: Horizontal Spread ---
      tl.to(cardRefs.current, {
        x: 0,
        y: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.05
      }, "+=0.1");

      tl.to(contentRefs.current, {
        opacity: 1,
        duration: 0.6,
        ease: "none",
        stagger: 0.05
      }, "-=0.4");

      // 3. Fallback ScrollTrigger
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => {
          if (!playedRef.current && tlRef.current) {
            console.log('ScrollTrigger detected entry - Playing animation');
            tlRef.current.play();
          }
        }
      });

    }, sectionRef);

    // 4. Primary IntersectionObserver (Ultra Reliable)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && tlRef.current && !playedRef.current) {
          console.log('IntersectionObserver detected entry - Playing animation');
          tlRef.current.play();
        }
      });
    }, { threshold: 0.1 });

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      ctx.revert();
      observer.disconnect();
    };
  }, []);

  // Manual trigger on location change (menu click)
  useEffect(() => {
    console.log('Route/Hash changed to:', location.hash);
    const isServicesHash = location.hash === '#services';
    if (isServicesHash && tlRef.current && !playedRef.current) {
      console.log('Hash matches #services - Attempting manual play');

      // Try playing at different intervals to catch layout stabilization
      const playTimeline = () => {
        if (tlRef.current && !playedRef.current) {
          console.log('Executing manual play attempt');
          tlRef.current.play();
        }
      };

      setTimeout(playTimeline, 100);
      setTimeout(playTimeline, 500);
      setTimeout(playTimeline, 1000);
    }
    ScrollTrigger.refresh();
  }, [location]);

  return (
    <section
      id="services"
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
                  borderRadius: '0',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  padding: 24,
                  position: 'relative',
                  justifySelf: 'center',
                  willChange: 'transform, opacity',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  // CSS transition explicitly avoids transform and opacity to prevent fighting GSAP during initial load
                  transition: 'background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease',
                }}
                className="group bg-white border border-[#00B8F5]/30 hover:bg-[#00B8F5] hover:scale-[1.02] shadow-[0_10px_30px_rgba(0,184,245,0.05)] hover:shadow-[0_15px_40px_rgba(0,184,245,0.25)]"
              >
                {/* Content Wrapper for independent reveal */}
                <div
                  ref={el => (contentRefs.current[i] = el)}
                  className="flex flex-col items-center justify-center w-full h-full gap-8"
                >
                  {/* Main icon */}
                  <div className="flex-1 flex items-end justify-center pb-4">
                    <img 
                      src={card.icon} 
                      alt={`${card.id}-icon`} 
                      className="w-24 h-24 object-contain transition-all duration-500 group-hover:brightness-0 group-hover:invert group-hover:scale-110" 
                    />
                  </div>

                  {/* Center text */}
                  <div className="flex-1 flex items-start justify-center pt-4">
                    <h2
                      className="section-heading half text-[#00508F] group-hover:text-white transition-colors duration-500"
                      style={{
                        textAlign: 'center',
                        textTransform: 'none',
                        margin: 0
                      }}
                    >
                      {card.title.map((line, j) => (
                        <span key={j} className="block text-[#00508F] group-hover:text-white transition-colors duration-500">{line}</span>
                      ))}
                    </h2>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

