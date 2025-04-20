import { useThree, useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import { OrthographicCamera, PerspectiveCamera, OrbitControls as DreiOrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useKeyboardControls } from '@/hooks/use-keyboard-controls';
import { useSpaceDrag } from '@/hooks/use-space-drag';
import { forwardRef } from 'react';
import $store from '@/stores/three-store'; // 导入 store

interface CameraControlsProps {
  is2D: boolean;
}

export const CameraControls = forwardRef<any, CameraControlsProps>(({ is2D }, ref) => {
  const controlsRef = useRef<any>(null);
  const orthoRef = useRef<THREE.OrthographicCamera>(null);
  const perspRef = useRef<THREE.PerspectiveCamera>(null);
  
  const { camera, set } = useThree(); 

  useEffect(() => {
    if (is2D && orthoRef.current) {
      set({ camera: orthoRef.current });
    } else if (!is2D && perspRef.current) {
      set({ camera: perspRef.current });
    }
    controlsRef.current?.update();
  }, [is2D, set]);

  useKeyboardControls(camera);
  useSpaceDrag(camera, controlsRef);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (camera instanceof THREE.OrthographicCamera) {
        const zoomFactor = 1.1;
        camera.zoom *= event.deltaY > 0 ? 1 / zoomFactor : zoomFactor;
        camera.updateProjectionMatrix();
        $store.setScale(camera.zoom); // 更新缩放比例到store
      } else if (camera instanceof THREE.PerspectiveCamera) {
        camera.position.z += event.deltaY * 0.1;
        $store.setScale(camera.position.z); // 更新缩放比例到store
      }
      controlsRef.current?.update();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMac = userAgent.includes('mac');
      const isCtrlOrCmd = isMac ? event.metaKey : event.ctrlKey;

      if (isCtrlOrCmd && event.key === '0') {
        if (camera instanceof THREE.OrthographicCamera) {
          camera.zoom = 1;
          camera.updateProjectionMatrix();
          $store.setScale(camera.zoom); // 重置缩放比例到store
        }
      }
    };

    window.addEventListener('wheel', handleWheel);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [camera, controlsRef]);

  // 同步forwardRef和内部ref
  useEffect(() => {
    if (ref) {
      if (typeof ref === 'function') {
        ref(controlsRef.current);
      } else {
        ref.current = controlsRef.current;
      }
    }
  }, [ref]);

  return (
    <>
      <OrthographicCamera
        ref={orthoRef}
        makeDefault={is2D}
        position={[0, 0, 1000]}
        zoom={1}
      />
      <PerspectiveCamera
        ref={perspRef}
        makeDefault={!is2D}
        position={[0, 0, 1000]}
        fov={50}
      />
      <DreiOrbitControls
        ref={controlsRef}
        camera={camera}
        enableRotate={!is2D}
        enablePan={false}
        enableZoom={true}
        minZoom={0.1}
        maxZoom={10}
      />
      <primitive object={new THREE.AxesHelper(1000)} />
      <Html position={[110, 0, 0]} center style={{ color: 'red', fontWeight: 'bold' }}>X</Html>
      <Html position={[0, 110, 0]} center style={{ color: 'green', fontWeight: 'bold' }}>Y</Html>
      <Html position={[0, 0, 110]} center style={{ color: 'blue', fontWeight: 'bold' }}>Z</Html>
    </>
  );
});