import React from 'react';
import CreativeSlider from '../components/CreativeSlider';

export const SectionCreativeShowcase = (props) => {
  return (
    <section id="creative-showcase">
      <CreativeSlider {...props} />
    </section>
  );
};
