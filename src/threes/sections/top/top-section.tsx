import React, { useState } from 'react';
import './top-section.css';
import { TOP_MENU_ITEMS, MenuItem } from './top-menu-config';
import { Popover } from 'antd';

const TopSection = () => {
  const [hoverTip, setHoverTip] = useState<string | null>(null);
  const [hoverTimer, setHoverTimer] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (tips?: string) => {
    if (!tips) return;
    setHoverTimer(setTimeout(() => setHoverTip(tips), 500));
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
        {TOP_MENU_ITEMS.map((item, index) => (
          <Popover key={index} content={hoverTip} visible={hoverTip === item.tips}>
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
      <div style={{ 
        width: '100%', 
        height: 'calc(100% - 20px)', 
        background: 'rgb(212, 208, 200)', // 经典的 Windows 95 背景色
        border: '2px solid #808080', // 深灰色边框
        borderTop: 'none', // 去掉顶部边框
        boxShadow: 'inset 1px 1px #fff, inset -1px -1px #404040', // 内部阴影效果
        fontSize: '12px', // 小字体
        color: '#000', // 黑色字体
        boxSizing: 'border-box', // 包含内边距和边框
        display: 'flex',
        alignItems: 'center',
        borderLeft: 'none',
        borderRight: 'none',
      }}>
        
      </div>
    </div>
  );
};

export default TopSection;