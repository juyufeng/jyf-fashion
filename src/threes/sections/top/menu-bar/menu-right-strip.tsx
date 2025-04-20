import React from 'react';

const MenuRightStrip: React.FC = () => {
  return (
    <div style={{
      position: 'absolute',
      right: 0,
      top: 0,
      width: '40px',
      height: '20px',
      backgroundColor: 'red',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
    </div>
  );
};

export default MenuRightStrip;