import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

import exploringDataJson from '../data/exploring_new.json';

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
          className="section-heading mb-8 md:mb-12 font-black tracking-tight"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 3.5vw, 3.2rem)',
            color: '#FFFFFF'
          }}
        >
          Exploring New Possibilities
        </h2>

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
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center min-h-[480px]">
                
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

                {/* MIDDLE: Frame / Border / Padding / Video Display (col-span-7) */}
                <div className="lg:col-span-7 flex justify-center items-center">
                  <div
                    className="relative w-full overflow-hidden shadow-2xl rounded-sm"
                    style={{
                      border: '2px solid #00B8F5',
                      padding: '16px',
                      boxShadow: '0 0 35px rgba(0, 184, 245, 0.35)',
                      backgroundColor: 'rgba(0, 0, 0, 0.4)',
                      backdropFilter: 'blur(4px)'
                    }}
                  >
                    <div style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}>
                      <video
                        key={item.videoSrc + index}
                        src={item.videoSrc}
                        poster={item.poster}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* RIGHT: Slider Pagination List (col-span-2) */}
                <div className="lg:col-span-2 flex flex-col justify-center items-end space-y-5 text-right">
                  {slidesData.map((navItem, navIdx) => {
                    const isActive = navIdx === activeIndex;
                    return (
                      <button
                        key={navIdx}
                        onClick={() => swiperRef.current?.slideTo(navIdx)}
                        className="group flex items-center justify-end gap-2 text-right w-full transition-all duration-300 focus:outline-none py-1"
                        style={{ cursor: 'pointer' }}
                      >
                        <span
                          className={`font-semibold tracking-wide transition-all duration-300 text-right ${
                            isActive
                              ? 'text-white text-2xl md:text-3xl font-bold'
                              : 'text-gray-400 hover:text-gray-200 text-base md:text-xl'
                          }`}
                          style={{ fontFamily: 'var(--font-heading)' }}
                        >
                          {isActive ? `- ${navItem.agentName}` : navItem.agentName}
                        </span>
                      </button>
                    );
                  })}
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
