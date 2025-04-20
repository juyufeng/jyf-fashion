import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import $store from '@/stores/three-store';
import useRulerSync from '@/hooks/use-ruler-sync';
import { rulerConfig } from '@/threes/components/ruler/ruler-config'; // 导入配置

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
      ctx.strokeStyle = rulerConfig.lineColor;
      ctx.lineWidth = rulerConfig.lineWidth;
      ctx.font = `${rulerConfig.textItalic ? 'italic ' : ''}${rulerConfig.textBold ? 'bold ' : ''}${rulerConfig.fontSize}px ${rulerConfig.textFont}`;
      ctx.fillStyle = rulerConfig.textColor;

      if (rulerConfig.textShadow) {
        ctx.shadowColor = rulerConfig.textShadowColor;
        ctx.shadowBlur = rulerConfig.textShadowBlur;
        ctx.shadowOffsetX = rulerConfig.textShadowOffsetX;
        ctx.shadowOffsetY = rulerConfig.textShadowOffsetY;
      } else {
        ctx.shadowColor = 'transparent';
      }

      // 绘制水平标尺
      for (let x = 0; x < width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 10);
        ctx.stroke();
        if (x % rulerConfig.textInterval === 0) {
          ctx.fillText(`${(x / 50).toFixed(rulerConfig.textDecimalPlaces)}${rulerConfig.textUnit}`, x + rulerConfig.textOffset, 10 + rulerConfig.textPadding);
        }
      }

      // 绘制垂直标尺
      for (let y = 0; y < height; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(10, y);
        ctx.stroke();
        if (y % rulerConfig.textInterval === 0) {
          ctx.fillText(`${(y / 50).toFixed(rulerConfig.textDecimalPlaces)}${rulerConfig.textUnit}`, 2 + rulerConfig.textPadding, y + rulerConfig.textOffset);
        }
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
        backgroundColor: 'transparent'
      }}
    />
  );
});

export default RulerCanvas;