import React, { useRef } from 'react';
import ImageCard from '../components/ImageCard';
import { useScrollTransfer } from '../hooks/useScrollTransfer';
import imagesData from '../data/images.json';

const TransferSection = () => {
  const sectionRef = useRef(null);
  const sourceBoxRef = useRef(null);
  const destinationBoxRef = useRef(null);

  useScrollTransfer(sectionRef, sourceBoxRef, destinationBoxRef, imagesData);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-sky rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      <div className="image-transfer-container relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Box A: Available */}
          <div className="flex flex-col">
            <h2 className="box-title italic">
              <span className="text-blue-medium">01.</span> Available
            </h2>
            <div 
              ref={sourceBoxRef}
              className="glass-box grid grid-cols-2 gap-6 p-6"
            >
              {imagesData.map((item, index) => (
                <div key={item.id} className="source-item-container aspect-[4/5] bg-blue-navy/5 rounded-2xl">
                  {/* Initial render in Box A */}
                  <ImageCard 
                    id={item.id}
                    image={item.image}
                    title={item.title}
                    className="source-item h-full w-full"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Box B: Showcase */}
          <div className="flex flex-col">
            <h2 className="box-title">
              <span className="text-pink">02.</span> Showcase
            </h2>
            <div 
              ref={destinationBoxRef}
              className="glass-box grid grid-cols-2 gap-6 p-6 border-pink/20"
            >
              {/* Empty slots that will receive items */}
              {imagesData.map((item) => (
                <div 
                  key={`slot-${item.id}`} 
                  className="dest-slot aspect-[4/5] rounded-2xl border-2 border-dashed border-blue-medium/10 bg-blue-medium/5 flex items-center justify-center"
                >
                  <span className="text-blue-medium/10 font-bold text-4xl select-none">?</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <p className="text-[10px] uppercase tracking-widest text-blue-medium font-bold mb-2">Scroll to Transfer</p>
        <div className="dot" />
        <div className="dot" />
        <div className="active-dot" />
      </div>
    </section>
  );
};

export default TransferSection;
