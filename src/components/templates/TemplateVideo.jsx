import React from 'react';

const TemplateVideo = ({ slide }) => {
  // Map category ID to string label
  const categoryLabels = {
    0: 'Graphic Design',
    1: 'PPT Deck Design',
    2: 'Motion Graphics',
    3: 'Other Design'
  };

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
        <div className="w-full relative z-10 group cursor-pointer">
          <div className="w-full aspect-video bg-black shadow-2xl overflow-hidden relative border border-white/5">
            {slide.video ? (
              <video
                src={slide.video}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <>
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
                />

                {/* Play Button Overlay - Large White Triangle */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-0 h-0 border-t-[30px] lg:border-t-[45px] border-t-transparent border-l-[50px] lg:border-l-[75px] border-l-white/90 border-b-[30px] lg:border-b-[45px] border-b-transparent ml-4 drop-shadow-2xl hover:scale-110 transition-transform duration-300"></div>
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default TemplateVideo;
