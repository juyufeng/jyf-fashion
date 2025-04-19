import { useEffect } from 'react';
import * as THREE from 'three';

export default function useRulerSync(
  canvasRef: React.RefObject<HTMLCanvasElement | null>, // Allow null
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

      // Redraw logic based on camera state
      if (camera instanceof THREE.OrthographicCamera) {
        const zoom = camera.zoom;
        const position = camera.position;
        // Add ruler drawing logic here...
      }
    };

    controls.addEventListener('change', handleSync);
    return () => controls.removeEventListener('change', handleSync);
  }, [camera, controls, rulerStore]);
}