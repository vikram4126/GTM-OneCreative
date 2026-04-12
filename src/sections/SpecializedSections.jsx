import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

/* ── All asset images ─────────────────────────────────────── */
import img01 from '../assets/images/llxvisuals-eSLJG0y5S4U-unsplash.jpg';
import img02 from '../assets/images/mike-hindle-XIWA8_767pU-unsplash.jpg';
import img03 from '../assets/images/marek-piwnicki-NwZmYW5ETnE-unsplash.jpg';
import img04 from '../assets/images/nasa-hubble-space-telescope-oKR1KYjm8C0-unsplash.jpg';
import img05 from '../assets/images/tianlei-wu-TzKBCfzQ2WI-unsplash.jpg';
import img06 from '../assets/images/dmitry-kropachev-_uL1v6AuudQ-unsplash.jpg';
import img07 from '../assets/images/ian-lhPNTD2ii0U-unsplash.jpg';
import img08 from '../assets/images/eugene-golovesov-vTJQzJRmSLQ-unsplash.jpg';
import img09 from '../assets/images/leon-rohrwild-MxcwgJGO-Us-unsplash.jpg';
import img10 from '../assets/images/louis-gaudiau-jpxOY5OdFpc-unsplash.jpg';
import img11 from '../assets/images/nowbelov-Zn3QjwsN2Q0-unsplash.jpg';
import img12 from '../assets/images/quentin-schulz-URfsKbjVA2Q-unsplash.jpg';
import img13 from '../assets/images/thibault-henry-HIWj0F3Xsxc-unsplash.jpg';
import img14 from '../assets/images/mike-hindle-n73nY4TfKZ8-unsplash.jpg';

/* ─── Right-side clickable dot pagination (only navigation) ── */
const SidebarDots = ({ total, active, swiperRef }) => (
  <div style={{
    position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)',
    display: 'flex', flexDirection: 'column', gap: 10,
    zIndex: 30,
  }}>
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        onClick={() => swiperRef.current?.slideTo(i)}
        style={{
          width: 13, height: 13,
          borderRadius: 0,
          border: '1.5px solid rgba(255,255,255,0.55)',
          backgroundColor: i === active ? 'rgba(255,255,255,0.7)' : 'transparent',
          cursor: 'pointer',
          transition: 'background 0.3s',
        }}
      />
    ))}
  </div>
);

/* ═══════════════════════════════════════════════════════════
   SECTION 1 — Design Strategy  (5 slides)
═══════════════════════════════════════════════════════════ */
export const SectionDesignStrategy = () => {
  const [active, setActive] = useState(0);
  const swiperRef = useRef(null);

  const slides = [
    { title: 'Design Strategy',    img: img01 },
    { title: 'Visual Storytelling', img: img02 },
    { title: 'Creative Direction',  img: img03 },
    { title: 'Future Vision',       img: img04 },
    { title: 'Digital Innovation',  img: img05 },
  ];

  return (
    <section style={{ position: 'relative', height: '100vh', width: '100%', background: '#00B8F5', overflow: 'hidden' }}>
      <Swiper
        modules={[EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        onSwiper={(s) => (swiperRef.current = s)}
        onSlideChange={(s) => setActive(s.activeIndex)}
        style={{ width: '100%', height: '100%' }}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <div className="container mx-auto" style={{ width: '100%', padding: '80px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

              {/* Heading overlapping image top */}
              <h1 className="content-creation-title section-heading" style={{
                fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)',
                textAlign: 'center', textTransform: 'uppercase',
                lineHeight: 1, fontWeight: 900, width: '100%',
                position: 'relative', zIndex: 2,
                marginBottom: '-1.4vw',
              }}>
                {slide.title}
              </h1>

              {/* Panoramic image — no border radius */}
              <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '42vh', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}>
                <img src={slide.img} alt={slide.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              {/* Services button */}
              <button style={{
                marginTop: '2.2rem', width: 220, padding: '12px 0',
                border: '1px solid rgba(255,255,255,0.5)',
                color: 'rgba(255,255,255,0.7)', fontFamily: 'Outfit, sans-serif',
                fontSize: 13, letterSpacing: '0.25em',
                textTransform: 'uppercase', fontWeight: 600,
                background: 'transparent', cursor: 'pointer',
                borderRadius: 0,
              }}>
                Services
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <SidebarDots total={slides.length} active={active} swiperRef={swiperRef} />
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
    { lines: ['Innovating', 'Beyond Limits'],    app: 'Application 2', desc: 'Crafting the future of digital interaction through bold design and innovative technology solutions that push boundaries and redefine user experiences.' },
    { lines: ['Designing', 'The Future'],        app: 'Application 3', desc: 'Empowering organisations to reimagine their digital footprint through immersive experiences and cutting-edge interface design philosophies.' },
    { lines: ['Building', 'Tomorrow'],           app: 'Application 4', desc: 'Transforming complex data into intuitive visual narratives that drive decision-making and unlock hidden value across the enterprise.' },
    { lines: ['Creating', 'Impact'],             app: 'Application 5', desc: 'Delivering solutions that bridge strategy and execution, turning ambitious ideas into tangible, scalable digital products for the modern era.' },
  ];

  const ringColors = ['#1E49E2', '#7213EA', '#00338D', '#FD349C', '#0C233C'];

  return (
    <section style={{ position: 'relative', height: '100vh', width: '100%', background: '#00B8F5', overflow: 'hidden' }}>
      <Swiper
        modules={[EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        onSwiper={(s) => (swiperRef.current = s)}
        onSlideChange={(s) => setActive(s.activeIndex)}
        style={{ width: '100%', height: '100%' }}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <div className="container mx-auto" style={{ width: '100%', padding: '80px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>

              {/* LEFT — title */}
              <div style={{ flexShrink: 0, width: '26%', display: 'flex', alignItems: 'flex-end', paddingBottom: '1.5rem' }}>
                <h1 className="content-creation-title section-heading" style={{ fontSize: 'clamp(2rem, 4vw, 3.8rem)', textTransform: 'uppercase', fontWeight: 900, lineHeight: 0.9 }}>
                  {slide.lines.map((line, j) => <span key={j} style={{ display: 'block' }}>{line}</span>)}
                </h1>
              </div>

              {/* CENTER — donut circle (no border-radius on wrapper) */}
              <div style={{ position: 'relative', flexShrink: 0, width: 'min(360px, 34vw)', height: 'min(360px, 34vw)' }}>
                <div style={{ width: '100%', height: '100%', borderRadius: '50%', backgroundColor: ringColors[i], display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '42%', height: '42%', borderRadius: '50%', backgroundColor: '#00B8F5', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ position: 'absolute', width: 20, height: 20, borderRadius: '50%', backgroundColor: '#fff', right: -10, top: '50%', transform: 'translateY(-50%)' }} />
                  </div>
                </div>
              </div>

              {/* RIGHT — text */}
              <div style={{ flexShrink: 0, width: '26%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', fontFamily: 'Outfit, sans-serif', marginBottom: 12 }}>{slide.app}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(255,255,255,0.85)', fontFamily: 'Outfit, sans-serif' }}>{slide.desc}</p>
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

  const slides = [
    { mainTitle: 'Inspiration Meets Technology', projects: [{ title: 'Title of Project', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', img: img06 }, { title: 'Title of Project', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', img: img07 }] },
    { mainTitle: 'Innovation Drives Progress',   projects: [{ title: 'Title of Project', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', img: img08 }, { title: 'Title of Project', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', img: img09 }] },
    { mainTitle: 'Where Art Meets Purpose',      projects: [{ title: 'Title of Project', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', img: img10 }, { title: 'Title of Project', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', img: img11 }] },
    { mainTitle: 'Vision Beyond Boundaries',     projects: [{ title: 'Title of Project', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', img: img12 }, { title: 'Title of Project', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', img: img13 }] },
    { mainTitle: 'Stories That Move People',     projects: [{ title: 'Title of Project', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', img: img14 }, { title: 'Title of Project', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', img: img01 }] },
  ];

  return (
    <section style={{ position: 'relative', height: '100vh', width: '100%', background: '#00B8F5', overflow: 'hidden' }}>
      <Swiper
        modules={[EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        onSwiper={(s) => (swiperRef.current = s)}
        onSlideChange={(s) => setActive(s.activeIndex)}
        style={{ width: '100%', height: '100%' }}
      >
        {slides.map((slide, si) => (
          <SwiperSlide key={si} style={{ height: '100%', display: 'flex', alignItems: 'stretch' }}>
            <div className="container mx-auto" style={{ width: '100%', padding: '72px 0 80px', display: 'flex', flexDirection: 'column' }}>

              {/* Heading */}
              <h1 className="content-creation-title section-heading" style={{
                fontSize: 'clamp(1.8rem, 3.8vw, 3.2rem)',
                textAlign: 'center', textTransform: 'uppercase',
                lineHeight: 1, fontWeight: 900,
                marginBottom: '1.5rem', flexShrink: 0,
              }}>
                {slide.mainTitle}
              </h1>

              {/* Two project cards — no border-radius */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14, justifyContent: 'center' }}>
                {slide.projects.map((proj, pi) => (
                  <div key={pi} style={{ display: 'flex', alignItems: 'center', gap: 24, backgroundColor: '#1E49E2', padding: '1rem 1.25rem', flexShrink: 0 }}>
                    {/* Image — no border-radius */}
                    <div style={{ flexShrink: 0, width: '38%', aspectRatio: '16/9', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.4)' }}>
                      <img src={proj.img} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    {/* Text */}
                    <div>
                      <h3 style={{ fontSize: 18, fontWeight: 700, textTransform: 'uppercase', color: '#fff', fontFamily: 'Outfit, sans-serif', marginBottom: 8 }}>{proj.title}</h3>
                      <p style={{ fontSize: 15, lineHeight: 1.6, color: 'rgba(255,255,255,0.85)', fontFamily: 'Outfit, sans-serif' }}>{proj.desc}</p>
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
