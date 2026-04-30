import React, { useEffect } from 'react';

/* ── Dynamic image imports for gallery ── */
const imageModules = import.meta.glob('../assets/images/*.{jpg,jpeg,png}', { eager: true });

const getImage = (filename) => {
  const key = Object.keys(imageModules).find(k => k.endsWith(`/${filename}`));
  return key ? imageModules[key].default : '';
};

const PillarPopup = ({ isOpen, onClose, data }) => {
  // Prevent body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen || !data) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(6px)',
          zIndex: 9998,
          animation: 'fadeIn 0.3s ease',
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '92vw',
          maxWidth: '1100px',
          maxHeight: '90vh',
          backgroundColor: '#aceaff',
          zIndex: 9999,
          overflowY: 'auto',
          boxShadow: '0 30px 80px rgba(0,0,0,0.3)',
          animation: 'popupSlideIn 0.35s ease',
        }}
      >
        {/* ── Close Button (top-right rectangle) ── */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            width: 44,
            height: 44,
            backgroundColor: '#00338D',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            transition: 'background-color 0.2s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1E49E2'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#00338D'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* ── Content ── */}
        <div style={{ padding: '30px 40px 30px' }}>

          {/* Title - Full Width */}
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            fontWeight: 900,
            color: '#00338D',
            lineHeight: 1.1,
            marginBottom: 24,
            whiteSpace: 'nowrap',
          }}>
            {data.title}
          </h2>

          {/* Two-column layout: 60/40 */}
          <div style={{
            display: 'flex',
            gap: 40,
            alignItems: 'flex-start',
          }}>

            {/* ════ LEFT COLUMN (60%) ════ */}
            <div style={{ flex: '0 0 58%', maxWidth: '58%' }}>

              {/* Intro text */}
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                lineHeight: 1.7,
                color: '#333',
                marginBottom: 28,
              }}>
                {data.intro}
              </p>

              {/* Divider */}
              <div style={{ width: '100%', height: 2, background: '#00338D', marginBottom: 28 }} />

              {/* ── Highlights ── */}
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.4rem',
                fontWeight: 800,
                color: '#0C233C',
                marginBottom: 18,
              }}>
                Highlights
              </h3>

              {/* Highlight boxes — 5 per row */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 10,
                marginBottom: 28,
              }}>
                {data.highlights.map((h, i) => (
                  <div
                    key={i}
                    style={{
                      width: 'calc((100% - 40px) / 5)',
                      minWidth: 90,
                      border: '1.5px solid #00338D',
                      padding: '14px 10px',
                      textAlign: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <div style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.6rem',
                      fontWeight: 800,
                      color: '#00338D',
                      lineHeight: 1.2,
                    }}>
                      {h.number}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.7rem',
                      color: '#555',
                      marginTop: 4,
                      lineHeight: 1.3,
                    }}>
                      {h.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div style={{ width: '100%', height: 1, background: '#ddd', marginBottom: 28 }} />

              {/* ── Key Technologies and Talent Pool ── */}
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.4rem',
                fontWeight: 800,
                color: '#0C233C',
                marginBottom: 18,
              }}>
                Key Technologies and Talent pool
              </h3>

              {/* Tech table rows — 30/70 split with bottom border */}
              <div style={{ marginBottom: 28 }}>
                {data.technologies.map((tech, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: 16,
                      borderBottom: '1px solid #00338D',
                      padding: '12px 0',
                    }}
                  >
                    <div style={{
                      flex: '0 0 30%',
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      color: '#0C233C',
                    }}>
                      {tech.name}
                    </div>
                    <div style={{
                      flex: '0 0 70%',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.85rem',
                      color: '#555',
                      lineHeight: 1.5,
                    }}>
                      {tech.description}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                style={{
                  padding: '14px 36px',
                  backgroundColor: '#00338D',
                  color: '#FFFFFF',
                  border: 'none',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1E49E2'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#00338D'}
              >
                View More
              </button>
            </div>

            {/* ════ RIGHT COLUMN (40%) — 3 vertical images ════ */}
            <div style={{
              flex: '0 0 38%',
              maxWidth: '38%',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}>
              {data.galleryImages.map((img, i) => (
                <div
                  key={i}
                  style={{
                    width: '100%',
                    aspectRatio: '16 / 10',
                    overflow: 'hidden',
                    border: '2px solid #00338D',
                  }}
                >
                  <img
                    src={getImage(img)}
                    alt={`${data.title} gallery ${i + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Animations ── */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popupSlideIn {
          from { opacity: 0; transform: translate(-50%, -48%); }
          to { opacity: 1; transform: translate(-50%, -50%); }
        }
      `}</style>
    </>
  );
};

export default PillarPopup;
