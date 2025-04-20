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

// 物理设备缩放比
const DPR = window.devicePixelRatio || 1;

const RulerCanvas = observer(({ width, height, mainCamera, controls }: RulerCanvasProps) => {
  const canvasRef = useRef<any>(null);

  useRulerSync(canvasRef, mainCamera, controls, $store.rulerStore);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    ctx.scale(DPR, DPR);


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
      for (let x = 0; x < width; x += rulerConfig.tickSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, rulerConfig.tickLength);
        ctx.stroke();
        if (x % rulerConfig.textInterval === 0) {
          ctx.fillText(`${(x / rulerConfig.tickSpacing).toFixed(rulerConfig.textDecimalPlaces)}${rulerConfig.textUnit}`, x + rulerConfig.textOffsetX, rulerConfig.tickLength + rulerConfig.textPaddingX); // 使用textOffsetX
        }
      }

      // 绘制垂直标尺
      for (let y = 0; y < height; y += rulerConfig.tickSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(rulerConfig.tickLength, y);
        ctx.stroke();
        if (y % rulerConfig.textInterval === 0) {
          ctx.fillText(`${(y / rulerConfig.tickSpacing).toFixed(rulerConfig.textDecimalPlaces)}${rulerConfig.textUnit}`, 2 + rulerConfig.textPaddingY, y + rulerConfig.textOffsetY); // 使用textOffsetY
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
      width={width * DPR}
      height={height * DPR}
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