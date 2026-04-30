import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';



const slidesData = [
  {
    title: "Content Creation",
    description: "Crafting narratives that resonate and visual assets that captivate.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Digital Strategy",
    description: "Aligning your vision with market-leading data-driven strategies.",
    image: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Brand Identity",
    description: "Building iconic brands that stand the test of time and space.",
    image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Motion Graphics",
    description: "Bringing static ideas to life through dynamic movement.",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Web Development",
    description: "High-performance digital experiences built with precision.",
    image: "https://images.unsplash.com/photo-1618556450991-2f1af64e8191?auto=format&fit=crop&w=1200&q=80"
  }
];

const ContentCreation = () => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const goToSlide = (index) => {
    setActiveIndex(index);
    swiperRef.current?.slideTo(index);
  };

  return (
    <section
      className="relative h-screen w-full bg-blue-sky overflow-hidden flex items-center justify-center p-0 m-0"
      style={{ backgroundColor: '#00B8F5' }}
    >
      {/* Background Layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.15),transparent)] pointer-events-none" />

      {/* Main Swiper Content */}
      <div className="relative w-full h-full z-10 flex items-center justify-center">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          modules={[EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          allowTouchMove={true}
          speed={800}
          className="w-full h-full"
        >
          {slidesData.map((slide, idx) => (
            <SwiperSlide key={idx} className="flex items-center justify-center">
              <div className="relative w-full max-w-7xl px-6 md:px-12 flex flex-col items-center justify-center h-full">
                <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center">
                  {/* Title Overlap */}
                  <h1 className="text-white text-7xl md:text-9xl font-black uppercase tracking-tight text-center leading-[0.85] z-20 mix-blend-difference content-creation-title translate-y-2">
                    {slide.title}
                  </h1>

                  {/* Main Image */}
                  <div className="relative w-full h-[400px] md:h-[500px] -mt-10 md:-mt-16 rounded-[2rem] overflow-hidden shadow-2xl shadow-blue-navy/30">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-navy/40 to-transparent" />
                  </div>

                  {/* Description */}
                  <p className="mt-12 text-white/85 text-lg md:text-xl font-light tracking-wide max-w-3xl text-center">
                    {slide.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Sidebar Controls (Squares) */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
        {slidesData.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`w-4 h-4 rounded-sm border-2 transition-all duration-300 ${activeIndex === idx
              ? 'bg-white border-white scale-110 shadow-lg'
              : 'bg-transparent border-white/50 hover:border-white'
              }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Footer Button (Services) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50">
        <button className="px-10 py-3 border-2 border-white text-white font-bold uppercase tracking-widest hover:bg-white hover:text-blue-sky transition-all duration-500 rounded-sm">
          Services
        </button>
      </div>

      {/* Slide Transitions handled by Swiper EffectFade */}
      <style>{`
        .swiper-slide {
          opacity: 0 !important;
          transition: opacity 0.8s ease-in-out;
        }
        .swiper-slide-active {
          opacity: 1 !important;
        }
        .swiper-slide-active h1, 
        .swiper-slide-active p,
        .swiper-slide-active .rounded-[2rem] {
          animation: slideInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        }
        
        @keyframes slideInUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
};

export default ContentCreation;
