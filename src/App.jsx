import React, { useState } from 'react';
import Navbar from './components/Navbar';
import SidebarMenu from './components/SidebarMenu';
import { SectionHero } from './sections/HeroSection';
import {
  SectionDesignStrategy,
  SectionExploring,
  SectionInspiration,
} from './sections/SpecializedSections';
import SectionAttention from './sections/SectionAttention';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavbarDark, setIsNavbarDark] = useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="relative overflow-x-hidden">
      <Navbar onMenuToggle={toggleMenu} isDark={isNavbarDark} />
      <SidebarMenu isOpen={isMenuOpen} onToggle={toggleMenu} />

      <main className="snap-y snap-mandatory snap-always h-screen overflow-y-auto overflow-x-hidden scroll-smooth">

        {/* 1. Hero — GSAP animation */}
        <div id="home" className="snap-start snap-always">
          <SectionHero onVisible={() => setIsNavbarDark(true)} onHidden={() => setIsNavbarDark(false)} />
        </div>

        {/* 2. Design Strategy */}
        <div id="pillars" className="snap-start snap-always">
          <SectionDesignStrategy />
        </div>

        {/* 3. Exploring New Possibilities */}
        <div className="snap-start snap-always">
          <SectionExploring />
        </div>

        {/* 4. Attention Section (New) */}
        <div id="attention" className="snap-start snap-always">
          <SectionAttention />
        </div>

        {/* 5. Inspiration Meets Technology */}
        <div id="services" className="snap-start snap-always">
          <SectionInspiration />
        </div>

        {/* 5. Creative Showcase */}
        <div id="creative-showcase" className="snap-start snap-always bg-[#00B8F5] h-screen flex items-center justify-center px-8 py-16">
          <h1
            className="content-creation-title text-white text-center uppercase"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', fontWeight: 900, lineHeight: 1 }}
          >
            Creative Showcase
          </h1>
        </div>

      </main>
    </div>
  );
}

export default App;
