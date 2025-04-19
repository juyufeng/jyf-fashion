import { useThree, useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import { OrthographicCamera, PerspectiveCamera, OrbitControls as DreiOrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';

interface CameraControlsProps {
  is2D: boolean;
}

export const CameraControls: React.FC<CameraControlsProps> = ({ is2D }) => {
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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMac = userAgent.includes('mac');
      const isCtrlOrCmd = isMac ? event.metaKey : event.ctrlKey;

      if (isCtrlOrCmd && event.key === '0') {
        // 缩放重置
        camera.zoom = 1;
        camera.updateProjectionMatrix();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [camera]);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      // 滚轮缩放
      const zoomFactor = event.deltaY > 0 ? 0.9 : 1.1;
      camera.zoom *= zoomFactor;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [camera]);

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
        enablePan={true}
        enableZoom={true}
        minZoom={0.1}
        maxZoom={10}
      />
      {/* 坐标轴和标注 */}
      <primitive object={new THREE.AxesHelper(100)} />
      <Html position={[110, 0, 0]} center style={{ color: 'red', fontWeight: 'bold' }}>X</Html>
      <Html position={[0, 110, 0]} center style={{ color: 'green', fontWeight: 'bold' }}>Y</Html>
      <Html position={[0, 0, 110]} center style={{ color: 'blue', fontWeight: 'bold' }}>Z</Html>
    </>
  );
};