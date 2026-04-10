import { useEffect, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(ScrollTrigger, Flip);

export const useScrollTransfer = (triggerRef, sourceRef, destRef, items) => {
  useLayoutEffect(() => {
    if (!triggerRef.current || !sourceRef.current || !destRef.current || items.length === 0) return;

    const ctx = gsap.context(() => {
      // 1. Initial items in Box A
      const sourceItems = gsap.utils.toArray('.source-item');
      // Create empty slots in Box B (placeholders)
      const destSlots = gsap.utils.toArray('.dest-slot');

      // ScrollTrigger to pin the section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: `+=${items.length * 100}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        }
      });

      // Animate each image one by one
      sourceItems.forEach((item, index) => {
        const destSlot = destSlots[index];
        if (!destSlot) return;

        // Record Initial State
        const state = Flip.getState(item);

        // This is a bit tricky with scrub. 
        // We'll use a timeline where each item moves to its destination.
        
        tl.to(item, {
          scale: 1.1,
          boxShadow: "0 20px 40px rgba(0, 51, 141, 0.3)",
          duration: 0.2,
          ease: "power2.out"
        }, index)
        .add(() => {
          // FLIP core: Change parent/position
          destSlot.appendChild(item);
          
          Flip.from(state, {
            duration: 1,
            ease: "power3.inOut",
            absolute: true,
            onStart: () => {
              item.classList.add('moving');
            },
            onComplete: () => {
              item.classList.remove('moving');
              item.classList.add('glow-on-land');
            }
          });
        }, index + 0.2)
        .to(item, {
          scale: 1,
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          duration: 0.2,
          ease: "back.out(1.7)"
        }, index + 1.2);
      });
      
      // Bonus: Background parallax effect
      gsap.to(".bg-gradient", {
        backgroundPosition: "0% 100%",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    return () => ctx.revert();
  }, [items]);
};
