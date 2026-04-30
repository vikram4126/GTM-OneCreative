import React from 'react';
import { Link } from 'react-router-dom';
import kpmgLogo from '../assets/kpmg-logo.svg';

const Navbar = ({ onMenuToggle, isScrolled = false, showHomeButton = false, hideBurger = false }) => {
  const iconColor = '#00338D';

  return (
    <nav 
      className="fixed top-0 left-0 w-full z-[100] transition-all duration-300 pointer-events-none bg-white border-b border-gray-200 shadow-sm"
    >
      <div className="container mx-auto py-5 flex justify-between items-center pointer-events-auto px-6 lg:px-12">
        
        {/* KPMG SVG Logo */}
        <Link to="/" className="h-10 w-auto flex items-center" style={{ textDecoration: 'none' }}>
          <img
            src={kpmgLogo}
            alt="KPMG"
            className="h-full w-auto transition-all duration-300"
            style={{ 
              filter: 'brightness(0) saturate(100%) invert(14%) sepia(86%) saturate(1583%) hue-rotate(208deg) brightness(91%) contrast(101%)'
            }}
          />
        </Link>

        {/* Right side actions */}
        <div className="flex items-center gap-4">
          {/* Home Button — shown on service/project pages */}
          {showHomeButton && (
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-all duration-300 hover:opacity-70"
              style={{ 
                color: iconColor, 
                fontFamily: 'var(--font-heading)',
                textDecoration: 'none',
                letterSpacing: '0.02em'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              Home
            </Link>
          )}

          {/* Hamburger Menu — hidden on service/project pages */}
          {!hideBurger && (
            <button
              onClick={onMenuToggle}
              aria-label="Open Menu"
              className="flex flex-col gap-1.5 p-2 bg-transparent border-none cursor-pointer group"
            >
              <div 
                className="w-7 h-[3px] transition-all duration-300" 
                style={{ backgroundColor: iconColor }} 
              />
              <div 
                className="w-5 h-[3px] self-end transition-all duration-300" 
                style={{ backgroundColor: iconColor }} 
              />
              <div 
                className="w-7 h-[3px] transition-all duration-300" 
                style={{ backgroundColor: iconColor }} 
              />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
