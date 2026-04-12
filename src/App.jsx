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
  const scrollerRef = React.useRef(null);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  React.useEffect(() => {
    const handleScroll = () => {
      if (scrollerRef.current) {
        setIsNavbarDark(scrollerRef.current.scrollTop > 64);
      }
    };
    
    const scroller = scrollerRef.current;
    if (scroller) {
      scroller.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (scroller) {
        scroller.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className="relative overflow-x-hidden">
      <Navbar onMenuToggle={toggleMenu} isScrolled={isNavbarDark} />
      <SidebarMenu isOpen={isMenuOpen} onToggle={toggleMenu} />

      <main ref={scrollerRef} className="h-screen overflow-y-auto overflow-x-hidden scroll-smooth">

        {/* 1. Hero — GSAP animation */}
        <div id="home">
          <SectionHero />
        </div>

        {/* 2. Design Strategy */}
        <div id="pillars">
          <SectionDesignStrategy />
        </div>

        {/* 3. Exploring New Possibilities */}
        <div id="exploring">
          <SectionExploring />
        </div>

        {/* 4. Attention Section */}
        <div id="attention">
          <SectionAttention />
        </div>

        {/* 5. Inspiration Meets Technology */}
        <div id="services">
          <SectionInspiration />
        </div>

        {/* 6. Creative Showcase */}
        <div id="creative-showcase" className="bg-[#00B8F5] h-screen flex items-center justify-center py-16">
          <div className="container mx-auto">
            <h1
              className="content-creation-title text-white text-center uppercase"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', fontWeight: 900, lineHeight: 1 }}
            >
              Creative Showcase
            </h1>
          </div>
        </div>

      </main>
    </div>
  );
}

export default App;
