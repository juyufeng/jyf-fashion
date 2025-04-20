import React, { useState } from 'react';
import { Popover } from 'antd'; // 引入 Popover 组件
import { ICON_CONFIGS } from '@/threes/sections/top/menu-config/top-menu-right-strip-config'; // 引入配置文件
import  LayoutStore from '@/stores/layout-store';
import { MenuRightStripType } from '@/enums/menu-right-strip-enums';
import { LAYOUT_MODE } from '@/constants/layout';

const MenuRightStripStyle = {
  position: 'absolute',
  right: 0,
  top: 0,
  height: '20px',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'rgb(245,245,245)',
} as const;

const IconBoxStyle = {
  width: '20px',
  height: '20px',
  marginRight: '3px',
  overflow: 'hidden',
} as const;

const MenuRightStrip: React.FC = () => {
  const [visiblePopover, setVisiblePopover] = useState<string | null>(null);
  const [hoverTimer, setHoverTimer] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (key: string) => {
    setHoverTimer(setTimeout(() => setVisiblePopover(key), 1500));
  };

  const handleMouseLeave = () => {
    if (hoverTimer) clearTimeout(hoverTimer);
    setVisiblePopover(null);
  };

  const handleMenuRightStrip = (key: string) => {
    switch (key) {
      case MenuRightStripType.OnlyDomainView:
        LayoutStore.setCurrentLayoutMode(LAYOUT_MODE.ONLY_DOMAIN);
        break;
      case MenuRightStripType.ChatAiInsertLeftView:
        LayoutStore.setCurrentLayoutMode(LAYOUT_MODE.LEFT_CHAT_RIGHT_DOMAIN);
        break;
      case MenuRightStripType.ChatAiInsertRightView:
        LayoutStore.setCurrentLayoutMode(LAYOUT_MODE.LEFT_DOMAIN_RIGHT_CHAT);
        break;
      // 可以在这里添加更多的case
      default:
        // 默认情况下的处理
        break;
    }
  }

  return (
    <div style={MenuRightStripStyle}>
      {ICON_CONFIGS.map(({ key, content, icon }) => (
        <div
          key={key}
          style={IconBoxStyle}
          onClick={() => handleMenuRightStrip(key)}
          onMouseEnter={() => handleMouseEnter(key)}
          onMouseLeave={handleMouseLeave}
        >
          <Popover content={content} trigger="hover" placement="bottomLeft" open={visiblePopover === key}>
            <div>
              {icon}
            </div>
          </Popover>
        </div>
      ))}
    </div>
  );
};

export default MenuRightStrip;