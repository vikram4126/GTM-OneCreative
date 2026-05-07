import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Template3 = ({ slide }) => {
  const containerRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current.children, 
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out' }
      );
      gsap.fromTo(rightRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, delay: 0.4, ease: 'power3.out' }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-white py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        
        {/* Left: Text */}
        <div ref={leftRef} className="w-full md:w-1/2">
          <h1 className="text-4xl lg:text-6xl font-bold text-[#00338d] mb-6">{slide.title}</h1>
          <div className="w-20 h-2 bg-[#00338d] mb-8"></div>
          <p className="text-xl text-gray-700 leading-relaxed">
            {slide.content}
          </p>
        </div>

        {/* Right: Image */}
        <div ref={rightRef} className="w-full md:w-1/2">
          <div className="w-full aspect-[4/5] rounded-xl overflow-hidden shadow-xl">
            <img 
              src={`images/slider-items/${slide.image}`} 
              alt={slide.title} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Template3;
