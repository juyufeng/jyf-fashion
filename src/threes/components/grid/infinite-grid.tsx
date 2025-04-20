import React, { useMemo } from 'react';
import * as THREE from 'three';

interface InfiniteGridProps {
  cellSize?: number;      // 每个格子的大小
  color?: THREE.ColorRepresentation; // 主线颜色
  fade?: boolean;         // 是否渐隐
  thickness?: number;     // 线宽
}

export const InfiniteGrid: React.FC<InfiniteGridProps> = ({
  cellSize = 20,
  color = 0x888888,
  fade = true,
  thickness = 1,
}) => {
  // 计算当前相机视野范围，生成覆盖视野的网格
  const grid = useMemo(() => {
    // 取一个极大值，保证覆盖
    const size = 100000;
    const divisions = Math.floor(size / cellSize);

    const helper = new THREE.GridHelper(size, divisions, color, color);
    helper.material.depthWrite = false;
    helper.material.transparent = true;
    helper.material.opacity = fade ? 0.6 : 1.0;
    helper.material.linewidth = thickness;
    // 旋转到xy平面
    helper.rotation.x = -Math.PI / 2;
    return helper;
  }, [cellSize, color, fade, thickness]);

  return <primitive object={grid} />;
};