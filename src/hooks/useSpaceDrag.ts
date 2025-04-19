import { useEffect } from 'react';
import * as THREE from 'three';

export const useSpaceDrag = (camera: THREE.Camera, controlsRef: React.RefObject<any>) => {
  useEffect(() => {
    let isDragging = false;
    let isSpacePressed = false;
    let lastX = 0;
    let lastY = 0;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        isSpacePressed = true;
        document.body.style.cursor = 'grab';
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        isSpacePressed = false;
        document.body.style.cursor = 'default';
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.button === 0 && isSpacePressed) {
        isDragging = true;
        lastX = event.clientX;
        lastY = event.clientY;
        document.body.style.cursor = 'grabbing';
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
      document.body.style.cursor = isSpacePressed ? 'grab' : 'default';
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (isDragging && camera && controlsRef.current) {
        const deltaX = event.clientX - lastX;
        const deltaY = event.clientY - lastY;
        lastX = event.clientX;
        lastY = event.clientY;

        // 计算平移量
        let moveX = 0, moveY = 0;
        if (camera instanceof THREE.OrthographicCamera) {
          const moveSpeed = 1 / camera.zoom;
          moveX = -deltaX * moveSpeed;
          moveY = deltaY * moveSpeed;
        } else if (camera instanceof THREE.PerspectiveCamera) {
          moveX = -deltaX * 0.1;
          moveY = deltaY * 0.1;
        }

        // 平移相机和controls的target
        camera.position.x += moveX;
        camera.position.y += moveY;
        if (controlsRef.current.target) {
          controlsRef.current.target.x += moveX;
          controlsRef.current.target.y += moveY;
        }

        camera.updateMatrixWorld();
        controlsRef.current.update();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointermove', handlePointerMove);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, [camera, controlsRef]);
};