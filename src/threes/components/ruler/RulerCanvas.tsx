import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import $store from '@/stores/three-store';
import useRulerSync from '@/hooks/useRulerSync';

interface RulerCanvasProps {
  width: number;
  height: number;
  mainCamera: any;
  controls: any;
}

const RulerCanvas = observer(({ width, height, mainCamera, controls }: RulerCanvasProps) => {
  const canvasRef = useRef<any>(null);

  useRulerSync(canvasRef, mainCamera, controls, $store.rulerStore);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    const drawRuler = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 1;
      ctx.font = '10px Arial';
      ctx.fillStyle = '#000';

      // 绘制水平标尺
      for (let x = 0; x < width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 10);
        ctx.stroke();
        ctx.fillText(`${x}`, x + 2, 10);
      }

      // 绘制垂直标尺
      for (let y = 0; y < height; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(10, y);
        ctx.stroke();
        ctx.fillText(`${y}`, 2, y + 10);
      }
    };

    drawRuler();

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === '9') {
        $store.rulerStore.resetOrigin();
        drawRuler(); // 重置后重新绘制标尺
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width * window.devicePixelRatio}
      height={height * window.devicePixelRatio}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        position: 'absolute',
        left: 0,
        top: 0,
        pointerEvents: 'none',
        zIndex: 101,
        backgroundColor: 'transparent' // 移除调试背景
      }}
    />
  );
});

export default RulerCanvas;