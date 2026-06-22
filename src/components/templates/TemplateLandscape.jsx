import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { gsap } from 'gsap';
import 'swiper/css';
import 'swiper/css/pagination';

const TemplateLandscape = ({ slide }) => {
  const containerRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const mediaRef = useRef(null);
  const overlayRef = useRef(null);

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
        { x: -50, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 0.6 }
      )
      .fromTo(titleRef.current, 
        { x: -50, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 0.6 }, 
        '-=0.4'
      )
      .fromTo(descRef.current, 
        { x: -50, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 0.6 }, 
        '-=0.4'
      )
      // Media animation (Middle box)
      .fromTo(mediaRef.current,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8 },
        '-=0.3'
      );

      // Gallery animation (Right side overlay)
      if (overlayRef.current) {
        tl.fromTo(overlayRef.current,
          { x: -100, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8 },
          '-=0.5'
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
      className="w-full min-h-[80vh] flex items-center justify-center py-20 relative overflow-hidden"
      style={{
        backgroundImage: 'url(images/project-page-banner-background.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#00338d' // fallback
      }}
    >
      <div className="container mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 lg:gap-16 items-center relative z-10">

        {/* Content - 20% space */}
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

        {/* Video Box - 80% space */}
        <div ref={mediaRef} className="w-full lg:w-[calc(100%-170px)] relative z-10">
          <div className="w-full aspect-video bg-black shadow-2xl overflow-hidden relative border border-white/5">
            {currentMedia.type === 'video' ? (
              <video
                key={currentMedia.src}
                src={currentMedia.src}
                className="absolute inset-0 w-full h-full object-cover"
                controls
                muted
                loop
                playsInline
                poster={slide.image || slide.thumb}
              />
            ) : (
              <img
                key={currentMedia.src}
                src={currentMedia.src}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                onClick={() => window.open(currentMedia.src, '_blank')}
                title="Click to view full image"
              />
            )}
          </div>

          {/* Slider Overlay on right side of the video */}
          {galleryImages.length > 0 && (
            <div ref={overlayRef} className="absolute top-0 bottom-0 right-0 lg:-right-[220px] z-20 w-[200px] lg:w-[320px] py-10 pointer-events-none flex items-center">
              <div className="w-full h-full lg:h-[80%] relative pointer-events-auto">
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
                  className="w-full h-full gallery-custom-swiper"
                >
                  {galleryImages.map((mediaUrl, idx) => {
                    const isVid = mediaUrl.endsWith('.mp4') || mediaUrl.endsWith('.webm');
                    return (
                      <SwiperSlide key={idx} className="w-full" style={{ height: 'calc((100% - 20px) / 2)' }}>
                        <div 
                          className="w-full h-full bg-transparent shadow-xl overflow-hidden relative group border-2 border-white/20 aspect-video p-[10px] cursor-pointer"
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
          )}
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

export default TemplateLandscape;
