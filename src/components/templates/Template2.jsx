import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Template2 = ({ slide }) => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current.children, 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out' }
      );
      gsap.fromTo(imageRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, delay: 0.6, ease: 'power2.out' }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-[#f8f9fa] py-20 px-6 flex flex-col items-center">
      <div ref={contentRef} className="max-w-3xl w-full text-center">
        <h1 className="text-5xl font-extrabold text-[#00338d] mb-8">{slide.title}</h1>
        <p className="text-xl text-gray-600 mb-12">{slide.content}</p>
        
        <div ref={imageRef} className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl relative">
          <img 
            src={`/images/slider-items/${slide.image}`} 
            alt={slide.title} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Template2;
