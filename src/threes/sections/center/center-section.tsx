import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { GridHelper } from '@/threes/components/grid-helper';
import { CameraControls } from '@/threes/components/camera-controls';

import type { Dimensions } from '@/hooks/use-window-size';
import { domainWidth } from '@/styles/filters/layout-func';
import { THREE_LAYOUT } from '@/configs/three-layout';
const NavHeight = THREE_LAYOUT.NAV.HEIGHT;
const BottomHeight = THREE_LAYOUT.BOTTOM.HEIGHT;
const LeftWidth = THREE_LAYOUT.LEFT.WIDTH;
const RightWidth = THREE_LAYOUT.RIGHT.WIDTH;


const color1 = 0x888888;
const color2 = 0x444444;

const CenterSection = () => {
  const [is2D, setIs2D] = useState(true);
  const [gridSize, setGridSize] = useState(200);
  const [divisions, setDivisions] = useState(40);

  useEffect(() => {
    function updateGrid() {
      const dimensions: Dimensions = {
        width: window.innerWidth,
        height: window.innerHeight,
        currentChatWidth: 375
      };
      // domain业务层的宽度
      const dw = domainWidth(dimensions);
      // domain业务层的高度
      const dh = window.innerHeight;
      // 计算center-section的宽和高
      const centerSectionWidth = dw - LeftWidth - RightWidth;
      const centerSectionHeight = dh - NavHeight - BottomHeight;
      // 取宽和高的最大值作为gridSize
      const maxLen = Math.max(centerSectionWidth, centerSectionHeight);
      const size = maxLen * 3;
      setGridSize(size);
      setDivisions(Math.max(40, Math.floor(size / 20))); // 每20像素一个格子，可根据需求调整
    }
    updateGrid();
    window.addEventListener('resize', updateGrid);
    return () => window.removeEventListener('resize', updateGrid);
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <button
        style={{ position: 'absolute', zIndex: 10, left: 20, top: 20 }}
        onClick={() => setIs2D(v => !v)}
      >
        切换{is2D ? '2D' : '3D'}
      </button>
      <Canvas
        orthographic={is2D}
        camera={
          is2D
            ? { position: [0, 0, 1000], up: [0, 1, 0], zoom: 10, near: 0.1, far: 5000 }
            : { position: [0, 0, 1000], up: [0, 1, 0], fov: 50, near: 0.1, far: 5000 }
        }
        style={{ width: '100%', height: '100%' }}
      >
        <CameraControls is2D={is2D} />
        <GridHelper size={gridSize} divisions={divisions} color1={color1} color2={color2} />
      </Canvas>
    </div>
  );
};

export default CenterSection;