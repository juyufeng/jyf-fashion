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
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

      const zoom = mainCamera.zoom || 1;
      const offsetX = mainCamera.position.x || 0;
      const offsetY = mainCamera.position.y || 0;

      // 绘制水平标尺
      for (let x = -offsetX; x < width / zoom; x += 50 / zoom) {
        const screenX = x * zoom + offsetX;
        ctx.beginPath();
        ctx.moveTo(screenX, 0);
        ctx.lineTo(screenX, 10);
        ctx.stroke();
        ctx.fillText(`${Math.round(x)}`, screenX + 2, 10);
      }

      // 绘制垂直标尺
      for (let y = -offsetY; y < height / zoom; y += 50 / zoom) {
        const screenY = y * zoom + offsetY;
        ctx.beginPath();
        ctx.moveTo(0, screenY);
        ctx.lineTo(10, screenY);
        ctx.stroke();
        ctx.fillText(`${Math.round(y)}`, 2, screenY + 10);
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
  }, [width, height, mainCamera]);

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
        backgroundColor: 'transparent'
      }}
    />
  );
});

export default RulerCanvas;