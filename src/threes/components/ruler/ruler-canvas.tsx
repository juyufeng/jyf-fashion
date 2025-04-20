import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import $store from '@/stores/three-store';
import useRulerSync from '@/hooks/use-ruler-sync';
import { rulerConfig } from '@/threes/components/ruler/ruler-config';
import { debounce } from '@/utils/util';

interface RulerCanvasProps {
  width: number;
  height: number;
  mainCamera: any;
  controls: any;
  visible: boolean;
}

const DPR = window.devicePixelRatio || 1;

const RulerCanvas = observer(({ width, height, mainCamera, controls, visible }: RulerCanvasProps) => {
  const canvasRef = useRef<any>(null);

  useRulerSync(canvasRef, mainCamera, controls, $store.rulerStore);

  useEffect(() => {
    if (!visible) return;

    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    const handleResize = debounce(() => {
      canvasRef.current.width = width * DPR;
      canvasRef.current.height = height * DPR;
      ctx.scale(DPR, DPR);

      drawRuler();
    }, 200);

    const drawRuler = () => {
      const scale = $store.scale; // 使用全局状态中的缩放比例
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = rulerConfig.backgroundColor;
      ctx.fillRect(0, 0, width, rulerConfig.tickLength);
      ctx.fillRect(0, 0, rulerConfig.tickLength, height);

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

      for (let x = 0; x < width; x += rulerConfig.tickSpacing * scale) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, rulerConfig.tickLength);
        ctx.stroke();
        if (x % (rulerConfig.textInterval * scale) === 0) {
          ctx.fillText(`${(x / (rulerConfig.tickSpacing * scale)).toFixed(rulerConfig.textDecimalPlaces)}${rulerConfig.textUnit}`, x + rulerConfig.textOffsetX, rulerConfig.tickLength + rulerConfig.textPaddingX);
        }
      }

      for (let y = 0; y < height; y += rulerConfig.tickSpacing * scale) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(rulerConfig.tickLength, y);
        ctx.stroke();
        if (y % (rulerConfig.textInterval * scale) === 0) {
          ctx.fillText(`${(y / (rulerConfig.tickSpacing * scale)).toFixed(rulerConfig.textDecimalPlaces)}${rulerConfig.textUnit}`, 2 + rulerConfig.textPaddingY, y + rulerConfig.textOffsetY);
        }
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [width, height, visible, $store.scale]);

  return visible ? (
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
  ) : null;
});

export default RulerCanvas;