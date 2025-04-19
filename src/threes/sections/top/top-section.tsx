import React, { useState } from 'react';
import './top-section.css';
import { TOP_MENU_ITEMS, MenuItem } from '@/threes/sections/top/top-menu-config';
import { TOP_ICONS, IconItem } from '@/threes/sections/top/top-icons-config';
import { Popover } from 'antd';

const TopSection = () => {
  const [hoverTip, setHoverTip] = useState<string | null>(null);
  const [hoverTimer, setHoverTimer] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (tips?: string) => {
    if (!tips) return;
    setHoverTimer(setTimeout(() => setHoverTip(tips), 1500));
  };

  const handleMouseLeave = () => {
    if (hoverTimer) clearTimeout(hoverTimer);
    setHoverTip(null);
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', width: '100%', height: '20px', background: 'rgb(245, 245, 245)', fontSize: '10px', userSelect: 'none' }}>
        <div className='top-section-logo-icon'>
          <img draggable="false" width="15px" height="15px" style={{ width: '15px', height: '15px' }} src="https://woda-app-public.oss-cn-shanghai.aliyuncs.com/wodedagong/resource/20250419/64a826f6-e29e-4a65-ad3c-fba5bb64ed53.svg" />
        </div>
        {TOP_MENU_ITEMS.map((item: MenuItem, index) => (
          <Popover key={index} content={hoverTip} open={hoverTip === item.tips}> {/* 使用 open 替代 visible */}
            <div
              className='top-section-title-item'
              onMouseEnter={() => handleMouseEnter(item.tips)}
              onMouseLeave={handleMouseLeave}
            >
              <span>{item.label}</span><span style={{ color: 'gray' }}>({item.shortcut})</span>
            </div>
          </Popover>
        ))}
      </div>
      <div className='top-section-content'>
        {TOP_ICONS.map((icon : IconItem, index) => (
          <div key={index} className='top-section-logo-icon'>
            <img draggable="false" width="15px" height="15px" style={{ width: '15px', height: '15px' }} src={icon.src} alt={icon.alt} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSection;