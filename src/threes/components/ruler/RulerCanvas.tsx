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
  
  // 同步标尺与主画布
  useRulerSync(canvasRef, mainCamera, controls, $store.rulerStore);

  // 快捷键监听
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === '9') {
        $store.rulerStore.resetOrigin();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={width * window.devicePixelRatio}
      height={height * window.devicePixelRatio}
      style={{
        width,
        height,
        position: 'absolute',
        left: 0,
        top: 0,
        pointerEvents: 'none',
        zIndex: 10,
      }}
    />
  );
});

export default RulerCanvas;