import React from 'react';
import { GridHelper as ThreeGridHelper } from 'three';

export const GridHelper = ({
  size = 100000, // 设置为非常大
  divisions = 1000, // 分割数也适当增大
  color1 = 0x888888,
  color2 = 0x444444,
}: {
  size?: number;
  divisions?: number;
  color1?: number;
  color2?: number;
}) => {
  return (
    <primitive
      object={new ThreeGridHelper(size, divisions, color1, color2)}
      position={[0, 0, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
    />
  );
};