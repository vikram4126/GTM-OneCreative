import React, { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ATTENTION_ITEMS = [
  { text: "Stories that inspire action.", id: 0 },
  { text: "Learning that turns knowledge into impact.", id: 1 },
  { text: "Designs that capture attention.", highlight: "Designs", id: 2 },
  { text: "Motion that brings ideas to life.", id: 3 },
  { text: "Digital experiences that connect.", id: 4 },
];

const SectionAttention = () => {
  const containerRef = useRef(null);
  const headingsRef = useRef([]);
  const barsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const headings = headingsRef.current;
      const bars = barsRef.current;
      const totalItems = ATTENTION_ITEMS.length;

      // Initial state
      gsap.set(headings, { 
        opacity: 0.3, 
        scale: 0.8, 
        color: "#FFFFFF" 
      });

      // Pin the whole container
      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${totalItems * 100}%`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const index = Math.min(
            Math.floor(progress * totalItems),
            totalItems - 1
          );
          setActiveIndex(index);
        }
      });

      // Simple timeline for each heading
      ATTENTION_ITEMS.forEach((_, i) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: `top+=${i * (100 / totalItems)}% top`,
            end: `top+=${(i + 1) * (100 / totalItems)}% top`,
            scrub: 1,
          }
        });

        // Current item becomes active
        tl.to(headings[i], {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power2.out"
        })
        .to(bars[i], {
          height: 3,
          backgroundColor: "#FFFFFF",
          opacity: 1,
          duration: 0.5,
          ease: "power2.out"
        }, 0);

        // Current item becomes inactive as we move to next
        tl.to(headings[i], {
          opacity: 0.3,
          scale: 0.8,
          duration: 0.5,
          ease: "power2.in"
        }, 0.5)
        .to(bars[i], {
          height: 1,
          backgroundColor: "rgba(255,255,255,0.3)",
          opacity: 0.4,
          duration: 0.5,
          ease: "power2.in"
        }, 0.5);
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleBarClick = (index) => {
    const scroller = document.getElementById('main-scroller');
    if (scroller && containerRef.current) {
      const sectionTop = containerRef.current.offsetTop;
      const totalItems = ATTENTION_ITEMS.length;
      const scrollHeight = window.innerHeight * totalItems;
      
      scroller.scrollTo({
        top: sectionTop + (index * window.innerHeight),
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen w-full bg-[#00B8F5] overflow-hidden flex items-center justify-center p-0 m-0"
    >
      {/* Background radial gradient for premium feel */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)] pointer-events-none" />

      {/* Main Content Area */}
      <div className="relative w-full max-w-7xl px-8 flex flex-col items-center justify-center h-full">
        <div className="flex flex-col items-center gap-6">
          {ATTENTION_ITEMS.map((item, i) => (
            <h2
              key={item.id}
              ref={el => headingsRef.current[i] = el}
              className="content-creation-title text-center uppercase tracking-tight leading-[1] select-none"
              style={{ 
                fontSize: 'clamp(1.5rem, 5vw, 4.2rem)',
                fontWeight: 800,
                willChange: 'transform, opacity'
              }}
            >
              {item.highlight ? (
                <>
                  <span className="text-[#ACEAFF]">{item.highlight}</span>{" "}
                  {item.text.replace(item.highlight, "").trim()}
                </>
              ) : (
                item.text
              )}
            </h2>
          ))}
        </div>
      </div>

      {/* Barcode Navigation (Right Side) */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-[60]">
        {ATTENTION_ITEMS.map((_, i) => (
          <div
            key={i}
            ref={el => barsRef.current[i] = el}
            onClick={() => handleBarClick(i)}
            className="w-16 h-[2px] cursor-pointer transition-all duration-300 hover:opacity-100"
            style={{ 
              backgroundColor: "rgba(255,255,255,0.3)",
              opacity: 0.4
            }}
          />
        ))}
        {/* Optional vertical line connecting bars */}
        <div className="absolute right-[50%] top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2 -z-10" />
      </div>

    </section>
  );
};

export default SectionAttention;
