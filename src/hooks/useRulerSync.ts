import { useEffect } from 'react';
import * as THREE from 'three';

export default function useRulerSync(
  canvasRef: React.RefObject<HTMLCanvasElement | null>, // 修改为允许null
  camera: any,
  controls: any,
  rulerStore: any
) {
  useEffect(() => {
    if (!canvasRef.current || !controls) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const handleSync = () => {
      const { width, height } = canvasRef.current!;
      ctx.clearRect(0, 0, width, height);
      
      // 根据相机状态重绘标尺
      if (camera instanceof THREE.OrthographicCamera) {
        const zoom = camera.zoom;
        const position = camera.position;
        // 这里添加标尺绘制逻辑...
      }
    };

    controls.addEventListener('change', handleSync);
    return () => controls.removeEventListener('change', handleSync);
  }, [camera, controls, rulerStore]);
}