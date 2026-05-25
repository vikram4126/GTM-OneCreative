import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SidebarMenu = ({ isOpen, onToggle, activeSection, hideSections = false }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const allMenuItems = [
    { label: 'Introduction', id: 'storytelling' },
    { label: 'Pillars', id: 'pillars' },
    { label: 'Services', id: 'services' },
    { label: 'Creative Showcase', id: 'creative-showcase' },
    { label: 'Exploring', id: 'exploring' },
    { label: 'Get in touch', id: 'footer', className: 'get-in-touch' },
    { label: 'Home', id: 'storytelling', className: 'home-link' },
  ];

  const menuItems = hideSections
    ? allMenuItems.filter(item => item.label === 'Home')
    : allMenuItems;

  const handleLinkClick = (id) => {
    if (location.pathname === '/') {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      navigate(`/#${id}`);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
    onToggle();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`menu-overlay ${isOpen ? 'show' : ''}`}
        onClick={onToggle}
      />

      {/* Drawer */}
      <div className={`drawer-menu ${isOpen ? 'open' : ''} h-full p-10 flex flex-col`}>
        {/* Close */}
        <button
          onClick={onToggle}
          className="self-end p-2 bg-white/20 hover:bg-white/30 rounded-sm mb-6 transition-all"
          aria-label="Close menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Nav Links */}
        <nav className="flex-1 flex flex-col overflow-y-auto pt-4 pb-4">
          {menuItems.filter(item => item.label !== 'Home').map((item) => (
            <div
              key={item.id}
              className={`menu-item ${item.className || ''}`}
              onClick={() => handleLinkClick(item.id)}
            >
              {item.label}
            </div>
          ))}
        </nav>

        {/* Home — pinned to bottom */}
        <div
          className="menu-item home-link"
          onClick={() => handleLinkClick('storytelling')}
        >
          Home
        </div>
      </div>
    </>
  );
};

export default SidebarMenu;
