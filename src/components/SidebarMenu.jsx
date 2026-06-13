import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SidebarMenu = ({ isOpen, onToggle, activeSection, menuType = 'default', currentServiceId }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const allMenuItems = [
    { label: 'Introduction', id: 'storytelling' },
    { label: 'Pillars', id: 'pillars' },
    { label: 'Services', id: 'services' },
    { label: 'Creative Showcase', id: 'creative-showcase' },
    { label: 'Exploring', id: 'exploring' },
    { label: 'Get in touch', id: 'footer', className: 'get-in-touch' },
  ];

  const servicesMenuItems = [
    { label: 'UK Create', path: '/service/uk-create', id: 'uk-create' },
    { label: 'UK Learning', path: '/service/uk-learning-design', id: 'uk-learning-design' },
    { label: 'US Creative', path: '/service/us-creative-services', id: 'us-creative-services' },
    { label: 'US Advisory', path: '/service/us-advisory-creative', id: 'us-advisory-creative' },
  ];

  const menuItems = menuType === 'services' ? servicesMenuItems : allMenuItems;

  const handleLinkClick = (item) => {
    if (item.path) {
      navigate(item.path);
    } else {
      const id = item.id;
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
          {menuItems.map((item) => {
            const isActive = menuType === 'services'
              ? currentServiceId === item.id
              : activeSection === item.id;
            return (
              <div
                key={item.id}
                className={`menu-item ${item.className || ''} ${isActive ? 'active' : ''}`}
                onClick={() => handleLinkClick(item)}
              >
                {item.label}
              </div>
            );
          })}
        </nav>

        {/* Home — pinned to bottom */}
        <div
          className="menu-item home-link"
          onClick={() => handleLinkClick({ path: '/' })}
        >
          Home
        </div>
      </div>
    </>
  );
};

export default SidebarMenu;
