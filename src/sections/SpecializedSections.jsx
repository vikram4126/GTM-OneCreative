import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

import PillarPopup from '../components/PillarPopup';
import pillarsData from '../data/pillars.json';
import inspirationData from '../data/inspiration.json';

/* ── All asset images ─────────────────────────────────────── */
const pillarsBg = 'images/pillars-bg.jpg';

/* ─── Responsive clickable dot pagination ── */
const SidebarDots = ({ total, active, swiperRef }) => (
  <div 
    className="absolute z-50 flex gap-3 
               bottom-8 left-1/2 -translate-x-1/2 flex-row
               md:bottom-auto md:left-auto md:translate-x-0
               md:right-[30px] md:top-1/2 md:-translate-y-1/2 md:flex-col"
  >
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        onClick={() => swiperRef.current?.slideTo(i)}
        style={{
          width: 18,
          height: 18,
          borderRadius: 0,
          border: '2px solid rgba(255,255,255,0.6)',
          backgroundColor: i === active ? 'rgba(255,255,255,0.9)' : 'transparent',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: i === active ? '0 0 10px rgba(255,255,255,0.3)' : 'none'
        }}
      />
    ))}
  </div>
);

/* ═══════════════════════════════════════════════════════════
   SECTION 1 — Design Strategy  (5 slides)
   Now with pillars-bg.jpg background + Capabilities Overview popup
═══════════════════════════════════════════════════════════ */
export const SectionDesignStrategy = ({ customData, customBgColor }) => {
  const [active, setActive] = useState(0);
  const swiperRef = useRef(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupData, setPopupData] = useState(null);

  const dataToUse = customData || pillarsData;

  const handleOpenPopup = (slideIndex) => {
    setPopupData(dataToUse[slideIndex]);
    setPopupOpen(true);
  };

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        ...(customBgColor 
          ? { backgroundColor: customBgColor }
          : { backgroundImage: `url(${pillarsBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }
        ),
        overflow: 'hidden',
        padding: '80px 0',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <Swiper
        modules={[EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        onSwiper={(s) => (swiperRef.current = s)}
        onSlideChange={(s) => setActive(s.activeIndex)}
        style={{ width: '100%' }}
      >
        {dataToUse.map((pillar, i) => (
          <SwiperSlide key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="container mx-auto px-6" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

              {/* Heading overlapping image top — significant pull-down overlap */}
              <h2 className="section-heading plus" style={{
                textAlign: 'center', textTransform: 'none',
                fontWeight: 900, width: '100%',
                position: 'relative', zIndex: 2,
                marginBottom: 'clamp(-2.5rem, -5vw, -4rem)',
                color: '#ffffff',
                textShadow: '0 2px 24px rgba(0,0,0,0.55)',
              }}>
                {pillar.title}
              </h2>

              {/* Panoramic image with centered text overlay */}
              <div style={{ position: 'relative', zIndex: 1, width: '100%', height: 'clamp(280px, 48vh, 520px)', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.35)' }}>
                <img src={pillar.img} alt={pillar.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

                {/* Gradient overlay for readability */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.18) 45%, rgba(0,0,0,0.52) 100%)',
                }} />

                {/* Centered text overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  padding: '2rem clamp(1.5rem, 10%, 7rem)',
                  textAlign: 'center', zIndex: 3,
                }}>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(0.9rem, 1.4vw, 1.2rem)',
                    lineHeight: 1.85,
                    color: 'rgba(255,255,255,0.97)',
                    maxWidth: '65ch',
                    margin: 0,
                    textShadow: '0 1px 10px rgba(0,0,0,0.65)',
                    letterSpacing: '0.015em',
                  }}>
                    {pillar.intro}
                  </p>
                </div>
              </div>

              {/* Capabilities Overview button */}
              <button
                onClick={() => handleOpenPopup(i)}
                style={{
                  marginTop: '4rem', width: 280, padding: '12px 0',
                  border: '1px solid rgba(255,255,255,1)',
                  color: 'rgba(255,255,255,1)', fontFamily: 'var(--font-body)',
                  fontSize: 13, letterSpacing: '0.25em',
                  textTransform: '', fontWeight: 600,
                  background: 'transparent', cursor: 'pointer',
                  borderRadius: 0,
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,1)'; e.currentTarget.style.color = '#00338d'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,1)'; }}
              >
                Capabilities Overview
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <SidebarDots total={dataToUse.length} active={active} swiperRef={swiperRef} />

      {/* Capabilities Overview Popup */}
      <PillarPopup isOpen={popupOpen} onClose={() => setPopupOpen(false)} data={popupData} />
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   SECTION 2 — Exploring New Possibilities  (5 slides)
═══════════════════════════════════════════════════════════ */
export const SectionExploring = () => {
  const [active, setActive] = useState(0);
  const swiperRef = useRef(null);

  const slides = [
    { lines: ['Exploring New', 'Possibilities'], app: 'Application 1', desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type." },
    { lines: ['Innovating', 'Beyond Limits'], app: 'Application 2', desc: 'Crafting the future of digital interaction through bold design and innovative technology solutions that push boundaries and redefine user experiences.' },
    { lines: ['Designing', 'The Future'], app: 'Application 3', desc: 'Empowering organisations to reimagine their digital footprint through immersive experiences and cutting-edge interface design philosophies.' },
    { lines: ['Building', 'Tomorrow'], app: 'Application 4', desc: 'Transforming complex data into intuitive visual narratives that drive decision-making and unlock hidden value across the enterprise.' },
    { lines: ['Creating', 'Impact'], app: 'Application 5', desc: 'Delivering solutions that bridge strategy and execution, turning ambitious ideas into tangible, scalable digital products for the modern era.' },
  ];

  const ringColors = ['#1E49E2', '#7213EA', '#00338D', '#FD349C', '#0C233C'];

  return (
    <section style={{ position: 'relative', width: '100%', background: '#00B8F5', overflow: 'hidden', padding: '80px 0' }}>
      <Swiper
        modules={[EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        onSwiper={(s) => (swiperRef.current = s)}
        onSlideChange={(s) => setActive(s.activeIndex)}
        style={{ width: '100%' }}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="container mx-auto px-6" style={{
              width: '100%',
              height: '450px',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>

              {/* CENTER CIRCLE (DONUT) */}
              <div
                className="force-round"
                style={{
                  width: 'clamp(300px, 35vw, 450px)',
                  height: 'clamp(300px, 35vw, 450px)',
                  backgroundColor: ringColors[i],
                  position: 'relative',
                  zIndex: 5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 60px rgba(0,0,0,0.15)'
                }}
              >
                <div
                  className="force-round"
                  style={{
                    width: '32%', height: '32%',
                    backgroundColor: '#00B8F5', // Section Background
                    position: 'relative',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}
                >
                  {/* WHITE DOT */}
                  <div
                    className="force-round"
                    style={{
                      position: 'absolute',
                      width: 'min(20px, 4vw)',
                      height: 'min(20px, 4vw)',
                      backgroundColor: '#fff',
                      right: 'calc(-1 * min(10px, 2vw))',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      boxShadow: '0 0 10px rgba(255,255,255,0.5)'
                    }}
                  />
                </div>
              </div>

              {/* LEFT TITLE — Overlapping Donut */}
              <div style={{
                position: 'absolute',
                zIndex: 10,
                right: 'calc(50% + 5%)', // Start slightly inside the circle
                textAlign: 'right',
                width: '40%'
              }}>
                <h2 className="section-heading" style={{
                  textTransform: 'none',
                  fontWeight: 900,
                  color: '#fff',
                }}>
                  {slide.lines.map((line, j) => <span key={j} style={{ display: 'block' }}>{line}</span>)}
                </h2>
              </div>

              {/* RIGHT CONTENT — Starting near edge of Donut */}
              <div style={{
                position: 'absolute',
                zIndex: 10,
                left: 'calc(50% + 12%)', // Start near the edge of the hole/donut
                textAlign: 'left',
                width: '32%'
              }}>
                <h3 style={{
                  fontSize: 'clamp(1.2rem, 1.8vw, 1.6rem)',
                  fontWeight: 300,
                  color: '#fff',
                  fontFamily: 'var(--font-body)',
                  marginBottom: 14
                }}>
                  {slide.app}
                </h3>
                <p style={{
                  fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
                  lineHeight: 1.6,
                  color: 'rgba(255,255,255,0.9)',
                  fontFamily: 'var(--font-body)'
                }}>
                  {slide.desc}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <SidebarDots total={slides.length} active={active} swiperRef={swiperRef} />
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   SECTION 3 — Inspiration Meets Technology  (5 slides)
═══════════════════════════════════════════════════════════ */
export const SectionInspiration = () => {
  const [active, setActive] = useState(0);
  const swiperRef = useRef(null);

  const slides = inspirationData;

  return (
    <section style={{
      position: 'relative',
      width: '100%',
      background: '#00B8F5',
      padding: '80px 0',
      minHeight: '100vh',
      height: 'auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <Swiper
        modules={[EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        onSwiper={(s) => (swiperRef.current = s)}
        onSlideChange={(s) => setActive(s.activeIndex)}
        style={{ width: '100%' }}
      >
        {slides.map((slide, si) => (
          <SwiperSlide key={si} style={{ display: 'flex', alignItems: 'flex-start', height: 'auto' }}>
            <div className="container mx-auto px-6 relative" style={{ width: '100%', display: 'flex', flexDirection: 'column', height: 'auto', maxWidth: '1200px' }}>

              {/* Heading */}
              <h2 className="section-heading" style={{
                textAlign: 'center',
                textTransform: 'none',
                fontWeight: 900,
                marginBottom: '4rem',
                flexShrink: 0,
                color: '#fff'
              }}>
                {slide.mainTitle}
              </h2>

              {/* Cards Wrapper */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 30, position: 'relative' }}>
                {slide.projects.map((proj, pi) => (
                  <div key={pi} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>

                    {/* Background Number (partially hidden) */}
                    <div style={{
                      position: 'absolute',
                      left: '10px', // Number starts 10px inside, so with font size it will peek out
                      transform: 'translateX(-85%)', // Push it out so most of it peeks out
                      fontSize: 'clamp(12rem, 12vw, 10rem)',
                      fontWeight: 900,
                      color: 'rgba(255,255,255,0.12)',
                      lineHeight: 1,
                      zIndex: 0,
                      userSelect: 'none',
                      fontFamily: 'var(--font-heading)'
                    }}>
                      0{pi + 1}
                    </div>

                    {/* The Card */}
                    <div style={{
                      position: 'relative',
                      zIndex: 5,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 40,
                      backgroundColor: '#1E49E2', // Bright Blue
                      padding: '2.5rem 3rem',
                      width: '100%',
                      boxShadow: '0 20px 50px rgba(0,0,0,0.15)'
                    }}>

                      {/* Image Container with background border */}
                      <div style={{ position: 'relative', width: '48%', flexShrink: 0 }}>
                        {/* Background border frame — extended top/bottom only */}
                        <div style={{
                          position: 'absolute',
                          top: '-10px',
                          bottom: '-10px',
                          left: '10px',
                          right: '10px',
                          borderTop: '2.5px solid rgba(255,255,255,0.7)',
                          borderBottom: '2.5px solid rgba(255,255,255,0.7)',
                          borderLeft: '2.5px solid rgba(255,255,255,0.7)',
                          borderRight: '2.5px solid rgba(255,255,255,0.7)',
                          zIndex: -1
                        }} />

                        {/* Main Image */}
                        <div style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden', backgroundColor: '#000' }}>
                          <img
                            src={proj.img}
                            alt={proj.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                      </div>

                      {/* Text */}
                      <div style={{ flex: 1 }}>
                        <h3 style={{
                          fontSize: 'clamp(1.2rem, 1.8vw, 1.6rem)',
                          fontWeight: 300,
                          color: '#fff',
                          fontFamily: 'var(--font-body)',
                          marginBottom: 12,
                          lineHeight: 1.2
                        }}>
                          {proj.title}
                        </h3>
                        <p style={{
                          fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
                          lineHeight: 1.6,
                          color: 'rgba(255,255,255,0.9)',
                          fontFamily: 'var(--font-body)',
                          maxWidth: '90%'
                        }}>
                          {proj.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <SidebarDots total={slides.length} active={active} swiperRef={swiperRef} />
    </section>
  );
};
