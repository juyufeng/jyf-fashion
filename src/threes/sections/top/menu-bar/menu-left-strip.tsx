import React, { useState } from 'react';
import { TOP_MENU_ITEMS, MenuItem, DropdownItem } from '@/threes/sections/top/menu-config/top-menu-config';
import { Popover, Dropdown } from 'antd';

const MenuLeftStrip: React.FC = () => {
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
    <>
      {TOP_MENU_ITEMS.map((item: MenuItem, index) => {
        const menuItems = item.dropdownItems?.map((dropdownItem: DropdownItem, idx) => ({
          key: idx,
          label: (
            <div style={{ fontSize: '12px' }}>
              <span>{dropdownItem.label}</span>
              <span style={{ color: 'gray', marginLeft: '8px' }}>{dropdownItem.tips}</span>
            </div>
          )
        }));

        return (
          <Dropdown
            key={index}
            menu={{ items: menuItems }} // 使用结构化数据
            trigger={['click']} // 修改为点击触发
          >
            <Popover content={hoverTip} open={hoverTip === item.tips}>
              <div
                className='top-section-title-item'
                onMouseEnter={() => handleMouseEnter(item.tips)}
                onMouseLeave={handleMouseLeave}
              >
                <span>{item.label}</span><span style={{ color: 'gray' }}>({item.shortcut})</span>
              </div>
            </Popover>
          </Dropdown>
        );
      })}
    </>
  );
};

export default MenuLeftStrip;