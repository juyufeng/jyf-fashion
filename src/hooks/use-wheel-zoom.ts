import { useEffect } from 'react';
import * as THREE from 'three';

export const useWheelZoom = (camera: THREE.Camera) => {
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      // 滚轮缩放
      const zoomFactor = event.deltaY > 0 ? 0.9 : 1.1;
      if (camera instanceof THREE.OrthographicCamera) {
        camera.zoom *= zoomFactor;
        camera.updateProjectionMatrix();
      }
    };

    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [camera]);
};