import React, { CSSProperties, ReactNode } from 'react';

interface ThreeLayoutProps {
  top?: ReactNode;
  bottom?: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
  center?: ReactNode;
}

const NavHeight = 44;
const BottomHeight = 44;
const LeftWidth = 44;
const RightWidth = 44;

const ThreeLayout: React.FC<ThreeLayoutProps> = ({
  top,
  bottom,
  left,
  right,
  center
}) => {
  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      background: 'rgb(245,245,245)', 
      position: 'relative',
    }}>
      {/* 顶部区域 */}
      <div style={{ 
        position: 'absolute',
        left: '0px',
        top: '0px',
        width: '100%',
        height: `${NavHeight}px`,
        background: 'red'
      }}>
        {top}
      </div>

      {/* 底部区域 */}
      <div style={{ 
        position: 'absolute',
        left: '0px',
        bottom: '0px',
        width: '100%',
        height: `${BottomHeight}px`,
        background: 'green'
      }}>
        {bottom}
      </div>

      {/* 左侧区域 */}
      <div style={{ 
        position: 'absolute',
        left: '0px',
        top: `${NavHeight}px`,
        width: `${LeftWidth}px`,
        height: `calc(100% - ${LeftWidth * 2}px)`,
        background: 'orange'
      }}>
        {left}
      </div>

      {/* 右侧区域 */}
      <div style={{ 
        position: 'absolute',
        right: '0px',
        top: `${NavHeight}px`,
        width: `${RightWidth}px`,
        height: `calc(100% - ${RightWidth * 2}px)`,
        background: 'blue'
      }}>
        {right}
      </div>

      {/* 中心区域 */}
      <div style={{ 
        position: 'absolute',
        left: `${LeftWidth}px`,
        top: `${NavHeight}px`,
        width: `calc(100% - ${LeftWidth + RightWidth}px)`,
        height: `calc(100% - ${NavHeight + BottomHeight}px)`,
        background: 'yellow'
      }}>
        {center}
      </div>
    </div>
  );
};

export default ThreeLayout;