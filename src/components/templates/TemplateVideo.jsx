import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const TemplateVideo = ({ slide }) => {
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
      className="w-full min-h-[80vh] flex items-center justify-center py-20 relative overflow-hidden"
      style={{
        backgroundImage: 'url(images/project-page-banner-background.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#00338d' // fallback
      }}
    >
      <div className="container mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-[2fr_8fr] gap-10 lg:gap-16 items-center relative z-10">

        {/* Content - 20% space */}
        <div className="flex flex-col items-start text-white">
          <div className="inline-block border border-white px-4 py-1 mb-6 lg:mb-8">
            <span className="text-sm font-bold tracking-widest uppercase">{categoryLabels[slide.categoryId]}</span>
          </div>

          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight mb-6 lg:mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
            {slide.title}
          </h1>

          <p className="text-base lg:text-lg font-medium opacity-90 leading-relaxed">
            {slide.content}
          </p>
        </div>

        {/* Video Box - 80% space */}
        <div className="w-full relative z-10 group">
          <div className="w-full aspect-video bg-black shadow-2xl overflow-hidden relative border border-white/5">
            {slide.video ? (
              <video
                src={slide.video}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            )}
          </div>

          {/* Slider Overlay on right side of the video */}
          {galleryImages.length > 0 && (
            <div className="absolute top-0 bottom-0 -right-[20px] lg:-right-[40px] z-20 w-[200px] lg:w-[260px] py-10 pointer-events-none flex items-center">
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
                  {galleryImages.map((img, idx) => (
                    <SwiperSlide key={idx} className="w-full" style={{ height: 'calc((100% - 20px) / 2)' }}>
                      <div className="w-full h-full bg-transparent shadow-xl overflow-hidden relative group border-2 border-white/20 aspect-[4/5] p-[10px]">
                        <img
                          src={img}
                          alt={`Gallery ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
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

export default TemplateVideo;
