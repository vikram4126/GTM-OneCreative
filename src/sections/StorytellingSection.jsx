import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function StorytellingSection() {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  const CARD_W = isMobile ? 65 : isTablet ? 110 : 160;
  const CARD_H = isMobile ? 95 : isTablet ? 150 : 220;
  const CARD_GAP = isMobile ? 12 : isTablet ? 20 : 32;

  const BIG_W = isMobile ? 220 : isTablet ? 260 : 320;
  const BIG_H = isMobile ? 280 : isTablet ? 340 : 420;

  const SCALE_X = BIG_W / CARD_W;
  const SCALE_Y = BIG_H / CARD_H;

  const CARD_OFFSETS = [
    -(1.5 * CARD_W + 1.5 * CARD_GAP),
    -(0.5 * CARD_W + 0.5 * CARD_GAP),
    +(0.5 * CARD_W + 0.5 * CARD_GAP),
    +(1.5 * CARD_W + 1.5 * CARD_GAP),
  ];
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const card0 = useRef(null);
  const card1 = useRef(null);
  const card2 = useRef(null);
  const card3 = useRef(null);
  const headingRef = useRef(null);
  const contentRef = useRef(null);
  const hasPlayed = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = [card0.current, card1.current, card2.current, card3.current];

    // ── Initial hidden states ──────────────────────────────────────
    gsap.set(lineRef.current, { scaleX: 0, opacity: 0, transformOrigin: 'center center' });
    gsap.set(cards, { scaleY: 0, opacity: 0, transformOrigin: 'center center', x: 0 });
    
    // Determine initial offset based on mobile vs desktop
    const initXHeading = isMobile ? 0 : -60;
    const initYHeading = isMobile ? 40 : 0;
    const initXContent = isMobile ? 0 : 60;
    const initYContent = isMobile ? -40 : 0;
    
    gsap.set(headingRef.current, { opacity: 0, x: initXHeading, y: initYHeading });
    gsap.set(contentRef.current, { opacity: 0, x: initXContent, y: initYContent });

    const playAnimation = () => {
      if (hasPlayed.current) return;
      hasPlayed.current = true;

      const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' }, delay: 0.6 });

      // STEP 1 — Line expands ────────────────────────────────────────
      tl.to(lineRef.current, { opacity: 1, scaleX: 1, duration: 0.7, ease: 'power2.out' });

      // STEP 2 — Line morphs to 4 cards ─────────────────────────────
      tl.to(lineRef.current, { opacity: 0, scaleY: 0, duration: 0.35 }, '+=0.1');
      tl.to(cards, {
        opacity: 1, scaleY: 1, duration: 0.55, stagger: 0.08, ease: 'back.out(1.4)',
      }, '<0.1');

      // STEP 3 — Cards converge to center ───────────────────────────
      tl.to(card0.current, { x: -CARD_OFFSETS[0], duration: 0.9 }, '+=0.3');
      tl.to(card1.current, { x: -CARD_OFFSETS[1], duration: 0.9 }, '<');
      tl.to(card2.current, { x: -CARD_OFFSETS[2], duration: 0.9 }, '<');
      tl.to(card3.current, { x: -CARD_OFFSETS[3], duration: 0.9 }, '<');

      // Fade out 3 losing cards
      tl.to([card0.current, card1.current, card3.current], { opacity: 0, duration: 0.3 }, '-=0.2');

      // STEP 4 — Survivor scales to big box ─────────────────────────
      tl.to(card2.current, {
        scaleX: SCALE_X,
        scaleY: SCALE_Y,
        backgroundColor: '#aceaff',
        borderColor: '#00b8f5',
        borderWidth: '0px',
        boxShadow: '0 32px 80px rgba(0, 184, 245, 0.35), 0 8px 24px rgba(0, 51, 141, 0.15)',
        duration: 0.85,
        ease: 'expo.inOut',
      }, '+=0.05');

      // STEP 5 — Slide inward to 0,0
      tl.to(headingRef.current, { opacity: 1, x: 0, y: 0, duration: 0.9, ease: 'power3.out' }, '+=0.1');
      tl.to(contentRef.current, { opacity: 1, x: 0, y: 0, duration: 0.9, ease: 'power3.out' }, '<');
    };

    // Play once when section is 35% visible
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) playAnimation(); },
      { threshold: 0.35 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="storytelling"
      style={{
        minHeight: '100vh',
        width: '100%',
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/*
        Full-width stage — all three layers (heading, cards, content)
        are absolutely positioned relative to this container.
        Height = BIG_H so the vertical centre aligns perfectly.
      */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1200px',
          height: `${BIG_H}px`,
          margin: '0 auto',
        }}
      >

        {/* ── STEP 1: Line ─────────────────────────────────────────── */}
        <div
          ref={lineRef}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: `${4 * CARD_W + 3 * CARD_GAP}px`, // 736px
            height: '2px',
            background: '#1E49E2',
            transformOrigin: 'center center',
          }}
        />

        {/* ── STEP 2–4: Cards row ──────────────────────────────────── */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            gap: `${CARD_GAP}px`,
            alignItems: 'center',
          }}
        >
          {[card0, card1, card2, card3].map((ref, i) => (
            <div
              key={i}
              ref={ref}
              style={{
                width: `${CARD_W}px`,
                height: `${CARD_H}px`,
                border: '2px solid #1E49E2',
                background: '#fff',
                transformOrigin: 'center center',
                flexShrink: 0,
              }}
            />
          ))}
        </div>

        {/* ── STEP 5: Heading ── */}
        <div
          style={isMobile ? {
            position: 'absolute',
            bottom: `calc(50% + ${BIG_H / 2 + 30}px)`,
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            width: '90%',
            zIndex: 2,
            pointerEvents: 'none'
          } : {
            position: 'absolute',
            top: '50%',
            right: `calc(50% + ${BIG_W / 2 - 80}px)`,
            transform: 'translateY(-50%)',
            textAlign: 'left',
            width: 'clamp(180px, 26vw, 400px)',
            paddingRight: '20px',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        >
          <div ref={headingRef}>
            <h2
              className="section-heading"
              style={{
                fontWeight: 900,
                color: '#00338d',
                margin: 0,
                textTransform: 'none'
              }}
            >
              Creativity{isMobile ? ' ' : <br />}that powers{isMobile ? ' ' : <br />}business
            </h2>
          </div>
        </div>

        {/* ── STEP 5: Content ── */}
        <div
          style={isMobile ? {
            position: 'absolute',
            top: `calc(50% + ${BIG_H / 2 + 30}px)`,
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            width: '90%',
            zIndex: 2,
            pointerEvents: 'none'
          } : {
            position: 'absolute',
            top: '50%',
            left: `calc(50% + ${BIG_W / 2 - 40}px)`,
            transform: 'translateY(-50%)',
            textAlign: 'left',
            width: 'clamp(160px, 20vw, 400px)',
            paddingLeft: '24px',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        >
          <div ref={contentRef}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(1rem, 1.5vw, 2rem)',
                lineHeight: 1.7,
                color: '#00338d',
                fontWeight: 600,
                margin: 0,
              }}
            >
              OneCreative is an in-house creative agency delivering creative,
              digital, and learning design solutions that help businesses
              communicate effectively.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
