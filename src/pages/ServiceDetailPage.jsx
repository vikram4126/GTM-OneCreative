import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SidebarMenu from '../components/SidebarMenu';
import { ServiceBanner, ServiceDetailSlider } from '../sections/ServiceSections';
import { SectionDesignStrategy } from '../sections/SpecializedSections';
import { SectionCreativeShowcase } from '../sections/SectionCreativeShowcase';
import { SectionFooter } from '../sections/SectionFooter';
import servicesData from '../data/services.json';
const footerBg = 'images/footer-bg.png';

import ukCreateSlides from '../data/uk_create_slides.json';
import usCreativeSlides from '../data/us_creative_slides.json';
import usAdvisorySlides from '../data/us_advisory_slides.json';
import ukLearningSlides from '../data/uk_learning_slides.json';

const SHOWCASE_DATA_MAP = {
  'uk-create': ukCreateSlides,
  'us-creative-services': usCreativeSlides,
  'us-advisory-creative': usAdvisorySlides,
  'uk-learning-design': ukLearningSlides,
};

const ServiceDetailPage = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavbarDark, setIsNavbarDark] = useState(false);

  // Get icons for the current service from servicesData directly
  const serviceIcons = service || {};

  useEffect(() => {
    const foundService = servicesData.find(s => s.id === id);
    setService(foundService);
    
    // Scroll to top on mount or id change
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      setIsNavbarDark(window.scrollY > 64);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  if (!service) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#00338D] text-white">
        <h1 className="text-4xl font-bold">Service Not Found</h1>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-hidden">
      <Navbar onMenuToggle={toggleMenu} isScrolled={isNavbarDark} hideBurger={false} />
      <SidebarMenu isOpen={isMenuOpen} onToggle={toggleMenu} menuType="services" currentServiceId={id} />

      <main className="w-full relative scroll-smooth">
        {/* Section 1: Banner */}
        <ServiceBanner 
          title={service.banner.title} 
          description={service.banner.description}
          icon={serviceIcons.icon}
          bannerBg={service.bannerBg}
        />

        {/* Section 1: Pillar Design Strategy */}
        <section id="pillars" className="snap-section">
          <SectionDesignStrategy 
            customData={service.details.map(detail => ({
              title: detail.title,
              img: detail.image,
              intro: detail.desc,
              popupTitle: detail.popupData?.title,
              popupIntro: detail.popupData?.intro,
              highlights: detail.popupData?.highlights || [],
              technologies: detail.popupData?.technologies || [],
              galleryImages: detail.popupData?.galleryImages || []
            }))} 
            customBgColor={service.pillarBgColor}
          />
        </section>

        {/* Section 3: Creative Showcase */}
        <SectionCreativeShowcase 
          slidesDataCustom={SHOWCASE_DATA_MAP[id] || []} 
          customHeading={`${service.title} Showcase`}
          showTabs={false}
        />

        {/* Section 4: Footer */}
        <section 
          id="footer"
          className="snap-section"
          style={{ 
            backgroundImage: `url(${footerBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: '#FFFFFF'
          }}
        >
          <SectionFooter contactIds={service.contactIds} />
        </section>
      </main>
    </div>
  );
};

export default ServiceDetailPage;
