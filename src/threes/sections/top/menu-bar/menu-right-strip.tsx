import React from 'react';

const MenuRightStripStyle = {
  position: 'absolute',
  right: 0,
  top: 0,
  height: '20px',
  backgroundColor: 'red',
  display: 'flex',
  alignItems: 'center'
} as const;

const MenuRightStrip: React.FC = () => {
  return (
    <div style={MenuRightStripStyle}>
      <div>11</div>
      <div>11</div>
    </div>
  );
};

export default MenuRightStrip;