import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

// Import assets
import PillarPopup from '../components/PillarPopup';

gsap.registerPlugin(ScrollTrigger);

/* ─── Right-side clickable dot pagination ─── */
const SidebarDots = ({ total, active, swiperRef }) => (
  <div style={{
    position: 'absolute',
    right: 30,
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    zIndex: 50,
  }}>
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        onClick={() => swiperRef.current?.slideTo(i)}
        style={{
          width: 18,
          height: 18,
          borderRadius: 0,
          border: '2px solid rgba(255,255,255,0.2)',
          backgroundColor: i === active ? 'var(--color-white)' : 'transparent',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: i === active ? '0 0 15px rgba(0, 174, 239, 0.4)' : 'none'
        }}
      />

    ))}
  </div>
);

/* ── Section 1: Service Banner ── */
export const ServiceBanner = ({ title = [], description = "", iconTop, iconBottom, bannerBg }) => {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const centerRef = useRef(null);
  const rightRef = useRef(null);

  const iconTopRef = useRef(null);
  const iconBottomRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      });

      // Initial states
      gsap.set(centerRef.current, {
        backgroundColor: 'transparent',
        border: '1px solid rgba(255,255,255,0.1)',
        scale: 0.8,
        opacity: 0
      });
      gsap.set([leftRef.current, rightRef.current], { opacity: 0, y: 50 });
      gsap.set([iconTopRef.current, iconBottomRef.current], { scale: 0, opacity: 0 });

      // Step 1: Center Box Entry
      tl.to(centerRef.current, {
        backgroundColor: '#1e49e2',
        border: '0px solid transparent',
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: 'power3.out'
      });

      // Step 2: Columns Entry
      tl.to([leftRef.current, rightRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      }, '-=0.6');

      // Step 3: Icons Pop In
      tl.to([iconTopRef.current, iconBottomRef.current], {
        scale: 1,
        opacity: 0.8,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.7)'
      }, '-=0.3');

      // Micro-animations: Floating icons
      gsap.to(iconTopRef.current, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
      gsap.to(iconBottomRef.current, {
        y: 10,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.5
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        width: '100%',
        backgroundImage: `url(${bannerBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 0',
        overflow: 'hidden',
        position: 'relative'
      }}
    >

      <div
        className="container mx-auto px-6 lg:px-12 relative z-10"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '40px',
        }}
      >
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-center w-full max-w-[1200px] gap-0">

          {/* Left Column - Heading */}
          <div
            ref={leftRef}
            className="flex-1 flex justify-center md:justify-end -mb-[30px] md:mb-0 md:-mr-[20px] relative z-10 w-full md:w-auto"
          >
            <h2
              className="text-center md:text-right text-white"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 900,
                fontSize: 'clamp(2.5rem, 5.5vw, 4.8rem)',
                lineHeight: 1.1,
                maxWidth: '500px',
                textTransform: 'none',
              }}
            >
              {title.map((line, i) => <React.Fragment key={i}>{line}<br /></React.Fragment>)}
            </h2>
          </div>

          <div
            ref={centerRef}
            className="w-full max-w-[350px] bg-[var(--color-blue-navy)] shrink-0 origin-center box-border relative z-[1] shadow-[0_40px_80px_rgba(0,0,0,0.4)] flex flex-col justify-between p-6"
            style={{
              height: 'clamp(350px, 50vh, 600px)',
            }}
          >
            {/* Top icon */}
            {iconTop && (
              <div ref={iconTopRef} style={{ opacity: 0.8 }}>
                <img src={iconTop} alt="top-icon" style={{ width: '28px', height: '28px' }} />
              </div>
            )}

            {/* Bottom icon */}
            {iconBottom && (
              <div ref={iconBottomRef} style={{ alignSelf: 'flex-end', opacity: 0.8 }}>
                <img src={iconBottom} alt="bottom-icon" style={{ width: '28px', height: '28px' }} />
              </div>
            )}
          </div>


          <div
            ref={rightRef}
            className="flex-1 flex justify-center md:justify-start -mt-[30px] md:mt-0 md:-ml-[20px] relative z-10 w-full md:w-auto"
          >
            <p
              className="text-center md:text-left"
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: 'clamp(1.1rem, 1.4vw, 1.25rem)',
                lineHeight: 1.6,
                color: 'rgba(255, 255, 255, 0.7)',
                maxWidth: '420px'
              }}
            >
              {description}
            </p>

          </div>
        </div>
      </div>
    </section>
  );
};

/* ── Section 2: Service Detail Slider ── */
export const ServiceDetailSlider = ({ slides = [], pillarBgColor = '#00b8f5' }) => {
  const [active, setActive] = useState(0);
  const swiperRef = useRef(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupData, setPopupData] = useState(null);

  const handleOpenPopup = (slideIndex) => {
    const slide = resolvedSlides[slideIndex];
    if (slide) {
      // For service pages, popupData is a nested object. 
      // For the Home page (pillars.json), the slide object itself is the data.
      const data = slide.popupData || slide;
      setPopupData(data);
      setIsPopupOpen(true);
    }
  };

  // Dynamically import images if needed, but here we assume they are passed as paths
  // and we will require them or use a resolver.
  // For now, let's assume the images are in src/assets/images and we'll use a dynamic import style if possible
  // or just use the names.

  // Since we copied them to src/assets/images, we can try to resolve them.
  // Actually, it's easier to import them all here if they are known.

  const resolvedSlides = slides;

  if (resolvedSlides.length === 0) return null;

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: pillarBgColor,
        overflow: 'hidden',
        padding: '120px 0',
        display: 'flex',
        alignItems: 'center',
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
        {resolvedSlides.map((slide, i) => (
          <SwiperSlide key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="container mx-auto px-6" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

              {/* Heading overlapping image top */}
              <h2 className="content-creation-title section-heading text-white" style={{
                fontSize: 'clamp(2.5rem, 5.5vw, 4.8rem)',
                textAlign: 'center', textTransform: 'none',
                lineHeight: 1, fontWeight: 900, width: '100%',
                position: 'relative', zIndex: 2,
                marginBottom: '-1.4vw',
                color: '#FFFFFF !important'
              }}>
                {slide.title}
              </h2>

              {/* Panoramic image */}
              <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '42vh', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.3)', borderRadius: '0px' }}>
                <img src={slide.image} alt={slide.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              {/* Capabilities Overview button */}
              <button
                onClick={() => handleOpenPopup(i)}
                className="pillar-cta-button"
              >
                Capabilities Overview
              </button>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <SidebarDots total={resolvedSlides.length} active={active} swiperRef={swiperRef} />

      <PillarPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        data={popupData}
      />
    </section>
  );
};
