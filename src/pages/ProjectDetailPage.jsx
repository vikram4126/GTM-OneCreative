import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import slidesData from '../data/slides.json';
import homeSlides from '../data/home_slides.json';
import ukCreateSlides from '../data/uk_create_slides.json';
import usCreativeSlides from '../data/us_creative_slides.json';
import usAdvisorySlides from '../data/us_advisory_slides.json';
import ukLearningSlides from '../data/uk_learning_slides.json';

// Create a mapping of source keys to their respective data arrays
const DATA_SOURCES = {
  'home': homeSlides,
  'uk-create': ukCreateSlides,
  'us-creative': usCreativeSlides,
  'us-advisory': usAdvisorySlides,
  'uk-learning': ukLearningSlides,
  'default': slidesData
};

// Flatten all slides and tag them with their source for easy identification
// We prioritize specific sources (home, uk-create, etc.) over the default slides.json 
// in case there are duplicate IDs. This ensures the correct context for "More Projects".
const ALL_SLIDES = [
  ...homeSlides.map(s => ({ ...s, source: 'home' })),
  ...ukCreateSlides.map(s => ({ ...s, source: 'uk-create' })),
  ...usCreativeSlides.map(s => ({ ...s, source: 'us-creative' })),
  ...usAdvisorySlides.map(s => ({ ...s, source: 'us-advisory' })),
  ...ukLearningSlides.map(s => ({ ...s, source: 'uk-learning' })),
  ...slidesData.map(s => ({ ...s, source: 'default' })),
];

import Template1 from '../components/templates/Template1';
import Template2 from '../components/templates/Template2';
import Template3 from '../components/templates/Template3';
import TemplateVideo from '../components/templates/TemplateVideo';
import TemplateGallery from '../components/templates/TemplateGallery';
import TemplateDefault from '../components/templates/TemplateDefault';
import CreativeSlider from '../components/CreativeSlider';
import Navbar from '../components/Navbar';
import SidebarMenu from '../components/SidebarMenu';
import { SectionFooter } from '../sections/SectionFooter';
const footerBg = 'images/footer-bg.png';

const templateMap = {
  template1: Template1,
  template2: Template2,
  template3: Template3,
  video: TemplateVideo,
  gallery: TemplateGallery,
};

const ProjectDetailPage = () => {
  const { id } = useParams();

  const slide = ALL_SLIDES.find(s => s.id === id);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavbarDark, setIsNavbarDark] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsNavbarDark(window.scrollY > 64);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!slide) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-[#00338d]">
        <Navbar onMenuToggle={toggleMenu} isScrolled={isNavbarDark} hideBurger={false} />
        <SidebarMenu isOpen={isMenuOpen} onToggle={toggleMenu} menuType="services" />
        <h1 className="text-6xl font-bold mb-4 mt-20">404</h1>
        <p className="text-xl mb-8">Project not found.</p>
        <Link to="/" className="px-6 py-3 bg-[#00338d] text-white rounded font-bold hover:bg-blue-800 transition">
          Return Home
        </Link>
      </div>
    );
  }

  // Determine the template component
  const TemplateComponent = templateMap[slide.template] || TemplateDefault;

  // Contextual source data for the "More Projects" slider
  const moreProjectsData = DATA_SOURCES[slide.source] || slidesData;

  return (
    <div className="w-full relative bg-white">
      <Navbar onMenuToggle={toggleMenu} isScrolled={isNavbarDark} hideBurger={false} />
      <SidebarMenu isOpen={isMenuOpen} onToggle={toggleMenu} menuType="services" />

      {/* Dynamic Template Banner */}
      <div className="pt-20">
        <TemplateComponent slide={slide} />
      </div>

      {/* Contextual Slider: only shows projects from the same source (Home, specific Service, etc.) */}
      <div className="mt-0 border-t border-gray-100">
        <CreativeSlider
          showTabs={false}
          fixedCategoryId={slide.source === 'home' ? slide.categoryId : undefined}
          slidesDataCustom={moreProjectsData}
          customHeading="More Projects"
        />
      </div>

      {/* Sync Footer with Home Page Footer */}
      <section
        id="footer"
        className="snap-section"
        style={{
          backgroundImage: `url(${footerBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#FFFFFF',
          padding: '80px 0'
        }}
      >
        <SectionFooter contactIds={slide.contactIds} customMembers={slide.contacts} />
      </section>
    </div>
  );
};

export default ProjectDetailPage;
