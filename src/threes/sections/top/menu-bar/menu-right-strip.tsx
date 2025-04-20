import React, { useState } from 'react';
import { Popover } from 'antd'; // 引入 Popover 组件
import { ICON_CONFIGS } from '../menu-config/top-menu-right-strip-config'; // 引入配置文件

const MenuRightStripStyle = {
  position: 'absolute',
  right: 0,
  top: 0,
  height: '20px',
  display: 'flex',
  alignItems: 'center'
} as const;

const IconBoxStyle = {
  width: '20px',
  height: '20px',
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

  return (
    <div style={MenuRightStripStyle}>
      {ICON_CONFIGS.map(({ key, content, icon }) => (
        <div
          key={key}
          style={IconBoxStyle}
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