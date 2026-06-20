import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { gsap } from 'gsap';
import 'swiper/css';
import 'swiper/css/pagination';

const TemplatePortrait = ({ slide }) => {
  const containerRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const mediaRef = useRef(null);
  const galleryRef = useRef(null);

  const [currentMedia, setCurrentMedia] = useState({
    type: slide.video ? 'video' : 'image',
    src: slide.video || slide.image
  });

  useEffect(() => {
    setCurrentMedia({
      type: slide.video ? 'video' : 'image',
      src: slide.video || slide.image
    });
  }, [slide]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for left content
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo(badgeRef.current, 
        { scale: 0.8, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 0.6 }
      )
      .fromTo(titleRef.current, 
        { scale: 0.9, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 0.6 }, 
        '-=0.4'
      )
      .fromTo(descRef.current, 
        { scale: 0.95, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 0.6 }, 
        '-=0.4'
      );

      // Media animation (Middle box)
      gsap.fromTo(mediaRef.current,
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'expo.out', delay: 0.1 }
      );

      // Gallery animation (Right side)
      if (galleryRef.current) {
        gsap.fromTo(galleryRef.current,
          { scale: 0.9, opacity: 0, x: 20 },
          { scale: 1, opacity: 1, x: 0, duration: 0.7, delay: 0.4, ease: 'power3.out' }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [slide]);

  // Map category ID to string label
  const categoryLabels = {
    0: 'Graphic Design',
    1: 'PPT Deck Design',
    2: 'Motion Graphics',
    3: 'Other Design'
  };

  const galleryImages = slide.gallery || [];

  return (
    <div
      ref={containerRef}
      className="w-full min-h-[80vh] flex items-center justify-center py-20 relative"
      style={{
        backgroundImage: 'url(images/project-page-banner-background.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#00338d' // fallback
      }}
    >
      <div className="container mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10 lg:gap-16 items-stretch relative z-10">

        {/* Left Content (Text) - Col 1 */}
        <div className="flex flex-col items-start self-start text-white min-w-0">
          <div ref={badgeRef} className="inline-block border border-white px-4 py-1 mb-6 lg:mb-8">
            <span className="text-sm font-bold tracking-widest uppercase">{categoryLabels[slide.categoryId]}</span>
          </div>

          <h1 ref={titleRef} className="text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight mb-6 lg:mb-8 break-words w-full" style={{ fontFamily: 'var(--font-heading)' }}>
            {slide.title}
          </h1>

          <p ref={descRef} className="text-base lg:text-lg font-medium opacity-90 leading-relaxed">
            {slide.content}
          </p>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-[2fr_1.5fr] gap-0 items-stretch h-full">

        {/* Middle Content - Big Main Image - Col 2: Lowest z-index */}
        <div ref={mediaRef} className="flex items-center justify-end w-full relative z-10">
          <div className="w-[92%] aspect-[4/5] bg-white shadow-2xl overflow-hidden relative">
            {currentMedia.type === 'video' ? (
              <video
                key={currentMedia.src}
                src={currentMedia.src}
                className="w-full h-full object-cover"
                controls
                muted
                loop
                playsInline
              />
            ) : (
              <img
                key={currentMedia.src}
                src={currentMedia.src}
                alt={`${slide.title} Main`}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => window.open(currentMedia.src, '_blank')}
                title="Click to view full image"
              />
            )}
          </div>
        </div>

        {/* Right Content - Vertical Mini Swiper - Col 3: Overlaps Left by 10px, high z-index */}
        <div ref={galleryRef} className="relative lg:-ml-[15px] z-20 h-[600px] lg:h-auto lg:py-[80px]">
          {/* Swiper Container - Using absolute on desktop to fill grid height perfectly minus padding */}
          <div className="w-full h-full lg:absolute lg:inset-x-0 lg:top-[80px] lg:bottom-[80px] lg:h-auto relative flex items-center justify-start">
            <Swiper
              direction={'vertical'}
              slidesPerView={2}
              spaceBetween={20}
              modules={[Pagination]}
              observer={true}
              observeParents={true}
              pagination={{
                clickable: true,
                renderBullet: function (index, className) {
                  return `<span class="${className} custom-bullet-square"></span>`;
                },
              }}
              style={{ height: '100%' }}
              className="w-full max-w-[220px] h-full gallery-custom-swiper"
            >
              {galleryImages.map((mediaUrl, idx) => {
                const isVid = mediaUrl.endsWith('.mp4') || mediaUrl.endsWith('.webm');
                return (
                  <SwiperSlide key={idx} className="w-full" style={{ height: 'calc((100% - 20px) / 2)' }}>
                    <div 
                      className="w-full h-full bg-transparent shadow-xl overflow-hidden relative group border-2 border-white/20 aspect-[4/5] p-[10px] cursor-pointer"
                      onClick={() => setCurrentMedia({ type: isVid ? 'video' : 'image', src: mediaUrl })}
                    >
                      {isVid ? (
                        <video
                          src={mediaUrl}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          muted
                          playsInline
                          loop
                        />
                      ) : (
                        <img
                          src={mediaUrl}
                          alt={`Gallery ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      )}
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>

        </div>

      </div>

      {/* Embedded Styles for the square pagination bullets matching the design image */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .gallery-custom-swiper {
          padding-right: 50px !important; /* Gap between slider items and pagination */
        }
        .gallery-custom-swiper.swiper-initialized {
          margin-left: 0 !important;
          margin-right: 0 !important;
        }
        .gallery-custom-swiper .swiper-slide {
          height: calc(50% - 10px) !important; /* Force exact height for 2 slides per view to override any global 100% height styles */
        }
        .swiper-pagination-vertical.swiper-pagination-bullets, .swiper-vertical>.swiper-pagination-bullets {
          right: 0 !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .custom-bullet-square {
          width: 14px;
          height: 14px;
          border-radius: 0;
          background: transparent;
          border: 2px solid rgba(255, 255, 255, 0.5);
          opacity: 1;
          margin: 0 !important;
          transition: all 0.3s ease;
          display: block;
          cursor: pointer;
        }
        .custom-bullet-square.swiper-pagination-bullet-active {
          background: white;
          border-color: white;
        }
      `}} />
    </div>
  );
};

export default TemplatePortrait;
