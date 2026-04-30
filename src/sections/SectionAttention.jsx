import React, { useRef, useState, useLayoutEffect } from 'react';
import { gsap } from 'gsap';

const ATTENTION_ITEMS = [
  { text: "Stories that inspire action.", id: 0 },
  { text: "Learning that turns knowledge into impact.", id: 1 },
  { text: "Designs that capture attention.", highlight: "Designs", id: 2 },
  { text: "Motion that brings ideas to life.", id: 3 },
  { text: "Digital experiences that connect.", id: 4 },
  { text: "Strategy that defines the future.", id: 5 },
  { text: "Innovation that drives progress.", id: 6 },
  { text: "Technology that empowers change.", id: 7 },
  { text: "Creativity that sparks growth.", id: 8 },
];

const SectionAttention = () => {
  const containerRef = useRef(null);
  const headingsRef = useRef([]);
  const barsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(2); // Focus on 'Designs' by default? Or none.

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const headings = headingsRef.current;
      const bars = barsRef.current;

      // Animate active index changes
      headings.forEach((heading, i) => {
        const isActive = activeIndex === i;
        gsap.to(heading, {
          opacity: isActive ? 1 : 0.15,
          scale: isActive ? 1.15 : 0.85,
          duration: 0.5,
          ease: "power2.out",
          overwrite: true
        });

        // Bar interaction
        gsap.to(bars[i], {
          backgroundColor: isActive ? "#00B8F5" : "rgba(255,255,255,0.3)",
          opacity: isActive ? 1 : 0.4,
          height: isActive ? 4 : 2,
          duration: 0.3,
          ease: "power2.out",
          overwrite: true
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [activeIndex]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen w-full bg-[#00338D] overflow-hidden flex items-center justify-center p-0 m-0"
    >
      {/* Subtle radial backdrop for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,184,245,0.1),transparent)] pointer-events-none" />

      {/* Main Content Area (9 Items) */}
      <div className="container relative mx-auto flex flex-col items-center justify-center h-full">
        <div className="flex flex-col items-center gap-4 py-8">
          {ATTENTION_ITEMS.map((item, i) => (
            <h2
              key={item.id}
              ref={el => headingsRef.current[i] = el}
              onMouseEnter={() => setActiveIndex(i)}
              className="content-creation-title text-center uppercase tracking-tight leading-[1.05] select-none cursor-pointer px-4"
              style={{ 
                fontSize: 'clamp(1.4rem, 4.2vw, 3.8rem)',
                fontWeight: 900,
                willChange: 'transform, opacity',
                transition: 'color 0.3s ease'
              }}
            >
              {item.highlight ? (
                <>
                  <span className="text-[#00B8F5]" style={{ color: activeIndex === i ? '#00B8F5' : '#FFFFFF', opacity: activeIndex === i ? 1 : 0.7 }}>{item.highlight}</span>{" "}
                  {item.text.replace(item.highlight, "").trim()}
                </>
              ) : (
                item.text
              )}
            </h2>
          ))}
        </div>
      </div>

      {/* Barcode Navigation (Right Side) - Matches 9 items */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-[60]">
        {ATTENTION_ITEMS.map((_, i) => (
          <div
            key={i}
            ref={el => barsRef.current[i] = el}
            onMouseEnter={() => setActiveIndex(i)}
            className="w-12 h-[2px] cursor-pointer transition-all duration-300"
          />
        ))}
      </div>

    </section>
  );
};

export default SectionAttention;
