import { useEffect } from 'react';
import * as THREE from 'three';
import $store from '@/stores/three-store'; // 导入 store

// 缩放配置
const zoomConfig = {
  minZoom: 0.5, // 最小缩放值
  maxZoom: 5,  // 最大缩放值
  sensitivity: 0.01 // 缩放灵敏度
};

export const useWheelZoom = (camera: THREE.Camera) => {
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      // 滚轮缩放
      const zoomFactor = event.deltaY > 0 ? 1 - zoomConfig.sensitivity : 1 + zoomConfig.sensitivity;
      if (camera instanceof THREE.OrthographicCamera) {
        camera.zoom *= zoomFactor;
        camera.zoom = Math.max(zoomConfig.minZoom, Math.min(zoomConfig.maxZoom, camera.zoom)); // 限制缩放范围
        camera.updateProjectionMatrix();
        $store.setScale(camera.zoom); // 更新缩放比例到store
      }
    };

    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [camera]);
};