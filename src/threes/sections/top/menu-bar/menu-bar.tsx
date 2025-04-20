import React from 'react';
import MenuBarLogo from '@/threes/sections/top/menu-bar/menu-bar-logo'; 
import MenuLeftStrip from '@/threes/sections/top/menu-bar/menu-left-strip';
import MenuRightStrip from '@/threes/sections/top/menu-bar/menu-right-strip'; 

const  topStyle = { display: 'flex', alignItems: 'center', width: '100%', height: '20px', background: 'rgb(245, 245, 245)', fontSize: '12px', userSelect: 'none', position: 'relative' } as const;

const MenuBar: React.FC = () => {
  return (
    <div style={topStyle}>
      <MenuBarLogo /> 
      <MenuLeftStrip /> 
      <MenuRightStrip />
    </div>
  );
};

export default MenuBar;