import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * StorytellingSection
 * ─────────────────────────────────────────────────────
 * STEP 1  Line expands from center (scaleX)
 * STEP 2  Line morphs into 4 cards (scaleY grow)
 * STEP 3  Cards slide to center and merge (3 fade out)
 * STEP 4  Survivor card scales to 320×420 big box
 * STEP 5  Heading slides in from far-left → touches left edge of box
 *          Content slides in from far-right → touches right edge of box
 * ─────────────────────────────────────────────────────
 */

const CARD_W   = 160;
const CARD_H   = 220;
const CARD_GAP = 32; // gap-8 = 2rem

// Center offset of each card from the flex-row midpoint
const CARD_OFFSETS = [
  -(1.5 * CARD_W + 1.5 * CARD_GAP), // –288  card 0
  -(0.5 * CARD_W + 0.5 * CARD_GAP), // –96   card 1
  +(0.5 * CARD_W + 0.5 * CARD_GAP), // +96   card 2  ← survivor
  +(1.5 * CARD_W + 1.5 * CARD_GAP), // +288  card 3
];

const BIG_W   = 320;
const BIG_H   = 420;
const SCALE_X = BIG_W / CARD_W; // 2
const SCALE_Y = BIG_H / CARD_H; // ≈ 1.909

export default function StorytellingSection() {
  const sectionRef = useRef(null);
  const lineRef    = useRef(null);
  const card0      = useRef(null);
  const card1      = useRef(null);
  const card2      = useRef(null);
  const card3      = useRef(null);
  const headingRef = useRef(null);
  const contentRef = useRef(null);
  const hasPlayed  = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = [card0.current, card1.current, card2.current, card3.current];

    // ── Initial hidden states ──────────────────────────────────────
    gsap.set(lineRef.current, { scaleX: 0, opacity: 0, transformOrigin: 'center center' });
    gsap.set(cards, { scaleY: 0, opacity: 0, transformOrigin: 'center center', x: 0 });
    // Heading starts 60px to the LEFT, content 60px to the RIGHT (subtle slide)
    gsap.set(headingRef.current, { opacity: 0, x: -60 });
    gsap.set(contentRef.current, { opacity: 0, x:  60 });

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
        borderWidth: '1px',
        boxShadow: '0 32px 80px rgba(0, 184, 245, 0.35), 0 8px 24px rgba(0, 51, 141, 0.15)',
        duration: 0.85,
        ease: 'expo.inOut',
      }, '+=0.05');

      // STEP 5 — Slide inward to x:0 (their natural CSS-positioned location)
      //  • Heading: right edge is at (50% - BIG_W/2) of the stage → touches box left edge
      //  • Content: left edge is at (50% + BIG_W/2) of the stage → touches box right edge
      tl.to(headingRef.current, { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' }, '+=0.1');
      tl.to(contentRef.current, { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' }, '<');
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

        {/*
          ── STEP 5: Heading ──────────────────────────────────────────
          Overlap box left edge by 20px:
            box left edge = 50% − 160px from stage left
            heading right edge = 50% − 160px + 20px = 50% − 140px from stage left
            ∴ right: calc(50% + 140px)
        */}
        <div
          ref={headingRef}
          style={{
            position: 'absolute',
            top: '50%',
            right: `calc(50% + ${BIG_W / 2 - 40}px)`,
            transform: 'translateY(-50%)',
            textAlign: 'right',
            width: 'clamp(180px, 26vw, 340px)',
            paddingRight: '24px',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.8rem, 3.2vw, 3rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              color: '#00338d',
              margin: 0,
            }}
          >
            Creativity<br />that powers<br />business
          </h2>
        </div>

        {/*
          ── STEP 5: Content ──────────────────────────────────────────
          Overlap box right edge by 20px:
            box right edge = 50% + 160px from stage left
            content left edge = 50% + 160px − 20px = 50% + 140px
            ∴ left: calc(50% + 140px)
        */}
        <div
          ref={contentRef}
          style={{
            position: 'absolute',
            top: '50%',
            left: `calc(50% + ${BIG_W / 2 - 40}px)`,
            transform: 'translateY(-50%)',
            textAlign: 'left',
            width: 'clamp(160px, 20vw, 260px)',
            paddingLeft: '24px',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
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
    </section>
  );
}
