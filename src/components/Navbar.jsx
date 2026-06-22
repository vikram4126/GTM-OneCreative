import React from 'react';
import { Link } from 'react-router-dom';
import kpmgLogo from '../assets/kpmg-logo.svg';

const Navbar = ({ onMenuToggle, isScrolled = false, showHomeButton = false, hideBurger = false }) => {
  const iconColor = '#00338D';

  return (
    <nav
      className="fixed top-0 left-0 w-full z-[100] transition-all duration-300 pointer-events-none bg-white border-b border-gray-200 shadow-sm"
    >
      <div className="container mx-auto py-4 flex justify-between items-center pointer-events-auto px-6 lg:px-12">

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
          {/* Hamburger Menu — hidden on service/project pages */}
          {!hideBurger && (
            <button
              onClick={onMenuToggle}
              aria-label="Open Menu"
              className="p-2 bg-transparent border-none cursor-pointer group flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke={iconColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-300 group-hover:opacity-80"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
