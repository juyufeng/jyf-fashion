import { useEffect } from 'react';
import * as THREE from 'three';
import $store from '@/stores/three-store'; // 导入 store

// 缩放配置
const zoom2DConfig = {
  minZoom: 0.5, // 最小缩放值
  maxZoom: 5,  // 最大缩放值
  sensitivity: 0.01 // 缩放灵敏度
};

// 修改zoom3DConfig定义
const zoom3DConfig = {
  minDistance: 100,  // 最小绝对距离
  maxDistance: 2000, // 最大绝对距离
  zoomSpeed: 0.1    // 缩放速度
};

export const useWheelZoom = (camera: THREE.Camera, controlsRef?: React.RefObject<any>) => {
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
       // 2D滚轮缩放
      if (camera instanceof THREE.OrthographicCamera) {
       
        const zoomFactor = event.deltaY > 0 ? 1 - zoom2DConfig.sensitivity : 1 + zoom2DConfig.sensitivity;
        camera.zoom *= zoomFactor;
        camera.zoom = Math.max(zoom2DConfig.minZoom, Math.min(zoom2DConfig.maxZoom, camera.zoom)); // 限制缩放范围
        camera.updateProjectionMatrix();
        $store.setScale(camera.zoom); // 更新缩放比例到store
      } 
      // 3D滚轮缩放
      else if (camera instanceof THREE.PerspectiveCamera && controlsRef?.current) {
        const zoomFactor = event.deltaY > 0 ? 1 + zoom3DConfig.zoomSpeed : 1 - zoom3DConfig.zoomSpeed;
        const target = controlsRef.current.target;
        const direction = camera.position.clone().sub(target).normalize();
        // 计算新的相机位置
        const currentDistance = camera.position.distanceTo(target);
        const newDistance = currentDistance * zoomFactor;

        // 限制缩放范围到绝对值
        let limitedDistance = Math.max(zoom3DConfig.minDistance, Math.min(zoom3DConfig.maxDistance, newDistance));
        
        // 更新相机位置
        const newPosition = target.clone().add(direction.multiplyScalar(limitedDistance));
        camera.position.set(newPosition.x, newPosition.y, newPosition.z);
        camera.updateMatrixWorld(true);
        controlsRef.current.update();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [camera, controlsRef]);
};