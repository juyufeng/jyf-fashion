import { useEffect } from 'react';
import * as THREE from 'three';

export const useKeyboardControls = (camera: THREE.Camera) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMac = userAgent.includes('mac');
      const isCtrlOrCmd = isMac ? event.metaKey : event.ctrlKey;

      if (isCtrlOrCmd && event.key === '0') {
        // 缩放重置
        if (camera instanceof THREE.OrthographicCamera) {
          camera.zoom = 1;
          camera.updateProjectionMatrix();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [camera]);
};