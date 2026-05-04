import React, { useMemo } from 'react';
import footerBg from '../assets/images/footer-bg.png';

export const MEMBER_MAP = {
  krishna: {
    name: 'Krishna Venkatrangan',
    role: 'Director,',
    company: 'OneCreative',
    img: '/images/krishana.jpeg'
  },
  shantanu: {
    name: 'Shantanu',
    role: 'Associate Director,',
    company: 'OneCreative',
    img: '/images/shantanu.jpeg'
  },
  shweta: {
    name: 'Shweta Gor',
    role: 'Associate Director,',
    company: 'OneCreative',
    img: '/images/shaweta.jpeg'
  }
};

const ALL_MEMBERS = Object.values(MEMBER_MAP);

export const SectionFooter = ({ contactIds, customMembers }) => {
  const members = useMemo(() => {
    // 1. Priority: full member objects passed directly
    if (customMembers && customMembers.length > 0) return customMembers;
    
    // 2. Priority: contact IDs passed to be resolved
    if (contactIds && contactIds.length > 0) {
      return contactIds.map(id => MEMBER_MAP[id]).filter(Boolean);
    }

    // 3. Fallback: random 2 members
    const shuffled = [...ALL_MEMBERS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
  }, [contactIds, customMembers]);

  return (
    <footer 
      id="footer"
      className="w-full relative"
    >

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Title */}
        <h2 
          className="text-[#00338d]"
          style={{ 
            fontFamily: 'var(--font-heading)',
            fontWeight: 900,
            fontSize: 'clamp(2.5rem, 5.5vw, 4.8rem)',
            lineHeight: 1.1,
            maxWidth: '600px',
            marginBottom: '60px' // Increased margin bottom
          }}
        >
          Opportunities for<br/>collaboration
        </h2>

        {/* Profile Cards */}
        <div className="flex flex-col md:flex-row gap-16 lg:gap-24">
          {members.map((m, idx) => (
            <div 
              key={idx}
              className="flex items-center"
              style={{ width: '100%', maxWidth: '500px' }}
            >
              {/* Photo Area with Top/Left border */}
              <div 
                className="shrink-0"
                style={{ 
                  width: '180px', 
                  height: '180px',
                  borderTop: '8px solid #1E49E2',
                  borderLeft: '8px solid #1E49E2',
                  position: 'relative',
                  zIndex: 1
                }}
              >
                <img 
                  src={m.img} 
                  alt={m.name} 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" 
                />
              </div>

              {/* Text Area - Overlapping by 10px */}
              <div 
                className="bg-[#1E49E2] flex flex-col justify-center relative"
                style={{ 
                  marginLeft: '-15px', // Overlap 10-15px
                  zIndex: 2,
                  minWidth: '280px',
                  padding: '24px', // Reduced padding
                  boxShadow: '15px 15px 40px rgba(0,0,0,0.1)'
                }}
              >
                <h3 className="text-white font-bold text-2xl mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{m.name}</h3>
                <p className="text-white/90 text-sm font-semibold" style={{ fontFamily: 'var(--font-body)' }}>{m.role}</p>
                <p className="text-white/90 text-sm font-semibold mb-4" style={{ fontFamily: 'var(--font-body)' }}>{m.company}</p>
                
                {/* Email Icon */}
                <div>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Disclaimer */}
      <div className="container mx-auto px-6 lg:px-12 mt-20 relative z-10">
        <p className="text-gray-400 text-xs leading-relaxed max-w-2xl" style={{ fontFamily: 'var(--font-body)' }}>
          Disclaimer - Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book..
        </p>
      </div>
    </footer>
  );
};
