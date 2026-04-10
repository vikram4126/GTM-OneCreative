import React from 'react';

const SidebarMenu = ({ isOpen, onToggle }) => {
  const menuItems = [
    { label: 'Pillars',           id: 'pillars' },
    { label: 'Attention',         id: 'attention' },
    { label: 'Services',          id: 'services' },
    { label: 'Creative Showcase', id: 'creative-showcase' },
    { label: 'Get in touch',      id: 'get-in-touch', className: 'get-in-touch' },
    { label: 'Home',              id: 'home' },
  ];

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
          className="self-end p-3 bg-white/20 hover:bg-white/30 rounded-sm mb-10 transition-all"
          aria-label="Close menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Nav Links */}
        <nav className="flex flex-col gap-0">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className={`menu-item ${item.className || ''}`}
              onClick={onToggle}
            >
              {item.label}
            </div>
          ))}
        </nav>
      </div>
    </>
  );
};

export default SidebarMenu;
