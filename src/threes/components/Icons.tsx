import React from 'react';

const iconStyle = {
  width: '24px',
  height: '24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

export const LineIcon: React.FC = () => (
  <div style={iconStyle}>━</div>
);

export const BezierIcon: React.FC = () => (
  <div style={iconStyle}>⟿</div>
);

export const RectangleIcon: React.FC = () => (
  <div style={iconStyle}>□</div>
);

export const CircleIcon: React.FC = () => (
  <div style={iconStyle}>○</div>
);

export const TextIcon: React.FC = () => (
  <div style={iconStyle}>T</div>
);

export const ImageIcon: React.FC = () => (
  <div style={iconStyle}>🖼</div>
);