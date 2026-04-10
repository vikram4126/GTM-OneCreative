import React from 'react';
import kpmgLogo from '../assets/kpmg-logo.svg';

const Navbar = ({ onMenuToggle, isDark = false }) => {
  // KPMG Corporate Blue: #00338D
  const iconColor = isDark ? '#00338D' : '#FFFFFF';

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] pointer-events-none">
      <div className="max-w-[1152px] mx-auto px-6 py-4 flex justify-between items-center pointer-events-auto">
        
        {/* KPMG SVG Logo */}
        <div className="h-10 w-auto flex items-center">
          <img
            src={kpmgLogo}
            alt="KPMG"
            className="h-full w-auto transition-all duration-300"
            style={{ 
              filter: isDark 
                ? 'brightness(0) saturate(100%) invert(13%) sepia(85%) saturate(1637%) hue-rotate(211deg) brightness(97%) contrast(106%)' 
                : 'brightness(0) invert(1)' 
            }}
          />
        </div>

        {/* Hamburger Menu */}
        <button
          onClick={onMenuToggle}
          aria-label="Open Menu"
          className="flex flex-col gap-1.5 p-2 bg-transparent border-none cursor-pointer group"
        >
          <div 
            className="w-7 h-0.5 transition-all duration-300" 
            style={{ backgroundColor: iconColor }} 
          />
          <div 
            className="w-5 h-0.5 self-end transition-all duration-300" 
            style={{ backgroundColor: iconColor }} 
          />
          <div 
            className="w-7 h-0.5 transition-all duration-300" 
            style={{ backgroundColor: iconColor }} 
          />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
