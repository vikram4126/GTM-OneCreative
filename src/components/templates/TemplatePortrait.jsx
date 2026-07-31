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
    type: 'image',
    src: slide.image || slide.thumb
  });

  useEffect(() => {
    setCurrentMedia({
      type: 'image',
      src: slide.image || slide.thumb
    });
  }, [slide]);

  const handleVideoClick = () => {
    const url = slide.videoUrl || slide.video;
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

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

      // Gallery animation (Right side)
      if (galleryRef.current) {
        tl.fromTo(galleryRef.current,
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
      className="w-full min-h-[calc(100vh-68px)] flex items-center justify-center py-20 relative overflow-hidden"
      style={{
        backgroundImage: 'url(images/project-page-banner-background.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#00338d' // fallback
      }}
    >
      <div className="container mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8 lg:gap-16 items-start relative z-10">

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

        <div className="w-full grid grid-cols-1 lg:grid-cols-[2fr_1.5fr] gap-6 lg:gap-10 items-stretch">

          {/* Middle Content - Big Main Image - Col 2 */}
          <div ref={mediaRef} className="w-full relative z-10">
              <div className="w-full aspect-[3/4] bg-white shadow-2xl overflow-hidden relative group">
                <img
                  key={currentMedia.src}
                  src={currentMedia.src}
                  alt={`${slide.title} Main`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Dark overlay on hover */}
                <div 
                  className="absolute inset-0 bg-black/10 group-hover:bg-black/35 transition-colors duration-300 cursor-pointer z-0"
                  onClick={() => {
                    if (!slide.videoUrl && !slide.video) {
                      window.open(currentMedia.src, '_blank', 'noopener,noreferrer');
                    }
                  }}
                  title={!slide.videoUrl && !slide.video ? "Click to view full image" : ""}
                />
                {/* Play button — only show if videoUrl or video exists */}
                {(slide.videoUrl || slide.video) && (
                  <button
                    onClick={handleVideoClick}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-3 cursor-pointer z-10"
                    aria-label="Watch video"
                  >
                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-300 shadow-2xl">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <span className="text-white text-sm font-semibold tracking-widest uppercase opacity-90">Watch Video</span>
                  </button>
                )}
            </div>
          </div>

          {/* Right Content - Vertical Mini Swiper - Col 3 */}
          <div ref={galleryRef} className="relative z-20 w-full overflow-hidden min-h-0">
            {/* Swiper Container: Use absolute positioning instead of h-full. 10px top/bottom makes it exactly 20px shorter than the middle image. */}
            <div className="absolute top-[10px] bottom-[10px] left-0 right-0 w-full flex items-center justify-start">
              <Swiper
                direction={'vertical'}
                slidesPerView={2}
                spaceBetween={10}
                modules={[Pagination]}
                observer={true}
                observeParents={true}
                pagination={{
                  clickable: true,
                  renderBullet: function (index, className) {
                    return `<span class="${className} custom-bullet-square"></span>`;
                  },
                }}
                className="w-full max-w-[320px] gallery-custom-swiper absolute inset-0"
              >
                {galleryImages.map((mediaUrl, idx) => {
                  const isVid = mediaUrl.endsWith('.mp4') || mediaUrl.endsWith('.webm');
                  return (
                    <SwiperSlide key={idx} className="w-full" style={{ height: 'calc((100% - 20px) / 2)' }}>
                      <div
                        className="w-full h-full bg-transparent overflow-hidden relative group border-2 border-white/20 p-[10px] cursor-pointer"
                        onClick={() => setCurrentMedia({ type: 'image', src: isVid ? (slide.image || slide.thumb) : mediaUrl })}
                      >
                        <img
                          src={isVid ? (slide.image || slide.thumb) : mediaUrl}
                          alt={`Gallery ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
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
