import React from 'react';
import { TOP_ICONS, IconItem } from '@/threes/sections/top/menu-config/top-icons-config';

const TopSectionContent = () => {
  return (
    <div className='top-section-content'>
      {TOP_ICONS.map((icon: IconItem, index) => (
        <div key={index} className='top-section-logo-icon'>
          <img draggable="false" width="15px" height="15px" style={{ width: '15px', height: '15px' }} src={icon.src} alt={icon.alt} />
        </div>
      ))}
    </div>
  );
};

export default TopSectionContent;