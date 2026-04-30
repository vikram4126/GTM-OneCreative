import React from 'react';

const ImageCard = React.forwardRef(({ image, title, className, id, style }, ref) => {
  return (
    <div 
      ref={ref}
      id={id}
      className={`moving-image relative group ${className}`}
      style={style}
    >
      <img src={image} alt={title} className="w-full h-full object-cover" />
      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-blue-navy/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-white text-sm font-medium">{title}</p>
      </div>
      
      {/* Decorative Border */}
      <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/40 rounded-2xl transition-all duration-300 pointer-events-none" />
    </div>
  );
});

ImageCard.displayName = 'ImageCard';

export default ImageCard;
