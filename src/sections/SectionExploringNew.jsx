import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

import exploringDataJson from '../data/exploring_new.json';

const SidebarDots = ({ total, active, swiperRef }) => (
  <div
    className="flex flex-col gap-3 justify-center items-end"
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
          backgroundColor: i === active ? 'rgba(255,255,255,0.95)' : 'transparent',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: i === active ? '0 0 12px rgba(255,255,255,0.4)' : 'none'
        }}
      />
    ))}
  </div>
);

export const SectionExploringNew = ({ customData }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  const slidesData = customData || exploringDataJson;

  return (
    <section
      id="exploring-possibilities-new"
      className="snap-section relative w-full overflow-hidden text-white flex flex-col justify-center"
      style={{
        minHeight: '100vh',
        backgroundImage: 'url(images/exploring-background-image.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '80px 0'
      }}
    >
      <div className="container mx-auto px-6 md:px-12 relative z-10 w-full">
        {/* Main Section Header */}
        <h2
          className="section-heading mb-3 md:mb-4 font-black tracking-tight"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 3.5vw, 3.2rem)',
            color: '#FFFFFF'
          }}
        >
          Exploring New Possibilities
        </h2>

        {/* Paragraph directly after heading */}
        <p
          className="mb-8 md:mb-12 max-w-3xl text-gray-200"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
            lineHeight: 1.6
          }}
        >
          Discover cutting-edge generative AI capabilities, automated creative workflows, and next-generation design systems driving innovation across KPMG Capability Hubs.
        </p>

        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          speed={700}
          onSwiper={(s) => (swiperRef.current = s)}
          onSlideChange={(s) => setActiveIndex(s.activeIndex)}
          className="w-full"
        >
          {slidesData.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center min-h-[460px]">
                
                {/* LEFT: Header + Text (col-span-3) */}
                <div className="lg:col-span-3 flex flex-col justify-center pr-0 lg:pr-2">
                  <h3
                    className="font-bold mb-5"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(1.8rem, 2.5vw, 2.5rem)',
                      lineHeight: 1.1,
                      color: '#FFFFFF'
                    }}
                  >
                    {item.header}
                  </h3>
                  <div className="space-y-4 text-gray-200" style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.85rem, 0.95vw, 0.95rem)', lineHeight: 1.6 }}>
                    {item.textParagraphs.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>
                </div>

                {/* MIDDLE: Clickable Image / Link Display (col-span-8) */}
                <div className="lg:col-span-8 flex justify-center items-center">
                  <a
                    href={item.link || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative w-full overflow-hidden shadow-2xl rounded-sm block"
                    style={{
                      border: '2px solid #00B8F5',
                      padding: '16px',
                      boxShadow: '0 0 35px rgba(0, 184, 245, 0.35)',
                      backgroundColor: 'rgba(0, 0, 0, 0.4)',
                      backdropFilter: 'blur(4px)',
                      cursor: 'pointer'
                    }}
                  >
                    <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
                      <img
                        src={item.image}
                        alt={item.header}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      
                      {/* Hover Overlay with Semi-Transparent Black Play Icon */}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-black/60 group-hover:bg-black/80 backdrop-blur-sm border border-white/30 text-white flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all duration-300 pl-1">
                          <svg className="w-8 h-8 md:w-10 md:h-10 fill-current text-white" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>

                {/* RIGHT: Square white pagination dots like service page (col-span-1) */}
                <div className="lg:col-span-1 flex justify-end items-center lg:pr-4">
                  <SidebarDots total={slidesData.length} active={activeIndex} swiperRef={swiperRef} />
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default SectionExploringNew;
